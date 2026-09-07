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
   │     ├─ Cloudflare Workers (Opsional)   : Reverse proxy / masking header API & webhook routing
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
| **Cloudflare Zero Trust (Access)**| Gratis s/d 50 pengguna (*seats*) | Mengunci rute sensitif (halaman Admin, Laporan Keuangan, dan Pengaturan) menggunakan OTP email atau Google Workspace SSO tanpa perlu membuat backend auth baru. | **Tinggi** |
| **Cloudflare Turnstile** | Unlimited requests | Menggantikan reCAPTCHA untuk mencegah bot brute-force PIN kasir atau spamming mutasi piutang. Berjalan transparan tanpa tantangan gambar puzzle. | **Sedang** |
| **Cloudflare R2 Object Storage** | 10 GB kapasitas, 10 juta request/bulan | Menyimpan file struk PDF/PNG transaksi dan arsip dump JSON database harian secara terisolasi dari database utama. | **Tinggi** |
| **Cloudflare Workers** | 100.000 request/hari | Berfungsi sebagai API gateway penyaring IP, validasi signature webhook pembayaran QRIS/bank, dan sanitasi payload sebelum masuk ke Supabase. | **Opsional** |

---

## 3. Komparasi Repositori GitHub Teruji (*Mature Benchmark*)

Pola arsitektur, struktur tabel, dan algoritma yang dapat diadopsi ke dalam Blue Mountain POS:

### A. Akuntansi, Buku Besar (*General Ledger*), & Keuangan
* **`frappe/erpnext`** (*Python/JS - 20k+ stars*)
  * *Pola Adopsi*: Skema *Double-Entry Bookkeeping* berbasis *Journal Entry* (Debit = Kredit). Setiap penjualan mencatat Debit pada akun Kas/Bank dan Kredit pada akun Pendapatan serta Persediaan.
* **`firefly-iii/firefly-iii`** (*PHP/Laravel - 16k+ stars*)
  * *Pola Adopsi*: Sistem pelacakan arus kas (*cashflow*), pengelompokan akun (Asset, Revenue, Expense), dan kalkulasi otomatis laporan laba-rugi periodik.
* **`beancount/beancount`** (*Python - Plain Text Accounting*)
  * *Pola Adopsi*: Struktur data transaksi *immutable* (transaksi yang sudah tervalidasi tidak boleh di-*update* fisik, melainkan dibuatkan transaksi penyesuaian/reversal).

### B. Stok, Inventori, & Varian Barang
* **`inventree/InvenTree`** (*Python/Django/React - 5k+ stars*)
  * *Pola Adopsi*: Manajemen stok berbasis batch/lot, pencatatan mutasi (*stock tracking log*), pencegahan stok negatif, dan sistem notifikasi *reorder point* (peringatan minimum galon/tutup).
* **`opensourcepos/opensourcepos`** (*PHP/JS - 2.5k+ stars*)
  * *Pola Adopsi*: Alur *stock adjustment* saat barang rusak, bocor, atau susut (*shrinkage*), serta perhitungan modal rata-rata tertimbang (*Moving Average Cost*).

### C. Pelanggan, Piutang (*Accounts Receivable*), & Loyalty
* **`invoiceninja/invoiceninja`** (*Flutter/PHP - 8k+ stars*)
  * *Pola Adopsi*: Skema jatuh tempo pembayaran piutang (*due dates*), penuaan piutang (*aging report: 0-30 hari, 31-60 hari, >60 hari*), serta riwayat pembayaran bertahap (*partial payment ledger*).
* **`medusajs/medusa`** (*Node.js/TypeScript - 26k+ stars*)
  * *Pola Adopsi*: Skema profil pelanggan, akumulasi poin loyalitas otomatis dari persentase transaksi, dan sistem tiering pelanggan (Regular vs Agen/Grosir).

