# 📋 07 — PRODUCT REQUIREMENTS DOCUMENT (PRD) & STANDAR INDUSTRI ENTERPRISE
**Blue Mountain Refilling Station POS & CRM — World-Class Industrial PRD (v3.0.54)**

Dokumen Kebutuhan Produk (PRD), Analisis Komparasi Industri Global, dan Matriks Verifikasi Realitas antara kode sumber aktual vs standar industri POS modern.

---

## 1. Ringkasan Eksekutif & Visi Produk

| Dimensi | Spesifikasi |
|---|---|
| **Nama Produk** | Blue Mountain POS & CRM Engine |
| **Versi Rilis Aktif** | `v3.0.54` (Continuous Delivery) |
| **Domain Bisnis** | Stasiun Pengisian Air Minum (Refilling Station), Toko Grosir/Retail, & Mini Market |
| **Prinsip Arsitektur** | *Offline-First, Zero-Latency UI, Realtime Multi-Device Sync, Zero-Cost Cloud Infra* |
| **Target Standar Industri** | OWASP ASVS Level 2, PCI-DSS SAQ A (POS Scope), SAK EMKM Akuntansi Indonesia |

---

## 2. Benchmark Komparasi Sistem POS Global

Komparasi komprehensif antara Blue Mountain POS (`v3.0.54`) terhadap sistem POS komersial global (*Square POS, Toast, Loyverse, Odoo POS, ERPNext*):

| Dimensi Kemampuan | Blue Mountain POS (`v3.0.54`) | Square / Toast | Loyverse POS | Odoo POS / ERPNext |
|---|---|---|---|---|
| **Model Biaya Infrastruktur** | **\$0 (100% Free Tier)** via GitHub Pages + Supabase | Berlangganan \$60–\$150/bulan + potongan 2.6% per gesek | Freemium (\$5–\$25/fitur per terminal) | Self-hosted VPS (\$10–\$40/bln) atau Cloud Enterprise |
| **Latensi Operasional** | **0 ms (Native IndexedDB)** | 100–300 ms (Ketergantungan server) | 50–150 ms (Lokal cache SQLite) | 100–400 ms (Python/PostgreSQL) |
| **Ketahanan Jaringan (Offline)** | **100% Operasional**. Data tersimpan aman di Dexie.js & sync otomatis saat online | Terbatas (Offline mode hanya transaksi kartu offline sementara) | Parsial (Bisa transaksi, fitur analitik mati) | Parsial (Dapat input kasir, modul stok & piutang butuh koneksi) |
| **Universal Thermal Print** | **WebBluetooth + WebUSB + Direct Intent Android + OS Spooler (48/58/80mm)** | Khusus printer proprieter resmi pabrikan | Bluetooth & Wi-Fi ESC/POS | ESC/POS via IoT Box atau print server lokal |
| **Dynamic QRIS (EMVCo)** | **Injeksi Tag 54 + CRC16-CCITT client-side native** (Nol komisi pihak ketiga) | Terikat payment gateway internal pabrikan | Integrasi pihak ketiga berbayar | Integrasi API Bank / Midtrans (memerlukan server) |
| **Pelacakan Aset Khusus** | **Pelacakan Aset Galon Fisik & Valuasi Neraca Terpadu** | Tidak ada (Retail generik) | Tidak ada | Butuh kustomisasi modul Asset Management |
| **Portabilitas & Open Standar** | Standar terbuka (Export CSV, PDF resmi, JSON Dump, PWA standard) | Ekosistem tertutup (Walled garden) | Ekosistem semi-tertutup | Standar terbuka |

---

## 3. Matriks Traceability Fitur: Status Realitas Kode Sumber

Audit perbandingan antara kode sumber riil di repositori vs kebutuhan sistem:

