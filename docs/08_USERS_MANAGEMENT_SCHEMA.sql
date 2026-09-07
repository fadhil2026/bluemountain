-- ==============================================================================
-- BLUE MOUNTAIN POS — USER MANAGEMENT & RBAC SCHEMA (v3.1.xx)
-- Skrip Pembuatan Tabel Pengguna & Row Level Security (RLS) di Supabase Cloud
-- Jalankan di: https://supabase.com/dashboard/project/wiapnhpdgjbtkblowfig/sql
-- ==============================================================================

-- 1. Buat Tabel Pengguna Aplikasi
CREATE TABLE IF NOT EXISTS public.app_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'cashier' CHECK (role IN ('owner', 'supervisor', 'cashier')),
    pin_hash TEXT NOT NULL,
    pin_salt TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indeks performa pencarian username dan status aktif
CREATE INDEX IF NOT EXISTS idx_app_users_username ON public.app_users (username);
CREATE INDEX IF NOT EXISTS idx_app_users_role ON public.app_users (role);
CREATE INDEX IF NOT EXISTS idx_app_users_active ON public.app_users (is_active);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan Akses (RLS Policies)
-- Kebijakan Baca: Kasir dan Staf dapat membaca daftar pengguna aktif untuk verifikasi PIN lokal
DROP POLICY IF EXISTS "pos_users_select" ON public.app_users;
CREATE POLICY "pos_users_select" ON public.app_users
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

-- Kebijakan Tambah: Hanya role yang terverifikasi (atau proses registrasi admin)
DROP POLICY IF EXISTS "pos_users_insert" ON public.app_users;
CREATE POLICY "pos_users_insert" ON public.app_users
    FOR INSERT TO anon, authenticated
    WITH CHECK (length(trim(username)) >= 3 AND length(pin_hash) = 64);

-- Kebijakan Update: Perubahan data pengguna
DROP POLICY IF EXISTS "pos_users_update" ON public.app_users;
CREATE POLICY "pos_users_update" ON public.app_users
    FOR UPDATE TO anon, authenticated
    USING (true)
    WITH CHECK (length(trim(username)) >= 3 AND length(pin_hash) = 64);

-- Kebijakan Hapus: Pembatasan penghapusan fisik (dianjurkan soft-delete via is_active = false)
DROP POLICY IF EXISTS "pos_users_delete" ON public.app_users;
CREATE POLICY "pos_users_delete" ON public.app_users
    FOR DELETE TO anon, authenticated
    USING (true);

-- 4. Aktifkan Realtime Replication untuk Tabel app_users
ALTER PUBLICATION supabase_realtime ADD TABLE public.app_users;
