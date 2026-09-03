# 💰 02 — LOGIKA MATEMATIKA, KEUANGAN & AKUNTANSI POS ENTERPRISE
**Standar SAK EMKM, Pembukuan Berpasangan, Sub-Buku Besar & Presisi Finansial 2026**

---

## 1. Kepatuhan Standar Akuntansi (SAK EMKM)

Sistem Kasir POS dirancang mengacu pada **Standar Akuntansi Keuangan Entitas Mikro, Kecil, dan Menengah (SAK EMKM)** yang berlaku di Indonesia:
1. **Prinsip Biaya Historis**: Aset dan kewajiban dicatat sebesar harga perolehan aktual transaksi.
2. **Laporan Keuangan Utama SAK EMKM**:
   - **Laporan Laba Rugi**: Pendapatan Usaha $-$ HPP $-$ Beban Operasional $=$ Laba Bersih.
   - **Laporan Posisi Keuangan (Neraca)**: Aset Lancar + Aset Tetap $=$ Kewajiban + Ekuitas Modal.
   - **Laporan Arus Kas (Metode Langsung)**: Arus Kas Operasi (Penerimaan Penjualan Tunai/Transfer/Cicilan $-$ Pengeluaran Operasional).

---

## 2. Presisi Aritmatika & Integer Math (Pencegahan Floating Point Bug)

Operasi finansial Rupiah (IDR) menggunakan pembulatan integer `Math.round()` untuk mencegah deviasi pecahan IEEE-754 ($0.1 + 0.2 \ne 0.3$):
$$\text{TaxAmount} = \text{Math.round}\left(\frac{\text{Subtotal} \times \text{TaxRate}}{100}\right)$$
$$\text{Grand Total} = \text{Subtotal} - \text{Discount} + \text{TaxAmount}$$
$$\text{Change} = \max(0, \text{Paid} - \text{Grand Total})$$

---

## 3. Bagan Akun Standar (Chart of Accounts / COA)

| Kode Akun | Nama Akun | Kategori SAK EMKM | Saldo Normal |
|---|---|---|---|
| `1001` | Kas Kasir / Toko (Physical Cash Float) | Aset Lancar | Debit |
| `1002` | Bank Transfer & QRIS | Aset Lancar | Debit |
| `1101` | Piutang Usaha (Buku Pembantu Pelanggan) | Aset Lancar | Debit |
| `1201` | Persediaan Barang Dagang (Air Galon & Botol) | Aset Lancar | Debit |
| `1301` | Aset Galon Fisik Toko | Aset Tetap / Inventaris | Debit |
| `2001` | Utang Usaha / Belanja Tempo | Kewajiban Lancar | Kredit |
| `3001` | Modal Pemilik (Modal Awal Usaha) | Ekuitas Modal | Kredit |
| `3002` | Laba Ditahan / Akumulasi Keuntungan | Ekuitas Modal | Kredit |
| `4001` | Pendapatan Penjualan Air Galon & Produk | Pendapatan | Kredit |
| `5001` | Harga Pokok Penjualan (HPP / COGS) | Beban Pokok | Debit |
| `6001` | Beban Belanja Bahan, Tutup & Tisu Galon | Beban Operasional | Debit |
| `6002` | Beban Listrik, Air & Utilitas Depot | Beban Operasional | Debit |
| `6003` | Beban Gaji / Upah Karyawan | Beban Operasional | Debit |
| `6004` | Beban Transportasi & Pengantaran Galon | Beban Operasional | Debit |
| `6099` | Beban Operasional Lainnya | Beban Operasional | Debit |

---

## 4. Logika Double-Entry Jurnal & Valuasi Persediaan

Hukum konservasi pembukuan:
$$\sum \text{Debit} - \sum \text{Kredit} = 0$$

### A. Jurnal Penjualan Tunai
- **Debit**: `[1001] Kas Kasir` (Sebesar Grand Total)
- **Kredit**: `[4001] Pendapatan Penjualan` (Sebesar Grand Total)
- **Debit**: `[5001] Harga Pokok Penjualan (HPP)` (Sebesar Unit Cost $\times$ Qty)
- **Kredit**: `[1201] Persediaan Barang Dagang` (Sebesar Unit Cost $\times$ Qty)

