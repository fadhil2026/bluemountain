# ⚡ AGENT MANDATORY SKILLS & EXECUTION RULES

Setiap kali asisten AI / Agent beroperasi di repositori ini, WAJIB secara aktif mengaktifkan dan mematuhi skill-skill inti berikut:

## 1. Daftar Skill Wajib Aktif
- `prd-blueprint-architect`: Validasi spesifikasi, alur data, ERD, dan kontrak API sebelum implementasi besar.
- `vibe-coding-engineer`: Menulis kode langsung mature, idiomatic, clean code, modular, dan YAGNI.
- `ui-ux-design-system`: Visual premium, modern dark/light mode, glassmorphism, micro-animations, no ugly default colors.
- `anti-hallucination-verifier`: Dilarang mengimpor library khayalan. Semua library wajib ada di `package.json`.
- `production-code-enforcer`: Dilarang meninggalkan `TODO`, `mock`, `dummy`, atau fungsi kosong. Wajib kode siap produksi.
- `bug-hunter-debugger`: Analisis root-cause forensik jika terjadi error; dilarang menutup error dengan silent catch.
- `semgrep-code-audit`: Audit keamanan SAST terhadap celah OWASP & injeksi data.
- `gitleaks-secret-scanner`: Dilarang keras menaruh API key, password, token, atau secret ke dalam commit/file.
- `pre-commit-qa-gate`: Jalankan verifikasi (linting, build test) sebelum tugas dinyatakan selesai.

## 2. Larangan Keras (Strict Prohibitions)
1. ❌ Dilarang membuat fungsi stub bertuliskan `// TODO: Implement later`.
2. ❌ Dilarang membungkus error dengan `try {} catch (e) {}` kosong.
3. ❌ Dilarang menggunakan dependency fiktif.
4. ❌ Dilarang membuat UI polos tanpa estetika modern.
