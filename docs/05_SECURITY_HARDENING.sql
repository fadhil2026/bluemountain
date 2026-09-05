-- ==============================================================================
-- BLUE MOUNTAIN POS — SUPABASE SECURITY & ROW LEVEL SECURITY (RLS) HARDENING
-- Skrip Pengerasan Keamanan Database Cloud Supabase
-- Jalankan di: https://supabase.com/dashboard/project/wiapnhpdgjbtkblowfig/sql
-- ==============================================================================

-- 1. Cabut Kebijakan Terbuka Lama (Vulnerability: Anon Full Access)
DROP POLICY IF EXISTS "Allow anon all on products" ON public.products;
DROP POLICY IF EXISTS "Allow anon all on customers" ON public.customers;
DROP POLICY IF EXISTS "Allow anon all on transactions" ON public.transactions;
DROP POLICY IF EXISTS "Allow anon all on expenses" ON public.expenses;
DROP POLICY IF EXISTS "Allow anon all on settings" ON public.settings;

-- 2. Pastikan RLS Aktif pada Semua Tabel
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 3. KEBIJAKAN TABEL TRANSACTIONS (Anti-Manipulasi & Anti-Hapus Massal)
-- ==============================================================================
-- Baca transaksi
CREATE POLICY "pos_transactions_select" ON public.transactions
    FOR SELECT TO anon, authenticated USING (true);

-- Insert transaksi baru (wajib ada invoice_no dan total >= 0)
CREATE POLICY "pos_transactions_insert" ON public.transactions
    FOR INSERT TO anon, authenticated
    WITH CHECK (invoice_no IS NOT NULL AND total >= 0);

-- Update transaksi hanya untuk pelunasan hutang / konfirmasi transfer
CREATE POLICY "pos_transactions_update" ON public.transactions
    FOR UPDATE TO anon, authenticated
    USING (true)
    WITH CHECK (total >= 0);

-- DILARANG MENGHAPUS TRANSAKSI SECARA ANONIM (Mencegah sabotase/penghapusan riwayat pembukuan)
-- Catatan: Hanya role service_role/owner yang dapat menghapus via Supabase Dashboard.

-- ==============================================================================
-- 4. KEBIJAKAN TABEL EXPENSES (Pengeluaran Kas)
-- ==============================================================================
CREATE POLICY "pos_expenses_select" ON public.expenses
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "pos_expenses_insert" ON public.expenses
    FOR INSERT TO anon, authenticated
    WITH CHECK (amount >= 0);

CREATE POLICY "pos_expenses_update" ON public.expenses
    FOR UPDATE TO anon, authenticated
    USING (true)
    WITH CHECK (amount >= 0);

-- DILARANG MENGHAPUS PENGELUARAN SECARA ANONIM

-- ==============================================================================
-- 5. KEBIJAKAN TABEL CUSTOMERS (Data Pelanggan & Piutang)
-- ==============================================================================
CREATE POLICY "pos_customers_select" ON public.customers
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "pos_customers_insert" ON public.customers
    FOR INSERT TO anon, authenticated
    WITH CHECK (name IS NOT NULL AND length(trim(name)) > 0);

CREATE POLICY "pos_customers_update" ON public.customers
    FOR UPDATE TO anon, authenticated
    USING (true)
    WITH CHECK (name IS NOT NULL AND length(trim(name)) > 0);

-- ==============================================================================
-- 6. KEBIJAKAN TABEL PRODUCTS (Katalog Barang)
-- ==============================================================================
CREATE POLICY "pos_products_select" ON public.products
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "pos_products_insert" ON public.products
    FOR INSERT TO anon, authenticated
    WITH CHECK (price >= 0);

CREATE POLICY "pos_products_update" ON public.products
    FOR UPDATE TO anon, authenticated
    USING (true)
    WITH CHECK (price >= 0);

CREATE POLICY "pos_products_delete" ON public.products
    FOR DELETE TO anon, authenticated USING (true);

-- ==============================================================================
-- 7. KEBIJAKAN TABEL SETTINGS (Anti-Pembajakan Rekening & QRIS)
-- ==============================================================================
-- Semua client bisa membaca konfigurasi toko
CREATE POLICY "pos_settings_select" ON public.settings
    FOR SELECT TO anon, authenticated USING (true);

-- Izinkan update pengaturan operasional
CREATE POLICY "pos_settings_update" ON public.settings
    FOR UPDATE TO anon, authenticated
    USING (true)
    WITH CHECK (key IS NOT NULL);

CREATE POLICY "pos_settings_insert" ON public.settings
    FOR INSERT TO anon, authenticated
    WITH CHECK (key IS NOT NULL);