### B. Jurnal Penjualan Transfer / QRIS Dinamis
- **Debit**: `[1002] Bank Transfer & QRIS` (Sebesar Grand Total)
- **Kredit**: `[4001] Pendapatan Penjualan` (Sebesar Grand Total)

### C. Jurnal Penjualan Piutang & Pembayaran Cicilan
Saat Transaksi:
- **Debit**: `[1001] Kas Kasir` (Sebesar DP)
- **Debit**: `[1101] Piutang Usaha - Pelanggan [Nama]` (Sebesar Sisa Hutang)
- **Kredit**: `[4001] Pendapatan Penjualan` (Sebesar Total Nilai Transaksi)

Saat Cicilan Dibayar:
- **Debit**: `[1001] Kas Kasir` (Sebesar Cicilan Masuk)
- **Kredit**: `[1101] Piutang Usaha - Pelanggan [Nama]` (Sebesar Cicilan Masuk)

### D. Valuasi Persediaan (Weighted Average Costing Method)
Untuk depot air isi ulang dan barang dagang, sistem menggunakan metode biaya rata-rata tertimbang (*Moving Average Cost*):
$$\text{Average Cost Baru} = \frac{(\text{Stok Lama} \times \text{Cost Lama}) + (\text{Qty Baru} \times \text{Harga Beli Baru})}{\text{Stok Lama} + \text{Qty Baru}}$$
$$\text{Gross Profit (Laba Kotor)} = \text{Harga Jual} - \text{Average Cost}$$

---

## 5. Manajemen Shift Kasir & Rekonsiliasi Kas (X & Z Report)

Sistem mengadopsi prosedur rekonsiliasi kas industri (*Imprest Petty Cash*):
1. **Opening Float (Modal Kas Awal)**: Diinput kasir saat mulai shift (misal: Rp 100.000 uang kembalian).
2. **X-Report (Laporan Kas Berjalan)**: Menghitung total kas sementara tanpa menutup register kasir.
3. **Z-Report (Tutup Kasir Harian)**:
$$\text{Kas Diharapkan} = \text{Modal Awal} + \sum \text{Penerimaan Tunai} + \sum \text{Cicilan Tunai} - \sum \text{Pengeluaran Kas}$$
$$\text{Selisih Kas} = \text{Kas Fisik Dihitung} - \text{Kas Diharapkan}$$
- Jika $\text{Selisih} < 0 \rightarrow$ Kas Kurang (Shortage).
- Jika $\text{Selisih} > 0 \rightarrow$ Kas Lebih (Overage).

---

## 6. Analisis Umur Piutang (Accounts Receivable Aging Schedule)

Piutang pelanggan dikelompokkan secara otomatis berdasarkan hari berjalan:
- **0 - 30 Hari (Lancar)**: Tempo kredit wajar.
- **31 - 60 Hari (Jatuh Tempo)**: Otomatis memicu tombol *Kirim Pengingat WhatsApp Tagihan*.
- **> 60 Hari (Macet / Kritis)**: Blokir transaksi hutang baru hingga cicilan dilunasi.

---

## 7. Matematika QRIS Dinamis (EMVCo Tag-Length-Value & CRC16-CCITT)

Untuk mengonversi QRIS statis toko menjadi QRIS dinamis otomatis terisi nominal:
1. **TLV Parser**: Mengurai string QRIS menjadi pasangan Tag, Length, Value.
2. **Injeksi Tag `54` (Transaction Amount)**:
   - Nilai Rp 15.000 $\rightarrow$ `540515000`.
3. **Rekalkulasi Checksum Tag `63` (CRC16-CCITT)**:
   - Polinomial: `0x1021`, Initial Value: `0xFFFF`.
   - Menghasilkan 4 karakter heksadesimal valid untuk dibaca oleh aplikasi BCA, Mandiri, BRI, GoPay, OVO, Dana, ShopeePay.
