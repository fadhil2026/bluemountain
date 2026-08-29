# 💧 Blue Mountain Refilling Station — POS System

Sistem Kasir POS canggih dengan tampilan macOS-style untuk Blue Mountain Refilling Station.

## ✨ Fitur

- 🏪 **POS Kasir** — Grid produk, keranjang, diskon, kembalian otomatis
- 📦 **Manajemen Produk** — CRUD produk dengan emoji picker
- 📋 **Riwayat Transaksi** — Filter per tanggal, detail transaksi
- 📊 **Laporan Penjualan** — Chart 7 hari, omzet harian/bulanan, top produk
- ⚙️ **Pengaturan** — Info toko, bank transfer, printer
- 🖨️ **Bluetooth Thermal Printer** — Via [Bluetooth Print App](https://play.google.com/store/apps/details?id=mate.bluetoothprint)
- 📱 **PWA** — Install sebagai app, mode offline
- 🌙 **macOS-style UI** — Dark mode premium, dock bawah, glassmorphism

## 🖨️ Setup Printer Bluetooth

1. Install **Bluetooth Print App** di Android
2. Buka app → Settings → Browser/Website Print → **Enable**
3. Pair printer Bluetooth di Settings Android
4. Pilih printer di Bluetooth Print App
5. Buka URL GitHub Pages di Chrome Android
6. Transaksi selesai → Klik **Cetak Struk** → App otomatis terbuka & cetak

## 🚀 Deploy ke GitHub Pages

1. Push repo ke GitHub
2. Settings → Pages → Source: **GitHub Actions**
3. Workflow `deploy.yml` otomatis deploy ke `https://<username>.github.io/<repo>/`

## 📁 Struktur

```
KASIR/
├── index.html              # SPA utama
├── receipt-data.html       # Endpoint JSON untuk Bluetooth Print App
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── .nojekyll               # Disable Jekyll (GitHub Pages)
├── .github/workflows/
│   └── deploy.yml          # Auto-deploy ke GitHub Pages
├── assets/
│   ├── logo.jpeg
│   └── icons/
├── css/
│   ├── main.css            # Design system
│   ├── dock.css            # macOS dock
│   ├── pos.css             # POS layout
│   └── modals.css          # Modals, toast, tabel
└── js/
    ├── app.js              # Bootstrap
    ├── store.js            # State management
    ├── db.js               # IndexedDB
    ├── printer.js          # Bluetooth Print integration
    ├── receipt.js          # JSON receipt builder
    ├── views/
    │   ├── pos.js
    │   ├── products.js
    │   ├── transactions.js
    │   ├── reports.js
    │   ├── settings.js
    │   └── modals.js
    └── utils/
        ├── currency.js     # Format Rupiah
        └── date.js         # Format tanggal Indonesia
```

## 💻 Local Testing

```bash
# Buka dengan local server (WAJIB untuk ES modules & IndexedDB)
npx serve .
# atau
python -m http.server 8000
```

Lalu buka: `http://localhost:8000`

---
*Blue Mountain Refilling Station POS — Built with ❤️ using Vanilla JS + IndexedDB*
