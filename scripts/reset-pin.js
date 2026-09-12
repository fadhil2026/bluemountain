/**
 * scripts/reset-pin.js
 * Standalone Automated PIN & Password Reset CLI for Blue Mountain POS
 *
 * Usage:
 *   node scripts/reset-pin.js                 # Resets 'admin' PIN to '1234'
 *   node scripts/reset-pin.js admin 1234      # Resets 'admin' to custom PIN
 *   node scripts/reset-pin.js test 1234       # Resets 'test' to custom PIN
 *   npm run reset-pin                         # npm shortcut
 */

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { generateSalt, hashPin } from "../js/utils/crypto.js";

// Load environment variables from .env
const loadEnv = () => {
	const envPath = path.resolve(process.cwd(), ".env");
	if (fs.existsSync(envPath)) {
		const lines = fs.readFileSync(envPath, "utf8").split("\n");
		for (const line of lines) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith("#")) continue;
			const idx = trimmed.indexOf("=");
			if (idx !== -1) {
				const key = trimmed.slice(0, idx).trim();
				const val = trimmed.slice(idx + 1).trim();
				process.env[key] = val;
			}
		}
	}
};

loadEnv();

const SUPABASE_URL =
	process.env.SUPABASE_URL || "https://wiapnhpdgjbtkblowfig.supabase.co";
const SUPABASE_SECRET_KEY =
	process.env.SUPABASE_SECRET_KEY ||
	process.env.SUPABASE_PUBLISHABLE_KEY ||
	"sb_publishable_BBEJNs18ooZ-IHRPxJtDUA_KiKLcQ-g";
const MASTER_STORE_ID = "STORE-BM-856CFAC8";
const ROSTER_KEY = `users_roster_${MASTER_STORE_ID}`;

const [, , targetUsernameArg, newPinArg] = process.argv;
const targetUsername = (targetUsernameArg || "admin").toLowerCase().trim();
const newPin = (newPinArg || "1234").trim();

if (!/^\d{4,6}$/.test(newPin)) {
	console.error("❌ Error: PIN harus berupa 4 hingga 6 digit angka.");
	process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
	auth: { persistSession: false },
});

async function runResetPin() {
	console.log(
		`🔐 [Reset PIN Realtime Engine] Menghubungi Supabase Cloud (${SUPABASE_URL})...`,
	);
	console.log(`   Target Operator : @${targetUsername}`);
	console.log(`   PIN Baru        : ${newPin}`);

	// 1. Generate new salt and salted SHA-256 hash
	const salt = generateSalt();
	const pinHash = await hashPin(newPin, salt);
	const now = new Date().toISOString();

	// 2. Fetch current roster from settings
	let roster = [];
	const { data: rosterData, error: rosterErr } = await supabase
		.from("settings")
		.select("value")
		.eq("key", ROSTER_KEY)
		.maybeSingle();

	if (!rosterErr && rosterData && rosterData.value) {
		try {
			roster = JSON.parse(rosterData.value);
		} catch (_) {}
	}

	// If roster is empty, initialize standard operators
	if (!Array.isArray(roster) || roster.length === 0) {
		console.log(
			"   ℹ️ Roster cloud belum ada, menginisialisasi daftar operator standar...",
		);
		roster = [
			{
				username: "admin",
				name: "Fadhilah Ramadhan",
				role: "owner",
				pinHash,
				pinSalt: salt,
				isActive: true,
				updatedAt: now,
			},
			{
				username: "test",
				name: "Test",
				role: "cashier",
				pinHash,
				pinSalt: salt,
				isActive: true,
				updatedAt: now,
			},
		];
	} else {
		// Find and update target user
		let userFound = false;
		roster = roster.map((u) => {
			if (String(u.username).toLowerCase().trim() === targetUsername) {
				userFound = true;
				return {
					...u,
					pinHash,
					pinSalt: salt,
					isActive: true,
					updatedAt: now,
				};
			}
			return u;
		});

		if (!userFound) {
			console.log(
				`   ℹ️ Operator @${targetUsername} belum ada di roster, menambahkan operator baru...`,
			);
			roster.push({
				username: targetUsername,
				name:
					targetUsername === "admin"
						? "Fadhilah Ramadhan"
						: targetUsername.charAt(0).toUpperCase() + targetUsername.slice(1),
				role: targetUsername === "admin" ? "owner" : "cashier",
				pinHash,
				pinSalt: salt,
				isActive: true,
				updatedAt: now,
			});
		}
	}

	// 3. Save roster to settings (Bridge B - Fail-Safe)
	const { error: saveErr } = await supabase.from("settings").upsert({
		key: ROSTER_KEY,
		value: JSON.stringify(roster),
		updated_at: now,
	});

	if (saveErr) {
		console.error(
			"❌ Gagal menyimpan roster ke Supabase settings:",
			saveErr.message,
		);
		process.exit(1);
	}

	// 4. Try updating app_users table if available (Bridge A)
	try {
		const targetUserObj = roster.find((u) => u.username === targetUsername);
		if (targetUserObj) {
			await supabase.from("app_users").upsert(
				{
					username: targetUsername,
					name: targetUserObj.name,
					role: targetUserObj.role,
					pin_hash: pinHash,
					pin_salt: salt,
					is_active: true,
					updated_at: now,
				},
				{ onConflict: "username" },
			);
		}
	} catch (_) {}

	console.log("\n✅ [SUKSES] PIN Berhasil Direset dan Ter-Broadcast Realtime!");
	console.log(`   • Operator : @${targetUsername}`);
	console.log(`   • PIN Baru : ${newPin}`);
	console.log(`   • Salt     : ${salt.slice(0, 10)}...`);
	console.log(`   • SHA-256  : ${pinHash.slice(0, 16)}...`);
	console.log(
		"   • Realtime : Seluruh perangkat (Desktop, HP, Tablet) yang sedang online",
	);
	console.log(
		"                akan seketika tersinkronisasi otomatis via WebSocket.",
	);
}

runResetPin().catch((err) => {
	console.error("❌ Terjadi kesalahan:", err);
	process.exit(1);
});
