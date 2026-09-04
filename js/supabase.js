/**
 * supabase.js — Real-time Multi-device Sync Engine for Blue Mountain POS
 * Supabase PostgreSQL + WebSocket Realtime + Offline Dexie Cache
 */
import { createClient } from '@supabase/supabase-js';
import { db, getAllProducts, getAllTransactions, getAllExpenses, getAllCustomers, getSetting, setSetting } from './db.js';
import { todayKey } from './utils/date.js';
import store from './store.js';

// Default Supabase Configuration (fadhil2026's Project)
export const SUPABASE_URL = 'https://wiapnhpdgjbtkblowfig.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpYXBuaHBkZ2pidGtibG93ZmlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwOTAzNTEsImV4cCI6MjEwMzY2NjM1MX0.eX4w7L3oZ4VZTdv0bd3LrWQOP5EivV7LBCOv3XVoTDc';

let supabaseClient = null;
let realtimeChannel = null;
let isSyncing = false;

/**
 * Get active Supabase client instance
 */
export const getSupabase = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
      realtime: {
        params: { eventsPerSecond: 20 },
      },
    });
  }
  return supabaseClient;
};

/**
 * Update UI Status Badge
 */
const updateSyncBadge = (status, label) => {
  const badge = document.getElementById('status-badge');
  if (!badge) return;

  if (status === 'online') {
    badge.textContent = label || '🟢 Cloud Realtime';
    badge.classList.remove('status-badge--offline');
    badge.style.background = 'rgba(16, 185, 129, 0.12)';
    badge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    badge.style.color = '#059669';
  } else if (status === 'syncing') {
    badge.textContent = '🔄 Sinkronisasi...';
    badge.classList.remove('status-badge--offline');
    badge.style.background = 'rgba(37, 99, 235, 0.12)';
    badge.style.borderColor = 'rgba(37, 99, 235, 0.3)';
    badge.style.color = '#2563eb';
  } else {
    badge.textContent = label || '⚡ Mode Offline';
    badge.classList.add('status-badge--offline');
    badge.style.background = 'rgba(239, 68, 68, 0.12)';
    badge.style.borderColor = 'rgba(239, 68, 68, 0.3)';
    badge.style.color = '#dc2626';
  }
};

/**
 * Normalize product object for Supabase
 */
const formatProductForCloud = (p) => ({
  id: String(p.id),
  sku: p.sku || `BM-${p.id}`,
  name: p.name || '',
  category: p.category || 'Umum',
  price: Number(p.price) || 0,
  cost: Number(p.cost) || 0,
  unit: p.unit || 'buah',
  emoji: p.emoji || '📦',
  image: p.image || null,
  stock: Number(p.stock) || 0,
  updated_at: new Date().toISOString(),
});

/**
 * Normalize transaction object for Supabase
 */
const formatTransactionForCloud = (tx) => ({
  id: String(tx.id),
  invoice_no: tx.invoiceNo || tx.invoice_no || `INV-${Date.now()}`,
  date: tx.date ? new Date(tx.date).toISOString() : new Date().toISOString(),
  date_key: tx.dateKey || tx.date_key || todayKey(tx.date ? new Date(tx.date) : new Date()),
  customer_name: tx.customerName || tx.customer_name || '',
  items: tx.items || [],
  subtotal: Number(tx.subtotal) || 0,
  discount: Number(tx.discount) || 0,
  tax: Number(tx.tax) || 0,
  total: Number(tx.total) || 0,
  paid: Number(tx.paid) || 0,
  change: Number(tx.change) || 0,
  payment_method: tx.paymentMethod || tx.payment_method || 'cash',
  payment_status: tx.paymentStatus || tx.payment_status || 'cash_paid',
  paid_amount: Number(tx.paidAmount || tx.paid_amount) || 0,
  remaining_debt: Number(tx.remainingDebt || tx.remaining_debt) || 0,
  debt_payments: tx.debtPayments || tx.debt_payments || [],
  cashier: tx.cashier || 'Admin',
  updated_at: new Date().toISOString(),
});

/**
 * Normalize expense object for Supabase
 */
const formatExpenseForCloud = (exp) => ({
  id: String(exp.id),
  date: exp.date ? new Date(exp.date).toISOString() : new Date().toISOString(),
  date_key: exp.dateKey || exp.date_key || todayKey(exp.date ? new Date(exp.date) : new Date()),
  category: exp.category || 'Operasional',
  note: exp.note || '',
  amount: Number(exp.amount) || 0,
  cashier: exp.cashier || 'Admin',
  updated_at: new Date().toISOString(),
});

