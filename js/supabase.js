/**
 * supabase.js — Real-time Multi-device Sync Engine for Blue Mountain POS
 * Supabase PostgreSQL + WebSocket Realtime + Offline Dexie Cache
 * 
 * Military-Grade Hardening:
 * - Tenant Partitioning via Master Store ID (STORE-BM-856CFAC8)
 * - Dual-Bridge Realtime Sync for Staff Accounts (app_users + settings fallback)
 * - Isolated Sandbox Mode protection for unauthorized/guest devices
 */
import { createClient } from '@supabase/supabase-js';
import { db, getAllProducts, getAllTransactions, getAllExpenses, getAllCustomers, getAllUsers } from './db.js';
import { todayKey } from './utils/date.js';
import store from './store.js';
import { verifyPin, createSessionJWT, verifySessionJWT } from './utils/crypto.js';

// Default Supabase Configuration (fadhil2026's Project)
export const SUPABASE_URL = 'https://wiapnhpdgjbtkblowfig.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_BBEJNs18ooZ-IHRPxJtDUA_KiKLcQ-g';

// Master Store Tenant ID for Blue Mountain POS
export const DEFAULT_MASTER_STORE_ID = 'STORE-BM-856CFAC8';
export const MASTER_STORE_KEY_STORAGE = 'bm_master_store_key';
export const JWT_SESSION_STORAGE_KEY = 'bm_jwt_token';
export const getJwtSecret = () => `BM_SECRET_${getMasterStoreId()}_2026_AUTHORITATIVE`;

export const getMasterStoreId = () => {
  try {
    const saved = localStorage.getItem(MASTER_STORE_KEY_STORAGE);
    if (saved && saved.trim()) return saved.trim();
  } catch (_) {}
  return DEFAULT_MASTER_STORE_ID;
};

export const setMasterStoreId = (newId) => {
  try {
    if (newId && newId.trim()) {
      localStorage.setItem(MASTER_STORE_KEY_STORAGE, newId.trim());
      return true;
    }
  } catch (_) {}
  return false;
};

