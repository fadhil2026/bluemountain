# 📐 01 — MASTER BLUEPRINT: ARSITEKTUR POS & CRM ENTERPRISE 2026
**Blue Mountain Refilling Station POS & CRM — High-End Industrial Architecture (v3.1.56)**

---

## 1. Arsitektur Tingkat Tinggi (High-End Hybrid Offline-First)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│               ENTERPRISE POINT OF SALE & RETAIL ENGINE (PWA)                     │
│                                                                                  │
│  ┌──────────────┐     ┌──────────────┐     ┌───────────────────────────────────┐ │
│  │   8 Views    │ <-> │ Reactive     │ <-> │ Dexie.js (IndexedDB v4)           │ │
│  │ Seragam & Res│     │ Store Event  │     │ Local Cache (0ms Offline-First)   │ │
│  └──────────────┘     └──────────────┘     └───────────────────────────────────┘ │
│         │                                                   │                    │
│         ├────────────────────────┬──────────────────────────┤                    │
│         ▼                        ▼                          ▼                    │
│  ┌──────────────┐      ┌──────────────────┐      ┌─────────────────────────────┐ │
│  │ Universal    │      │ EMVCo Dynamic    │      │ Cloud Sync & Auth Engine    │ │
│  │ Thermal POS  │      │ QRIS Generator   │      │ (2-Way Supabase WebSocket & │ │
│  │ (WebUSB/BLE) │      │ (CRC16 TLV)      │      │ Web Crypto Salted SHA-256)  │ │
│  └──────────────┘      └──────────────────┘      └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┬────────────────┘
                                                                  │ HTTPS / WSS
                                                                  ▼
                                                      ┌────────────────────────────┐
                                                      │ Network Edge: Cloudflare   │
                                                      │ Pages (bluemountain-pos-   │
                                                      │ c2k.pages.dev) Anti-DDoS   │
                                                      └─────────────┬──────────────┘
                                                                    │
                                                                    ▼
                                                      ┌────────────────────────────┐
                                                      │ Supabase PostgreSQL Cloud  │
                                                      │ (Row Level Security & RLS) │
                                                      │ Admin CLI: scripts/admin   │
                                                      └────────────────────────────┘