### A. Fitur yang Sudah Aktif & Terverifikasi (`SUDAH / LIVE`) ✅
1. **Core POS Checkout (`js/views/pos.js`)**:
   - Grid katalog barang, pencarian reaktif, filter kategori.
   - Keranjang belanja dinamis, pemilihan/pembersihan pelanggan, diskon Rupiah/persen, kalkulasi kembalian.
   - Multi-tender: Tunai, Transfer Bank, Piutang Pelanggan, dan Dinamis QRIS.
2. **Dynamic EMVCo QRIS Generator (`js/utils/qris.js`)**:
   - Parse payload statis, injeksi nominal dinamis Tag 54, rekalkulasi CRC16-CCITT W3C-compliant.
3. **Universal Thermal POS Engine (`js/printer.js`, `js/receipt.js`)**:
   - Dukungan kertas 48mm, 58mm, 80mm dengan auto-wrap karakter presisi.
   - Driver Web Bluetooth GATT, WebUSB bulk transfer, Android Intent (`rawbt:`, `bluetoothprint`), dan dialog cetak OS.
   - Header struk kapital tebal dengan logo 1-bit sinkron anti-blank.
4. **CRM 360° & Pelacakan Galon (`js/views/customers.js`)**:
   - Master pelanggan, segmentasi pelanggan, sub-buku besar piutang.
   - Pelacakan fisik saldo galon pinjaman (saldo di pelanggan vs saldo di toko).
   - Tombol instan penagihan dan sapaan WhatsApp (`wa.me`).
5. **Riwayat Transaksi & Filter Tanggal (`js/views/transactions.js`)**:
   - Filter rentang tanggal fleksibel (Hari ini, 7 hari, 30 hari, kustom).
   - Modal pelunasan piutang bertahap & cetak ulang nota kasir.
6. **Laporan & Buku Besar Arus Kas (`js/views/reports.js`, `js/views/finance.js`)**:
   - Analitik omzet, HPP (COGS), laba kotor, dan laba bersih.
   - Visualisasi tren harian via `Chart.js`.
   - Export PDF Invoice formal (`jsPDF` + `autoTable`) dan export spreadsheet `.csv`.
   - Standar Bagan Akun (COA: 1001 Kas, 1002 Bank, 1101 Piutang, 4001 Pendapatan, 6001-6099 Beban).
7. **Offline-First Storage & Cloud Sync (`js/db.js`, `js/supabase.js`)**:
   - Penyimpanan lokal IndexedDB via `Dexie.js`.
   - Migrasi kunci Supabase ke publishable key `sb_publishable_...`.
   - WebSocket realtime listener untuk sinkronisasi multi-perangkat instan.
