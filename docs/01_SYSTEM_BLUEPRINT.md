# 📐 01 — MASTER BLUEPRINT: ARSITEKTUR POS & CRM ENTERPRISE (v1.1.0)
**Blue Mountain Refilling Station POS & CRM — Personal & Proprietary Architecture (v1.1.0)**

---

## 1. Arsitektur Tingkat Tinggi (Online-First Master of Truth + Fast Local Cache)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│               ENTERPRISE POINT OF SALE & RETAIL ENGINE (PWA)                     │
│                                                                                  │
│  ┌──────────────┐     ┌──────────────┐     ┌───────────────────────────────────┐ │
│  │   9 Views    │ <-> │ Reactive     │ <-> │ Dexie.js (IndexedDB v5)           │ │
│  │ (Seragam)    │     │ Store Event  │     │ High-Speed Read Cache (0ms)       │ │
│  └──────────────┘     └──────────────┘     └───────────────────────────────────┘ │
│         │                                                   │                    │
│         ├────────────────────────┬──────────────────────────┤                    │
│         ▼                        ▼                          ▼                    │
│  ┌──────────────┐      ┌──────────────────┐      ┌─────────────────────────────┐ │
│  │ Universal    │      │ EMVCo Dynamic    │      │ Cloud Sync & Edge Auth      │ │
│  │ Thermal POS  │      │ QRIS Generator   │      │ (Cloudflare Functions Proxy │ │
│  │ (WebUSB/BLE) │      │ (CRC16 TLV)      │      │ & Web Crypto Salted SHA-256)│ │
│  └──────────────┘      └──────────────────┘      └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┬────────────────┘
                                                                  │ HTTPS / WSS
                                                                  ▼
                                                      ┌────────────────────────────┐
                                                      │ Network Edge: Cloudflare   │
                                                      │ Pages & Edge Functions     │
                                                      │ (/api/auth, /api/stock)    │
                                                      └─────────────┬──────────────┘
                                                                    │
                                                                    ▼
                                                      ┌────────────────────────────┐
                                                      │ Supabase PostgreSQL Cloud  │
                                                      │ (Master Single Source of   │
                                                      │ Truth + Atomic Stored Proc)│
                                                      └────────────────────────────┘
```

---

## 2. 9 Modul Tampilan Inti & Mesin Utilitas

1. **Portal Masuk Kasir & Operator (`login.js`)**:
   - Fullscreen portal dengan keypad on-screen dan input keyboard fisik.
   - Salted SHA-256 + 16-byte random salt & Web Crypto API constant-time comparison.
   - Fallback login manual (Username + PIN) bila cache lokal kosong.
2. **Kasir Point of Sale (`pos.js`)**:
   - Multi-tender payment (Tunai, Transfer Bank, Piutang/Hutang, Dinamis QRIS).
   - Pemilihan & pembersihan pelanggan transaksi reaktif.
   - Quick-add customer & kalkulasi diskon/pajak presisi integer Rupiah.
3. **Master Produk & Inventaris (`products.js`)**:
   - Auto SKU generator (`BM-001`, `BM-002`).
   - Client-side Canvas WebP photo compression (128px, ~4KB) & emoji fallback.
   - Manajemen stok minimum, harga modal (cost price), harga jual, & kategori produk.
   - Single source of truth: 100% tersinkronisasi dari Supabase Cloud (Zero local mock/dummy).
4. **Manajemen Pelanggan & CRM 360° (`customers.js`)**:
   - Profil pelanggan, segmentasi (*Rumah Tangga, Kantor, Reseller, VIP*).
   - Sub-buku besar piutang pelanggan (*Accounts Receivable Sub-Ledger*).
   - Pelacakan saldo aset galon fisik pinjaman (*Loaned Container Tracking*).
   - Tombol instan WhatsApp pesan tagihan/sapaan (`wa.me`).
   - Tata letak responsif adaptif resolusi HP/Tablet/Desktop dengan tabel scroll horizontal & paginasi permanen.
5. **Riwayat & Detail Transaksi (`transactions.js`)**:
   - Filter rentang tanggal fleksibel (Hari ini, 7 hari, 30 hari, kustom).
   - Paginasi permanen & pencarian transaksi.
   - Modal pelunasan piutang bertahap & cetak ulang struk thermal.
6. **Laporan Analitik & Portabilitas Data (`reports.js`)**:
   - Ringkasan omzet kotor, HPP (COGS), laba kotor, dan laba bersih.
   - Grafik penjualan harian/bulanan & jam sibuk kasir via Chart.js.
   - Export Laporan PDF Resmi (jsPDF + autoTable) & Export Spreadsheet CSV/Excel.
7. **Keuangan & Valuasi Aset (`finance.js`)**:
   - Standar Bagan Akun (COA: 1001 Kas, 1002 Bank, 1101 Piutang, 4001 Pendapatan, 6001-6099 Beban).
   - Laporan arus kas masuk vs beban operasional berbasis integer precision.
   - Valuasi aset fisik galon toko (saldo dipinjamkan vs saldo di toko).
8. **Pengaturan Sistem & Toko (`settings.js`)**:
   - Profil outlet, alamat, nomor telepon, dan identitas struk thermal.
   - Backup & Restore JSON terenkripsi lintas perangkat.
   - Konfigurasi tarif pajak dan saldo modal awal kasir.
9. **Manajemen Pengguna & RBAC (`users.js`)**:
   - Multi-role isolation: `owner`, `supervisor`, `cashier`.
   - Reset PIN operator aman dengan hashing client-side.
   - Roster pengguna tersinkronisasi otomatis dengan Cloud PostgreSQL settings.

---

## 3. Ekosistem Tooling Vibe Coding 10-Fase (0–100 Pipeline)

Sistem ini didukung oleh toolchain enterprise yang terpasang di Antigravity IDE:
* **Fase 0**: `graphify` (pemetaan AST & dependensi) + `graphrag` + `mem0`.
* **Fase 1**: `prd-taskmaster` (graf tugas deterministik) + `ralph` (loop PRD otonom).
* **Fase 2**: `akaunting` (standar buku besar) + `trpc-architecture` (typesafe contract).
* **Fase 3**: `vibe-coding-engineer` + `ui-ux-design-system` (glassmorphism & dark mode).
* **Fase 4**: `anti-hallucination-verifier` + `production-code-enforcer` + `bug-hunter-debugger`.
* **Fase 5**: `claude-bughunter` (83 modul hunt-*) + `semgrep` + `gitleaks`.
* **Fase 6**: `biome-linter` (Rust-based instant format & zero-warning linting).
* **Fase 7**: `vitest-runner` (unit test cepat) + `playwright-e2e` (browser & mobile testing).
* **Fase 8**: `performance-seo-finishing-polisher` + `pre-commit-qa-gate`.
* **Fase 9**: `report-writing` + `triage-validation`.
