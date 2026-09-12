# BLUE MOUNTAIN POS — ARSITEKTUR ENTERPRISE & EKOSISTEM FREE-TIER

Dokumen acuan riset dan audit arsitektur sistem Point of Sale (POS) *end-to-end* menggunakan infrastruktur *free-tier* berstandar enterprise, integrasi layanan Cloudflare, dan adopsi pola dari repositori open-source *mature* di GitHub.

---

## 1. Topologi Arsitektur End-to-End Free-Tier

```
[KASIR / OWNER DEVICE] (HP, Tablet, PC Desktop)
   │
   ├─► [Local Storage (Offline-First)]
   │     └─ Dexie.js (IndexedDB) ── Latensi 0ms, berjalan tanpa internet
   │
   ├─► [Network Edge: Cloudflare Ecosystem (Free-Tier)]
   │     ├─ Cloudflare Pages / GitHub Pages : Global Anycast CDN, DDoS Layer 3/4/7 protection
   │     ├─ Cloudflare Zero Trust (Access)  : Autentikasi proteksi portal owner/admin via OTP/Email
   │     ├─ Cloudflare Turnstile            : CAPTCHA transparan anti-bruteforce / bot scraping
   │     ├─ Cloudflare Workers / Functions  : Server-authoritative /api/auth & /api/stock
   │     └─ Cloudflare R2 (10 GB Free)      : Cloud storage arsip struk JPEG/PDF & dump backup DB
   │
   └─► [Backend & Database: Supabase Cloud (Free-Tier)]
         ├─ PostgreSQL 15+ Engine           : Database relasional ACID-compliant (500 MB)
         ├─ PostgREST Data API              : REST endpoint otomatis cepat tanpa server Node terpisah
         ├─ WebSocket Realtime Engine       : Sinkronisasi instan multi-perangkat via Phoenix Channels
         ├─ Row Level Security (RLS)        : Pembatasan hak baca/tulis di level kernel database
         └─ Database Triggers & Functions   : Kalkulasi harga/stok otomatis anti-manipulasi client
```

---

## 2. Riset & Integrasi Layanan Cloudflare (Free-Tier)

| Layanan Cloudflare | Alokasi Gratis | Fungsi & Implementasi pada POS | Tingkat Urgensi |
|---|---|---|---|
| **Cloudflare Pages / DNS** | Unlimited bandwidth, 500 build/bulan | Hosting PWA front-end dengan custom domain, SSL otomatis, dan mitigasi DDoS Anycast. | **Wajib** |
| **Cloudflare Edge Functions** | 100.000 req/hari | Menjalankan fungsi server `/api/auth/login` (rate limit & JWT) dan `/api/stock/decrement` (atomic decrement). | **Wajib** |
| **Cloudflare Zero Trust (Access)**| Gratis s/d 50 pengguna (*seats*) | Mengunci rute sensitif (halaman Admin, Laporan Keuangan, dan Pengaturan) menggunakan OTP email atau Google Workspace SSO. | **Tinggi** |
| **Cloudflare Turnstile** | Unlimited requests | Menggantikan reCAPTCHA untuk mencegah bot brute-force PIN kasir atau spamming mutasi piutang. Berjalan transparan tanpa tantangan gambar puzzle. | **Sedang** |
| **Cloudflare R2 Object Storage** | 10 GB kapasitas, 10 juta request/bulan | Menyimpan file struk PDF/PNG transaksi dan arsip dump JSON database harian secara terisolasi dari database utama. | **Tinggi** |

---

## 3. Komparasi Repositori GitHub Teruji (*Mature Benchmark*)

Pola arsitektur, struktur tabel, dan algoritma yang diadopsi ke dalam Blue Mountain POS:

### A. Akuntansi, Buku Besar (*General Ledger*), & Keuangan
* **`akaunting/akaunting`** (*PHP/Laravel - 8k+ stars*)
  * *Pola Adopsi*: Standar Bagan Akun (Chart of Accounts), isolasi tenant multi-outlet, presisi moneter tanpa floating-point, dan siklus transaksi (Draft -> Approved -> Paid -> Reconciled).
* **`frappe/erpnext`** (*Python/JS - 20k+ stars*)
  * *Pola Adopsi*: Skema *Double-Entry Bookkeeping* berbasis *Journal Entry* ($\sum \text{Debit} == \sum \text{Kredit}$).
* **`firefly-iii/firefly-iii`** (*PHP/Laravel - 16k+ stars*)
  * *Pola Adopsi*: Sistem pelacakan arus kas (*cashflow*), pengelompokan akun (Asset, Revenue, Expense), dan kalkulasi otomatis laporan laba-rugi periodik.

### B. Otomasi Eksekusi PRD & Knowledge Graph
* **`snarktank/ralph`**: Loop autonomous eksekusi PRD hingga verifikasi lulus 100%.
* **`anombyte93/prd-taskmaster`**: Pemecahan ide user menjadi graf tugas deterministik dengan relasi dependensi ketat.
* **`Graphify-Labs/graphify`**: Ekstraksi AST dan relasi antar file menjadi knowledge graph visual.
* **`microsoft/graphrag`**: Mesin query RAG berbasis graf untuk pemahaman arsitektural multi-dokumen.

### C. Keamanan & Red-Team (Claude-BugHunter)
* **`elementalsouls/Claude-BugHunter`**: 83 modul keamanan teruji (`hunt-auth-bypass`, `hunt-jwt-crypto`, `hunt-idor`, `hunt-business-logic`, `hunt-sqli`, `hunt-race-condition`) untuk audit pra-rilis.

### D. Toolchain Verifikasi Modern
* **`biomejs/biome`**: Linter & formatter Rust berkecepatan 100x dibanding ESLint/Prettier.
* **`vitest-dev/vitest`**: Vite-native test runner untuk pengujian unit & integrasi instan.
* **`microsoft/playwright`**: Otomasi browser nyata untuk pengujian antarmuka Desktop dan HP secara simultan.
