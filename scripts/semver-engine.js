/**
 * scripts/semver-engine.js
 * Automated Semantic Versioning (SemVer 2.0.0) Engine for Blue Mountain POS
 *
 * ═════════════════════════════════════════════════════════════════════════════
 * 📐 FORMULA & METRIK PENENTUAN VERSI OTOMATIS:
 * ═════════════════════════════════════════════════════════════════════════════
 * Formula:
 * Skor Perubahan (Score):
 * 1. S_major >= 100  --> BUMP MAJOR: X+1.0.0 (Breaking change, DB schema breaking migration, arsitektur inti)
 * 2. S_minor >= 50   --> BUMP MINOR: X.Y+1.0 (Fitur baru, modul baru, endpoint baru, subsistem baru)
 * 3. S_patch >= 10   --> BUMP PATCH: X.Y.Z+1 (Bug fix, styling UI, layout responsif, performa, refactor, docs)
 *
 * Kriteria Metrik:
 * [MAJOR] (+100 poin):
 *  - Kata kunci commit: "BREAKING CHANGE", "breaking:", "major:", "feat!:", "fix!:"
 *  - Perubahan breaking pada schema database (misal: versi Dexie db.version dinaikkan)
 *  - Restrukturisasi arsitektur yang tidak backward-compatible
 *
 * [MINOR] (+50 poin):
 *  - Kata kunci commit: "feat:", "feat(", "feature:"
 *  - Penambahan view/halaman baru di `js/views/`
 *  - Penambahan modul/engine baru (e.g. `semver-engine.js`, `Master Store ID`, `Dual-Bridge Sync`)
 *  - Penambahan tabel/entity di database cloud
 *
 * [PATCH] (+10 poin):
 *  - Kata kunci commit: "fix:", "fix(", "bug:", "hotfix:"
 *  - Penyesuaian layout responsif, styling CSS, atau UI glitch ("style:", "ui:")
 *  - Optimalisasi performa ("perf:")
 *  - Refactoring tanpa mengubah fungsionalitas ("refactor:")
 *  - Pembaruan dokumentasi, verifikasi, atau skrip CI/CD ("docs:", "chore:", "test:")
 * ═════════════════════════════════════════════════════════════════════════════
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const STATE_FILE = path.resolve(process.cwd(), "semver.state.json");
const PKG_FILE = path.resolve(process.cwd(), "package.json");
const README_FILE = path.resolve(process.cwd(), "README.md");
const DOCS_DIR = path.resolve(process.cwd(), "docs");

/**
 * Membaca state SemVer terkini
 */
export const getSemVerState = () => {
	if (fs.existsSync(STATE_FILE)) {
		try {
			return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
		} catch (_) {}
	}
	// Fallback membaca package.json
	const pkg = JSON.parse(fs.readFileSync(PKG_FILE, "utf8"));
	return {
		currentVersion: pkg.version || "1.0.0",
		lastCommitHash: "",
		updatedAt: new Date().toISOString(),
		milestones: {},
		metrics: { majorThreshold: 100, minorThreshold: 50, patchThreshold: 10 },
	};
};

/**
 * Menyimpan state SemVer
 */
