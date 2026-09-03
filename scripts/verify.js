/**
 * scripts/verify.js
 * Pre-deployment verification script for Blue Mountain POS
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 [CI/CD Verification] Memulai audit pra-deploy...');

// 0. Auto-sync dynamic package.json SemVer version: [MAJOR].[MINOR].[PATCH]
// - MAJOR: Perubahan Arsitektur Utama / Fase Enterprise (e.g. 3)
// - MINOR: Modul Fitur Sedang (e.g. 0)
// - PATCH: Revisi Ringan & Bugfix (auto-sync dengan Git revision)
try {
  const gitCount = execSync('git rev-list --count HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  const statusOut = execSync('git status --porcelain', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  const isDirty = statusOut.length > 0;
  if (gitCount && gitCount !== '0') {
    const pkgPath = './package.json';
    const pkgData = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const parts = (pkgData.version || '3.0.0').split('.');
    const major = parts[0] || '3'; // Major (Arsitektur)
    const minor = parts[1] || '0'; // Minor (Fitur Sedang)
    const patch = Number(gitCount) + (isDirty ? 1 : 0); // Patch (Revisi Ringan)
    const nextVer = `${major}.${minor}.${patch}`;
    if (pkgData.version !== nextVer) {
      pkgData.version = nextVer;
      fs.writeFileSync(pkgPath, JSON.stringify(pkgData, null, 2) + '\n', 'utf8');
      console.log(`  ✓ Sinkronisasi SemVer Baku (Major.Minor.Patch) -> v${nextVer} (Major: ${major}, Minor: ${minor}, Patch: ${patch})`);
    }
  }
} catch (_) {}

// 1. Scan and verify syntax for all JavaScript files
const getJsFiles = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        results = results.concat(getJsFiles(fullPath));
      }
    } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
      results.push(fullPath);
    }
  });
  return results;
};

const jsFiles = [...getJsFiles('./js'), './vite.config.js'];
let hasError = false;

for (const file of jsFiles) {
  try {
    execSync(`node --check "${file}"`, { stdio: 'pipe' });
    console.log(`  ✓ Sintaks JS valid: ${file}`);
  } catch (err) {
    console.error(`  ❌ Error sintaks pada file: ${file}`);
    console.error(err.stderr ? err.stderr.toString() : err.message);
    hasError = true;
  }
}

if (hasError) {
  console.error('\n🚨 [Gagal] Ditemukan kesalahan sintaks pada kode sumber. Pembatalan build.');
  process.exit(1);
}

// 2. Validate index.html exists
if (!fs.existsSync('./index.html')) {
  console.error('❌ File index.html tidak ditemukan!');
  process.exit(1);
}
console.log('  ✓ File index.html terverifikasi');

console.log('\n✅ [Sukses] Semua verifikasi awal lolos tanpa bug/error sintaks.\n');
