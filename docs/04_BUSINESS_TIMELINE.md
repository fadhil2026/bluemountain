# 📈 04 — ANALISIS KOMPARATIF, BENCHMARK OPEN-SOURCE & ROADMAP 2026
**Blue Mountain Refilling Station POS & CRM — High-End Industrial Strategy (Revisi v3.4.0)**

---

## 1. Analisis Komparatif: Fitur Live vs Gap Sistem Mature

### A. Fitur Live Web App Kita (v3.4.0) 🌟
1. **Zero-Latency Pure Offline-First**:
   - IndexedDB (Dexie v3) lokal primary, 0ms latency.
   - 2-Way Sync Supabase PostgreSQL/WebSocket saat online tanpa data hilang (*Write-Ahead Persistence*).
   - Migrasi kunci cloud ke `sb_publishable_...` dan segregasi root secret CLI.
2. **Universal Thermal POS Engine (48mm / 58mm / 80mm)**:
   - Dukungan semua ukuran roll kertas thermal.
   - Direct Web Bluetooth GATT, WebUSB bulk transfer, Android Intent (`rawbt:`, `bluetoothprint`), dan direct OS spooler.
   - Synchronous 1-bit embedded thermal logo Base64 anti-blank & auto-wrap struk CSS `@page`.
3. **Customer CRM 360° & Pelacakan Aset Galon Fisik Terpadu**:
   - Master pelanggan lengkap nomor telepon (WhatsApp auto-format `628xxx`), segmentasi (*Rumah Tangga, Kantor, Reseller, VIP*).
   - Sub-ledger piutang pelanggan & riwayat mutasi.
   - Pelacakan aset fisik galon toko (saldo dipinjamkan vs saldo di toko) terintegrasi valuasi aset di neraca keuangan.
4. **EMVCo Dynamic QRIS Generator**:
   - Injeksi nominal dinamis Tag 54 & rekalkulasi CRC16-CCITT W3C-compliant tanpa backend perantara.
5. **Portabilitas Data Lengkap**:
   - Cetak nota thermal, export PDF invoice formal, dan export rekap Excel/CSV untuk arsip akuntansi.
6. **Desain Seragam & Ergonomi Layar Sentuh**:
   - Tata letak konsisten 7 modul, tabel dengan swipe/scroll horizontal responsif, paginasi permanen, dan gesture swipe dock.
7. **Pengerasan Keamanan Militer**:
   - CSP ketat, sanitasi anti-XSS DOMPurify, dan rancangan skrip Row Level Security (RLS) PostgreSQL.

---

### B. Gap vs Sistem POS Mature (Odoo POS, Square, Loyverse, ERPNext) ⚠️

| Fitur / Dimensi | POS Saat Ini (v3.4.0) | Standar Industri POS Mature | Tingkat Urgensi |
|---|---|---|---|
| **Sesi & Shift Kasir** | Timeline transaksi tercampur 24 jam tanpa sesi terpisah. | Buka shift (modal awal kasir), log cash in/out laci, hitung kas fisik (blind drop), hitung selisih lebih/kurang, cetak Struk Z-Report penutupan shift. | **Kritis** (Mencegah fraud kasir) |
| **Keamanan & Role (RBAC)** | Operator tunggal tanpa PIN / autentikasi per aksi. | PIN switch kasir instan, hak akses berjenjang (Kasir vs Supervisor vs Owner). Restriksi void, edit harga, hapus nota, lihat laba bersih. | **Kritis** (Integritas operasional) |
| **Validasi Harga di Database** | Subtotal dihitung oleh browser client. | PostgreSQL Trigger untuk verifikasi harga saat INSERT ke Supabase, mencegah manipulasi harga dari DevTools. | **Tinggi** (Integritas data transaksi) |
| **Input Barcode Otomatis** | Harus klik fokus ke kotak input cari. | Global USB Key-wedge listener (<35ms debounce tanpa klik kursor) & Barcode scanner kamera W3C native (`BarcodeDetector`). | **Tinggi** (Ergonomi checkout) |
| **Split-Tender Payment** | 1 transaksi = 1 metode bayar. | Split payment (sebagian tunai + sebagian QRIS/transfer dalam satu nota). | **Sedang** (Fleksibilitas pembayaran) |
| **Pembukuan Double-Entry SAK** | Arus kas single-entry & HPP statis saat transaksi. | General Ledger otomatis (Jurnal Debit/Kredit: Kas/Bank/Piutang vs Pendapatan, HPP vs Persediaan), FIFO / Moving Average berkala. | **Sedang** (Standar audit formal) |
| **Manajemen Stok Lanjutan** | Potong stok atomik saat checkout. | Purchase Order (PO) supplier, Surat Jalan masuk, Stock Opname berkala dengan audit trail selisih fisik. | **Sedang** (Rantai pasok) |

---

## 2. Benchmark Repositori Open-Source Global 2026 (MIT/Apache 2.0)

