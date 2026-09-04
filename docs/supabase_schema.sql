-- ==============================================================================
-- BLUE MOUNTAIN POS — SUPABASE POSTGRESQL MASTER SCHEMA
-- Multi-Device Realtime Cloud Synchronization Schema
-- ==============================================================================

-- 1. Table: products
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    sku TEXT,
    name TEXT NOT NULL,
    category TEXT DEFAULT 'Umum',
    price NUMERIC DEFAULT 0,
    cost NUMERIC DEFAULT 0,
    unit TEXT DEFAULT 'buah',
    emoji TEXT DEFAULT '📦',
    image TEXT,
    stock NUMERIC DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Table: customers
CREATE TABLE IF NOT EXISTS public.customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    category TEXT DEFAULT 'Rumah Tangga',
    total_orders NUMERIC DEFAULT 0,
    total_spent NUMERIC DEFAULT 0,
    total_debt NUMERIC DEFAULT 0,
    credit_limit NUMERIC DEFAULT 0,
    galon_loaned NUMERIC DEFAULT 0,
    notes TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Table: transactions
CREATE TABLE IF NOT EXISTS public.transactions (
    id TEXT PRIMARY KEY,
    invoice_no TEXT UNIQUE NOT NULL,
    date TIMESTAMPTZ DEFAULT now(),
    date_key TEXT,
    customer_name TEXT,
    items JSONB DEFAULT '[]'::jsonb,
    subtotal NUMERIC DEFAULT 0,
    discount NUMERIC DEFAULT 0,
    tax NUMERIC DEFAULT 0,
    total NUMERIC DEFAULT 0,
    paid NUMERIC DEFAULT 0,
    change NUMERIC DEFAULT 0,
    payment_method TEXT DEFAULT 'cash',
    payment_status TEXT DEFAULT 'cash_paid',
    paid_amount NUMERIC DEFAULT 0,
    remaining_debt NUMERIC DEFAULT 0,
    debt_payments JSONB DEFAULT '[]'::jsonb,
    cashier TEXT DEFAULT 'Admin',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Table: expenses
CREATE TABLE IF NOT EXISTS public.expenses (
    id TEXT PRIMARY KEY,
    date TIMESTAMPTZ DEFAULT now(),
    date_key TEXT,
    category TEXT DEFAULT 'Operasional',
    note TEXT,
    amount NUMERIC DEFAULT 0,
    cashier TEXT DEFAULT 'Admin',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Table: settings
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES (Public Anon Read/Write for POS Terminal)
-- ==============================================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anon all on products" ON public.products;
CREATE POLICY "Allow anon all on products" ON public.products FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon all on customers" ON public.customers;
CREATE POLICY "Allow anon all on customers" ON public.customers FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon all on transactions" ON public.transactions;
CREATE POLICY "Allow anon all on transactions" ON public.transactions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon all on expenses" ON public.expenses;
CREATE POLICY "Allow anon all on expenses" ON public.expenses FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon all on settings" ON public.settings;
CREATE POLICY "Allow anon all on settings" ON public.settings FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- REALTIME REPLICATION (Instant Multi-Device Broadcast via WebSocket)
-- ==============================================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'products'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'customers'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.customers;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'transactions'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'expenses'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.expenses;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'settings'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;
    END IF;
END $$;
