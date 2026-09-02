# 📈 04 — ROADMAP BISNIS & TIMELINE EVOLUSI FITUR
**Blue Mountain Refilling Station POS — 2026 Strategy**

---

## 1. Tahapan Evolusi Sistem (Evolution Phases)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ROADMAP EVOLUSI FITUR                           │
├─────────────────┬──────────────────┬─────────────────┬─────────────────┤
│ FASE 1 (LIVE)   │ FASE 2 (STABLE)  │ FASE 3 (SCALE)  │ FASE 4 (ENTERP) │
├─────────────────┼──────────────────┼─────────────────┼─────────────────┤
│ - POS Checkout  │ - Date Range Fltr│ - Opname Stok   │ - Multi-Cabang  │
│ - Supabase Sync │ - Pagination 10x │ - Mutasi Galon  │ - QRIS Dinamis  │
│ - 58mm Thermal  │ - Universal 48/80│ - Notifikasi WA │ - API Akuntansi │
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

### 🟡 FASE 3: Inventory Control & WhatsApp Notification (Target Berikutnya)
- **Manajemen Stok Galon Kosong vs Isi**: Pelacakan kuantitas galon fisik yang dipinjamkan ke pelanggan.
- **WhatsApp Direct Invoice**: Pengiriman invoice/struk digital otomatis ke nomor WhatsApp pelanggan.
- **Export Laporan Excel (.xlsx)**: Selain PDF, sediakan download file Excel untuk pelaporan pajak.

### 🔵 FASE 4: Multi-Outlet & Advanced Analytics (Evolusi Jangka Panjang)
- **Multi-Branch Aggregation**: Penggabungan omzet dan stok dari beberapa stasiun depot air minum.
- **Dynamic QRIS Payment**: Pembuatan QRIS dinamis per invoice dengan auto-cek status pembayaran.
