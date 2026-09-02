# 💰 02 — LOGIKA MATEMATIKA, KEUANGAN & AKUNTANSI
**Standar Pembukuan Berpasangan & Presisi Finansial POS**

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
| `1101` | Piutang Usaha (Hutang Pelanggan) | Aset Lancar | Debit |
| `4001` | Pendapatan Penjualan | Pendapatan | Kredit |
| `6001` | Beban Belanja Bahan & Galon | Beban Operasional | Debit |
| `6002` | Beban Listrik, Air & Utilitas | Beban Operasional | Debit |
| `6003` | Beban Gaji / Upah | Beban Operasional | Debit |
| `6004` | Beban Transportasi & Pengantaran | Beban Operasional | Debit |
| `6099` | Beban Operasional Lainnya | Beban Operasional | Debit |

---

## 3. Logika Double-Entry Jurnal Penjualan & Pengeluaran

Hukum dasar konservasi akuntansi:
$$\sum \text{Debit} = \sum \text{Kredit}$$

### A. Penjualan Tunai Lunas (Cash Sale)
- **Debit**: `1001 - Kas Kasir` (Sebesar Grand Total)
- **Kredit**: `4001 - Pendapatan Penjualan` (Sebesar Grand Total)

### B. Penjualan Transfer Bank Terkonfirmasi
- **Debit**: `1002 - Bank Transfer` (Sebesar Grand Total)
- **Kredit**: `4001 - Pendapatan Penjualan` (Sebesar Grand Total)

### C. Penjualan Piutang / Hutang Pelanggan (Debt Sale)
Saat transaksi dibuat dengan uang muka (DP):
- **Debit**: `1001 - Kas Kasir` (Sebesar DP yang dibayar)
- **Debit**: `1101 - Piutang Usaha` (Sebesar Sisa Hutang)
- **Kredit**: `4001 - Pendapatan Penjualan` (Sebesar Total Nilai Transaksi)

Saat pelanggan membayar cicilan piutang:
- **Debit**: `1001 - Kas Kasir` (Sebesar Nilai Cicilan)
- **Kredit**: `1101 - Piutang Usaha` (Sebesar Nilai Cicilan)

### D. Pengeluaran Operasional (Expense)
- **Debit**: `600x - Beban Terkait` (Sebesar Nilai Pengeluaran)
- **Kredit**: `1001 - Kas Kasir` (Sebesar Nilai Pengeluaran)

---

## 4. Formula Rekonsiliasi Saldo Kas Bersih

Perhitungan saldo kas fisik real-time:
$$\text{Saldo Kas} = \text{Modal Awal} + \sum \text{Kas Tunai} + \sum \text{Transfer Confirmed} + \sum \text{Cicilan Piutang Masuk} - \sum \text{Pengeluaran}$$
