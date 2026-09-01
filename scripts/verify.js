/**
 * scripts/verify.js
 * Pre-deployment verification script for Blue Mountain POS
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 [CI/CD Verification] Memulai audit pra-deploy...');

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
