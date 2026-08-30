/**
 * db.js — Dexie.js IndexedDB wrapper
 * Replaces manual IndexedDB with reactive, typed, clean API.
 */
import Dexie from 'dexie';

export const db = new Dexie('BlueMountainPOS');

db.version(2).stores({
  products:     '++id, category',
  transactions: '++id, dateKey, paymentStatus, paymentMethod',
  settings:     'key',
  expenses:     '++id, dateKey, category',
});

// ── Products ──
export const getAllProducts    = ()        => db.products.toArray();
export const addProduct        = (p)       => db.products.add(p);
export const updateProduct     = (p)       => db.products.put(p);
export const deleteProduct     = (id)      => db.products.delete(id);

// ── Transactions ──
export const saveTransaction   = (tx)      => db.transactions.add(tx);
export const getAllTransactions = ()        => db.transactions.toArray();
export const deleteTransaction = (id)      => db.transactions.delete(id);
export const updateTransaction = (tx)      => db.transactions.put(tx);
export const getTransactionsByDateKey = (dateKey) =>
  db.transactions.where('dateKey').equals(dateKey).toArray();

// ── Expenses ──
export const saveExpense   = (exp) => db.expenses.add(exp);
export const getAllExpenses = ()    => db.expenses.toArray();
export const deleteExpense = (id)  => db.expenses.delete(id);

// ── Settings ──
export const getSetting = async (key) => {
  const row = await db.settings.get(key);
  return row?.value ?? null;
};
export const setSetting = (key, value) => db.settings.put({ key, value });

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

// ── Open DB (Dexie opens lazily, but we can pre-open) ──
export const openDB = () => db.open();
