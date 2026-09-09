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
  pushUserToCloud,
  deleteUserFromCloud,
  isServerOnline,
  checkStagedOfflineTransactions,
} from './supabase.js';
import { generateUUID } from './utils/crypto.js';

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

db.version(4).stores({
  products:     '++id, category, sku',
  customers:    '++id, name, phone, category, totalDebt',
  transactions: '++id, dateKey, paymentStatus, paymentMethod, customerName',
  settings:     'key',
  expenses:     '++id, dateKey, category',
  users:        '++id, username, role, isActive',
});

// v5: Enterprise Web2 UUIDs + Tombstone Soft Deletion
db.version(5).stores({
  products:     'id, category, sku, deleted_at',
  customers:    'id, name, phone, category, totalDebt, deleted_at',
  transactions: 'id, invoiceNo, dateKey, paymentStatus, paymentMethod, customerName, syncStatus, deleted_at',
  settings:     'key',
  expenses:     'id, dateKey, category, deleted_at',
  users:        'id, username, role, isActive',
});

// ── Users (RBAC) ──
export const getAllUsers        = () => db.users.toArray();
export const getUserById        = (id) => db.users.get(id);
export const getUserByUsername  = (username) => db.users.where('username').equalsIgnoreCase(String(username).trim()).first();
export const addUser            = async (u) => {
  const user = { ...u, id: u.id ? String(u.id) : generateUUID('usr') };
  await db.users.put(user);
  pushUserToCloud(user).catch(() => {});
  return user.id;
};
export const updateUser         = async (u) => {
  const res = await db.users.put(u);
  pushUserToCloud(u).catch(() => {});
  return res;
};
export const deleteUser         = async (id) => {
  const user = await db.users.get(id);
  const res = await db.users.delete(id);
  if (user && user.username) {
    deleteUserFromCloud(user.username).catch(() => {});
  }
  return res;
};

