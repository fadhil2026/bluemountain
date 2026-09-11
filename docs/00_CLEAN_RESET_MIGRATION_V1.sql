-- ==============================================================================
-- BLUE MOUNTAIN POS — CLEAN RESET MIGRATION v1.0.0
-- Database: PostgreSQL (Supabase Free Tier)
-- Architecture: Online-First Single Source of Truth
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. RESET EXISTING OBJECTS (CLEAN START v1.0.0)
DROP TABLE IF EXISTS public.transactions CASCADE;
DROP TABLE IF EXISTS public.expenses CASCADE;
DROP TABLE IF EXISTS public.customers CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.app_users CASCADE;
DROP TABLE IF EXISTS public.settings CASCADE;

-- 3. APP USERS (RBAC)
CREATE TABLE public.app_users (
    id TEXT PRIMARY KEY,
    store_id TEXT NOT NULL DEFAULT 'STORE-BM-856CFAC8',
    username TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('owner', 'supervisor', 'cashier')),
    pin_hash TEXT NOT NULL,
    pin_salt TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PRODUCTS (INVENTORY)
CREATE TABLE public.products (
    id TEXT PRIMARY KEY,
    sku TEXT UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Umum',
    price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    unit TEXT NOT NULL DEFAULT 'buah',
    emoji TEXT DEFAULT '📦',
    image TEXT,
    stock INTEGER NOT NULL DEFAULT 0,
    deleted_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CUSTOMERS (CRM 360)
CREATE TABLE public.customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    category TEXT NOT NULL DEFAULT 'Rumah Tangga',
    total_orders INTEGER NOT NULL DEFAULT 0,
    total_spent NUMERIC(14, 2) NOT NULL DEFAULT 0,
    total_debt NUMERIC(14, 2) NOT NULL DEFAULT 0,
    credit_limit NUMERIC(14, 2) NOT NULL DEFAULT 0,
    galon_loaned INTEGER NOT NULL DEFAULT 0,
    notes TEXT,
    deleted_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. TRANSACTIONS
CREATE TABLE public.transactions (
    id TEXT PRIMARY KEY,
    invoice_no TEXT NOT NULL UNIQUE,
    date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    date_key TEXT NOT NULL,
    customer_name TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC(14, 2) NOT NULL DEFAULT 0,
    discount NUMERIC(14, 2) NOT NULL DEFAULT 0,
    tax NUMERIC(14, 2) NOT NULL DEFAULT 0,
    total NUMERIC(14, 2) NOT NULL DEFAULT 0,
    paid NUMERIC(14, 2) NOT NULL DEFAULT 0,
    change NUMERIC(14, 2) NOT NULL DEFAULT 0,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'transfer', 'debt')),
    payment_status TEXT NOT NULL,
    paid_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
    remaining_debt NUMERIC(14, 2) NOT NULL DEFAULT 0,
    debt_payments JSONB NOT NULL DEFAULT '[]'::jsonb,
    cashier TEXT NOT NULL DEFAULT 'Admin',
    sync_status TEXT NOT NULL DEFAULT 'synced',
    deleted_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. EXPENSES
CREATE TABLE public.expenses (
    id TEXT PRIMARY KEY,
    date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    date_key TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Operasional',
    note TEXT,
    amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
    cashier TEXT NOT NULL DEFAULT 'Admin',
    deleted_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. SETTINGS
CREATE TABLE public.settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. INDEXES
CREATE INDEX idx_products_category ON public.products(category) WHERE deleted_at IS NULL;
CREATE INDEX idx_transactions_datekey ON public.transactions(date_key) WHERE deleted_at IS NULL;
CREATE INDEX idx_customers_debt ON public.customers(total_debt) WHERE total_debt > 0;
CREATE INDEX idx_app_users_username ON public.app_users(username);

-- 10. ATOMIC STORED PROCEDURE: CHECKOUT & STOCK DECREMENT (ANTI RACE-CONDITION)
CREATE OR REPLACE FUNCTION public.atomic_checkout_transaction(
    p_transaction JSONB,
    p_items JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_item JSONB;
    v_prod_id TEXT;
    v_qty INT;
    v_current_stock INT;
BEGIN
    -- 1. Lock and decrement each product atomically
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_prod_id := v_item->'product'->>'id';
        v_qty := COALESCE((v_item->>'qty')::INT, 1);

        IF v_prod_id IS NOT NULL THEN
            -- Check and update stock with row-level exclusive lock
            SELECT stock INTO v_current_stock
            FROM public.products
            WHERE id = v_prod_id
            FOR UPDATE;

            IF FOUND THEN
                UPDATE public.products
                SET stock = GREATEST(0, stock - v_qty),
                    updated_at = NOW()
                WHERE id = v_prod_id;
            END IF;
        END IF;
    END LOOP;

    -- 2. Insert transaction record
    INSERT INTO public.transactions (
        id, invoice_no, date, date_key, customer_name, items,
        subtotal, discount, tax, total, paid, change,
        payment_method, payment_status, paid_amount, remaining_debt,
        debt_payments, cashier, sync_status, updated_at
    ) VALUES (
        p_transaction->>'id',
        p_transaction->>'invoice_no',
        COALESCE((p_transaction->>'date')::TIMESTAMPTZ, NOW()),
        p_transaction->>'date_key',
        p_transaction->>'customer_name',
        COALESCE(p_transaction->'items', '[]'::jsonb),
        COALESCE((p_transaction->>'subtotal')::NUMERIC, 0),
        COALESCE((p_transaction->>'discount')::NUMERIC, 0),
        COALESCE((p_transaction->>'tax')::NUMERIC, 0),
        COALESCE((p_transaction->>'total')::NUMERIC, 0),
        COALESCE((p_transaction->>'paid')::NUMERIC, 0),
        COALESCE((p_transaction->>'change')::NUMERIC, 0),
        p_transaction->>'payment_method',
        p_transaction->>'payment_status',
        COALESCE((p_transaction->>'paid_amount')::NUMERIC, 0),
        COALESCE((p_transaction->>'remaining_debt')::NUMERIC, 0),
        COALESCE(p_transaction->'debt_payments', '[]'::jsonb),
        COALESCE(p_transaction->>'cashier', 'Kasir'),
        'synced',
        NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET updated_at = NOW();

    RETURN jsonb_build_object('success', true, 'id', p_transaction->>'id');
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- 11. ENABLE REALTIME REPLICATION
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.expenses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.customers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;
