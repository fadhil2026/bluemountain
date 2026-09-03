# 📐 01 — MASTER BLUEPRINT: ARSITEKTUR POS & CRM ENTERPRISE 2026
**Blue Mountain Refilling Station POS & CRM — High-End Industrial Architecture**

---

## 1. Arsitektur Tingkat Tinggi (High-End Hybrid Offline-First)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│               ENTERPRISE POINT OF SALE & RETAIL ENGINE (PWA)                     │
│                                                                                  │
│  ┌──────────────┐     ┌──────────────┐     ┌───────────────────────────────────┐ │
│  │   UI Views   │ <-> │ Reactive     │ <-> │ Dexie.js (IndexedDB v3)           │ │
│  │  (9 Modules) │     │ Store        │     │ Local Cache (0ms Offline-First)   │ │
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

## 2. 9 Modul Inti Sistem Enterprise

1. **Kasir Point of Sale (`pos.js`)**:
   - Multi-tender payment (Tunai, Transfer Bank, Piutang/Hutang, Dinamis QRIS).
   - Barcode Scanner HID listener (Keyboard Wedge buffer debounce <35ms).
   - Cash Drawer Kick Pulse (`0x1B 0x70 0x00 0x19 0xFA`).
   - Quick-add customer & discount/tax calculation with integer rounding.
2. **Master Produk & Inventaris (`products.js`)**:
   - Auto SKU generator (`BM-001`, `BM-002`).
   - Client-side Canvas WebP photo compression (128px, ~4KB).
   - Manajemen stok minimum & kategori produk.
3. **Manajemen Aset Galon Fisik (`galon.js`)**:
   - Pelacakan kuantitas galon: *Galon Isi di Toko, Galon Kosong di Toko, Galon Dipinjamkan ke Pelanggan, Galon Rusak/Afkir*.
4. **Manajemen Pelanggan 360° CRM (`customers.js`)**:
   - Profil pelanggan, segmentasi (*Rumah Tangga, Kantor, Reseller, VIP*).
   - Sub-buku besar piutang (*Accounts Receivable Sub-Ledger*).
   - Limit kredit (*Credit Limit Guard*) & riwayat transaksi seumur hidup (LTV).
5. **Riwayat & Detail Transaksi (`transactions.js`)**:
   - Filter rentang tanggal fleksibel (default: hari ini).
   - Paginasi 10 baris per halaman.
   - Pembayaran cicilan piutang bertahap & pembatalan transaksi aman.
6. **Keuangan & Akuntansi Double-Entry (`finance.js`)**:
   - Standar Bagan Akun (COA: 1001 Kas, 1002 Bank, 1101 Piutang, 4001 Pendapatan, 6001-6099 Beban).
   - Jurnal Umum otomatis balance ($\sum \text{Debit} == \sum \text{Kredit}$).
   - Rekonsiliasi Arus Kas Bersih 30 Hari.
   - Manajemen Shift Kasir (Buka/Tutup Kasir & Saldo Awal).
7. **Laporan Analitik & Portabilitas Data (`reports.js`)**:
   - Grafik penjualan harian/bulanan (Chart.js).
   - Export Laporan PDF Resmi (jsPDF + autoTable).
   - Export Spreadsheet CSV / Excel (.xlsx) untuk arsip pajak & akuntansi.
8. **Pengaturan & Integrasi Perangkat (`settings.js`)**:
   - Profil toko, rekening bank, kustomisasi teks WhatsApp.
   - Pemilihan ukuran kertas thermal (48mm, 58mm, 80mm).
   - Diagnostic hardware test print.
9. **Universal Thermal Print & Messaging Engine (`printer.js`)**:
   - Pure Base64 Synchronous High-Contrast Logo rendering.
   - Direct Print Spooler CSS `@page` zero-margin.
   - ESC/POS Raster Bit Image for Web Bluetooth (BLE) & WebUSB.
   - Android Intent (`rawbt:` & `my.bluetoothprint.scheme://`).
   - 1-Klik WhatsApp Direct Invoice Generator (`https://wa.me/...`).

---

## 3. Matriks Keamanan & Hardening Industri

1. **Content Security Policy (CSP)**: `default-src 'self'`, `connect-src` terisolasi ketat ke Supabase WSS/HTTPS.
2. **Anti-XSS**: Sanitasi input ganda via `esc()` dan DOMPurify.
3. **Production Stripping**: Esbuild otomatis menghapus `console.log` dan `debugger` di dist.
4. **Zero Memory Leak**: Kompresi gambar client-side membatasi pemakaian RAM browser.