### D. Visualisasi Data & Charting
* **`chartjs/Chart.js`** (*Sudah terpasang di POS*)
  * *Pola Adopsi*: Visualisasi tren pendapatan harian, komposisi penjualan per kategori barang, dan rasio cash vs QRIS vs transfer.
* **`apexcharts/apexcharts.js`** (*Alternatif modern*)
  * *Pola Adopsi*: Visualisasi heatmap jam ramai transaksi kasir (*hourly transaction density*) untuk optimasi jam operasional dan staf.

### E. Sinkronisasi Database & Offline-First
* **`electric-sql/electric`** & **`powersync-ja/powersync-js`**
  * *Pola Adopsi*: Replikasi dua arah antara IndexedDB/SQLite lokal dan Supabase PostgreSQL menggunakan *Write-Ahead Logging* (WAL) dan resolusi konflik *Last-Write-Wins* (LWW) dengan timestamp presisi mikrodetik.
* **`dexie/Dexie.js`** (*Sudah terpasang di POS*)
  * *Pola Adopsi*: Penyimpanan lokal IndexedDB terindeks cepat dengan kemampuan query multi-kriteria untuk katalog barang dan riwayat transaksi saat jaringan terputus total.

### F. Keamanan, Cyber Security, & Hardening
* **`OWASP/ASVS`** (*Application Security Verification Standard*)
  * *Pola Adopsi*: Validasi input ketat di perbatasan client-server, sanitasi XSS (DOMPurify), dan penerapan Content Security Policy (CSP) ketat.
* **`supabase-community/supabase-vault`**
  * *Pola Adopsi*: Penggunaan *Database Functions* berkeamanan `SECURITY DEFINER` untuk membatasi eksekusi mutasi saldo hanya oleh prosedur tersimpan, menutup celah bypass dari API langsung.

---

## 4. Matriks Evaluasi Risiko & Solusi Teknis

| Ancaman / Masalah | Sumber Potensi Celah | Solusi Teknis Terpilih |
|---|---|---|
| **Manipulasi Harga Client** | Kasir memanipulasi payload JSON transaksi dari developer tools | **Postgres Trigger**: Harga barang wajib ditarik dari tabel `products` di server saat insert transaksi, bukan mengambil nilai `price` kiriman client. |
| **Pencurian Saldo / QRIS** | XSS atau modifikasi setting rekening toko | **RLS Update Lock**: Tabel `settings` hanya bisa diubah jika request memiliki header/role terverifikasi; nomor rekening di-hardcode hash verifikasinya. |
| **DDoS / Request Flooding** | Bot menembak endpoint database hingga kuota habis | **Cloudflare Turnstile + Supabase Rate Limiter**: Limit request maksimal 30 req/menit per IP untuk endpoint publik. |
| **CORS Hijacking** | Website luar mengirimkan query atas nama kasir | **Origin Whitelist**: Header `Access-Control-Allow-Origin` dikunci hanya untuk domain produksi resmi. |
| **Data Loss / Database Corrupt** | Kerusakan server Supabase atau insiden data terhapus | **Dual Automated Backup**: Dump lokal harian via script Node.js dan ekspor berkala ke Cloudflare R2 / repositori privat terenkripsi. |

---

## 5. Ringkasan & Roadmap Integrasi Bertahap

1. **Fase 1 (Selesai)**: Arsitektur PWA offline-first (Dexie.js) + Cloud Database (Supabase PostgreSQL) + Sinkronisasi Realtime WebSocket + Kunci Publishable Baru.
2. **Fase 2 (Rekomendasi Berikutnya)**: Pemasangan PostgreSQL Database Trigger di Supabase untuk proteksi validasi harga dan perhitungan subtotal di tingkat server.
3. **Fase 3 (Penguatan Jaringan)**: Routing domain via Cloudflare DNS + Turnstile pada transaksi kasir + Zero Trust Access pada modul Laporan Keuangan Owner.
4. **Fase 4 (Arsip Cloud)**: Otomatisasi backup berkala ke Cloudflare R2 Storage.
