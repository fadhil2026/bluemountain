/**
 * scripts/verify.js
 * Pre-deployment verification script for Blue Mountain POS
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 [CI/CD Verification] Memulai audit pra-deploy...');

// 0. Auto-sync dynamic SemVer version: [MAJOR].[MINOR].[PATCH] across package.json, README.md, and docs/
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

    // A. Sync package.json
    if (pkgData.version !== nextVer) {
      pkgData.version = nextVer;
      fs.writeFileSync(pkgPath, JSON.stringify(pkgData, null, 2) + '\n', 'utf8');
      console.log(`  ✓ Sinkronisasi SemVer package.json -> v${nextVer}`);
    }

    // B. Sync README.md badge & version text
    const readmePath = './README.md';
    if (fs.existsSync(readmePath)) {
      let readme = fs.readFileSync(readmePath, 'utf8');
      const badgeRegex = /!\[Version\]\([^)]+\)/g;
      const targetBadge = `![Version](https://img.shields.io/badge/version-v${nextVer}-blue?style=for-the-badge)`;
      if (readme.includes('![Version](')) {
        readme = readme.replace(badgeRegex, targetBadge);
      }
      fs.writeFileSync(readmePath, readme, 'utf8');
      console.log(`  ✓ Sinkronisasi Badge Realtime README.md -> v${nextVer}`);
    }

    // C. Sync docs/*.md versions
    const docsDir = './docs';
    if (fs.existsSync(docsDir)) {
      const docFiles = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));
      for (const docFile of docFiles) {
        const fullDoc = path.join(docsDir, docFile);
        let docContent = fs.readFileSync(fullDoc, 'utf8');
        const updated = docContent.replace(/v3\.0\.\d+/g, `v${nextVer}`);
        if (updated !== docContent) {
          fs.writeFileSync(fullDoc, updated, 'utf8');
          console.log(`  ✓ Sinkronisasi versi dokumen ${docFile} -> v${nextVer}`);
        }
      }
    }
  }
} catch (err) {
  console.warn('  ⚠️ Peringatan sinkronisasi versi:', err.message);
}

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
