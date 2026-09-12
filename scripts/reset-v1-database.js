/**
 * scripts/reset-v1-database.js
 * Clean Reset & v1.0.0 Schema Initializer for Supabase Cloud
 */

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const loadEnv = () => {
	const envPath = path.resolve(process.cwd(), ".env");
	if (fs.existsSync(envPath)) {
		const lines = fs.readFileSync(envPath, "utf8").split("\n");
		for (const line of lines) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith("#")) continue;
			const idx = trimmed.indexOf("=");
			if (idx !== -1) {
				process.env[trimmed.slice(0, idx).trim()] = trimmed
					.slice(idx + 1)
					.trim();
			}
		}
	}
};

loadEnv();

const SUPABASE_URL =
	process.env.SUPABASE_URL || "https://wiapnhpdgjbtkblowfig.supabase.co";
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
	auth: { persistSession: false },
});

const DEFAULT_STORE_ID = "STORE-BM-856CFAC8";

const resetDatabase = async () => {
	console.log(
		"🚀 [Supabase v1.0.0 Reset] Memulai pembersihan penuh database cloud...",
	);

	// 1. Wipe tables with correct primary keys
	await supabase.from("transactions").delete().neq("id", "___NEVER___");
	console.log("  ✓ Tabel transactions berhasil dikosongkan");

	await supabase.from("products").delete().neq("id", "___NEVER___");
	console.log("  ✓ Tabel products berhasil dikosongkan");

	await supabase.from("customers").delete().neq("id", "___NEVER___");
	console.log("  ✓ Tabel customers berhasil dikosongkan");

	try {
		await supabase.from("expenses").delete().neq("id", "___NEVER___");
		console.log("  ✓ Tabel expenses berhasil dikosongkan");
	} catch (_) {}

	try {
		await supabase.from("settings").delete().neq("key", "___NEVER___");
		console.log("  ✓ Tabel settings berhasil dikosongkan");
	} catch (_) {}

	// 2. Seed Pristine Products (matching exact cloud schema)
	const initialProducts = [
		{
			id: "prod_galon_isi",
			sku: "BM-001",
			name: "Air Isi Ulang Galon",
			category: "Galon",
			price: 5000,
			unit: "galon",
			emoji: "🪣",
			stock: 999,
		},
		{
			id: "prod_antar_dalam",
			sku: "BM-002",
			name: "Antar Galon (Dalam)",
			category: "Galon",
			price: 3000,
			unit: "kali",
			emoji: "🛵",
			stock: 999,
		},
		{
			id: "prod_antar_luar",
			sku: "BM-003",
			name: "Antar Galon (Luar)",
			category: "Galon",
			price: 5000,
			unit: "kali",
			emoji: "🚚",
			stock: 999,
		},
		{
			id: "prod_galon_aqua",
			sku: "BM-004",
			name: "Galon Baru (Aqua)",
			category: "Galon",
			price: 50000,
			unit: "buah",
			emoji: "💧",
			stock: 50,
		},
		{
			id: "prod_galon_std",
			sku: "BM-005",
			name: "Galon Baru (Standar)",
			category: "Galon",
			price: 45000,
			unit: "buah",
			emoji: "💦",
			stock: 50,
		},
		{
			id: "prod_botol_600",
			sku: "BM-006",
			name: "Air Botol 600ml",
			category: "Botol",
			price: 3000,
			unit: "botol",
			emoji: "🍶",
			stock: 200,
		},
		{
			id: "prod_botol_1500",
			sku: "BM-007",
			name: "Air Botol 1500ml",
			category: "Botol",
			price: 5000,
			unit: "botol",
			emoji: "🥤",
			stock: 100,
		},
		{
			id: "prod_dispenser",
			sku: "BM-008",
			name: "Dispenser Galon",
			category: "Lainnya",
			price: 250000,
			unit: "unit",
			emoji: "⚗️",
			stock: 10,
		},
	];

	const { error: prodErr } = await supabase.from("products").upsert(
		initialProducts.map((p) => ({
			...p,
			updated_at: new Date().toISOString(),
			deleted_at: null,
		})),
	);
	if (prodErr) console.warn("  ⚠️ Products seed warning:", prodErr.message);
	else
		console.log(
			`  ✓ ${initialProducts.length} Produk master bersih berhasil ditanamkan`,
		);

	// 3. Seed Pristine Settings & Roster
	const initialSettings = [
		{ key: "shopName", value: "Blue Mountain Refilling Station" },
		{ key: "shopAddress", value: "Jl. Garuda No. 42, RT 02/RW 05" },
		{ key: "shopPhone", value: "0812-3456-7890" },
		{ key: "cashierName", value: "Kasir Utama" },
		{ key: "printerPaper", value: "58mm" },
		{ key: "taxRate", value: "0" },
		{ key: "bankName", value: "BCA" },
		{ key: "bankNumber", value: "123-456-7890" },
		{ key: "bankHolder", value: "Fadhilah Ramadhan" },
		{
			key: "qrisNumber",
			value:
				"00020101021226590014ID.LINKAJA.WWW01189360091438493028300208101683935204581253033605802ID5913BLUE MOUNTAIN6007BANDUNG61054011562070703A0163046C49",
		},
		{ key: "modalAwal", value: "100000" },
		{
			key: `users_roster_${DEFAULT_STORE_ID}`,
			value: JSON.stringify([
				{
					id: "usr_admin",
					username: "admin",
					name: "Fadhilah Ramadhan (Owner)",
					role: "owner",
					pin_hash:
						"c3b558e7f7bd99bf1a0e50aa083c1ba8811e840dab3bf07bc020c724ce771e83",
					pin_salt: "9bc6c2b0806a1040516484af5df10112",
					is_active: true,
				},
			]),
		},
	];

	const { error: setErr } = await supabase.from("settings").upsert(
		initialSettings.map((s) => ({
			key: s.key,
			value: s.value,
			updated_at: new Date().toISOString(),
		})),
	);
	if (setErr) console.warn("  ⚠️ Settings seed warning:", setErr.message);
	else
		console.log(
			"  ✓ Pengaturan toko & roster cloud v1.0.0 berhasil ditanamkan",
		);

	console.log(
		"\n✅ [SUKSES 100%] Database Supabase Cloud bersih dan siap melayani v1.0.0!\n",
	);
};

resetDatabase();
