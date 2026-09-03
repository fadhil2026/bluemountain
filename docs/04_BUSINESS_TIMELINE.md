# 📈 04 — ANALISIS KOMPARATIF, BENCHMARK OPEN-SOURCE & ROADMAP 2026
**Blue Mountain Refilling Station POS & CRM — High-End Industrial Strategy**

---

## 1. Analisis Komparatif: Kelebihan vs Kekurangan Web App Kita

### A. Kelebihan Web App Kita (Competitive Edge & High-End Features) 🌟
1. **Zero-Latency Pure Offline-First Architecture**:
   - Memakai Dexie.js (IndexedDB v3) dengan kecepatan eksekusi 0ms tanpa ketergantungan koneksi internet.
   - Sinkronisasi awan 2 arah via Supabase WebSocket saat perangkat kembali online tanpa resiko data hilang (*Write-Ahead Persistence*).
2. **Universal Thermal POS Engine (48mm / 58mm / 80mm)**:
   - Mendukung semua ukuran kertas roll thermal EDC mini (48mm), Bluetooth portable (58mm), dan Desktop resto (80mm).
   - Multi-protokol terlengkap: Web Bluetooth BLE (tanpa install app tambahan), WebUSB (kabel OTG), Android Intent (`rawbt:` & `my.bluetoothprint.scheme://`), dan OS Direct Spooler CSS `@page` zero-margin.
3. **Synchronous 1-Bit Embedded Thermal Logo**:
   - Logo dikonversi menjadi inline Base64 1.9 KB yang pre-rendered, menjamin logo **tidak pernah hilang atau gagal cetak** di printer fisik mana pun.
   - Menginjeksi biner biner ESC/POS `GS v 0` murni ke printer hardware BLE/USB.
4. **WhatsApp Direct Invoicing (Zero Cost Gateway)**:
   - Pengiriman struk digital & pengingat sisa piutang langsung ke nomor WhatsApp pelanggan (`https://wa.me/...`) tanpa biaya langganan API SMS/WhatsApp pihak ketiga.
5. **Keamanan & Standar Kualitas Militer**:
   - Content Security Policy (CSP) ketat, anti-XSS ganda (`esc()` + DOMPurify), esbuild drop console/debugger otomatis, dan pengujian sintaksis AST 21 file via `scripts/verify.js` di CI/CD.

---

### B. Kekurangan Web App Kita vs Sistem Mature (Gap Analysis) ⚠️
1. **Belum Ada Modul Master Pelanggan Mandiri (CRM 360°)**:
   - *Kondisi*: Nama pelanggan saat ini masih diinput sebagai teks bebas di kasir.
   - *Standar Industri*: Tabel pelanggan terstruktur dengan segmentasi (*Rumah Tangga, Kantor, Reseller, VIP*), kartu riwayat belanja (LTV), dan batas kredit (*Credit Limit Guard*).
2. **Belum Ada Export Data ke Spreadsheet (.xlsx / .csv)**:
   - *Kondisi*: Baru tersedia Export PDF.
   - *Standar Industri*: Tombol unduh data penjualan, piutang, dan jurnal ke file Excel untuk pelaporan pajak dan rekonsiliasi akuntan eksternal.
3. **Belum Ada Dynamic QRIS Generator**:
   - *Kondisi*: Pembayaran transfer bank masih berupa nomor rekening teks statis.
   - *Standar Industri*: Generate QR Code QRIS dinamis berisikan nominal belanja otomatis (EMVCo Tag 54 + CRC16-CCITT).
4. **Belum Ada Pelacakan Fisik Galon Toko**:
   - *Kondisi*: Stok produk hanya mencatat kuantitas umum.
   - *Standar Industri*: Pelacakan saldo fisik galon toko (Galon Isi di Toko, Galon Kosong di Toko, Galon Dipinjamkan ke Pelanggan, Galon Rusak/Afkir).
5. **Format Kode Akun COA Belum Tersemat di Jurnal**:
   - *Kondisi*: Jurnal masih menampilkan label umum (`Kas / Penjualan`).
   - *Standar Industri SAK EMKM*: Menampilkan kode akun resmi (`[1001] Kas`, `[1101] Piutang`, `[4001] Pendapatan`, `[5001] HPP`, `[6001] Beban`).
6. **Belum Ada Rekonsiliasi Shift Kasir (X-Report / Z-Report)**:
   - *Kondisi*: Kasir langsung mencatat transaksi tanpa input modal awal kas fisik (*Opening Float*) dan penghitungan selisih kas fisik di akhir hari (*Closing Balance*).

---

## 2. Benchmark Repositori Open-Source Global 2026 (MIT/Apache 2.0)

