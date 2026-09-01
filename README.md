# 💧 Blue Mountain Refilling Station — Hybrid POS System

Sistem Kasir POS canggih dengan tampilan macOS-style yang mengadopsi arsitektur **Offline-First Hybrid Sync**. Dirancang khusus untuk toko air isi ulang dengan kehandalan tanpa henti meski koneksi internet terputus.

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/fadhil2026/kasir/deploy.yml?label=CI%2FCD%20Deploy&style=for-the-badge)
![Version](https://img.shields.io/github/package-json/v/fadhil2026/kasir?style=for-the-badge&color=blue)

## ✨ Fitur Utama

- 🏪 **POS Kasir** — Grid produk, keranjang pintar, perhitungan diskon, kembalian otomatis.
- ☁️ **Hybrid Real-Time Sync** — Transaksi dan stok tersinkronisasi seketika antar-perangkat via WebSocket (Supabase).
- ⚡ **Zero-Downtime Offline Mode** — Kasir tetap beroperasi 100% normal tanpa internet. Sinkronisasi otomatis (auto-recover) saat koneksi pulih (Dexie.js IndexedDB).
- 🖨️ **Bluetooth Thermal Printer** — Cetak struk langsung ke printer 58mm via *Intent* web ke aplikasi lokal.
- 📱 **Progressive Web App (PWA)** — Dapat diinstal layaknya aplikasi native di Android/iOS/Windows.
- 🌙 **macOS Sonoma UI** — Desain premium dengan *glassmorphism*, dark mode, dan animasi *FLIP* dock drag-and-drop.

## 🏗️ Arsitektur Sistem

Aplikasi ini menggunakan pola arsitektur **Offline-First**.
1. **Frontend**: HTML5, Vanilla JavaScript (ESM), CSS Variables.
2. **Local Data Layer**: `Dexie.js` (IndexedDB Wrapper) - Memastikan kecepatan 0ms dan ketersediaan offline.
3. **Cloud Data Layer**: `Supabase` (PostgreSQL) - Menampung _source of truth_ jarak jauh.
4. **Sync Engine**: Modul sinkronisasi 2 arah yang menangani *auto-seed*, *upsert*, dan mendengarkan event *Realtime* via WebSocket.

## 🖨️ Setup Printer Bluetooth

1. Install **Bluetooth Print App** di Android Anda.
2. Buka app $\rightarrow$ Settings $\rightarrow$ Browser/Website Print $\rightarrow$ **Enable**.
3. Pair printer Bluetooth Anda di Pengaturan Android.
4. Pilih printer di Bluetooth Print App.
5. Buka POS ini di Chrome Android.
6. Saat transaksi selesai $\rightarrow$ Klik **Cetak Struk** $\rightarrow$ Struk akan otomatis tercetak.

## 🚀 CI/CD Pipeline & Deployment

Repositori ini ditenagai oleh GitHub Actions untuk Continuous Integration dan Deployment:
1. Setiap kode yang di-*push* ke branch `main` akan divalidasi.
2. Skrip pra-deploy akan melakukan audit sintaks (`npm run verify`).
3. Menghitung versi semantik yang dinamis secara otomatis berdasarkan jumlah Git Revision.
4. Melakukan kompilasi optimasi *production* (`esbuild` drop console, PWA generation).
5. Deployment otomatis 1-klik ke GitHub Pages.

## 📁 Struktur Repositori

```text
KASIR/
├── index.html              # SPA utama (CSP Hardened)
├── receipt-data.html       # Endpoint JSON untuk Bluetooth Print App
├── manifest.webmanifest    # Konfigurasi PWA App
├── .github/workflows/
│   └── deploy.yml          # CI/CD GitHub Actions Pipeline
├── assets/
│   ├── logo.png            # Aset utama logo toko
│   └── icons/              # Aset ikon PWA (192px & 512px)
├── css/
│   ├── main.css            # Token desain, variabel, utilitas
│   ├── dock.css            # macOS dock bar dengan Wave Magnification
│   ├── pos.css             # Layout utama POS & grid produk
│   └── modals.css          # Desain dialog, tabel, toast alert
├── js/
│   ├── app.js              # Bootstrap inisialisasi aplikasi
│   ├── store.js            # State management (Reactive UI Pattern)
│   ├── db.js               # IndexedDB local cache (Dexie.js)
│   ├── supabase.js         # Cloud sync engine & WebSocket listener
│   ├── printer.js          # Integrasi native intent print Bluetooth
│   ├── receipt.js          # Pembuat payload JSON untuk struk
│   ├── views/              # Logika UI per halaman
│   │   ├── pos.js          # Modul kasir utama
│   │   ├── products.js     # Modul master data produk
│   │   ├── transactions.js # Modul riwayat penjualan
│   │   ├── reports.js      # Modul analitik & Chart.js
│   │   ├── finance.js      # Modul pengeluaran & hutang
│   │   ├── settings.js     # Modul konfigurasi sistem
│   │   └── modals.js       # Kontrol pop-up global
│   └── utils/
│       ├── currency.js     # Pemformatan nilai Rupiah
│       ├── date.js         # Pemformatan tanggal lokal Indonesia
│       ├── invoice.js      # Generator nomor resi
│       └── sanitize.js     # Proteksi Anti-XSS
└── scripts/
    └── verify.js           # Skrip audit CI/CD Quality Gate
```

## 🔒 Keamanan & Hardening

- **Anti-XSS**: Meta tag *Content-Security-Policy* ketat diaktifkan dan pembersihan input ganda via `sanitize.js`.
- **Production Stripping**: Konfigurasi Vite secara paksa menghapus semua _console logs_ dan _debugger_ saat _build_ demi efisiensi dan keamanan.
- **Fail-Safe Offline**: Jika API Cloud terputus, sistem _silent-fail_ ke IndexedDB lokal tanpa membekukan antarmuka pengguna (UI).

---
*Blue Mountain Refilling Station POS — Engineered with Vanilla JS, Dexie.js & Supabase*
