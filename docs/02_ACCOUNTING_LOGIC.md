# 💰 02 — LOGIKA MATEMATIKA, KEUANGAN & AKUNTANSI
**Standar Pembukuan Berpasangan, Sub-Buku Besar Pelanggan & Presisi Finansial**

---

## 1. Presisi Aritmatika & Pencegahan Floating Point Bug

Dalam sistem keuangan digital, penggunaan floating point standar IEEE-754 dapat memicu deviasi pecahan (misal $0.1 + 0.2 = 0.30000000000000004$).

### Standar Presisi Rupiah (IDR):
1. Rupiah adalah mata uang integer (tidak menggunakan pecahan sen aktif).
2. Setiap operasi persentase (diskon/pajak) **wajib menggunakan pembulatan integer** `Math.round()`:
$$\text{TaxAmount} = \text{Math.round}\left(\frac{\text{Subtotal} \times \text{TaxRate}}{100}\right)$$
$$\text{Total} = \text{Subtotal} - \text{Discount} + \text{TaxAmount}$$
3. Nilai kembalian tidak boleh negatif:
$$\text{Change} = \max(0, \text{Paid} - \text{Total})$$

---

## 2. Bagan Akun Standar (Chart of Accounts / COA)

| Kode Akun | Nama Akun | Tipe Akun | Saldo Normal |
|---|---|---|---|
| `1001` | Kas Kasir / Toko | Aset Lancar | Debit |
| `1002` | Bank Transfer | Aset Lancar | Debit |
| `1101` | Piutang Usaha (Buku Pembantu Pelanggan) | Aset Lancar | Debit |
| `4001` | Pendapatan Penjualan Air Galon & Produk | Pendapatan | Kredit |
| `6001` | Beban Belanja Bahan & Galon | Beban Operasional | Debit |
| `6002` | Beban Listrik, Air & Utilitas | Beban Operasional | Debit |
| `6003` | Beban Gaji / Upah Karyawan | Beban Operasional | Debit |
| `6004` | Beban Transportasi & Pengantaran Galon | Beban Operasional | Debit |
| `6099` | Beban Operasional Lainnya | Beban Operasional | Debit |

---

## 3. Logika Double-Entry Jurnal & Sub-Buku Besar Pelanggan

Hukum dasar konservasi akuntansi:
$$\sum \text{Debit} = \sum \text{Kredit}$$

### A. Penjualan Tunai Lunas (Cash Sale)
- **Debit**: `[1001] Kas Kasir` (Sebesar Grand Total)
- **Kredit**: `[4001] Pendapatan Penjualan` (Sebesar Grand Total)
- *Efek Pelanggan*: `total_orders += 1`, `total_spent += Total`.

### B. Penjualan Transfer Bank Terkonfirmasi
- **Debit**: `[1002] Bank Transfer` (Sebesar Grand Total)
- **Kredit**: `[4001] Pendapatan Penjualan` (Sebesar Grand Total)
- *Efek Pelanggan*: `total_orders += 1`, `total_spent += Total`.

### C. Penjualan Piutang / Hutang Pelanggan (Debt Sale)
Saat transaksi dibuat dengan uang muka (DP):
- **Debit**: `[1001] Kas Kasir` (Sebesar DP yang dibayar)
- **Debit**: `[1101] Piutang Usaha - Pelanggan [ID/Nama]` (Sebesar Sisa Hutang)
- **Kredit**: `[4001] Pendapatan Penjualan` (Sebesar Total Nilai Transaksi)
- *Efek Pelanggan*: `total_orders += 1`, `total_spent += Total`, `total_debt += SisaHutang`.

Saat pelanggan membayar cicilan piutang:
- **Debit**: `[1001] Kas Kasir` (Sebesar Nilai Cicilan)
- **Kredit**: `[1101] Piutang Usaha - Pelanggan [ID/Nama]` (Sebesar Nilai Cicilan)
- *Efek Pelanggan*: `total_debt -= NilaiCicilan` (berkurang realtime hingga Rp 0 saat Lunas).

### D. Validasi Batas Kredit Pelanggan (Credit Limit Guard)
Sebelum transaksi piutang disetujui, kasir memvalidasi:
$$(\text{total\_debt}_{\text{lama}} + \text{SisaHutang}_{\text{baru}}) \le \text{credit\_limit}$$
Jika melebihi limit kredit, kasir akan menerima peringatan konfirmasi otorisasi.

---

## 4. Analisis Umur Piutang (Accounts Receivable Aging Schedule)

Sistem mengklasifikasikan piutang pelanggan ke dalam 3 ember waktu (*aging buckets*):
1. **Lancar (0 - 30 Hari)**: Piutang aktif dalam tempo wajar.
2. **Jatuh Tempo (31 - 60 Hari)**: Memerlukan kirim pengingat WhatsApp otomatis.
3. **Kritis (> 60 Hari)**: Peringatan kredit macet, penangguhan pengantaran galon baru hingga cicilan dibayarkan.

---

## 5. Formula Rekonsiliasi Saldo Kas Bersih

Perhitungan saldo kas fisik real-time:
$$\text{Saldo Kas} = \text{Modal Awal} + \sum \text{Kas Tunai} + \sum \text{Transfer Confirmed} + \sum \text{Cicilan Piutang Masuk} - \sum \text{Pengeluaran}$$