```

---

## 2. 8 Modul Tampilan Inti & Mesin Utilitas

1. **Kasir Point of Sale (`pos.js`)**:
   - Multi-tender payment (Tunai, Transfer Bank, Piutang/Hutang, Dinamis QRIS).
   - Pemilihan & pembersihan pelanggan transaksi reaktif.
   - Quick-add customer & kalkulasi diskon/pajak presisi integer Rupiah.
2. **Master Produk & Inventaris (`products.js`)**:
   - Auto SKU generator (`BM-001`, `BM-002`).
   - Client-side Canvas WebP photo compression (128px, ~4KB) & emoji fallback.
   - Manajemen stok minimum, harga modal (cost price), harga jual, & kategori produk.
3. **Manajemen Pelanggan & CRM 360° (`customers.js`)**:
   - Profil pelanggan, segmentasi (*Rumah Tangga, Kantor, Reseller, VIP*).
   - Sub-buku besar piutang pelanggan (*Accounts Receivable Sub-Ledger*).
   - Pelacakan saldo aset galon fisik pinjaman (*Loaned Container Tracking*).
   - Tombol instan WhatsApp pesan tagihan/sapaan (`wa.me`).
   - Tata letak responsif adaptif resolusi HP/Tablet/Desktop dengan tabel scroll horizontal & paginasi permanen.
4. **Riwayat & Detail Transaksi (`transactions.js`)**:
   - Filter rentang tanggal fleksibel (Hari ini, 7 hari, 30 hari, kustom).
   - Paginasi permanen & pencarian transaksi.
   - Modal pelunasan piutang bertahap & cetak ulang struk thermal.
5. **Laporan Analitik & Portabilitas Data (`reports.js`)**:
   - Ringkasan omzet kotor, HPP (COGS), laba kotor, dan laba bersih.
   - Grafik penjualan harian/bulanan & jam sibuk kasir.
   - Export Laporan PDF Resmi (jsPDF + autoTable) & Export Spreadsheet CSV/Excel.
6. **Keuangan & Valuasi Aset (`finance.js`)**:
   - Standar Bagan Akun (COA: 1001 Kas, 1002 Bank, 1101 Piutang, 4001 Pendapatan, 6001-6099 Beban).
   - Laporan arus kas masuk vs beban operasional.
   - Valuasi aset fisik galon toko (saldo dipinjamkan vs saldo di toko).
7. **Pengaturan & Integrasi Perangkat (`settings.js`)**:
   - Profil toko, rekening bank, kustomisasi teks struk & WhatsApp.
   - Pemilihan ukuran kertas thermal (48mm, 58mm, 80mm).
   - Kredensial Supabase Cloud Sync, backup database JSON lokal, & restore aman.
8. **Manajemen Akun & Kontrol Akses Berbasis Peran / RBAC (`users.js`)**:
   - Tiga tingkatan peran: `owner`, `supervisor`, `cashier`.
   - Modul eksklusif Owner untuk manajemen staf, aktivasi/penonaktifan, dan atur ulang PIN aman.
   - Modal login numpad layar sentuh interaktif dengan indikator masking PIN 6-titik anti-intip (`modals.js`).
   - Kriptografi PIN Salted SHA-256 (16-byte random salt + Web Crypto API) dengan perbandingan waktu konstan (*constant-time XOR*) mencegah serangan *timing attack* (`crypto.js`).
9. **Universal Thermal Print & QRIS Engine (`printer.js`, `qris.js`, `receipt.js`)**:
   - Pure Base64 Synchronous High-Contrast Logo rendering.
   - Direct Print Spooler CSS `@page` zero-margin.
   - EMVCo Dynamic QRIS TLV Tag 54 injection & CRC16-CCITT generator.

---

## 3. Matriks Keamanan & Hardening Industri

 1. **Content Security Policy (CSP)**: `default-src 'self'`, `connect-src` terisolasi ketat ke Supabase WSS/HTTPS.
 2. **Zero-Plaintext PIN Storage**: PIN tidak pernah disimpan plaintext di IndexedDB, Cloud, maupun Git. Hanya hash salted 64 karakter heksadesimal yang tersimpan.
 3. **Role-Based Access Control (RBAC)**: Guard navigasi otomatis mencegah kasir mengakses modul Pengaturan, Keuangan, dan Manajemen Akun.
 4. **Anti-XSS**: Sanitasi input ganda via `esc()` dan DOMPurify.
 5. **Segregasi Kunci Cloud**: `sb_publishable_...` untuk client publik; `sb_secret_...` terisolasi lokal di `.env` untuk automasi `scripts/supabase-admin.js`.
 6. **Row Level Security (RLS)**: Hak akses tabel dibatasi ketat via SQL policies (`docs/05_SECURITY_HARDENING.sql` dan `docs/08_USERS_MANAGEMENT_SCHEMA.sql`).
 7. **Production Stripping**: Esbuild otomatis menghapus `console.log` dan `debugger` di dist.
 8. **Zero Memory Leak**: Kompresi gambar client-side membatasi pemakaian RAM browser.
 9. **Reactive Event Parity**: Semua modul terhubung ke bus event (`store.on(...)`) untuk sinkronisasi seketika antar-tampilan.
 10. **Ergonomi Layanan Layar Sentuh**: Docking macOS otomatis kembali ke posisi bawah dan mendukung navigasi gesture swipe antar-halaman pada layar sentuh.
 11. **Edge Deployment Cloudflare Pages**: Terhubung ke proyek `bluemountain-pos` dengan domain produksi aktif: `https://bluemountain-pos-c2k.pages.dev`.
