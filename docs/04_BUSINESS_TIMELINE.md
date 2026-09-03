# 📈 04 — ROADMAP BISNIS & BENCHMARK OPEN-SOURCE 2026
**Blue Mountain Refilling Station POS & CRM — Enterprise Evolution Matrix**

---

## 1. Benchmark Repositori Open-Source Global 2026

| Repositori / Referensi | Lisensi | Fitur & Arsitektur yang Diadopsi |
|---|---|---|
| **[Frappe Books](https://github.com/frappe/books)** | AGPL-3.0 | Arsitektur double-entry general ledger, journal balancing, & laporan Arus Kas offline-first. |
| **[Odoo POS](https://github.com/odoo/odoo)** | LGPL-3.0 | Mekanisme Shift Kasir (Cash Float, X-Report, Z-Report) & offline transaction queue. |
| **[NexoPOS](https://github.com/Blair2004/NexoPOS)** | MIT | Modular UI, quick-add customer di checkout, & multi-tender split payment. |
| **[FhyLabs/qris-dynamic](https://github.com/FhyLabs/qris-dynamic)** | MIT | EMVCo TLV parser & CRC16-CCITT recalculation untuk generate QRIS dinamis ber-nominal. |
| **[SheetJS / js-xlsx](https://github.com/SheetJS/sheetjs)** | Apache-2.0 | Engine export dataset transaksi, pelanggan, dan pembukuan ke format spreadsheet Excel (.xlsx / .csv). |
| **[theanam/escpos-encoder](https://github.com/theanam/escpos-encoder)** | MIT | ESC/POS binary raster image commands (`GS v 0`), double height text, & drawer kick pulse. |

---

## 2. Rincian Fase Roadmap Enterprise

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

### 🟡 FASE 3: Customer CRM, Export Excel & Dynamic QRIS (Fokus Implementasi Berikutnya)
- **Modul Master Pelanggan (CRM 360°)**:
  - CRUD pelanggan dengan segmentasi (*Rumah Tangga, Kantor/Instansi, Warung/Reseller, VIP*).
  - Autocomplete cerdas di kasir POS + tombol *Quick-Add Customer*.
  - Sub-buku besar piutang per pelanggan & peringatan *Credit Limit*.
- **Export Data ke Spreadsheet (.xlsx / .csv)**:
  - Unduh rekapitulasi data penjualan, pelanggan, dan keuangan untuk arsip pajak.
- **Dynamic QRIS Generator**:
  - Konversi QRIS statis toko menjadi QRIS dinamis otomatis terisi nominal belanjaan.
- **Pelacakan Fisik Galon Toko**:
  - Saldo galon isi, galon kosong, dan galon yang dipinjamkan ke pelanggan.

### 🔵 FASE 4: Multi-Branch & Advanced Hardware Operations (Evolusi Jangka Panjang)
- **Multi-Branch Aggregation**: Konsolidasi omzet beberapa cabang depot air.
- **Manajemen Shift Kasir (X-Report / Z-Report)**: Rekonsiliasi kas fisik per pergantian kasir.
- **Barcode / QR Scanner Hardware Listener**: Integrasi pemindai barcode USB/Bluetooth.
- **Cash Drawer Auto-Kick**: Perintah buka laci uang otomatis saat cetak struk tunai.
