# 📐 01 — SYSTEM ARCHITECTURE & TECHNICAL BLUEPRINT
**Blue Mountain Refilling Station POS — 2026 Production Edition**

---

## 1. Arsitektur Tingkat Tinggi (High-Level Architecture)

Sistem Kasir POS dirancang dengan arsitektur **Hybrid Offline-First Realtime (Zero-Latency PWA + Cloud Supabase PostgreSQL)**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CLIENT APPLICATION (PWA)                      │
│                                                                        │
│  ┌──────────────┐     ┌──────────────┐     ┌─────────────────────────┐ │
│  │   UI Views   │ <-> │ Reactive     │ <-> │ Dexie.js (IndexedDB)    │ │
│  │  (7 Modules) │     │ Store        │     │ Local Cache (Offline)   │ │
│  └──────────────┘     └──────────────┘     └─────────────────────────┘ │
│         │                                               │              │
│         ▼                                               ▼              │
│  ┌──────────────┐                           ┌─────────────────────────┐ │
│  │ Thermal POS  │                           │ Supabase Sync Engine    │ │
│  │ Print Engine │                           │ (2-Way Realtime WS)     │ │
│  └──────────────┘                           └─────────────────────────┘ │
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
- **Pola**: Reactive Pub-Sub (Event Emitter) murni tanpa mutasi global.
- **State Properties**: `products`, `transactions`, `expenses`, `cart`, `discount`, `customerName`, `settings`.
- **Event Dispatcher**: Notifikasi perubahan real-time ke UI (`products:change`, `transactions:change`, `expenses:change`, `cart:change`).

### B. Penyimpanan Lokal (`js/db.js`)
- **Mesin**: Dexie.js (IndexedDB v3.2.7).
- **Tabel & Indeks**:
  - `products`: `++id, category, sku`
  - `transactions`: `++id, dateKey, paymentStatus, paymentMethod`
  - `settings`: `key`
  - `expenses`: `++id, dateKey, category`

### C. Cloud Realtime Sync (`js/supabase.js`)
- **Backend**: PostgreSQL di Supabase Cloud (`wiapnhpdgjbtkblowfig.supabase.co`).
- **Protokol**: WebSocket (`realtime:eventsPerSecond = 20`) + REST API.
- **Mekanisme**:
  - *Write-Ahead Local*: Transaksi disimpan lokal terlebih dahulu demi latensi 0ms.
  - *Background Push*: Payload dinormalisasi lalu dikirim ke Supabase secara asinkron.
  - *Conflict Resolution*: Penomoran SKU unik (`BM-xxx`) & ID sekuensial mencegah tabrakan data.

### D. Universal Thermal Print Engine (`js/printer.js`)
- **Standar Roll Kertas**:
  - `48mm`: 30 karakter/baris, font 10px monospace (EDC POS).
  - `58mm`: 32 karakter/baris, font 11px monospace (Standar Bluetooth POS).
  - `80mm`: 48 karakter/baris, font 12px monospace (Thermal Desktop/Resto).
- **Protokol Koneksi**:
  1. *Universal Direct Print*: Spooler browser via CSS `@page` zero-margin.
  2. *Web Bluetooth (BLE)*: Binary ESC/POS murni via Web Bluetooth API.
  3. *WebUSB*: Binary ESC/POS via kabel USB / adaptor OTG.
  4. *Android Intents*: `rawbt:` dan `my.bluetoothprint.scheme://`.

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
4. **Proteksi Memori Upload**:
   - Kompresi Canvas client-side di `js/utils/image.js` mengunci file maksimal $128 \times 128\text{ px}$ (~4KB WebP) untuk mencegah kebocoran RAM browser.
