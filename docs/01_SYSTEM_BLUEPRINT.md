# 📐 01 — MASTER BLUEPRINT: ARSITEKTUR POS & CRM ENTERPRISE 2026
**Blue Mountain Refilling Station POS & CRM — High-End Industrial Architecture (v3.0.43)**

---

## 1. Arsitektur Tingkat Tinggi (High-End Hybrid Offline-First)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│               ENTERPRISE POINT OF SALE & RETAIL ENGINE (PWA)                     │
│                                                                                  │
│  ┌──────────────┐     ┌──────────────┐     ┌───────────────────────────────────┐ │
│  │   7 Views    │ <-> │ Reactive     │ <-> │ Dexie.js (IndexedDB v3)           │ │
│  │ Seragam & Res│     │ Store Event  │     │ Local Cache (0ms Offline-First)   │ │
│  └──────────────┘     └──────────────┘     └───────────────────────────────────┘ │
│         │                                                   │                    │
│         ├────────────────────────┬──────────────────────────┤                    │
│         ▼                        ▼                          ▼                    │
│  ┌──────────────┐      ┌──────────────────┐      ┌─────────────────────────────┐ │
│  │ Universal    │      │ EMVCo Dynamic    │      │ Cloud Sync Engine           │ │
│  │ Thermal POS  │      │ QRIS Generator   │      │ (2-Way Supabase WebSocket)  │ │
│  │ (48/58/80mm) │      │ (CRC16 TLV)      │      │                             │ │
│  └──────────────┘      └──────────────────┘      └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┬────────────────┘
                                                                  │ HTTPS / WSS
                                                                  ▼
                                                      ┌────────────────────────────┐
                                                      │ Supabase PostgreSQL Cloud  │
                                                      │ (Row Level Security & RLS) │
                                                      └────────────────────────────┘
```

---

## 2. 7 Modul Tampilan Inti & Mesin Utilitas

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
8. **Universal Thermal Print & QRIS Engine (`printer.js`, `qris.js`, `receipt.js`)**:
   - Pure Base64 Synchronous High-Contrast Logo rendering.
   - Direct Print Spooler CSS `@page` zero-margin.
   - EMVCo Dynamic QRIS TLV Tag 54 injection & CRC16-CCITT generator.

---

## 3. Matriks Keamanan & Hardening Industri

1. **Content Security Policy (CSP)**: `default-src 'self'`, `connect-src` terisolasi ketat ke Supabase WSS/HTTPS.
2. **Anti-XSS**: Sanitasi input ganda via `esc()` dan DOMPurify.
3. **Production Stripping**: Esbuild otomatis menghapus `console.log` dan `debugger` di dist.
4. **Zero Memory Leak**: Kompresi gambar client-side membatasi pemakaian RAM browser.
5. **Reactive Event Parity**: Semua modul terhubung ke bus event (`store.on(...)`) untuk sinkronisasi seketika antar-tampilan.