8. **Keamanan & Hardening (`docs/05_SECURITY_HARDENING.sql`, `index.html`)**:
   - Content Security Policy (CSP) ketat di HTML.
   - Sanitasi anti-XSS via DOMPurify & HTML escape utilitas.
   - Proteksi kunci root: `sb_secret_...` hanya di `.env` lokal, tidak pernah di-bundle ke client.
   - Skrip CLI automasi cloud admin ([scripts/supabase-admin.js](file:///d:/FR%20PROYEK/KASIR/scripts/supabase-admin.js)).
9. **UI/UX & Aksesibilitas (`css/dock.css`, `css/main.css`)**:
   - macOS Sonoma glassmorphism dock dengan auto-return ke bawah saat klik/tap.
   - Dukungan gesture swipe layar sentuh untuk berpindah halaman pada HP/Tablet.

---

### B. Fitur yang Belum / Sedang Berjalan (`BELUM / IN-PROGRESS`) ⏳
1. **Server-Side Price Validation via Database Trigger**:
   - *Status*: Skrip SQL RLS telah dibuat di `docs/05_SECURITY_HARDENING.sql`, namun trigger kalkulasi otomatis di database Supabase belum di-deploy.
   - *Dampak*: Client masih menghitung subtotal transaksi; verifikasi wajib diperkuat di sisi PostgreSQL.
2. **CORS Origin Lockdown di Dashboard Supabase**:
   - *Status*: Memerlukan konfigurasi whitelist `https://fadhil2026.github.io` langsung di Supabase Settings.

---

### C. Roadmap Fitur Masa Depan (`AKAN DATANG / ROADMAP`) 🚀
1. **Sistem Sesi & Shift Kasir (Cashier Shift & Drawer Balancing)**:
   - Pencatatan modal awal laci (opening float), setoran tunai berkala (cash drops), dan cetak Struk Rekonsiliasi Z-Report saat tutup shift.
2. **Role-Based Access Control (RBAC) & PIN Kasir**:
   - Login cepat via PIN 4/6 digit untuk ganti operator kasir.
   - Restriksi otorisasi supervisor: Kasir tidak bisa melakukan *void* transaksi, hapus item, atau melihat laporan laba bersih toko.
3. **Split-Tender Payment (Pembayaran Terpisah)**:
   - Satu nomor transaksi dapat dibayar dengan kombinasi tunai + QRIS atau transfer + piutang.
4. **Integrasi Cloudflare Zero Trust & Turnstile**:
   - Kunci halaman admin & laporan keuangan menggunakan Cloudflare Access (SSO / OTP).
   - Turnstile anti-bot pada form pembayaran dan otentikasi PIN.
5. **Auto-Backup Cloudflare R2**:
   - Pengiriman otomatis dump JSON database dan arsip struk PNG harian ke bucket Cloudflare R2 (10 GB gratis).

---

## 4. Arsitektur Teknis Kelas Dunia (Standard Industri)

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                    HIGH-CLASS ENTERPRISE PWA CLIENT (0ms)                     │
│                                                                               │
│  [UI Layer: macOS Sonoma Engine + Touch Gestures + Responsive Table Layouts]  │
│                                      │                                        │
│  [State Layer: Reactive Store + Event-Driven View Subscriptions]             │
│                                      │                                        │
│  [Persistence Layer: Dexie.js (IndexedDB) Primary Cache - Offline Guaranteed] │
│                                      │                                        │
│  [Hardware Engine: WebUSB / WebBLE / Intent Thermal POS Driver (ESC/POS)]     │
└──────────────────────────────────────┬────────────────────────────────────────┘
                                       │ HTTPS / WSS Sync
                                       ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                    SECURITY EDGE & CLOUD INFRASTRUCTURE                      │
│                                                                               │
│  [Edge CDN: Cloudflare / GitHub Pages Anycast - Anti-DDoS Layer 3/4/7]        │
│                                      │                                        │
│  [Gateway & RLS: Supabase PostgREST API + Realtime Channels Engine]           │
│                                      │                                        │
│  [ACID Engine: PostgreSQL 15+ with Row Level Security & Database Triggers]    │
│                                      │                                        │
│  [Local Admin Control: scripts/supabase-admin.js via Root Secret CLI]        │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Rencana Verifikasi Kualitas Mutlak (Military QA Standard)

Setiap rilis kode harus lolos protokol 5 lapis berikut sebelum dikirim ke pengguna:
1. **Lapis 1 - Syntax & Static Analysis**: `npm run verify` memvalidasi seluruh berkas JS, konfigurasi Vite, dan integritas DOM.
2. **Lapis 2 - Secret Leakage Prevention**: Git hook dan GitHub Secret Scanning menolak setiap commit yang memuat pola kunci rahasia (`sb_secret_...`).
3. **Lapis 3 - Cross-Device Responsive Layout**: Uji tampilan pada 3 kelas resolusi (Mobile 360-412px, Tablet 768-1024px, Desktop 1280px+).
4. **Lapis 4 - Offline Resilience Test**: Memutuskan jaringan internet di DevTools (`Offline Mode`) dan memastikan kasir tetap dapat memproses 10 transaksi berturut-turut tanpa kehilangan data.
5. **Lapis 5 - Thermal Print Byte Integrity**: Pengujian string biner dan format struk agar karakter tidak terpotong di kertas 48mm maupun 58mm/80mm.