/**
 * Normalize customer object for Supabase
 */
const formatCustomerForCloud = (c) => ({
  id: String(c.id),
  name: c.name || '',
  phone: c.phone || '',
  address: c.address || '',
  category: c.category || 'Rumah Tangga',
  total_orders: Number(c.totalOrders || c.total_orders) || 0,
  total_spent: Number(c.totalSpent || c.total_spent) || 0,
  total_debt: Number(c.totalDebt || c.total_debt) || 0,
  credit_limit: Number(c.creditLimit || c.credit_limit) || 0,
  galon_loaned: Number(c.galonLoaned || c.galon_loaned) || 0,
  notes: c.notes || '',
  updated_at: new Date().toISOString(),
});

/**
 * 2-Way Initial Sync on App Start
 */
export const syncInitialData = async () => {
  if (!navigator.onLine) {
    updateSyncBadge('offline', '⚡ Mode Offline');
    return;
  }

  const supabase = getSupabase();
  isSyncing = true;
  updateSyncBadge('syncing');

  try {
    // 1. Sync Products (2-Way)
    const [localProds, { data: cloudProds, error: prodErr }] = await Promise.all([
      getAllProducts(),
      supabase.from('products').select('*'),
    ]);

    if (!prodErr && cloudProds) {
      const cloudProdIds = new Set(cloudProds.map(p => String(p.id)));
      const unpushedProds = localProds.filter(l => !cloudProdIds.has(String(l.id)));
      if (unpushedProds.length > 0) {
        await supabase.from('products').upsert(unpushedProds.map(formatProductForCloud));
      }

      for (const cp of cloudProds) {
        const formatted = {
          id: isNaN(Number(cp.id)) ? cp.id : Number(cp.id),
          sku: cp.sku || `BM-${cp.id}`,
          name: cp.name,
          category: cp.category,
          price: Number(cp.price),
          cost: Number(cp.cost) || 0,
          unit: cp.unit,
          emoji: cp.emoji,
          image: cp.image || null,
          stock: Number(cp.stock),
        };
        await db.products.put(formatted);
      }
      const freshProds = await getAllProducts();
      store.setProducts(freshProds);
    }

    // 2. Sync Transactions (2-Way)
    const [localTxs, { data: cloudTxs, error: txErr }] = await Promise.all([
      getAllTransactions(),
      supabase.from('transactions').select('*'),
    ]);

    if (!txErr && cloudTxs) {
      const cloudTxKeys = new Set(cloudTxs.map(t => t.invoice_no || String(t.id)));
      const unpushedTxs = localTxs.filter(l => !cloudTxKeys.has(l.invoiceNo || String(l.id)));
      if (unpushedTxs.length > 0) {
        await supabase.from('transactions').upsert(unpushedTxs.map(formatTransactionForCloud));
      }

      for (const ctx of cloudTxs) {
        const formatted = {
          id: isNaN(Number(ctx.id)) ? ctx.id : Number(ctx.id),
          invoiceNo: ctx.invoice_no,
          date: ctx.date,
          dateKey: ctx.date_key,
          customerName: ctx.customer_name,
          items: ctx.items || [],
          subtotal: Number(ctx.subtotal),
          discount: Number(ctx.discount),
          tax: Number(ctx.tax),
          total: Number(ctx.total),
          paid: Number(ctx.paid),
          change: Number(ctx.change),
          paymentMethod: ctx.payment_method,
          paymentStatus: ctx.payment_status,
          paidAmount: Number(ctx.paid_amount),
          remainingDebt: Number(ctx.remaining_debt),
          debtPayments: ctx.debt_payments || [],
          cashier: ctx.cashier,
        };
        await db.transactions.put(formatted);
      }
      const freshTxs = await getAllTransactions();
      store.setTransactions(freshTxs);
    }

    // 3. Sync Expenses (2-Way)
    const [localExps, { data: cloudExps, error: expErr }] = await Promise.all([
      getAllExpenses(),
      supabase.from('expenses').select('*'),
    ]);

    if (!expErr && cloudExps) {
      const cloudExpIds = new Set(cloudExps.map(e => String(e.id)));
      const unpushedExps = localExps.filter(l => !cloudExpIds.has(String(l.id)));
      if (unpushedExps.length > 0) {
        await supabase.from('expenses').upsert(unpushedExps.map(formatExpenseForCloud));
      }

      for (const ce of cloudExps) {
        const formatted = {
          id: isNaN(Number(ce.id)) ? ce.id : Number(ce.id),
          date: ce.date,
          dateKey: ce.date_key,
          category: ce.category,
          note: ce.note,
          amount: Number(ce.amount),
          cashier: ce.cashier,
        };
        await db.expenses.put(formatted);
      }
      const freshExps = await getAllExpenses();
      store.setExpenses(freshExps);
    }

    // 4. Sync Customers (2-Way)
    try {
      const [localCusts, { data: cloudCusts, error: custErr }] = await Promise.all([
        getAllCustomers(),
        supabase.from('customers').select('*'),
      ]);

      if (!custErr && cloudCusts) {
        const cloudCustIds = new Set(cloudCusts.map(c => String(c.id)));
        const unpushedCusts = localCusts.filter(l => !cloudCustIds.has(String(l.id)));
        if (unpushedCusts.length > 0) {
          await supabase.from('customers').upsert(unpushedCusts.map(formatCustomerForCloud));
        }

        for (const cc of cloudCusts) {
          const formatted = {
            id: isNaN(Number(cc.id)) ? cc.id : Number(cc.id),
            name: cc.name || '',
            phone: cc.phone || '',
            address: cc.address || '',
            category: cc.category || 'Rumah Tangga',
            totalOrders: Number(cc.total_orders) || 0,
            totalSpent: Number(cc.total_spent) || 0,
            totalDebt: Number(cc.total_debt) || 0,
            creditLimit: Number(cc.credit_limit) || 0,
            galonLoaned: Number(cc.galon_loaned) || 0,
            notes: cc.notes || '',
          };
          await db.customers.put(formatted);
        }
        const freshCusts = await getAllCustomers();
        store.setCustomers?.(freshCusts);
      } else if (custErr) {
        console.warn('[Supabase Sync] Warning on customers table:', custErr.message);
        if (custErr.code === 'PGRST205') {
          store.state.supabaseMissingTables = store.state.supabaseMissingTables || [];
          if (!store.state.supabaseMissingTables.includes('customers')) {
            store.state.supabaseMissingTables.push('customers');
          }
        }
      }
    } catch (_) {}

    updateSyncBadge('online', '🟢 Cloud Realtime');
  } catch (err) {
    console.warn('[Supabase Sync] Warning during initial sync:', err);
    updateSyncBadge('online', '🟢 Cloud Aktif');
  } finally {
    isSyncing = false;
  }

  // 4. Sync Settings (pull cloud → local, seed local → cloud if empty)
  try {
    const { data: cloudSettings, error: setErr } = await getSupabase().from('settings').select('*');
    const localSettingsArr = await db.settings.toArray();

    if (!setErr && cloudSettings) {
      if (cloudSettings.length === 0 && localSettingsArr.length > 0) {
        // Seed local settings to cloud
        await getSupabase().from('settings').upsert(
          localSettingsArr.map(s => ({ key: s.key, value: String(s.value ?? ''), updated_at: new Date().toISOString() }))
        );
      } else if (cloudSettings.length > 0) {
        // Merge cloud settings into local Dexie
        for (const cs of cloudSettings) {
          await db.settings.put({ key: cs.key, value: cs.value ?? '' });
        }
      }
    }
  } catch (_) {}
};

