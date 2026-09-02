# 🛡️ 03 — PROTOKOL VERIFIKASI MILITER & QA GATE
**Aturan Mutlak Pra-Commit & Pra-Deploy (Zero-Tolerance Policy)**

---

## 1. 12 Aturan Mutlak Pengembangan (Absolute Rules)

1. **Zero Placeholder / Zero Mock**:
   - Dilarang keras menyisakan data tiruan, dummy hardcoded, atau placeholder statis pada alur data produksi.
2. **Zero Syntax & Compilation Error**:
   - Setiap file JavaScript wajib lolos verifikasi AST parser Node.js (`node --check`) tanpa peringatan sintaksis.
3. **Immutability Versioning**:
   - Versi `package.json`, runtime `__APP_VERSION__`, dan badge `README.md` wajib tersinkronisasi otomatis via `scripts/verify.js` berdasarkan revisi commit Git aktual.
4. **Mandatory Build Validation**:
   - Perubahan kode dianggap BELUM SELESAI sebelum perintah `npm run verify` dan `npm run build` selesai dieksekusi dengan status *Exit Code 0*.
5. **No Secret Leakage**:
   - Kunci *Service Role* Supabase tidak boleh dimasukkan ke dalam kode frontend client. Hanya *Anon Public Key* yang diizinkan.
6. **Input Sanitization**:
   - Semua input dinamis yang berpotensi dirender ke DOM wajib melewati fungsi sanitasi `esc()` untuk mencegah serangan XSS.
7. **Customer Data Integrity**:
   - Nomor WhatsApp pelanggan harus dinormalisasi (menghapus karakter non-digit dan mengubah awalan `08xx` menjadi format standar `628xx`).
8. **Write-Ahead Offline Persistence**:
   - Seluruh operasi transaksi kasir & data pelanggan wajib tersimpan ke IndexedDB lokal terlebih dahulu sebelum di-push ke Cloud.
9. **Presisi Format Thermal**:
   - Struk thermal tidak boleh melebihi batas karakter per baris (30 karakter untuk 48mm, 32 karakter untuk 58mm, 48 karakter untuk 80mm).
10. **Single Source of Truth**:
    - Seluruh perubahan arsitektur atau fitur wajib didokumentasikan di folder `docs/` dan `README.md`.
11. **Clean Working Tree**:
    - Build artifact `dist/` wajib di-commit bersamaan dengan source code agar live deployment di GitHub Pages selalu mutakhir.
12. **Double-Entry Balance Guarantee**:
    - Setiap entri pembukuan dan cicilan wajib menjaga neraca $\sum \text{Debit} == \sum \text{Kredit}$.

---

## 2. Checklist Eksekusi Pra-Deploy (Deployment Quality Gate)

```bash
# 1. Jalankan audit sintaksis seluruh file JS & verifikasi versi
npm run verify

# 2. Jalankan build bundling Vite & PWA Service Worker
npm run build

# 3. Validasi status git & commit
git status
git add -A
git commit -m "..."
git push origin main
```
