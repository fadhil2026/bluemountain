# 📈 04 — ROADMAP BISNIS & TIMELINE EVOLUSI FITUR
**Blue Mountain Refilling Station POS & CRM — 2026 Strategy**

---

## 1. Tahapan Evolusi Sistem (Evolution Phases)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ROADMAP EVOLUSI FITUR                           │
├─────────────────┬──────────────────┬─────────────────┬─────────────────┤
│ FASE 1 (LIVE)   │ FASE 2 (LIVE)    │ FASE 3 (NEXT)   │ FASE 4 (ENTERP) │
├─────────────────┼──────────────────┼─────────────────┼─────────────────┤
│ - POS Checkout  │ - Date Range Fltr│ - Customer CRM  │ - Multi-Cabang  │
│ - Supabase Sync │ - Pagination 10x │ - WA Invoicing  │ - QRIS Dinamis  │
│ - 58mm Thermal  │ - Universal 48/80│ - Galon Tracking│ - API Eksternal │
└─────────────────┴──────────────────┴─────────────────┴─────────────────┘
```

---

## 2. Rincian Fase Roadmap

### 🟢 FASE 1: Core POS & Realtime Cloud (Selesai / Live)
- Kasir Point of Sale berbasis keranjang reaktif.
- Master Produk dengan Auto SKU (`BM-001`) dan kompresi foto WebP.
- Sinkronisasi Cloud 2 arah via Supabase PostgreSQL & WebSocket.
- Cetak struk Bluetooth ESC/POS 58mm.
- Pencatatan piutang pelanggan & skema cicilan bertahap.

### 🟢 FASE 2: Enterprise Ledger & Universal Thermal Engine (Selesai / Live)
- Filter rentang tanggal kustom (*Date Range*) dengan default hari ini di seluruh laporan.
- Paginasi 10 baris per halaman pada Transaksi, Pengeluaran, Piutang, dan Analisis Keuangan.
- Universal Thermal POS Engine mendukung roll 48mm (EDC), 58mm (Bluetooth), dan 80mm (Desktop).
- Dukungan multi-protokol: Web Bluetooth BLE, WebUSB, RawBT, dan OS Spooler.
- Jurnal entri akuntansi debit-kredit otomatis dan arus kas 30 hari.

### 🟡 FASE 3: Customer CRM 360°, WhatsApp Invoicing & Galon Tracking (Target Fokus)
- **Modul Master Pelanggan (CRM)**:
  - CRUD master pelanggan dengan segmentasi: *Rumah Tangga, Kantor/Instansi, Warung/Reseller, VIP*.
  - Riwayat belanja individual (LTV), batas kredit piutang (*Credit Limit*), dan catatan alamat pengantaran.
- **Smart POS Autocomplete**:
  - Pencarian instan nama / nomor HP pelanggan di kasir + tombol *Quick-Add Customer*.
- **WhatsApp Direct Invoicing & Debt Reminder**:
  - Tombol 1-klik kirim format struk digital resmi ke nomor WhatsApp pelanggan (`https://wa.me/62xxx?text=...`).
  - Tombol 1-klik kirim rincian sisa tagihan piutang dan rekening transfer.
- **Pelacakan Fisik Galon (Loaned Bottle Tracking)**:
  - Pelacakan kuantitas galon fisik kosong vs isi yang sedang dipinjam oleh pelanggan langganan.
- **Export Laporan Excel (.xlsx / .csv)**:
  - Unduh rekapitulasi data penjualan, pelanggan, dan piutang dalam format spreadsheet.

### 🔵 FASE 4: Multi-Outlet & Advanced Payments (Evolusi Jangka Panjang)
- **Multi-Branch Aggregation**: Penggabungan omzet dan stok dari beberapa stasiun depot air minum.
- **Dynamic QRIS Payment**: Pembuatan QRIS dinamis per invoice dengan auto-cek status pembayaran via library `qrcode`.