| Repositori / Referensi | Lisensi | Keunggulan Spesifik | Pemanfaatan Integrasi |
|---|---|---|---|
| **[Frappe Books](https://github.com/frappe/books)** | AGPL-3.0 | Double-entry general ledger, journal balancing, & cash flow. | Standar bagan akun COA (`1001-6099`) & buku besar otomatis di `finance.js`. |
| **[Odoo POS](https://github.com/odoo/odoo)** | LGPL-3.0 | Shift kasir (Cash Float, X/Z-Report, selisih kas fisik). | Prosedur rekonsiliasi kas modal kasir per pergantian shift. |
| **[NexoPOS](https://github.com/Blair2004/NexoPOS)** | MIT | Modular UI, quick-add customer, & multi-tender split payment. | Autocomplete pencarian nama/HP & limit kredit piutang. |
| **[FhyLabs/qris-dynamic](https://github.com/FhyLabs/qris-dynamic)** | MIT | EMVCo TLV Tag 54 injection & CRC16-CCITT recalculation. | Konversi QRIS statis toko menjadi QRIS dinamis ber-nominal otomatis tanpa server pihak ketiga. |
| **[SheetJS / js-xlsx](https://github.com/SheetJS/sheetjs)** | Apache-2.0 | Spreadsheet workbook generator. | Export data transaksi, pelanggan & jurnal ke file Excel (`.xlsx`/`.csv`). |
| **[theanam/escpos-encoder](https://github.com/theanam/escpos-encoder)** | MIT | ESC/POS binary raster image commands & drawer kick. | Cetak logo biner ESC/POS `GS v 0` & auto-kick laci kasir. |

---

## 3. Rincian Fase Roadmap Enterprise POS 2026

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           ROADMAP EVOLUSI SISTEM 2026                           │
├───────────────────┬───────────────────┬───────────────────┬─────────────────────┤
│ FASE 1 (LIVE)     │ FASE 2 (LIVE)     │ FASE 3 (NEXT)     │ FASE 4 (ENTERPRISE) │
├───────────────────┼───────────────────┼───────────────────┼─────────────────────┤
│ - POS Checkout    │ - Date Range Fltr │ - Customer CRM    │ - Multi-Cabang      │
│ - Supabase Sync   │ - Pagination 10x  │ - WA Invoicing    │ - Shift Kasir (Z)   │
│ - 58mm Thermal    │ - Universal 48/80 │ - Export Excel    │ - Stock Opname      │
│ - Logo Preload    │ - Jurnal Akuntansi│ - Dynamic QRIS    │ - Barcode Hardware  │
└───────────────────┴───────────────────┴───────────────────┴─────────────────────┘
```

### 🟢 FASE 1 & FASE 2: Core POS, Thermal Engine & Ledger (Selesai / Live)
- Kasir POS reaktif + Master Produk Auto-SKU & kompresi foto WebP.
- Universal Thermal POS Engine (48mm, 58mm, 80mm) + Synchronous Base64 Logo + ESC/POS Raster Bit Image.
- Sinkronisasi Cloud 2 arah via Supabase PostgreSQL & WebSocket.
- Filter rentang tanggal fleksibel & paginasi 10 baris di semua tabel.
- Pencatatan piutang pelanggan, skema cicilan bertahap, dan jurnal akuntansi.
- 1-Klik Kirim Struk WhatsApp (`wa.me`).

### 🟡 FASE 3: Customer CRM, Export Excel, Dynamic QRIS & Galon Tracking (Fokus Implementasi Berikutnya)
- **Modul Master Pelanggan (CRM 360°)**:
  - Menu baru `👥 Pelanggan` di bilah navigasi.
  - CRUD pelanggan dengan segmentasi (*Rumah Tangga, Kantor/Instansi, Warung/Reseller, VIP*).
  - Autocomplete cerdas di kasir POS + tombol *Quick-Add Customer*.
  - Sub-buku besar piutang per pelanggan & peringatan *Credit Limit*.
- **Export Data ke Spreadsheet (.xlsx / .csv)**:
  - Unduh rekapitulasi data penjualan, pelanggan, dan keuangan untuk arsip pajak.
- **Dynamic QRIS Generator**:
  - Konversi QRIS statis toko menjadi QRIS dinamis otomatis terisi nominal belanjaan.
- **Pelacakan Fisik Galon Toko**:
  - Saldo galon isi, galon kosong, dan galon yang dipinjamkan ke pelanggan.
- **Tagging Kode Akun COA Resmi di Jurnal**:
  - Menampilkan kode SAK EMKM (`[1001] Kas`, `[1101] Piutang`, `[4001] Pendapatan`, `[6001] Beban`).

### 🔵 FASE 4: Multi-Branch & Advanced Hardware Operations (Evolusi Jangka Panjang)
- **Multi-Branch Aggregation**: Konsolidasi omzet beberapa cabang depot air.
- **Manajemen Shift Kasir (X-Report / Z-Report)**: Rekonsiliasi kas fisik per pergantian kasir.
- **Barcode / QR Scanner Hardware Listener**: Integrasi pemindai barcode USB/Bluetooth.
- **Cash Drawer Auto-Kick**: Perintah buka laci uang otomatis saat cetak struk tunai.
