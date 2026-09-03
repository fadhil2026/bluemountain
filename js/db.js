/**
 * db.js — Dexie.js IndexedDB wrapper
 * Replaces manual IndexedDB with reactive, typed, clean API.
 */
import Dexie from 'dexie';
import {
  pushProductToCloud,
  deleteProductFromCloud,
  pushCustomerToCloud,
  deleteCustomerFromCloud,
  pushTransactionToCloud,
  deleteTransactionFromCloud,
  pushExpenseToCloud,
  deleteExpenseFromCloud,
  pushSettingToCloud,
} from './supabase.js';

export const db = new Dexie('BlueMountainPOS');

db.version(2).stores({
  products:     '++id, category',
  transactions: '++id, dateKey, paymentStatus, paymentMethod',
  settings:     'key',
  expenses:     '++id, dateKey, category',
});

db.version(3).stores({
  products:     '++id, category, sku',
  customers:    '++id, name, phone, category, totalDebt',
  transactions: '++id, dateKey, paymentStatus, paymentMethod, customerName',
  settings:     'key',
  expenses:     '++id, dateKey, category',
});

// ── Customers ──
export const getAllCustomers = () => db.customers.toArray();
export const getCustomerById = (id) => db.customers.get(id);
export const addCustomer     = async (c) => {
  const id = await db.customers.add(c);
  pushCustomerToCloud({ ...c, id }).catch(() => {});
  return id;
};
export const updateCustomer  = async (c) => {
  const res = await db.customers.put(c);
  pushCustomerToCloud(c).catch(() => {});
  return res;
};
export const deleteCustomer  = async (id) => {
  const res = await db.customers.delete(id);
  deleteCustomerFromCloud(id).catch(() => {});
  return res;
};

// ── Products ──
export const getAllProducts    = ()        => db.products.toArray();
export const addProduct        = async (p) => {
  const id = await db.products.add(p);
  pushProductToCloud({ ...p, id }).catch(() => {});
  return id;
};
export const updateProduct     = async (p) => {
  const res = await db.products.put(p);
  pushProductToCloud(p).catch(() => {});
  return res;
};
export const deleteProduct     = async (id) => {
  const res = await db.products.delete(id);
  deleteProductFromCloud(id).catch(() => {});
  return res;
};

// ── Transactions ──
export const saveTransaction   = async (tx) => {
  const id = await db.transactions.add(tx);
  pushTransactionToCloud({ ...tx, id }).catch(() => {});
  return id;
};
export const getAllTransactions = ()        => db.transactions.toArray();
export const deleteTransaction = async (id) => {
  const res = await db.transactions.delete(id);
  deleteTransactionFromCloud(id).catch(() => {});
  return res;
};
export const updateTransaction = async (tx) => {
  const res = await db.transactions.put(tx);
  pushTransactionToCloud(tx).catch(() => {});
  return res;
};
export const getTransactionsByDateKey = (dateKey) =>
  db.transactions.where('dateKey').equals(dateKey).toArray();

// ── Expenses ──
export const saveExpense   = async (exp) => {
  const id = await db.expenses.add(exp);
  pushExpenseToCloud({ ...exp, id }).catch(() => {});
  return id;
};
export const getAllExpenses = ()    => db.expenses.toArray();
export const deleteExpense = async (id) => {
  const res = await db.expenses.delete(id);
  deleteExpenseFromCloud(id).catch(() => {});
  return res;
};

// ── Settings ──
export const getSetting = async (key) => {
  const row = await db.settings.get(key);
  return row?.value ?? null;
};
export const setSetting = async (key, value) => {
  await db.settings.put({ key, value });
  pushSettingToCloud(key, value).catch(() => {});
};

// ── Seed Default Products (only if empty) ──
export const seedDefaultProducts = async () => {
  const count = await db.products.count();
  if (count > 0) return;
  await db.products.bulkAdd([
    { name: 'Air Isi Ulang Galon', category: 'Galon',   price: 5000,  unit: 'galon', emoji: '🪣', stock: 999 },
    { name: 'Antar Galon (dalam)',  category: 'Galon',   price: 3000,  unit: 'kali',  emoji: '🛵', stock: 999 },
    { name: 'Antar Galon (luar)',   category: 'Galon',   price: 5000,  unit: 'kali',  emoji: '🚚', stock: 999 },
    { name: 'Galon Baru (Aqua)',    category: 'Galon',   price: 50000, unit: 'buah',  emoji: '💧', stock: 50  },
    { name: 'Galon Baru (Standar)', category: 'Galon',   price: 45000, unit: 'buah',  emoji: '💦', stock: 50  },
    { name: 'Air Botol 600ml',      category: 'Botol',   price: 3000,  unit: 'botol', emoji: '🍶', stock: 200 },
    { name: 'Air Botol 1500ml',     category: 'Botol',   price: 5000,  unit: 'botol', emoji: '🥤', stock: 100 },
    { name: 'Dispenser Galon',      category: 'Lainnya', price: 250000, unit: 'unit', emoji: '⚗️', stock: 10  },
  ]);
};

// ── Clear All Data (Robust Reset) ──
export const clearAllData = async () => {
  await Promise.all([
    db.products.clear(),
    db.transactions.clear(),
    db.expenses.clear(),
    db.settings.clear(),
  ]);
  sessionStorage.clear();
  localStorage.clear();
};

// ── Export Full Backup JSON (Cross-device sync) ──
export const exportFullBackup = async () => {
  const [products, transactions, expenses, settings] = await Promise.all([
    db.products.toArray(),
    db.transactions.toArray(),
    db.expenses.toArray(),
    db.settings.toArray(),
  ]);

  const shopSetting = settings.find(s => s.key === 'shopName');
  const shopName = shopSetting?.value || 'Blue Mountain';

  return {
    app: 'Blue Mountain POS',
    version: typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '3.0.0',
    exportedAt: new Date().toISOString(),
    shopName,
    data: {
      products,
      transactions,
      expenses,
      settings,
    },
    meta: {
      productCount: products.length,
      transactionCount: transactions.length,
      expenseCount: expenses.length,
      settingCount: settings.length,
    },
  };
};

// ── Import Full Backup JSON (Cross-device sync) ──
export const importFullBackup = async (backupJson, mode = 'replace') => {
  if (!backupJson || !backupJson.data) {
    throw new Error('Format file backup tidak valid atau rusak.');
  }

  const { products = [], transactions = [], expenses = [], settings = [] } = backupJson.data;

  if (mode === 'replace') {
    await Promise.all([
      db.products.clear(),
      db.transactions.clear(),
      db.expenses.clear(),
      db.settings.clear(),
    ]);

    if (products.length)     await db.products.bulkAdd(products);
    if (transactions.length) await db.transactions.bulkAdd(transactions);
    if (expenses.length)     await db.expenses.bulkAdd(expenses);
    if (settings.length)     await db.settings.bulkPut(settings);
  } else if (mode === 'merge') {
    if (products.length)     await db.products.bulkPut(products);
    if (transactions.length) await db.transactions.bulkPut(transactions);
    if (expenses.length)     await db.expenses.bulkPut(expenses);
    if (settings.length)     await db.settings.bulkPut(settings);
  }

  return {
    products: products.length,
    transactions: transactions.length,
    expenses: expenses.length,
    settings: settings.length,
  };
};

// ── Open DB (Dexie opens lazily, but we can pre-open) ──
export const openDB = () => db.open();