/**
 * Setup Realtime WebSocket Listener (Instant Multi-device Broadcast)
 */
export const setupRealtimeSubscription = () => {
  const supabase = getSupabase();

  if (realtimeChannel) {
    supabase.removeChannel(realtimeChannel);
  }

  realtimeChannel = supabase
    .channel('pos-multi-device-sync')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, async (payload) => {
      if (payload.eventType === 'DELETE') {
        const id = isNaN(Number(payload.old.id)) ? payload.old.id : Number(payload.old.id);
        await db.products.delete(id);
      } else {
        const row = payload.new;
        await db.products.put({
          id: isNaN(Number(row.id)) ? row.id : Number(row.id),
          sku: row.sku || `BM-${row.id}`,
          name: row.name,
          category: row.category,
          price: Number(row.price),
          cost: Number(row.cost) || 0,
          unit: row.unit,
          emoji: row.emoji,
          image: row.image || null,
          stock: Number(row.stock),
        });
      }
      const updated = await getAllProducts();
      store.setProducts(updated);
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, async (payload) => {
      if (payload.eventType === 'DELETE') {
        const id = isNaN(Number(payload.old.id)) ? payload.old.id : Number(payload.old.id);
        await db.transactions.delete(id);
      } else {
        const row = payload.new;
        await db.transactions.put({
          id: isNaN(Number(row.id)) ? row.id : Number(row.id),
          invoiceNo: row.invoice_no,
          date: row.date,
          dateKey: row.date_key,
          customerName: row.customer_name,
          items: row.items || [],
          subtotal: Number(row.subtotal),
          discount: Number(row.discount),
          tax: Number(row.tax),
          total: Number(row.total),
          paid: Number(row.paid),
          change: Number(row.change),
          paymentMethod: row.payment_method,
          paymentStatus: row.payment_status,
          paidAmount: Number(row.paid_amount),
          remainingDebt: Number(row.remaining_debt),
          debtPayments: row.debt_payments || [],
          cashier: row.cashier,
        });
      }
      const updated = await getAllTransactions();
      store.setTransactions(updated);
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'expenses' }, async (payload) => {
      if (payload.eventType === 'DELETE') {
        const id = isNaN(Number(payload.old.id)) ? payload.old.id : Number(payload.old.id);
        await db.expenses.delete(id);
      } else {
        const row = payload.new;
        await db.expenses.put({
          id: isNaN(Number(row.id)) ? row.id : Number(row.id),
          date: row.date,
          dateKey: row.date_key,
          category: row.category,
          note: row.note,
          amount: Number(row.amount),
          cashier: row.cashier,
        });
      }
      const updated = await getAllExpenses();
      store.setExpenses(updated);
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'customers' }, async (payload) => {
      if (payload.eventType === 'DELETE') {
        const id = isNaN(Number(payload.old.id)) ? payload.old.id : Number(payload.old.id);
        await db.customers.delete(id);
      } else {
        const row = payload.new;
        await db.customers.put({
          id: isNaN(Number(row.id)) ? row.id : Number(row.id),
          name: row.name || '',
          phone: row.phone || '',
          address: row.address || '',
          category: row.category || 'Rumah Tangga',
          totalOrders: Number(row.total_orders) || 0,
          totalSpent: Number(row.total_spent) || 0,
          totalDebt: Number(row.total_debt) || 0,
          creditLimit: Number(row.credit_limit) || 0,
          galonLoaned: Number(row.galon_loaned) || 0,
          notes: row.notes || '',
        });
      }
      const updated = await getAllCustomers();
      store.setCustomers?.(updated);
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        updateSyncBadge('online', '🟢 Cloud Realtime');
      } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
        updateSyncBadge('offline', '⚡ Mode Offline');
      }
    });

  // Reconnect listener on window online
  window.addEventListener('online', () => {
    syncInitialData();
  });
};

