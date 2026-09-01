/**
 * supabase.js — Real-time Multi-device Sync Engine for Blue Mountain POS
 * Supabase PostgreSQL + WebSocket Realtime + Offline Dexie Cache
 */
import { createClient } from '@supabase/supabase-js';
import { db, getAllProducts, getAllTransactions, getAllExpenses, getSetting, setSetting } from './db.js';
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
  name: p.name || '',
  category: p.category || 'Umum',
  price: Number(p.price) || 0,
  unit: p.unit || 'buah',
  emoji: p.emoji || '📦',
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
  date_key: tx.dateKey || tx.date_key || new Date().toISOString().split('T')[0],
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
  date_key: exp.dateKey || exp.date_key || new Date().toISOString().split('T')[0],
  category: exp.category || 'Operasional',
  note: exp.note || '',
  amount: Number(exp.amount) || 0,
  cashier: exp.cashier || 'Admin',
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
    // 1. Sync Products
    const [localProds, { data: cloudProds, error: prodErr }] = await Promise.all([
      getAllProducts(),
      supabase.from('products').select('*'),
    ]);

    if (!prodErr && cloudProds) {
      if (cloudProds.length === 0 && localProds.length > 0) {
        // First-time seed local to cloud
        await supabase.from('products').upsert(localProds.map(formatProductForCloud));
      } else {
        // Merge cloud to local Dexie
        for (const cp of cloudProds) {
          const formatted = {
            id: isNaN(Number(cp.id)) ? cp.id : Number(cp.id),
            name: cp.name,
            category: cp.category,
            price: Number(cp.price),
            unit: cp.unit,
            emoji: cp.emoji,
            stock: Number(cp.stock),
          };
          await db.products.put(formatted);
        }
        const freshProds = await getAllProducts();
        store.setProducts(freshProds);
      }
    }

    // 2. Sync Transactions
    const [localTxs, { data: cloudTxs, error: txErr }] = await Promise.all([
      getAllTransactions(),
      supabase.from('transactions').select('*'),
    ]);

    if (!txErr && cloudTxs) {
      if (cloudTxs.length === 0 && localTxs.length > 0) {
        await supabase.from('transactions').upsert(localTxs.map(formatTransactionForCloud));
      } else {
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
    }

    // 3. Sync Expenses
    const [localExps, { data: cloudExps, error: expErr }] = await Promise.all([
      getAllExpenses(),
      supabase.from('expenses').select('*'),
    ]);

    if (!expErr && cloudExps) {
      if (cloudExps.length === 0 && localExps.length > 0) {
        await supabase.from('expenses').upsert(localExps.map(formatExpenseForCloud));
      } else {
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
    }

    updateSyncBadge('online', '🟢 Cloud Realtime');
  } catch (err) {
    console.warn('[Supabase Sync] Warning during initial sync:', err);
    updateSyncBadge('online', '🟢 Cloud Aktif');
  } finally {
    isSyncing = false;
  }
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
          name: row.name,
          category: row.category,
          price: Number(row.price),
          unit: row.unit,
          emoji: row.emoji,
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
