# 💧 Blue Mountain Refilling Station — Personal & Proprietary POS System (v1.0.0)

> ⚠️ **DOKUMEN OPERASIONAL PRIBADI (INTERNAL & CONFIDENTIAL)**  
> Repositori ini adalah sistem kasir Point of Sale (POS) & CRM **khusus pemakaian personal / internal** bisnis **Blue Mountain Refilling Station** (Owner: Fadhil / FR Proyek).  
> **DILARANG KERAS** mendistribusikan, mempublikasikan ulang, atau menggunakan repositori ini untuk kepentingan pihak ketiga tanpa izin pemilik. Seluruh data transaksi, pelanggan, piutang, dan aset galon terisolasi secara privat.

---

## 📌 Ringkasan Sistem & Status Rilis

- **Versi Rilis**: `v1.0.0` (Production Clean State)
- **Arsitektur**: **Online-First** (Cloud Supabase Master of Truth + Cloudflare Pages Edge Functions + Dexie.js Local Cache 0ms)
- **Akses Produksi**: `https://bluemountain-pos.pages.dev`
- **Database Cloud**: Supabase PostgreSQL (`wiapnhpdgjbtkblowfig.supabase.co`)
- **Tingkat Akses**: Multi-Operator Internal (`owner`, `supervisor`, `cashier`) dengan PIN Brute-Force Guard (5 percobaan $\rightarrow$ Lockout 60 detik)

---

## 📖 Buku Panduan Operasional Kasir Personal (SOP Harian)

### 1. 🌅 Buka Toko & Awal Shift
1. Buka aplikasi di tablet/HP kasir atau browser via alamat produksi `https://bluemountain-pos.pages.dev`.
2. Klik tombol **Ganti Kasir / Login** di dock navigasi.
3. Masukkan **PIN 6-digit** operator kasir yang bertugas.
4. Pastikan indikator Cloud Sync di pojok kanan atas berstatus **🟢 Online (Connected)**.
5. Periksa ketersediaan kertas roll pada printer thermal (58mm/80mm).

### 2. 🛒 Pelaksanaan Transaksi POS
- **Pilih Produk**: Ketuk katalog produk di layar atau gunakan kotak pencarian cepat (SKU/Nama).
- **Pilih Pelanggan**:
  - Transaksi non-langganan: Biarkan default (*Pelanggan Umum*).
  - Transaksi langganan/pinjam galon: Pilih nama pelanggan dari dropdown atau ketuk **+ Pelanggan Baru**.
- **Metode Pembayaran**:
  1. **Tunai**: Masukkan nominal uang yang diterima $\rightarrow$ sistem otomatis menghitung kembalian pas.
  2. **QRIS Dinamis (EMVCo)**: Layar menampilkan QRIS dinamis dengan nominal tagihan tepat tanpa biaya gateway $\rightarrow$ Pelanggan scan via BCA/GoPay/OVO/ShopeePay $\rightarrow$ Verifikasi notifikasi masuk $\rightarrow$ Konfirmasi bayar.
  3. **Transfer Bank**: Nomor rekening BCA otomatis tertera pada struk.
  4. **Piutang / Kasbon**: Khusus pelanggan terdaftar dengan limit kredit aktif.
- **Peminjaman Galon**: Jika pelanggan membawa pulang galon fisik toko tanpa tukar galon kosong, centang opsi penambahan pinjaman galon pada profil pelanggan.

### 3. 🖨️ Cetak Struk Thermal
1. Klik tombol **Cetak Struk** setelah transaksi selesai.
2. Sistem otomatis mengalirkan payload binary ESC/POS ke:
   - **Bluetooth**: Hubungkan via Web Bluetooth Chrome atau Bluetooth Print Android App.
   - **USB**: Terhubung langsung ke kabel OTG/USB thermal printer via WebUSB.
   - **Direct Print / OS Spooler**: Menggunakan jendela print sistem dengan margin 0mm.