/**
 * Background Push Helpers (Safe, Non-blocking, Offline-resilient)
 */
export const pushProductToCloud = async (product) => {
  if (!navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('products').upsert(formatProductForCloud(product));
  } catch (_) {}
};

export const deleteProductFromCloud = async (id) => {
  if (!navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('products').delete().eq('id', String(id));
  } catch (_) {}
};

export const pushCustomerToCloud = async (customer) => {
  if (!navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('customers').upsert(formatCustomerForCloud(customer));
  } catch (_) {}
};

export const deleteCustomerFromCloud = async (id) => {
  if (!navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('customers').delete().eq('id', String(id));
  } catch (_) {}
};

export const pushTransactionToCloud = async (tx) => {
  if (!navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('transactions').upsert(formatTransactionForCloud(tx));
  } catch (_) {}
};

export const deleteTransactionFromCloud = async (id) => {
  if (!navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('transactions').delete().eq('id', String(id));
  } catch (_) {}
};

export const pushExpenseToCloud = async (exp) => {
  if (!navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('expenses').upsert(formatExpenseForCloud(exp));
  } catch (_) {}
};

export const deleteExpenseFromCloud = async (id) => {
  if (!navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('expenses').delete().eq('id', String(id));
  } catch (_) {}
};

export const pushSettingToCloud = async (key, value) => {
  if (!navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('settings').upsert({
      key: String(key),
      value: String(value ?? ''),
      updated_at: new Date().toISOString(),
    });
  } catch (_) {}
};
