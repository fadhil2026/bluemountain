# 📐 01 — SYSTEM ARCHITECTURE & TECHNICAL BLUEPRINT
**Blue Mountain Refilling Station POS & CRM — 2026 Production Edition**

---

## 1. Arsitektur Tingkat Tinggi (High-Level Architecture)

Sistem Kasir POS & Manajemen Pelanggan (CRM) dirancang dengan arsitektur **Hybrid Offline-First Realtime (Zero-Latency PWA + Cloud Supabase PostgreSQL)**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                    CLIENT APPLICATION (PWA & CRM)                      │
│                                                                        │
│  ┌──────────────┐     ┌──────────────┐     ┌─────────────────────────┐ │
│  │   UI Views   │ <-> │ Reactive     │ <-> │ Dexie.js (IndexedDB)    │ │
│  │  (8 Modules) │     │ Store        │     │ Local Cache (Offline)   │ │
│  └──────────────┘     └──────────────┘     └─────────────────────────┘ │
│         │                                               │              │
│         ├────────────────────────┐                      │              │
│         ▼                        ▼                      ▼              │
│  ┌──────────────┐      ┌──────────────────┐  ┌───────────────────────┐ │
│  │ Thermal POS  │      │ WhatsApp Invoice │  │ Supabase Sync Engine  │ │
│  │ Print Engine │      │ Direct Generator │  │ (2-Way Realtime WS)   │ │
│  └──────────────┘      └──────────────────┘  └───────────────────────┘ │
└─────────────────────────────────────────────────────────┬──────────────┘
                                                          │ HTTPS / WSS
                                                          ▼
                                              ┌─────────────────────────┐
                                              │ Supabase PostgreSQL DB  │
                                              │ (Cloud Realtime Backend)│
                                              └─────────────────────────┘
```

---

## 2. Lapisan Inti Sistem (Core System Layers)

### A. State Management (`js/store.js`)
- **Pola**: Reactive Pub-Sub (Event Emitter) murni tanpa mutasi global langsung.
- **State Properties**: `products`, `customers`, `transactions`, `expenses`, `cart`, `discount`, `selectedCustomer`, `settings`.
- **Event Dispatcher**: Notifikasi perubahan real-time ke UI (`products:change`, `customers:change`, `transactions:change`, `expenses:change`, `cart:change`).

### B. Penyimpanan Lokal (`js/db.js`)
- **Mesin**: Dexie.js (IndexedDB v3.2.7).
- **Tabel & Skema Indeks**:
  - `products`: `++id, category, sku`
  - `customers`: `++id, name, phone, category, totalDebt`
  - `transactions`: `++id, dateKey, customerId, paymentStatus, paymentMethod`
  - `settings`: `key`
  - `expenses`: `++id, dateKey, category`

### C. Cloud Realtime Sync (`js/supabase.js`)
- **Backend**: PostgreSQL di Supabase Cloud (`wiapnhpdgjbtkblowfig.supabase.co`).
- **Protokol**: WebSocket (`realtime:eventsPerSecond = 20`) + REST API.
- **Mekanisme 2 Arah**:
  - *Write-Ahead Local*: Transaksi/pelanggan disimpan lokal terlebih dahulu demi latensi 0ms.
  - *Background Push*: Payload dinormalisasi lalu dikirim ke Supabase secara asinkron.
  - *Multi-Device Realtime*: Perubahan dari perangkat kasir lain langsung diterima via WebSocket dan meng-update IndexedDB serta UI secara reaktif.

### D. Manajemen Pelanggan Terintegrasi 360° (`js/views/customers.js`)
- **Struktur Entitas Pelanggan**:
  - `id`: Unique identifier (String/UUID).
  - `name`: Nama lengkap pelanggan.
  - `phone`: Nomor WhatsApp aktif (format internasional `628xxx`).
  - `address`: Alamat pengantaran / lokasi kantor.
  - `category`: `Rumah Tangga`, `Kantor/Instansi`, `Warung/Reseller`, `VIP`.
  - `total_orders`: Frekuensi total transaksi seumur hidup.
  - `total_spent`: Total omzet akumulatif pelanggan (Customer Lifetime Value).
  - `total_debt`: Saldo sisa piutang berjalan yang belum dilunasi.
  - `credit_limit`: Batas maksimal piutang yang diizinkan.
  - `galon_loaned`: Kuantitas galon fisik toko yang sedang dipinjamkan ke pelanggan.
  - `notes`: Catatan preferensi & patokan alamat pengantaran.

### E. Universal Thermal Print Engine (`js/printer.js`)
- **Standar Roll Kertas**:
  - `48mm`: 30 karakter/baris, font 10px monospace (EDC POS).
  - `58mm`: 32 karakter/baris, font 11px monospace (Standar Bluetooth POS).
  - `80mm`: 48 karakter/baris, font 12px monospace (Thermal Desktop/Resto).
- **Protokol Koneksi**:
  1. *Universal Direct Print*: Spooler browser via CSS `@page` zero-margin.
  2. *Web Bluetooth (BLE)*: Binary ESC/POS murni via Web Bluetooth API tanpa middleware.
  3. *WebUSB*: Binary ESC/POS via kabel USB / adaptor OTG.
  4. *Android Intents*: `rawbt:` dan `my.bluetoothprint.scheme://`.
  5. *WhatsApp Gateway*: Generator pesan struk 1-klik via `https://wa.me/62xxx?text=...`.

---

## 3. Matriks Keamanan & Hardening

1. **Content Security Policy (CSP)**:
   - Didefinisikan di `<meta>` tag `index.html`.
   - `connect-src`: `'self' https://wiapnhpdgjbtkblowfig.supabase.co wss://wiapnhpdgjbtkblowfig.supabase.co`.
   - `img-src`: `'self' data:;`.
2. **Anti-XSS**:
   - Seluruh input teks disanitasi via `js/utils/sanitize.js` (`esc()` / `DOMPurify`).
3. **Production Log Stripping**:
   - `vite.config.js` mengaktifkan `esbuild.drop: ['console', 'debugger']`.
4. **Proteksi Memori & Upload DoS**:
   - Kompresi Canvas client-side di `js/utils/image.js` mengunci file maksimal $128 \times 128\text{ px}$ (~4KB WebP) untuk mencegah kebocoran RAM browser.