// ── Customers ──
export const getAllCustomers = async () => {
  const list = await db.customers.toArray();
  return list.filter(c => !c.deleted_at);
};
export const getCustomerById = (id) => db.customers.get(id);
export const addCustomer     = async (c) => {
  const customer = {
    ...c,
    id: c.id ? String(c.id) : generateUUID('cust'),
    deleted_at: null,
    updated_at: new Date().toISOString()
  };
  await db.customers.put(customer);
  pushCustomerToCloud(customer).catch(() => {});
  return customer.id;
};
export const updateCustomer  = async (c) => {
  const customer = { ...c, updated_at: new Date().toISOString() };
  const res = await db.customers.put(customer);
  pushCustomerToCloud(customer).catch(() => {});
  return res;
};
export const deleteCustomer  = async (id) => {
  const existing = await db.customers.get(id);
  if (existing) {
    const tombstone = {
      ...existing,
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    await db.customers.put(tombstone);
    deleteCustomerFromCloud(id).catch(() => {});
  }
  return id;
};

// ── Products ──
export const getAllProducts = async () => {
  const list = await db.products.toArray();
  return list.filter(p => !p.deleted_at);
};
export const addProduct = async (p) => {
  const product = {
    ...p,
    id: p.id ? String(p.id) : generateUUID('prod'),
    deleted_at: null,
    updated_at: new Date().toISOString()
  };
  await db.products.put(product);
  pushProductToCloud(product).catch(() => {});
  return product.id;
};
export const updateProduct = async (p) => {
  const product = { ...p, updated_at: new Date().toISOString() };
  const res = await db.products.put(product);
  pushProductToCloud(product).catch(() => {});
  return res;
};
export const deleteProduct = async (id) => {
  const existing = await db.products.get(id);
  if (existing) {
    const tombstone = {
      ...existing,
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    await db.products.put(tombstone);
    deleteProductFromCloud(id).catch(() => {});
  }
  return id;
};

// ── Transactions ──
export const saveTransaction = async (tx) => {
  const online = typeof isServerOnline === 'function' ? isServerOnline() : navigator.onLine;
  const transaction = {
    ...tx,
    id: tx.id ? String(tx.id) : generateUUID('tx'),
    syncStatus: online ? 'synced' : 'staged_offline',
    deleted_at: null,
    updated_at: new Date().toISOString()
  };
  await db.transactions.put(transaction);
  if (online) {
    pushTransactionToCloud(transaction).catch(() => {});
  } else {
    try { checkStagedOfflineTransactions?.(); } catch (_) {}
  }
  return transaction.id;
};
export const getAllTransactions = async () => {
  const list = await db.transactions.toArray();
  return list.filter(t => !t.deleted_at);
};
export const deleteTransaction = async (id) => {
  const existing = await db.transactions.get(id);
  if (existing) {
    const tombstone = {
      ...existing,
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    await db.transactions.put(tombstone);
    deleteTransactionFromCloud(id).catch(() => {});
  }
  return id;
};
export const updateTransaction = async (tx) => {
  const transaction = { ...tx, updated_at: new Date().toISOString() };
  const res = await db.transactions.put(transaction);
  pushTransactionToCloud(transaction).catch(() => {});
  return res;
};
export const getTransactionsByDateKey = async (dateKey) => {
  const list = await db.transactions.where('dateKey').equals(dateKey).toArray();
  return list.filter(t => !t.deleted_at);
};

// ── Expenses ──
export const saveExpense = async (exp) => {
  const online = typeof isServerOnline === 'function' ? isServerOnline() : navigator.onLine;
  const expense = {
    ...exp,
    id: exp.id ? String(exp.id) : generateUUID('exp'),
    syncStatus: online ? 'synced' : 'staged_offline',
    deleted_at: null,
    updated_at: new Date().toISOString()
  };
  await db.expenses.put(expense);
  if (online) {
    pushExpenseToCloud(expense).catch(() => {});
  }
  return expense.id;
};
export const getAllExpenses = async () => {
  const list = await db.expenses.toArray();
  return list.filter(e => !e.deleted_at);
};
export const deleteExpense = async (id) => {
  const existing = await db.expenses.get(id);
  if (existing) {
    const tombstone = {
      ...existing,
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    await db.expenses.put(tombstone);
    deleteExpenseFromCloud(id).catch(() => {});
  }
  return id;
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
  await db.products.bulkPut([
    { id: generateUUID('prod'), name: 'Air Isi Ulang Galon', category: 'Galon',   price: 5000,  unit: 'galon', emoji: '🪣', stock: 999, deleted_at: null },
    { id: generateUUID('prod'), name: 'Antar Galon (dalam)',  category: 'Galon',   price: 3000,  unit: 'kali',  emoji: '🛵', stock: 999, deleted_at: null },
    { id: generateUUID('prod'), name: 'Antar Galon (luar)',   category: 'Galon',   price: 5000,  unit: 'kali',  emoji: '🚚', stock: 999, deleted_at: null },
    { id: generateUUID('prod'), name: 'Galon Baru (Aqua)',    category: 'Galon',   price: 50000, unit: 'buah',  emoji: '💧', stock: 50,  deleted_at: null },
    { id: generateUUID('prod'), name: 'Galon Baru (Standar)', category: 'Galon',   price: 45000, unit: 'buah',  emoji: '💦', stock: 50,  deleted_at: null },
    { id: generateUUID('prod'), name: 'Air Botol 600ml',      category: 'Botol',   price: 3000,  unit: 'botol', emoji: '🍶', stock: 200, deleted_at: null },
    { id: generateUUID('prod'), name: 'Air Botol 1500ml',     category: 'Botol',   price: 5000,  unit: 'botol', emoji: '🥤', stock: 100, deleted_at: null },
    { id: generateUUID('prod'), name: 'Dispenser Galon',      category: 'Lainnya', price: 250000, unit: 'unit', emoji: '⚗️', stock: 10,  deleted_at: null },
  ]);
};

// ── Server-Authoritative: No Dummy Users Generated Locally ──
// ponytail: Client browser/phone must NEVER generate dummy accounts locally. DB Master in Supabase Cloud is Single Source of Truth.
export const seedDefaultUsers = async () => {
  return;
};

// ── Clear All Data (Robust Reset) ──
export const clearAllData = async () => {
  await Promise.all([
    db.products.clear(),
    db.customers.clear(),
    db.transactions.clear(),
    db.expenses.clear(),
    db.settings.clear(),
    db.users.clear(),
  ]);
  sessionStorage.clear();
  localStorage.clear();
};

// ── Export Full Backup JSON (Cross-device sync) ──
export const exportFullBackup = async () => {
  const [products, customers, transactions, expenses, settings, users] = await Promise.all([
    db.products.toArray(),
    db.customers.toArray(),
    db.transactions.toArray(),
    db.expenses.toArray(),
    db.settings.toArray(),
    db.users.toArray(),
  ]);

  const shopSetting = settings.find(s => s.key === 'shopName');
  const shopName = shopSetting?.value || 'Blue Mountain';

  return {
    app: 'Blue Mountain POS',
    version: typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '3.1.0',
    exportedAt: new Date().toISOString(),
    shopName,
    data: {
      products,
      customers,
      transactions,
      expenses,
      settings,
      users,
    },
    meta: {
      productCount: products.length,
      customerCount: customers.length,
      transactionCount: transactions.length,
      expenseCount: expenses.length,
      settingCount: settings.length,
      userCount: users.length,
    },
  };
};

// ── Import Full Backup JSON (Cross-device sync) ──
export const importFullBackup = async (backupJson, mode = 'replace') => {
  if (!backupJson || !backupJson.data) {
    throw new Error('Format file backup tidak valid atau rusak.');
  }

  const {
    products = [],
    customers = [],
    transactions = [],
    expenses = [],
    settings = [],
    users = []
  } = backupJson.data;

  if (mode === 'replace') {
    await Promise.all([
      db.products.clear(),
      db.customers.clear(),
      db.transactions.clear(),
      db.expenses.clear(),
      db.settings.clear(),
      db.users.clear(),
    ]);

    if (products.length)     await db.products.bulkAdd(products);
    if (customers.length)    await db.customers.bulkAdd(customers);
    if (transactions.length) await db.transactions.bulkAdd(transactions);
    if (expenses.length)     await db.expenses.bulkAdd(expenses);
    if (settings.length)     await db.settings.bulkPut(settings);
    if (users.length)        await db.users.bulkAdd(users);
  } else if (mode === 'merge') {
    if (products.length)     await db.products.bulkPut(products);
    if (customers.length)    await db.customers.bulkPut(customers);
    if (transactions.length) await db.transactions.bulkPut(transactions);
    if (expenses.length)     await db.expenses.bulkPut(expenses);
    if (settings.length)     await db.settings.bulkPut(settings);
    if (users.length)        await db.users.bulkPut(users);
  }

  return {
    products: products.length,
    customers: customers.length,
    transactions: transactions.length,
    expenses: expenses.length,
    settings: settings.length,
    users: users.length,
  };
};

// ── Open DB (Dexie opens lazily, but we can pre-open) ──
export const openDB = () => db.open();
