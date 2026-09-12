# 📘 PANDUAN MUTLAK VIBE CODING HIGH-END (0–100 PRODUCTION PLAYBOOK)

Dokumen ini adalah manual operasional dan pola baku (*golden pattern*) untuk seluruh siklus hidup pengembangan sistem dari nol hingga rilis produksi tanpa celah (*zero defect, zero dummy, zero halu*).

---

## 🧭 FLOWCHART WORKFLOW OTOMATIS

```
[0. Konteks & Graf] ──> [1. PRD & Task Graph] ──> [2. Arsitektur Domain]
    (Graphify/Mem0)           (Ralph / Taskmaster)       (Akaunting / tRPC)
           │
           ▼
[3. Vibe Coding Mature] ──> [4. Anti-Halu & Zero Dummy] ──> [5. DevSecOps Red-Team]
  (Modular / YAGNI / UI)        (Production Enforcer)           (Claude-BugHunter)
           │
           ▼
[6. Linter Rust Biome] ──> [7. Vitest & Playwright] ──> [8. Core Web Vitals Gate]
     (0 Warning)             (Unit, Integration, E2E)       (Pre-Commit QA Gate)
           │
           ▼
  [9. Report & Deploy]
```

---

## 🛠️ DETAIL POLA EKSEKUSI PER FASE

### Fase 0: Pemetaan Pengetahuan & Konteks (Knowledge Graph)
- **Kapan Digunakan**: Sebelum menyentuh kode legacy atau memulai perombakan fitur.
- **Perintah Eksekusi**:
  ```bash
  graphify . --mode deep
  ```
- **Output**: Knowledge graph file (`graphify-out/graph.json`), visualisasi HTML (`graphify-out/graph.html`), dan identifikasi *god nodes* untuk memitigasi *breaking changes*.

### Fase 1: Perencanaan & Task Dependency (PRD & Tasks)
- **Kapan Digunakan**: Saat menerima spesifikasi baru atau target perbaikan.
- **Instrumen**:
  - `spec-kit`: Definisikan spesifikasi formal.
  - `prd-taskmaster`: Konversi ide menjadi graf tugas dependen.
  - `ralph`: Loop eksekusi mandiri sampai semua unit test lulus.

### Fase 2: Arsitektur API & Domain Akuntansi Enterprise
- **Aturan Transaksi (Pola Akaunting)**:
  - Nilai moneter wajib disimpan sebagai bilangan bulat terkecil (misal sen/rupiah tanpa pecahan mengambang) atau `DECIMAL(19, 4)`.
  - Mutasi uang wajib memiliki pasangan Debit dan Credit yang seimbang.
  - Setiap mutasi database wajib dilindungi *idempotency key*.
- **Kontrak API (tRPC)**:
  - Definisi prosedur strictly typed dengan skema runtime Zod:
    ```typescript
    export const checkoutProcedure = protectedProcedure
      .input(z.object({
        cartId: z.string().uuid(),
        items: z.array(z.object({ id: z.string().uuid(), qty: z.number().int().positive() })),
        idempotencyKey: z.string().uuid()
      }))
      .mutation(async ({ ctx, input }) => { /* real implementation */ });
    ```

### Fase 3: Vibe Coding High-End Execution
- **Prinsip Dasar**:
  - *Deletion before addition*: Hapus kode mubazir sebelum menambah abstraksi baru.
  - *Native over wrapper*: Utamakan fitur native platform (CSS modern, native SQL constraint, IndexedDB bawaan).
  - *Rich Aesthetics*: Wajib menyematkan dark mode, glassmorphism halus, warna berbasis HSL/OKLCH, dan animasi responsif (zero default/ugly UI).

### Fase 4: Zero Dummy & Forensic Debugging
- **Katalog Larangan Keras**:
  - ❌ DILARANG: `// TODO: implement later`
  - ❌ DILARANG: `const mockData = [...]` di modul produksi.
  - ❌ DILARANG: `try { ... } catch (e) {}` (menelan error tanpa log & pemulihan state).
  - ❌ DILARANG: Impor pustaka khayalan yang tidak terpasang di `package.json`.

### Fase 5: DevSecOps & Red-Team Verification (Claude-BugHunter)
- **Daftar Periksa Keamanan (83 Modul Hunt)**:
  - **Auth & JWT**: Uji algoritma token (`alg: none`, bypass kunci simetris HS256/RS256).
  - **IDOR**: Pastikan pengguna hanya dapat mengakses data milik `tenant_id` atau `user_id` miliknya.
  - **Business Logic**: Uji kupon ganda, harga negatif, keranjang belanja kedaluwarsa.
  - **Race Condition**: Uji eksekusi paralel mutasi saldo/stok barang.

### Fase 6: Linter & Formatter Rust (Biome)
- **Perintah Eksekusi**:
  ```bash
  # Otomatis perbaiki formatting dan linting
  npx @biomejs/biome check --write .

  # Verifikasi integritas tanpa ubah file (QA Mode)
  npx @biomejs/biome ci .
  ```

### Fase 7: Pengujian Otomatis (Vitest & Playwright)
- **Unit & Integrasi**:
  ```bash
  vitest run --coverage
  ```
- **End-to-End Cross Device (Desktop & HP)**:
  ```bash
  npx playwright test
  ```
  - Wajib memverifikasi bahwa produk/data yang diinput di Desktop langsung muncul secara real-time di antarmuka Mobile tanpa data mismatch.

### Fase 8: Core Web Vitals & Finishing
- LCP (Largest Contentful Paint) < 1.2s.
- CLS (Cumulative Layout Shift) < 0.05.
- INP (Interaction to Next Paint) < 100ms.
- Pre-commit check wajib bersih tanpa pesan warning.

### Fase 9: Laporan & Triage Akhir
- Tulis ringkasan terstruktur dengan format empiris:
  1. Komponen yang diubah.
  2. Hasil uji coba (Unit, E2E, Keamanan).
  3. Tabel komparasi Before vs After.