| Repositori / Sumber | Lisensi | Keunggulan Spesifik | Rencana Integrasi / Adopsi |
|---|---|---|---|
| **[nielsleenheer/receipt-printer-encoder](https://github.com/nielsleenheer/receipt-printer-encoder)** | MIT | Builder byte biner ESC/POS, Star, ESC/P browser-native. Ringan tanpa Node.js native bridge. | Pembuat stream biner ESC/POS langsung di browser client. |
| **[NielsLeenheer/WebUSBReceiptPrinter](https://github.com/NielsLeenheer/WebUSBReceiptPrinter)** & **[WebBluetoothReceiptPrinter](https://github.com/NielsLeenheer/WebBluetoothReceiptPrinter)** | MIT | Transport driver WebUSB & Web Bluetooth via `navigator.usb` & `navigator.bluetooth`. | Cetak langsung bypass dialog `window.print()` & auto-kick laci kasir RJ11. |
| **[tngoman/Store-POS](https://github.com/tngoman/Store-POS)** | MIT | Desktop POS React + TypeScript + SQLite, multi-terminal LAN. | Referensi struktur data transaksi multi-terminal & offline ledger. |
| **[FreeOpenSourcePOS/FloCafe](https://github.com/FreeOpenSourcePOS/FloCafe)** | GPL-3.0 | Arsitektur POS offline-first F&B dengan thermal printer native. | Pola antrean cetak thermal & manajemen kitchen / counter order. |
| **[BrainWise-DEV/POSNext](https://github.com/BrainWise-DEV/POSNext)** | MIT | POS Vue terhubung ERPNext, offline resilience tinggi. | Pola sesi kasir (shifts) dan rekonsiliasi data master. |
| **[flash-oss/medici](https://github.com/flash-oss/medici)** | MIT | Engine double-entry general ledger transaksi pembukuan. | Standar skema immutable journal entries debit/kredit seimbang. |
| **W3C BarcodeDetector API** | W3C Standard | API deteksi barcode native bawaan browser Chromium / Android. | Pemindai barcode kamera HP tanpa menambah bundle size eksternal. |

---

## 3. Roadmap Evolusi Sistem Enterprise POS

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           ROADMAP EVOLUSI SISTEM POS                            │
├───────────────────┬───────────────────┬───────────────────┬─────────────────────┤
│ FASE 1 (SELESAI)  │ FASE 2 (SELESAI)  │ FASE 3 (SELESAI)  │ FASE 4 (TERENCANA)  │
├───────────────────┼───────────────────┼───────────────────┼─────────────────────┤
│ - POS Core Trans  │ - Universal 48/80 │ - Customer CRM    │ - Shift Kasir (Z)   │
│ - Dexie + Supabase│ - Jurnal Arus Kas │ - Dynamic QRIS    │ - PIN Auth (RBAC)   │
│ - Thermal Engine  │ - Filter Tanggal  │ - Aset Galon CRM  │ - WebUSB Direct     │
│ - Logo Preload    │ - Paginasi Tabel  │ - Export Excel    │ - Barcode Scanner   │
└───────────────────┴───────────────────┴───────────────────┴─────────────────────┘
```

### 🟢 FASE 1, 2, 3 & 4 (SUB-BAGIAN RBAC): TELAH SELESAI & LIVE (v3.4.0)
- Kasir POS responsif + Master Produk SKU WebP.
- Cetak struk thermal raster grafik 48mm/58mm/80mm + Base64 synchronous logo.
- Sinkronisasi Cloud 2 arah via Supabase PostgreSQL & WebSocket.
- Filter tanggal fleksibel & paginasi permanen seragam di seluruh modul.
- Customer CRM 360° terintegrasi sub-ledger piutang & pelacakan galon pinjaman.
- Valuasi aset fisik galon di modul keuangan (`finance.js`).
- EMVCo Dynamic QRIS Generator (TLV Tag 54 + CRC16-CCITT).
- Export data spreadsheet Excel (.csv) dan PDF Invoice.
- Desain seragam & adaptasi otomatis resolusi HP/Tablet/Desktop.
- **PIN-Based Quick Switch & Hak Akses (RBAC)**: Layar input PIN kasir (numpad masking 6-titik), kontrol peran `owner`, `supervisor`, `cashier`, CRUD staf akun lengkap, kriptografi Web Crypto Salted SHA-256 zero-plaintext, dan deployment Cloudflare Pages.

### 🟡 FASE 4 (LANJUTAN): Shift Kasir (X/Z Report) & Direct Hardware
1. **Manajemen Sesi Kasir (Shifts & Z-Report)**:
   - Tabel `shifts` lokal & cloud (`id`, `cashier_name`, `started_at`, `closed_at`, `opening_cash`, `cash_in`, `cash_out`, `expected_cash`, `actual_cash`, `difference`, `status`).
   - Dialog input modal awal saat mulai giliran kasir.
   - Form tutup shift dengan *blind drop count* (kasir hitung uang fisik tanpa melihat total sistem untuk mencegah manipulasi).
   - Cetak Struk Penutupan Shift (Z-Report) thermal.
2. **Hardware Direct Access (WebUSB & Web Bluetooth)**:
   - Opsi cetak cepat bypass browser print dialog menggunakan library `receipt-printer-encoder` dan `WebUSBReceiptPrinter`.
   - Auto-kick command laci uang fisik via port RJ11 printer.
3. **Barcode Scanner Engine**:
   - Buffer listener keyboard-wedge USB scanner di layar POS tanpa mewajibkan kursor aktif di input teks.
   - Integrasi scanner kamera via W3C `BarcodeDetector` API.

### 🔵 FASE 5: Split-Tender Payment, Void/Refund & Advanced Stock Opname
1. **Split-Tender Payment**:
   - Pembayaran fleksibel multi-metode (contoh: Rp 25.000 tunai + Rp 25.000 QRIS dalam 1 nota).
2. **Alur Void & Pengembalian Dana (Refund)**:
   - Pembatalan transaksi tercatat rapi dengan log alasan pembatalan & pengembalian kuantitas stok otomatis.
3. **Modul Pengadaan & Stock Opname**:
   - Pencatatan Purchase Order (PO) pembelian galon & tutup/tisu dari supplier.
   - Formulir stock opname bulanan dengan pencatatan selisih fisik vs saldo buku.