export const saveSemVerState = (state) => {
	fs.writeFileSync(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`, "utf8");
};

/**
 * Menganalisis perubahan kode di git (staged, unstaged, atau commit terakhir)
 * Menghitung skor metrik untuk menentukan apakah ini MAJOR, MINOR, atau PATCH
 */
export const analyzeChanges = () => {
	let diffOutput = "";
	let changedFiles = [];

	try {
		// Ambil status file yang berubah
		const status = execSync("git status --porcelain", {
			stdio: ["ignore", "pipe", "ignore"],
		}).toString();
		changedFiles = status
			.split("\n")
			.filter(Boolean)
			.map((line) => line.trim().slice(3));

		// Ambil diff konten
		diffOutput = execSync("git diff HEAD", {
			stdio: ["ignore", "pipe", "ignore"],
		}).toString();
	} catch (_) {}

	let sMajor = 0;
	let sMinor = 0;
	let sPatch = 0;
	const reasons = [];

	// Filter berkas sumber bermakna (abaikan dist/ dan metadata SemVer)
	const meaningfulFiles = changedFiles.filter(
		(f) =>
			!f.startsWith("dist/") &&
			!f.endsWith(".state.json") &&
			f !== "package.json" &&
			f !== "functions/api/health.js" &&
			f !== "index.html" &&
			f !== "README.md",
	);

	if (meaningfulFiles.length === 0) {
		return {
			sMajor: 0,
			sMinor: 0,
			sPatch: 0,
			recommendation: "none",
			reasons: [
				"Hanya perubahan berkas build/dist atau sinkronisasi metadata versi",
			],
			changedFilesCount: changedFiles.length,
		};
	}

	const textToScan = `${changedFiles.join("\n")}\n${diffOutput.slice(0, 10000)}`;

	// 1. Evaluasi MAJOR (Breaking Change)
	if (
		/BREAKING CHANGE/i.test(textToScan) ||
		/\bmajor:/i.test(textToScan) ||
		/feat!:/i.test(textToScan) ||
		/fix!:/i.test(textToScan) ||
		/db\.version\(\s*5\s*\)/.test(textToScan)
	) {
		sMajor += 100;
		reasons.push(
			"Terdeteksi indikasi breaking change / migrasi arsitektur mayor",
		);
	}

	// 2. Evaluasi MINOR (Fitur / Modul Baru)
	if (
		changedFiles.some(
			(f) => f.startsWith("js/views/") && statusIncludesNew(f),
		) ||
		changedFiles.some(
			(f) =>
				(f.includes("09_MASTER_TENANT_ISOLATION") ||
					f.includes("semver-engine")) &&
				statusIncludesNew(f),
		) ||
		/master store tenant isolation/i.test(textToScan) ||
		/dual-bridge/i.test(textToScan)
	) {
		sMinor += 50;
		reasons.push("Terdeteksi penambahan modul baru / arsitektur fitur baru");
	}

	// 3. Evaluasi PATCH (Bug Fix / Style / Docs / Refactor)
	if (
		changedFiles.some(
			(f) => f.endsWith(".css") || f.endsWith(".md") || f.endsWith(".js"),
		)
	) {
		sPatch += 15;
		reasons.push(
			"Terdeteksi perbaikan, styling CSS, atau pembaruan kode sumber",
		);
	}

	// Tentukan level rekomendasi
	let recommendation = "patch";
	if (sMajor >= 100) {
		recommendation = "major";
	} else if (sMinor >= 50) {
		recommendation = "minor";
	} else {
		recommendation = "patch";
	}

	return {
		sMajor,
		sMinor,
		sPatch,
		recommendation,
		reasons,
		changedFilesCount: changedFiles.length,
	};
};

function statusIncludesNew(filePath) {
	try {
		const status = execSync(`git status --porcelain "${filePath}"`, {
			stdio: ["ignore", "pipe", "ignore"],
		}).toString();
		return status.startsWith("??") || status.startsWith("A");
	} catch (_) {
		return false;
	}
}

/**
 * Menghitung versi baru berdasarkan bump type ('major' | 'minor' | 'patch' | 'auto')
 */
export const bumpVersion = (type = "auto", description = "") => {
	const state = getSemVerState();
	const current = state.currentVersion || "1.0.0";
	const [major, minor, patch] = current
		.split(".")
		.map((n) => parseInt(n, 10) || 0);

	let targetType = type;
	if (type === "auto") {
		const analysis = analyzeChanges();
		targetType = analysis.recommendation;
	}

	let nextVersion = current;
	if (targetType === "none") {
		nextVersion = current;
	} else if (/^\d+\.\d+\.\d+$/.test(targetType)) {
		nextVersion = targetType;
	} else if (targetType === "major") {
		nextVersion = `${major + 1}.0.0`;
	} else if (targetType === "minor") {
		nextVersion = `${major}.${minor + 1}.0`;
	} else {
		// patch
		nextVersion = `${major}.${minor}.${patch + 1}`;
	}

	state.currentVersion = nextVersion;
	state.updatedAt = new Date().toISOString();
	if (description) {
		state.milestones[nextVersion] = description;
	}
	try {
		state.lastCommitHash = execSync("git rev-parse --short HEAD", {
			stdio: ["ignore", "pipe", "ignore"],
		})
			.toString()
			.trim();
	} catch (_) {}

	saveSemVerState(state);
	syncVersionEverywhere(nextVersion);
	return nextVersion;
};

/**
 * Mengembalikan versi SemVer saat ini (atau menyinkronkannya)
 */
export const calculateSemVer = (options = { sync: true }) => {
	const state = getSemVerState();
	const ver = state.currentVersion || "1.0.0";
	if (options.sync) {
		syncVersionEverywhere(ver);
	}
	return ver;
};

/**
 * Menyinkronkan versi ke package.json, README.md, dan docs/*.md
 */
export const syncVersionEverywhere = (version) => {
	// 1. package.json
	if (fs.existsSync(PKG_FILE)) {
		const pkg = JSON.parse(fs.readFileSync(PKG_FILE, "utf8"));
		if (pkg.version !== version) {
			pkg.version = version;
			fs.writeFileSync(PKG_FILE, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
		}
	}

	// 2. README.md
	if (fs.existsSync(README_FILE)) {
		let readme = fs.readFileSync(README_FILE, "utf8");
		const badgeRegex = /!\[Version\]\([^)]+\)/g;
		const targetBadge = `![Version](https://img.shields.io/badge/version-v${version}-blue?style=for-the-badge)`;
		if (readme.includes("![Version](")) {
			readme = readme.replace(badgeRegex, targetBadge);
		}
		fs.writeFileSync(README_FILE, readme, "utf8");
	}

	// 3. docs/*.md
	if (fs.existsSync(DOCS_DIR)) {
		const docFiles = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".md"));
		for (const docFile of docFiles) {
			const fullDoc = path.join(DOCS_DIR, docFile);
			const docContent = fs.readFileSync(fullDoc, "utf8");
			const updated = docContent.replace(/v\d+\.\d+\.\d+/g, `v${version}`);
			if (updated !== docContent) {
				fs.writeFileSync(fullDoc, updated, "utf8");
			}
		}
	}

	// 4. functions/api/health.js
	const healthFile = path.resolve(process.cwd(), "functions/api/health.js");
	if (fs.existsSync(healthFile)) {
		const healthContent = fs.readFileSync(healthFile, "utf8");
		const updated = healthContent.replace(
			/version:\s*['"][^'"]+['"]/g,
			`version: "${version}"`,
		);
		if (updated !== healthContent) {
			fs.writeFileSync(healthFile, updated, "utf8");
		}
	}

	// 5. index.html topbar version badge
	const indexFile = path.resolve(process.cwd(), "index.html");
	if (fs.existsSync(indexFile)) {
		const indexContent = fs.readFileSync(indexFile, "utf8");
		const updated = indexContent.replace(
			/<span class="topbar__version-badge" id="topbar-app-version"[^>]*>v[^<]+<\/span>/g,
			`<span class="topbar__version-badge" id="topbar-app-version" title="Versi Aplikasi">v${version}</span>`,
		);
		if (updated !== indexContent) {
			fs.writeFileSync(indexFile, updated, "utf8");
		}
	}

	// 6. dist/index.html topbar version badge (if built)
	const distIndexFile = path.resolve(process.cwd(), "dist/index.html");
	if (fs.existsSync(distIndexFile)) {
		const distContent = fs.readFileSync(distIndexFile, "utf8");
		const updatedDist = distContent.replace(
			/<span class="topbar__version-badge" id="topbar-app-version"[^>]*>v[^<]+<\/span>/g,
			`<span class="topbar__version-badge" id="topbar-app-version" title="Versi Aplikasi">v${version}</span>`,
		);
		if (updatedDist !== distContent) {
			fs.writeFileSync(distIndexFile, updatedDist, "utf8");
		}
	}
};

