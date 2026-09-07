# 💧 Blue Mountain Refilling Station — Hybrid POS System

Sistem Kasir POS canggih dengan tampilan macOS-style yang mengadopsi arsitektur **Offline-First Hybrid Sync**. Dirancang khusus untuk toko air isi ulang dengan kehandalan tanpa henti meski koneksi internet terputus.

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/fadhil2026/bluemountain/deploy.yml?label=CI%2FCD%20Deploy&style=for-the-badge)
![Version](https://img.shields.io/badge/version-v3.1.57-blue?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-fadhil2026.github.io%2Fbluemountain-brightgreen?style=for-the-badge)](https://fadhil2026.github.io/bluemountain/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-bluemountain--pos--c2k.pages.dev-orange?style=for-the-badge&logo=cloudflare)](https://bluemountain-pos-c2k.pages.dev/)

## ✨ Fitur Utama

- 🏪 **POS Kasir** — Grid produk, keranjang pintar, pemilih & quick-add pelanggan, perhitungan diskon, kembalian otomatis.
- 👥 **Customer CRM 360°** — Manajemen data pelanggan, segmentasi, limit kredit, sub-buku besar piutang, pelacakan aset galon pinjaman fisik, sapaan & tagihan WhatsApp 1-klik.
- 🔐 **Multi-Operator RBAC & Fast PIN Login** — Peran terisolasi (`owner`, `supervisor`, `cashier`), modal login numpad interaktif dengan 6-titik masking PIN anti-intip, dan enkripsi Web Crypto API (Salted SHA-256) zero-plaintext.
- 💳 **Dynamic QRIS (EMVCo)** — Injeksi nominal dinamis Tag 54 dan rekalkulasi checksum CRC16-CCITT otomatis tanpa pihak ketiga.
- ☁️ **Hybrid Real-Time Sync** — Transaksi, pelanggan, dan stok tersinkronisasi seketika antar-perangkat via WebSocket (Supabase).
- ⚡ **Zero-Downtime Offline Mode** — Kasir tetap beroperasi 100% normal tanpa internet. Sinkronisasi otomatis (auto-recover) saat koneksi pulih (Dexie.js IndexedDB v4).
- 🖨️ **Universal Thermal Printer** — Cetak struk langsung ke printer 48mm/58mm/80mm via Web Bluetooth, WebUSB, Intent Android (`rawbt:`, `bluetoothprint`), dan Direct OS Spooler dengan logo Base64 synchronous 1-bit.
- 📊 **Laporan & Portabilitas Data** — Grafik penjualan analitik, arus kas, valuasi aset galon, export PDF invoice resmi & export spreadsheet Excel (.csv).
- 📱 **Progressive Web App (PWA)** — Dapat diinstal layaknya aplikasi native di Android/iOS/Windows dengan Service Worker offline cache.
- 🌙 **macOS Sonoma UI** — Desain premium dengan *glassmorphism*, dark mode, responsive mobile/tablet, dan animasi *FLIP* dock drag-and-drop.

## 🏗️ Arsitektur Sistem

Aplikasi ini menggunakan pola arsitektur **Offline-First**.
1. **Frontend**: HTML5, Vanilla JavaScript (ES Modules), CSS Variables & Native Layouts.
2. **Local Data Layer**: `Dexie.js` (IndexedDB Wrapper v4) - Memastikan kecepatan 0ms dan ketersediaan offline penuh.
3. **Cloud Data Layer**: `Supabase` (PostgreSQL) - Menampung _source of truth_ jarak jauh.
4. **Sync Engine**: Modul sinkronisasi 2 arah yang menangani *auto-seed*, *upsert*, dan mendengarkan event *Realtime* via WebSocket.
5. **Edge Network**: `Cloudflare Pages` - Global Anycast CDN, zero-cost edge distribution, dan perlindungan Anti-DDoS.

## 🖨️ Setup Printer Bluetooth

1. Install **Bluetooth Print App** di Android Anda.
2. Buka app $\rightarrow$ Settings $\rightarrow$ Browser/Website Print $\rightarrow$ **Enable**.
3. Pair printer Bluetooth Anda di Pengaturan Android.
4. Pilih printer di Bluetooth Print App.
5. Buka POS ini di Chrome Android.
6. Saat transaksi selesai $\rightarrow$ Klik **Cetak Struk** $\rightarrow$ Struk akan otomatis tercetak.

## 🚀 CI/CD Pipeline & Deployment

Repositori ini ditenagai oleh GitHub Actions dan Cloudflare Wrangler:
1. Setiap kode yang di-*push* ke branch `main` akan divalidasi.
2. Skrip pra-deploy akan melakukan audit sintaks (`npm run verify`).
3. Menghitung versi semantik yang dinamis secara otomatis berdasarkan jumlah Git Revision.
4. Melakukan kompilasi optimasi *production* (`esbuild` drop console, PWA generation).
5. Deployment otomatis 1-klik ke GitHub Pages & Cloudflare Pages (`npm run deploy:cf`).

## 📁 Struktur Repositori

```text
KASIR/
├── index.html              # SPA utama (CSP Hardened & Multi-Modal Numpad)
├── receipt-data.html       # Endpoint JSON untuk Bluetooth Print App
├── manifest.json           # Konfigurasi PWA App
├── wrangler.toml           # Konfigurasi Deployment Cloudflare Pages
├── .github/workflows/
│   └── deploy.yml          # CI/CD GitHub Actions Pipeline
├── assets/
│   ├── logo.png            # Aset utama logo toko
│   └── icons/              # Aset ikon PWA (192px & 512px)
├── css/
│   ├── main.css            # Token desain, variabel, utilitas
│   ├── dock.css            # macOS dock bar dengan Wave Magnification
│   ├── pos.css             # Layout utama POS & grid produk
│   └── modals.css          # Desain dialog, tabel, toast alert, responsif mobile & numpad PIN
├── js/
│   ├── app.js              # Bootstrap inisialisasi aplikasi & Navigation Guard
│   ├── store.js            # State management (Reactive UI Pattern & RBAC Permissions)
│   ├── db.js               # IndexedDB local cache v4 (Dexie.js)
│   ├── supabase.js         # Cloud sync engine & WebSocket listener
│   ├── printer.js          # Universal Thermal POS Engine (48mm/58mm/80mm, WebBLE, WebUSB, RawBT)
│   ├── receipt.js          # Pembuat payload JSON & ESC/POS untuk struk
│   ├── views/              # Logika UI per modul/halaman
│   │   ├── pos.js          # Modul kasir utama
│   │   ├── products.js     # Modul master data produk & upload foto/SKU
│   │   ├── customers.js    # Modul CRM 360°, piutang, pelacakan galon pinjaman, WA direct
│   │   ├── transactions.js # Modul riwayat penjualan & filter tanggal range + pagination
│   │   ├── reports.js      # Modul analitik omzet/laba & Chart.js
│   │   ├── finance.js      # Modul buku besar COA, arus kas, & valuasi aset fisik
│   │   ├── users.js        # Modul manajemen akun & staf (Role Owner only)
│   │   ├── settings.js     # Modul konfigurasi sistem, backup/restore, cloud sync, & test print
│   │   └── modals.js       # Kontrol dialog modal global, PIN numpad, & multi-protocol print
│   └── utils/
│       ├── crypto.js       # Kriptografi Web Crypto API Salted SHA-256 zero-plaintext
│       ├── currency.js     # Pemformatan nilai Rupiah
│       ├── date.js         # Pemformatan tanggal lokal Indonesia
│       ├── export.js       # Generator export spreadsheet CSV / Excel & format tabel
│       ├── image.js        # Kompresi gambar client-side WebP/JPEG & SKU generator
│       ├── invoice.js      # Generator nomor resi transaksi
│       ├── logo-thermal.js # Synchronous 1-bit embedded thermal logo Base64
│       ├── qris.js         # Generator EMVCo Dynamic QRIS (TLV Tag 54 + CRC16-CCITT)
│       └── sanitize.js     # Proteksi Anti-XSS (HTML escape)
├── docs/
│   ├── 01_SYSTEM_BLUEPRINT.md       # Cetak biru arsitektur sistem & state management
│   ├── 02_ACCOUNTING_LOGIC.md       # Logika matematika, akuntansi double-entry, & saldo kas
│   ├── 03_MILITARY_VERIFICATION.md  # Protokol QA gate & 14 aturan mutlak pra-deploy
│   ├── 04_BUSINESS_TIMELINE.md      # Roadmap strategi bisnis, benchmark open-source, & gap
│   ├── 05_SECURITY_HARDENING.sql    # Skrip PostgreSQL Row Level Security (RLS) & sanitasi
│   ├── 06_ENTERPRISE_ARCHITECTURE_AND_ECOSYSTEM.md # Arsitektur enterprise, Cloudflare, & repo benchmark
│   ├── 07_PRODUCT_REQUIREMENTS_DOCUMENT.md         # PRD standar industri, traceability matrix, & audit status
│   └── 08_USERS_MANAGEMENT_SCHEMA.sql              # Skema tabel app_users & RLS policies
├── scripts/
│   ├── verify.js                    # Skrip audit CI/CD Quality Gate & sinkronisasi versi otomatis
│   └── supabase-admin.js            # CLI automasi manajemen database Supabase lokal (Secret Key)
├── .env.example                     # Template variabel lingkungan aman
```

## 📚 Dokumentasi Standar Sistem

Seluruh protokol teknis dan acuan baku tersimpan di folder `docs/`:
- 📐 [01 — System Architecture & Technical Blueprint](docs/01_SYSTEM_BLUEPRINT.md)
- 💰 [02 — Logika Matematika, Keuangan & Akuntansi](docs/02_ACCOUNTING_LOGIC.md)
- 🛡️ [03 — Protokol Verifikasi Militer & QA Gate](docs/03_MILITARY_VERIFICATION.md)
- 📈 [04 — Roadmap Bisnis & Timeline Evolusi Fitur](docs/04_BUSINESS_TIMELINE.md)
- 🔒 [05 — PostgreSQL Security & RLS Hardening](docs/05_SECURITY_HARDENING.sql)
- ☁️ [06 — Enterprise Architecture & Cloudflare Integration](docs/06_ENTERPRISE_ARCHITECTURE_AND_ECOSYSTEM.md)
- 📋 [07 — Product Requirements Document (PRD) & Industry Standards](docs/07_PRODUCT_REQUIREMENTS_DOCUMENT.md)
- 👥 [08 — Users Management & RBAC Schema](docs/08_USERS_MANAGEMENT_SCHEMA.sql)

## 🖨️ Arsitektur Universal Thermal Printing

Sistem mendukung semua standar printer thermal kasir (open-source & zero-driver dependency):

1. **Format Kertas Roll**:
   - **48 mm** (30 karakter/baris): EDC POS & printer mobile mini.
   - **58 mm** (32 karakter/baris): Standar POS Bluetooth portable.
   - **80 mm** (48 karakter/baris): Desktop POS / printer thermal kasir besar & resto.
2. **Koneksi Multi-Protokol**:
   - **Universal Direct Print**: Driver OS (Windows/macOS/Linux/Android/iOS) via CSS `@page` zero-margin.
   - **Web Bluetooth (BLE)**: Komunikasi binary ESC/POS langsung dari browser Chrome/Edge tanpa aplikasi pihak ketiga.
   - **WebUSB**: Komunikasi binary ESC/POS kabel USB / konverter OTG berkecepatan tinggi.
   - **Android Intent**: Integrasi background protocol `rawbt:` dan `my.bluetoothprint.scheme://`.

## 🔒 Keamanan & Hardening

- **Zero-Plaintext Storage**: Password/PIN tidak pernah disimpan plaintext; selalu diamankan dengan Web Crypto Salted SHA-256 + 16-byte random salt.
- **Role-Based Access Control**: Pembatasan ketat modul sensitif berdasarkan hierarki peran (`owner`, `supervisor`, `cashier`).
- **Anti-XSS**: Meta tag *Content-Security-Policy* ketat diaktifkan dan pembersihan input ganda via `sanitize.js`.
- **Production Stripping**: Konfigurasi Vite secara paksa menghapus semua _console logs_ dan _debugger_ saat _build_ demi efisiensi dan keamanan.
- **Fail-Safe Offline**: Jika API Cloud terputus, sistem _silent-fail_ ke IndexedDB lokal tanpa membekukan antarmuka pengguna (UI).

---
*Blue Mountain Refilling Station POS — Engineered with Vanilla JS, Dexie.js & Supabase*