3. Struk memuat logo resmi toko, rincian produk, nomor invoice, dan sisa saldo galon pelanggan.

### 4. 🌙 Tutup Shift & Rekonsiliasi Kas
1. Buka modul **Riwayat Transaksi** dan filter tanggal ke **Hari Ini**.
2. Cocokkan total uang fisik di laci kasir dengan total pembayaran **Tunai** di aplikasi.
3. Buka modul **Laporan & Keuangan** untuk meninjau omzet kotor, pengeluaran harian, dan laba bersih.
4. Klik **Backup JSON** di menu Pengaturan dan simpan salinan cadangan ke Google Drive / Cloud personal.
5. Logout kasir untuk mengunci terminal sebelum meninggalkan toko.

---

## ⚙️ Panduan Setup Hardware Thermal Printer Personal

### Printer Bluetooth Portable 58mm (Android/Mobile)
1. Aktifkan Bluetooth pada perangkat Android/Tablet kasir.
2. Lakukan *Pairing* dengan perangkat printer (PIN default umum: `0000` atau `1234`).
3. Pasang aplikasi pendukung **Bluetooth Print** atau **RawBT** dari Google Play Store (jika tidak memakai direct WebBLE).
4. Di aplikasi POS: Masuk menu **Pengaturan** $\rightarrow$ pilih ukuran kertas **58 mm** $\rightarrow$ klik **Test Print**.

### Printer Desktop USB 80mm (Kasir PC / Laptop)
1. Sambungkan kabel USB printer ke port komputer kasir.
2. Di aplikasi POS: Pilih ukuran kertas **80 mm**.
3. Saat dialog cetak browser muncul, pilih nama printer USB Anda dan setel margin ke **None / Minimum**.

---

## 🛡️ Arsitektur Keamanan & Zero-Tamper

