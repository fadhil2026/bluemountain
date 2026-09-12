/**
 * scripts/verify.js
 * Pre-deployment verification script for Blue Mountain POS
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { calculateSemVer } from "./semver-engine.js";

console.log("🔍 [CI/CD Verification] Memulai audit pra-deploy...");

// 0. Auto-sync dynamic SemVer version: [MAJOR].[MINOR].[PATCH] across package.json, README.md, and docs/
try {
	const currentVer = calculateSemVer({ sync: true });
	console.log(`  ✓ Sinkronisasi SemVer aktif -> v${currentVer}`);
} catch (err) {
	console.warn("  ⚠️ Peringatan sinkronisasi versi:", err.message);
}

// 1. Scan and verify syntax for all JavaScript files
const getJsFiles = (dir) => {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		const fullPath = path.join(dir, file);
		const stat = fs.statSync(fullPath);
		if (stat?.isDirectory()) {
			if (file !== "node_modules" && file !== "dist" && file !== ".git") {
				results = results.concat(getJsFiles(fullPath));
			}
		} else if (file.endsWith(".js") || file.endsWith(".mjs")) {
			results.push(fullPath);
		}
	});
	return results;
};

const jsFiles = [
	...getJsFiles("./js"),
	...getJsFiles("./scripts"),
	"./vite.config.js",
];
let hasError = false;

for (const file of jsFiles) {
	try {
		execSync(`node --check "${file}"`, { stdio: "pipe" });
		console.log(`  ✓ Sintaks JS valid: ${file}`);
	} catch (err) {
		console.error(`  ❌ Error sintaks pada file: ${file}`);
		console.error(err.stderr ? err.stderr.toString() : err.message);
		hasError = true;
	}
}

if (hasError) {
	console.error(
		"\n🚨 [Gagal] Ditemukan kesalahan sintaks pada kode sumber. Pembatalan build.",
	);
	process.exit(1);
}

// 2. Validate index.html exists
if (!fs.existsSync("./index.html")) {
	console.error("❌ File index.html tidak ditemukan!");
	process.exit(1);
}
console.log("  ✓ File index.html terverifikasi");

// 3. Run E2E Business Logic, Cryptography, Math & Accounting Audit
try {
	execSync("node scripts/audit-e2e.js", { stdio: "inherit" });
	console.log(
		"  ✓ Audit logika bisnis, kripto, matematika & akuntansi lolos 100%",
	);
} catch (_err) {
	console.error("\n🚨 [Gagal] Audit logika bisnis / matematika gagal.");
	process.exit(1);
}

console.log(
	"\n✅ [Sukses] Semua verifikasi dan audit lolos tanpa bug/error sintaks/matematika.\n",
);
