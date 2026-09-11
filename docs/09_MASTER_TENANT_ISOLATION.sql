-- ==============================================================================
-- BLUE MOUNTAIN POS — MASTER TENANT PARTITION & MILITARY HARDENING SCHEMA (v1.0.1)
-- Mengunci semua entitas ke 1 Database Master ID: STORE-BM-856CFAC8
-- Jalankan di Supabase SQL Editor:
-- https://supabase.com/dashboard/project/wiapnhpdgjbtkblowfig/sql
-- ==============================================================================

-- 1. Tambah Kolom store_id ke Tabel Utama (Jika Belum Ada)
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8';
ALTER TABLE IF EXISTS public.customers ADD COLUMN IF NOT EXISTS store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8';
ALTER TABLE IF EXISTS public.transactions ADD COLUMN IF NOT EXISTS store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8';
ALTER TABLE IF EXISTS public.expenses ADD COLUMN IF NOT EXISTS store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8';
ALTER TABLE IF EXISTS public.settings ADD COLUMN IF NOT EXISTS store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8';

-- 2. Buat Tabel Pengguna Aplikasi (app_users) dengan store_id
CREATE TABLE IF NOT EXISTS public.app_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8',
    username TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'cashier' CHECK (role IN ('owner', 'supervisor', 'cashier')),
    pin_hash TEXT NOT NULL,
    pin_salt TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_store_username UNIQUE (store_id, username)
);

-- Tambah kolom store_id jika app_users sudah ada sebelumnya
ALTER TABLE IF EXISTS public.app_users ADD COLUMN IF NOT EXISTS store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8';

-- 3. Indeks Performa & Partisi Tenant
CREATE INDEX IF NOT EXISTS idx_products_store_id ON public.products (store_id);
CREATE INDEX IF NOT EXISTS idx_customers_store_id ON public.customers (store_id);
CREATE INDEX IF NOT EXISTS idx_transactions_store_id ON public.transactions (store_id);
CREATE INDEX IF NOT EXISTS idx_expenses_store_id ON public.expenses (store_id);
CREATE INDEX IF NOT EXISTS idx_settings_store_id ON public.settings (store_id);
CREATE INDEX IF NOT EXISTS idx_app_users_store_id ON public.app_users (store_id);
CREATE INDEX IF NOT EXISTS idx_app_users_username ON public.app_users (username);

-- 4. Kunci Semua Data Eksisting ke Toko Utama
UPDATE public.products SET store_id = 'STORE-BM-856CFAC8' WHERE store_id IS NULL OR store_id = '';
UPDATE public.customers SET store_id = 'STORE-BM-856CFAC8' WHERE store_id IS NULL OR store_id = '';
UPDATE public.transactions SET store_id = 'STORE-BM-856CFAC8' WHERE store_id IS NULL OR store_id = '';
UPDATE public.expenses SET store_id = 'STORE-BM-856CFAC8' WHERE store_id IS NULL OR store_id = '';
UPDATE public.settings SET store_id = 'STORE-BM-856CFAC8' WHERE store_id IS NULL OR store_id = '';
UPDATE public.app_users SET store_id = 'STORE-BM-856CFAC8' WHERE store_id IS NULL OR store_id = '';

-- 5. Row Level Security (RLS) Multi-Tenant Policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;

-- Policy Products
DROP POLICY IF EXISTS "tenant_products_policy" ON public.products;
CREATE POLICY "tenant_products_policy" ON public.products FOR ALL TO anon, authenticated
    USING (store_id = 'STORE-BM-856CFAC8')
    WITH CHECK (store_id = 'STORE-BM-856CFAC8');

-- Policy Customers
DROP POLICY IF EXISTS "tenant_customers_policy" ON public.customers;
CREATE POLICY "tenant_customers_policy" ON public.customers FOR ALL TO anon, authenticated
    USING (store_id = 'STORE-BM-856CFAC8')
    WITH CHECK (store_id = 'STORE-BM-856CFAC8');

-- Policy Transactions
DROP POLICY IF EXISTS "tenant_transactions_policy" ON public.transactions;
CREATE POLICY "tenant_transactions_policy" ON public.transactions FOR ALL TO anon, authenticated
    USING (store_id = 'STORE-BM-856CFAC8')
    WITH CHECK (store_id = 'STORE-BM-856CFAC8');

-- Policy Expenses
DROP POLICY IF EXISTS "tenant_expenses_policy" ON public.expenses;
CREATE POLICY "tenant_expenses_policy" ON public.expenses FOR ALL TO anon, authenticated
    USING (store_id = 'STORE-BM-856CFAC8')
    WITH CHECK (store_id = 'STORE-BM-856CFAC8');

-- Policy Settings
DROP POLICY IF EXISTS "tenant_settings_policy" ON public.settings;
CREATE POLICY "tenant_settings_policy" ON public.settings FOR ALL TO anon, authenticated
    USING (store_id = 'STORE-BM-856CFAC8')
    WITH CHECK (store_id = 'STORE-BM-856CFAC8');

-- Policy App Users
DROP POLICY IF EXISTS "tenant_users_policy" ON public.app_users;
CREATE POLICY "tenant_users_policy" ON public.app_users FOR ALL TO anon, authenticated
    USING (store_id = 'STORE-BM-856CFAC8')
    WITH CHECK (store_id = 'STORE-BM-856CFAC8');

-- 6. Daftarkan Semua Tabel ke Realtime Publication
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'products') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'customers') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.customers;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'transactions') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'expenses') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.expenses;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'settings') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'app_users') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.app_users;
    END IF;
END $$;