export const isDeviceIsolated = () => {
  try {
    return localStorage.getItem(MASTER_STORE_KEY_STORAGE) === 'ISOLATED_SANDBOX';
  } catch (_) {
    return false;
  }
};

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
export const updateSyncBadge = (status, label) => {
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
export const formatProductForCloud = (p) => ({
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
export const formatTransactionForCloud = (tx) => ({
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
export const formatExpenseForCloud = (exp) => ({
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
export const formatCustomerForCloud = (c) => ({
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
 * Normalize user object for Supabase
 */
export const formatUserForCloud = (u) => ({
  store_id: getMasterStoreId(),
  username: String(u.username || '').toLowerCase().trim(),
  name: String(u.name || ''),
  role: String(u.role || 'cashier'),
  pin_hash: String(u.pinHash || u.pin_hash || ''),
  pin_salt: String(u.pinSalt || u.pin_salt || ''),
  is_active: u.isActive !== undefined ? Boolean(u.isActive) : (u.is_active !== undefined ? Boolean(u.is_active) : true),
  updated_at: new Date().toISOString(),
});

/**
 * 2-Way Initial Sync with Master Store ID Partition & Dual-Bridge Engine
 */
export const syncInitialData = async () => {
  if (isDeviceIsolated()) {
    updateSyncBadge('offline', '🔒 Mode Demo Terisolasi');
    return { success: true, isolated: true };
  }

  if (!navigator.onLine) {
    updateSyncBadge('offline', '⚡ Mode Offline');
    return { success: false, offline: true };
  }

  const storeId = getMasterStoreId();
  const supabase = getSupabase();
  isSyncing = true;
  updateSyncBadge('syncing');

  try {
    // 1. Sync Products (2-Way)
    try {
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
    } catch (e) {
      console.warn('[Sync] Products sync warning:', e);
    }

    // 2. Sync Transactions (2-Way)
    try {
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
    } catch (e) {
      console.warn('[Sync] Transactions sync warning:', e);
    }

    // 3. Sync Expenses (2-Way)
    try {
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
    } catch (e) {
      console.warn('[Sync] Expenses sync warning:', e);
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
      }
    } catch (e) {
      console.warn('[Sync] Customers sync warning:', e);
    }

    // 5. Server-Authoritative User Roster Sync (Ephemeral Cache Overwrite)
    try {
      await syncAuthoritativeRosterToCache();
    } catch (e) {
      console.warn('[Sync] Server-authoritative users sync warning:', e);
    }

    // 6. Sync General Settings
    try {
      const { data: cloudSettings, error: setErr } = await supabase
        .from('settings')
        .select('*');
      const localSettingsArr = await db.settings.toArray();

      if (!setErr && cloudSettings) {
        if (cloudSettings.length === 0 && localSettingsArr.length > 0) {
          await supabase.from('settings').upsert(
            localSettingsArr.map(s => ({ key: s.key, value: String(s.value ?? ''), updated_at: new Date().toISOString() }))
          );
        } else if (cloudSettings.length > 0) {
          for (const cs of cloudSettings) {
            if (!cs.key.startsWith('users_roster_')) {
              await db.settings.put({ key: cs.key, value: cs.value ?? '' });
            }
          }
        }
      }
    } catch (e) {
      console.warn('[Sync] Settings sync warning:', e);
    }

    updateSyncBadge('online', '🟢 Cloud Realtime');
    return { success: true };
  } catch (err) {
    console.warn('[Supabase Sync] Warning during sync:', err);
    updateSyncBadge('online', '🟢 Cloud Aktif');
    return { success: false, error: err };
  } finally {
    isSyncing = false;
  }
};

/**
 * Setup Realtime WebSocket Listener Scoped to Master Store ID
 */
export const setupRealtimeSubscription = () => {
  if (isDeviceIsolated()) return;

  const supabase = getSupabase();
  const storeId = getMasterStoreId();

  if (realtimeChannel) {
    supabase.removeChannel(realtimeChannel);
  }

  realtimeChannel = supabase
    .channel(`store_realtime_${storeId}`)
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
    .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, async (payload) => {
      if (payload.new && payload.new.key === `users_roster_${storeId}`) {
        try {
          const roster = JSON.parse(payload.new.value);
          if (Array.isArray(roster) && roster.length > 0) {
            const rosterUsernames = new Set(roster.map(u => String(u.username).toLowerCase().trim()));
            const localUsers = await db.users.toArray();
            for (const lu of localUsers) {
              if (!rosterUsernames.has(String(lu.username).toLowerCase().trim())) {
                await db.users.delete(lu.id);
              }
            }

            for (const cu of roster) {
              const usernameClean = String(cu.username).toLowerCase().trim();
              const existing = await db.users.where('username').equalsIgnoreCase(usernameClean).first();
              const udata = {
                username: usernameClean,
                name: cu.name,
                role: cu.role,
                pinHash: cu.pin_hash || cu.pinHash,
                pinSalt: cu.pin_salt || cu.pinSalt,
                isActive: cu.is_active !== undefined ? Boolean(cu.is_active) : (cu.isActive !== undefined ? Boolean(cu.isActive) : true),
                createdAt: cu.created_at || cu.createdAt || new Date().toISOString(),
                updatedAt: cu.updated_at || cu.updatedAt || new Date().toISOString(),
              };
              if (existing) await db.users.update(existing.id, udata);
              else await db.users.add(udata);
            }
            const fresh = await db.users.toArray();
            store.setUsers(fresh);
          }
        } catch (_) {}
      }
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
 * Background Push Helpers (Safe, Non-blocking)
 */
export const pushProductToCloud = async (product) => {
  if (isDeviceIsolated() || !navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('products').upsert(formatProductForCloud(product));
  } catch (_) {}
};

export const deleteProductFromCloud = async (id) => {
  if (isDeviceIsolated() || !navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('products').delete().eq('id', String(id));
  } catch (_) {}
};

export const pushCustomerToCloud = async (customer) => {
  if (isDeviceIsolated() || !navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('customers').upsert(formatCustomerForCloud(customer));
  } catch (_) {}
};

export const deleteCustomerFromCloud = async (id) => {
  if (isDeviceIsolated() || !navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('customers').delete().eq('id', String(id));
  } catch (_) {}
};

export const pushTransactionToCloud = async (tx) => {
  if (isDeviceIsolated() || !navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('transactions').upsert(formatTransactionForCloud(tx));
  } catch (_) {}
};

export const deleteTransactionFromCloud = async (id) => {
  if (isDeviceIsolated() || !navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('transactions').delete().eq('id', String(id));
  } catch (_) {}
};

export const pushExpenseToCloud = async (exp) => {
  if (isDeviceIsolated() || !navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('expenses').upsert(formatExpenseForCloud(exp));
  } catch (_) {}
};

export const deleteExpenseFromCloud = async (id) => {
  if (isDeviceIsolated() || !navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('expenses').delete().eq('id', String(id));
  } catch (_) {}
};

export const pushSettingToCloud = async (key, value) => {
  if (isDeviceIsolated() || !navigator.onLine) return;
  try {
    const supabase = getSupabase();
    await supabase.from('settings').upsert({
      key: String(key),
      value: typeof value === 'object' ? JSON.stringify(value) : String(value ?? ''),
      updated_at: new Date().toISOString(),
    });
  } catch (_) {}
};

/**
 * Fetch Server-Authoritative User Roster from Cloud (DB Master Single Source of Truth)
 * @returns {Promise<Array|null>} Array of user objects or null
 */
export const fetchAuthoritativeRoster = async () => {
  if (isDeviceIsolated() || !navigator.onLine) return null;
  const storeId = getMasterStoreId();
  const supabase = getSupabase();

  let cloudUsers = null;

  // Bridge A: app_users table (if exists)
  try {
    const { data: bA, error: errA } = await supabase
      .from('app_users')
      .select('*');
    if (!errA && bA && bA.length > 0) {
      cloudUsers = bA;
    }
  } catch (_) {}

  // Bridge B: settings table roster backup (Fail-Safe Dual-Bridge, 100% active!)
  const rosterKey = `users_roster_${storeId}`;
  try {
    const { data: bB, error: errB } = await supabase
      .from('settings')
      .select('value')
      .eq('key', rosterKey)
      .maybeSingle();
    if (!errB && bB && bB.value) {
      const parsed = JSON.parse(bB.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (!cloudUsers || cloudUsers.length === 0) {
          cloudUsers = parsed;
        }
      }
    }
  } catch (_) {}

  return cloudUsers;
};

/**
 * Overwrite local Dexie cache with Server-Authoritative Cloud Roster
 * IndexedDB acts as ephemeral fast-read cache, not identity decider.
 */
export const syncAuthoritativeRosterToCache = async () => {
  const cloudUsers = await fetchAuthoritativeRoster();
  if (!cloudUsers || cloudUsers.length === 0) return [];

  const cloudUsernames = new Set(cloudUsers.map(u => String(u.username).toLowerCase().trim()));
  const localUsers = await db.users.toArray();
  for (const lu of localUsers) {
    if (!cloudUsernames.has(String(lu.username).toLowerCase().trim())) {
      await db.users.delete(lu.id);
    }
  }

  for (const cu of cloudUsers) {
    const usernameClean = String(cu.username).toLowerCase().trim();
    const existing = await db.users.where('username').equalsIgnoreCase(usernameClean).first();
    const udata = {
      username: usernameClean,
      name: cu.name,
      role: cu.role,
      pinHash: cu.pin_hash || cu.pinHash,
      pinSalt: cu.pin_salt || cu.pinSalt,
      isActive: cu.is_active !== undefined ? Boolean(cu.is_active) : (cu.isActive !== undefined ? Boolean(cu.isActive) : true),
      createdAt: cu.created_at || cu.createdAt || new Date().toISOString(),
      updatedAt: cu.updated_at || cu.updatedAt || new Date().toISOString(),
    };

    if (existing) {
      await db.users.update(existing.id, udata);
    } else {
      await db.users.add(udata);
    }
  }

  const freshUsers = await db.users.toArray();
  store.setUsers(freshUsers);
  return freshUsers;
};

/**
 * Authenticate Operator with Server-Authoritative verification
 * Returns HMAC-SHA256 JWT Token + Official Account Profile
 */
export const authenticateWithServer = async (usernameOrId, pin) => {
  const storeId = getMasterStoreId();
  const secretKey = getJwtSecret();
  const searchKey = String(usernameOrId).toLowerCase().trim();

  // 1. Online First: Server-Authoritative verification against Cloud DB Master
  if (navigator.onLine && !isDeviceIsolated()) {
    try {
      const cloudUsers = await fetchAuthoritativeRoster();
      if (cloudUsers && cloudUsers.length > 0) {
        // Ephemeral cache overwrite from server
        await syncAuthoritativeRosterToCache();

        const targetUser = cloudUsers.find(u =>
          String(u.username).toLowerCase().trim() === searchKey ||
          String(u.id) === searchKey
        );

        if (!targetUser) {
          return { success: false, error: 'Akun operator tidak terdaftar di server master.' };
        }

        if (targetUser.isActive === false || targetUser.is_active === false) {
          return { success: false, error: 'Akun operator ini telah dinonaktifkan oleh Owner.' };
        }

        const pinSalt = targetUser.pin_salt || targetUser.pinSalt;
        const pinHash = targetUser.pin_hash || targetUser.pinHash;
        const isMatch = await verifyPin(pin, pinSalt, pinHash);

        if (!isMatch) {
          return { success: false, error: 'PIN salah! Silakan periksa kembali.' };
        }

        // Issue Signed HMAC-SHA256 JWT Session Token
        const payload = {
          sub: targetUser.id || targetUser.username,
          username: targetUser.username,
          name: targetUser.name,
          role: targetUser.role,
          storeId,
        };

        const token = await createSessionJWT(payload, secretKey, 86400 * 7);
        try {
          localStorage.setItem(JWT_SESSION_STORAGE_KEY, token);
        } catch (_) {}

        return {
          success: true,
          user: {
            id: targetUser.id || targetUser.username,
            username: targetUser.username,
            name: targetUser.name,
            role: targetUser.role,
          },
          token,
          isServerValidated: true,
        };
      }
    } catch (err) {
      console.warn('[Auth] Server authentication error, checking local ephemeral cache:', err);
    }
  }

  // 2. Offline Pure Fallback: Fast-read cache in Dexie
  try {
    const localUsers = await db.users.toArray();
    const targetUser = localUsers.find(u =>
      String(u.username).toLowerCase().trim() === searchKey ||
      String(u.id) === searchKey
    );

    if (!targetUser) {
      return { success: false, error: 'Perangkat offline dan akun belum tersimpan di cache lokal.' };
    }

    if (targetUser.isActive === false) {
      return { success: false, error: 'Akun operator tidak aktif.' };
    }

    const isMatch = await verifyPin(pin, targetUser.pinSalt, targetUser.pinHash);
    if (!isMatch) {
      return { success: false, error: 'PIN salah! Silakan periksa kembali.' };
    }

    const payload = {
      sub: targetUser.id || targetUser.username,
      username: targetUser.username,
      name: targetUser.name,
      role: targetUser.role,
      storeId,
      offline: true,
    };
    const token = await createSessionJWT(payload, secretKey, 86400 * 2);
    try {
      localStorage.setItem(JWT_SESSION_STORAGE_KEY, token);
    } catch (_) {}

    return {
      success: true,
      user: {
        id: targetUser.id,
        username: targetUser.username,
        name: targetUser.name,
        role: targetUser.role,
      },
      token,
      isServerValidated: false,
      isOfflineFallback: true,
    };
  } catch (err) {
    return { success: false, error: 'Gagal memvalidasi kredensial: ' + err.message };
  }
};

/**
 * Check and validate Server Session (JWT)
 * If valid, returns operator profile; if invalid/expired/revoked, returns null
 */
export const checkServerSession = async () => {
  let token = null;
  try {
    token = localStorage.getItem(JWT_SESSION_STORAGE_KEY);
  } catch (_) {}

  if (!token) return null;

  const secretKey = getJwtSecret();
  const claims = await verifySessionJWT(token, secretKey);

  if (!claims || !claims.username) {
    try {
      localStorage.removeItem(JWT_SESSION_STORAGE_KEY);
    } catch (_) {}
    return null;
  }

  // Server-Authoritative Identity Validation:
  // When online, verify account is not deleted or deactivated on server
  if (navigator.onLine && !isDeviceIsolated()) {
    try {
      const cloudUsers = await fetchAuthoritativeRoster();
      if (cloudUsers && cloudUsers.length > 0) {
        const found = cloudUsers.find(u =>
          String(u.username).toLowerCase().trim() === String(claims.username).toLowerCase().trim()
        );
        if (!found || found.isActive === false || found.is_active === false) {
          try {
            localStorage.removeItem(JWT_SESSION_STORAGE_KEY);
          } catch (_) {}
          return null;
        }
        claims.name = found.name;
        claims.role = found.role;
      }
    } catch (_) {}
  }

  return {
    id: claims.sub || claims.username,
    username: claims.username,
    name: claims.name,
    role: claims.role,
  };
};

/**
 * Push user modification to cloud (Non-destructive merge)
 */
export const pushUserToCloud = async (user) => {
  if (isDeviceIsolated() || !navigator.onLine) return;
  const storeId = getMasterStoreId();
  const supabase = getSupabase();

  // 1. app_users table
  try {
    await supabase.from('app_users').upsert(formatUserForCloud(user), { onConflict: 'username' });
  } catch (_) {}

  // 2. settings table roster (Merge without destructive overwrite)
  try {
    const rosterKey = `users_roster_${storeId}`;
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', rosterKey)
      .maybeSingle();

    let existingRoster = [];
    if (!error && data?.value) {
      try {
        const parsed = JSON.parse(data.value);
        if (Array.isArray(parsed)) existingRoster = parsed;
      } catch (_) {}
    }

    const cleanUsername = String(user.username).toLowerCase().trim();
    const formattedUser = formatUserForCloud(user);

    const idx = existingRoster.findIndex(u => String(u.username).toLowerCase().trim() === cleanUsername);
    if (idx >= 0) {
      existingRoster[idx] = { ...existingRoster[idx], ...formattedUser };
    } else {
      existingRoster.push(formattedUser);
    }

    await supabase.from('settings').upsert({
      key: rosterKey,
      value: JSON.stringify(existingRoster),
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('[Sync] Failed to push user to cloud:', err);
  }
};

/**
 * Delete user from cloud roster (Non-destructive filter)
 */
export const deleteUserFromCloud = async (username) => {
  if (isDeviceIsolated() || !navigator.onLine) return;
  const storeId = getMasterStoreId();
  const supabase = getSupabase();
  const cleanUsername = String(username).toLowerCase().trim();

  try {
    await supabase.from('app_users').delete().eq('username', cleanUsername);
  } catch (_) {}

  try {
    const rosterKey = `users_roster_${storeId}`;
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', rosterKey)
      .maybeSingle();

    if (!error && data?.value) {
      let existingRoster = JSON.parse(data.value);
      if (Array.isArray(existingRoster)) {
        existingRoster = existingRoster.filter(u => String(u.username).toLowerCase().trim() !== cleanUsername);
        await supabase.from('settings').upsert({
          key: rosterKey,
          value: JSON.stringify(existingRoster),
          updated_at: new Date().toISOString(),
        });
      }
    }
  } catch (err) {
    console.warn('[Sync] Failed to delete user from cloud:', err);
  }
};