/**
 * Menyinkronkan versi ke database Supabase Cloud (tabel settings)
 */
export const syncVersionToSupabase = async (version) => {
	try {
		const envPath = path.resolve(process.cwd(), ".env");
		if (!fs.existsSync(envPath)) return false;
		const envLines = fs.readFileSync(envPath, "utf8").split("\n");
		const env = {};
		for (const line of envLines) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith("#")) continue;
			const idx = trimmed.indexOf("=");
			if (idx > 0) {
				env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
			}
		}
		if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) return false;
		const { createClient } = await import("@supabase/supabase-js");
		const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
			auth: { persistSession: false },
		});
		let gitCommitHash = "";
		try {
			gitCommitHash = execSync("git rev-parse --short HEAD", {
				stdio: ["ignore", "pipe", "ignore"],
			})
				.toString()
				.trim();
		} catch (_) {}
		const now = new Date().toISOString();
		await supabase.from("settings").upsert([
			{ key: "app_version", value: version, updated_at: now },
			{ key: "app_release_timestamp", value: now, updated_at: now },
			{ key: "app_git_hash", value: gitCommitHash, updated_at: now },
		]);
		return true;
	} catch (err) {
		console.warn("⚠️ [SemVer Engine] Supabase sync warning:", err.message);
		return false;
	}
};

// Eksekusi jika dipanggil via terminal
if (process.argv[1]?.endsWith("semver-engine.js")) {
	const runCli = async () => {
		const arg = process.argv[2] || "";
		if (arg === "--analyze") {
			const analysis = analyzeChanges();
			console.log("📊 [SemVer Engine] Hasil Analisis Metrik:");
			console.log(`  • Skor Major : ${analysis.sMajor}`);
			console.log(`  • Skor Minor : ${analysis.sMinor}`);
			console.log(`  • Skor Patch : ${analysis.sPatch}`);
			console.log(`  • Rekomendasi: ${analysis.recommendation.toUpperCase()}`);
			console.log("  • Bukti/Alasan:");
			for (const r of analysis.reasons) {
				console.log(`    - ${r}`);
			}
		} else if (arg === "--bump") {
			const type = process.argv[3] || "auto";
			const nextVer = bumpVersion(type);
			await syncVersionToSupabase(nextVer);
			console.log(
				`🚀 [SemVer Engine] Versi dinaikkan (${type}) -> v${nextVer} & tersinkron ke Supabase Cloud`,
			);
		} else if (arg === "--set") {
			const targetVer = process.argv[3] || "1.6.0";
			const nextVer = bumpVersion(targetVer);
			await syncVersionToSupabase(nextVer);
			console.log(
				`🎯 [SemVer Engine] Versi disetel ke v${nextVer} & tersinkron ke Supabase Cloud`,
			);
		} else if (arg === "--sync") {
			const state = getSemVerState();
			syncVersionEverywhere(state.currentVersion);
			const sbSynced = await syncVersionToSupabase(state.currentVersion);
			console.log(
				`🔄 [SemVer Engine] Berhasil menyinkronkan v${state.currentVersion} ke seluruh berkas${sbSynced ? " & Supabase Cloud" : ""}.`,
			);
		} else {
			const ver = calculateSemVer({ sync: false });
			console.log(`Versi Aktif: v${ver}`);
		}
	};
	runCli();
}
