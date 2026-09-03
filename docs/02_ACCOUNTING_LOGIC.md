# 💰 02 — LOGIKA MATEMATIKA, KEUANGAN & AKUNTANSI
**Standar Pembukuan Berpasangan, Sub-Buku Besar Pelanggan & Presisi Finansial POS 2026**

---

## 1. Presisi Aritmatika & Integer Math (IDR Standards)

Operasi finansial menggunakan integer math untuk mencegah deviasi pecahan IEEE-754:
$$\text{TaxAmount} = \text{Math.round}\left(\frac{\text{Subtotal} \times \text{TaxRate}}{100}\right)$$
$$\text{Grand Total} = \text{Subtotal} - \text{Discount} + \text{TaxAmount}$$
$$\text{Change} = \max(0, \text{Paid} - \text{Grand Total})$$

---

## 2. Bagan Akun Standar (Chart of Accounts / COA)

| Kode Akun | Nama Akun | Tipe Akun | Saldo Normal |
|---|---|---|---|
| `1001` | Kas Kasir / Toko (Physical Cash Float) | Aset Lancar | Debit |
| `1002` | Bank Transfer & QRIS | Aset Lancar | Debit |
| `1101` | Piutang Usaha (Buku Pembantu Pelanggan) | Aset Lancar | Debit |
| `1201` | Persediaan Barang Dagang (Air & Galon) | Aset Lancar | Debit |
| `1301` | Aset Galon Fisik Toko | Aset Tetap / Inventaris | Debit |
| `4001` | Pendapatan Penjualan Air Galon & Produk | Pendapatan | Kredit |
| `5001` | Harga Pokok Penjualan (HPP) | Beban Pokok | Debit |
| `6001` | Beban Belanja Bahan, Tutup & Tisu Galon | Beban Operasional | Debit |
| `6002` | Beban Listrik, Air & Utilitas Depot | Beban Operasional | Debit |
| `6003` | Beban Gaji / Upah Karyawan | Beban Operasional | Debit |
| `6004` | Beban Transportasi & Pengantaran Galon | Beban Operasional | Debit |
| `6099` | Beban Operasional Lainnya | Beban Operasional | Debit |

---

## 3. Logika Double-Entry Jurnal & Rekonsiliasi Kas

Hukum konservasi pembukuan:
$$\sum \text{Debit} = \sum \text{Kredit}$$

### A. Jurnal Penjualan Tunai
- **Debit**: `[1001] Kas Kasir` (Sebesar Grand Total)
- **Kredit**: `[4001] Pendapatan Penjualan` (Sebesar Grand Total)

### B. Jurnal Penjualan Transfer / QRIS Dinamis
- **Debit**: `[1002] Bank Transfer & QRIS` (Sebesar Grand Total)
- **Kredit**: `[4001] Pendapatan Penjualan` (Sebesar Grand Total)

### C. Jurnal Penjualan Piutang & Pembayaran Cicilan
Saat Transaksi:
- **Debit**: `[1001] Kas Kasir` (Sebesar DP)
- **Debit**: `[1101] Piutang Usaha` (Sebesar Sisa Hutang)
- **Kredit**: `[4001] Pendapatan Penjualan` (Sebesar Total Nilai Transaksi)

Saat Cicilan Dibayar:
- **Debit**: `[1001] Kas Kasir` (Sebesar Cicilan Masuk)
- **Kredit**: `[1101] Piutang Usaha` (Sebesar Cicilan Masuk)

### D. Rekonsiliasi Kas Shift Kasir (X/Z Report)
$$\text{Kas Diharapkan} = \text{Modal Awal} + \sum \text{Kas Tunai} + \sum \text{Cicilan Tunai Masuk} - \sum \text{Pengeluaran Kas}$$
$$\text{Selisih Kas} = \text{Kas Fisik Aktual} - \text{Kas Diharapkan}$$

---

## 4. Matematika QRIS Dinamis (EMVCo Tag-Length-Value & CRC16-CCITT)

Untuk mengonversi QRIS statis menjadi QRIS dinamis berisikan nominal transaksi:
1. **Tag `54` (Transaction Amount)**: Disuntikkan panjang karakter dan nilai nominal.
   - Contoh nominal Rp 15.000: `540515000` (Tag `54`, Length `05`, Value `15000`).
2. **Tag `58` (Country Code)**: `5802ID`.
3. **Tag `63` (CRC16-CCITT)**: Dihitung ulang dengan polinomial `0x1021` (inisial `0xFFFF`) untuk menghasilkan 4 karakter heksadesimal checksum valid.