```
┌────────────────────────────────────────────────────────────────────────┐
│               TERMINAL KASIR (PWA / BROWSER / HP)                       │
│                                                                        │
│  [UI Layer: Glassmorphism Blue Mountain, Touch Gesture, Smooth Dock]   │
│                                   │                                    │
│  [Local Speed Cache: Dexie.js IndexedDB v4 (0ms Read & Local Outbox)]  │
│                                   │                                    │
│  [Hardware Engine: ESC/POS WebBLE, WebUSB, OS Spooler 58mm/80mm]       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS / WSS
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   CLOUDFLARE PAGES EDGE FUNCTIONS                      │
│                                                                        │
│  • /api/auth/login        : Proteksi Brute-force & Verifikasi PIN      │
│  • /api/stock/decrement   : Validasi Stok & Eksekusi Atomik Server     │
│  • /api/health            : Monitoring Kesiapan Edge Network           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ PostgREST / RPC
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  SUPABASE CLOUD POSTGRESQL (TRUTH)                     │
│                                                                        │
│  • Single Source of Truth (Database Master)                            │
│  • RLS Policy Enforced (Owner, Supervisor, Cashier)                    │
│  • Atomic Stored Procedure: atomic_checkout_transaction               │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Anti DevTools Tampering**: Penurunan stok dan verifikasi PIN diawasi oleh server Edge & database Supabase. Manipulasi variabel di memori browser tidak dapat merusak saldo stok atau memalsukan otentikasi.
2. **Brute-Force Guard**: Salah memasukkan PIN sebanyak 5 kali berturut-turut akan memicu *lockout* terminal selama 60 detik secara otomatis.
3. **Database Concurrency Safe**: Menggunakan PostgreSQL transaction level dengan stored procedure `atomic_checkout_transaction` untuk mencegah *race condition* stok saat dua perangkat kasir memproses transaksi bersamaan.
4. **Zero Plaintext Secrets**: Seluruh kredensial sensitif diamankan menggunakan Web Crypto API (Salted SHA-256) dan Environment Variables.

---

## 🗂️ Indeks Dokumentasi Internal Proyek (`docs/`)

Seluruh dokumen teknis lengkap, blueprint, standar akuntansi, dan skrip migrasi tersimpan di direktori `docs/`:

| Dokumen | Deskripsi & Fungsi |
|---|---|
| 📄 [`docs/00_CLEAN_RESET_MIGRATION_V1.sql`](docs/00_CLEAN_RESET_MIGRATION_V1.sql) | Skrip migrasi DDL v1.0.0, pembersihan data, skema tabel, dan fungsi atomik checkout |
| 📄 [`docs/01_SYSTEM_BLUEPRINT.md`](docs/01_SYSTEM_BLUEPRINT.md) | Cetak biru arsitektur Online-First, Cloudflare Pages Edge Functions, & Dexie Cache |
| 📄 [`docs/02_ACCOUNTING_LOGIC.md`](docs/02_ACCOUNTING_LOGIC.md) | Logika akuntansi double-entry, Bagan Akun (COA), arus kas, dan valuasi aset galon |
| 📄 [`docs/03_MILITARY_VERIFICATION.md`](docs/03_MILITARY_VERIFICATION.md) | Protokol verifikasi 14 aturan mutlak pra-deploy & Quality Assurance Gate |
| 📄 [`docs/04_BUSINESS_TIMELINE.md`](docs/04_BUSINESS_TIMELINE.md) | Roadmap bisnis internal Blue Mountain, evaluasi margin, & strategi ekspansi |
| 📄 [`docs/05_SECURITY_HARDENING.sql`](docs/05_SECURITY_HARDENING.sql) | Kebijakan Row Level Security (RLS) PostgreSQL & sanitasi database |
| 📄 [`docs/06_ENTERPRISE_ARCHITECTURE_AND_ECOSYSTEM.md`](docs/06_ENTERPRISE_ARCHITECTURE_AND_ECOSYSTEM.md) | Rincian arsitektur Cloudflare, integrasi Git CI/CD, dan benchmark industri |
| 📄 [`docs/07_PRODUCT_REQUIREMENTS_DOCUMENT.md`](docs/07_PRODUCT_REQUIREMENTS_DOCUMENT.md) | PRD v1.0.0, spesifikasi fungsionalitas, Non-Functional Requirements, & matriks pengujian |
| 📄 [`docs/08_USERS_MANAGEMENT_SCHEMA.sql`](docs/08_USERS_MANAGEMENT_SCHEMA.sql) | Skema tabel operator kasir `app_users` & otentikasi role-based |
| 📄 [`docs/09_MASTER_TENANT_ISOLATION.sql`](docs/09_MASTER_TENANT_ISOLATION.sql) | Kebijakan isolasi multi-tenant database untuk proteksi data independen |

---

## 💻 Panduan Pengembang & Maintenance Mandiri

### Menjalankan Server Lokal (Development)
```bash
# Masuk ke direktori
cd "d:\FR PROYEK\KASIR"

# Jalankan Vite local dev server
npm run dev
```

### Menjalankan Audit Kualitas & Uji Sintaks
```bash
# Menjalankan 11 suite pengujian otomatis pra-rilis
npm run verify
```

### Melakukan Build Produksi
```bash
# Melakukan kompilasi bundle teroptimasi (Vite)
npm run build
```

### Melakukan Deploy ke Cloudflare Pages
```bash
# Deploy langsung dari terminal lokal via Wrangler
npm run deploy:cf
```

---

## 📞 Kontak & Dukungan Internal
Untuk keperluan maintenance atau kendala sistem, hubungi internal administrator:
- **Project**: Blue Mountain POS Engine (FR Proyek)
- **Email / GitHub**: [@fadhil2026](https://github.com/fadhil2026)
- **Status Lisensi**: Proprietary & Private Business Software. All Rights Reserved.
