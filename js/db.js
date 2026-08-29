/**
 * db.js — IndexedDB wrapper for Blue Mountain POS
 * Stores: products, transactions, settings, expenses
 */

const DB_NAME    = 'BlueMountainPOS';
const DB_VERSION = 2; // bumped: added expenses store

let _db = null;

export const openDB = () => new Promise((resolve, reject) => {
  if (_db) return resolve(_db);

  const req = indexedDB.open(DB_NAME, DB_VERSION);

  req.onupgradeneeded = (e) => {
    const db = e.target.result;

    // Products store
    if (!db.objectStoreNames.contains('products')) {
      const ps = db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
      ps.createIndex('category', 'category', { unique: false });
    }

    // Transactions store
    if (!db.objectStoreNames.contains('transactions')) {
      const ts = db.createObjectStore('transactions', { keyPath: 'id', autoIncrement: true });
      ts.createIndex('date', 'date', { unique: false });
      ts.createIndex('dateKey', 'dateKey', { unique: false });
    }

    // Settings store
    if (!db.objectStoreNames.contains('settings')) {
      db.createObjectStore('settings', { keyPath: 'key' });
    }

    // NEW: Expenses store (pengeluaran operasional)
    if (!db.objectStoreNames.contains('expenses')) {
      const es = db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });
      es.createIndex('dateKey', 'dateKey', { unique: false });
      es.createIndex('category', 'category', { unique: false });
    }
  };

  req.onsuccess = (e) => { _db = e.target.result; resolve(_db); };
  req.onerror   = (e) => reject(e.target.error);
});

/* ── Generic Helpers ── */
const tx = (storeName, mode = 'readonly') => _db.transaction(storeName, mode).objectStore(storeName);

const req2promise = (r) => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });

/* ── Products ── */
export const getAllProducts = () => req2promise(tx('products').getAll());

export const addProduct = (product) => req2promise(tx('products', 'readwrite').add(product));

export const updateProduct = (product) => req2promise(tx('products', 'readwrite').put(product));

export const deleteProduct = (id) => req2promise(tx('products', 'readwrite').delete(id));

/* ── Transactions ── */
export const saveTransaction   = (txData) => req2promise(tx('transactions', 'readwrite').add(txData));
export const getAllTransactions = ()       => req2promise(tx('transactions').getAll());
export const deleteTransaction = (id)     => req2promise(tx('transactions', 'readwrite').delete(id));
export const updateTransaction = (txData) => req2promise(tx('transactions', 'readwrite').put(txData));

/* ── Expenses (Pengeluaran) ── */
export const saveExpense   = (exp) => req2promise(tx('expenses', 'readwrite').add(exp));
export const getAllExpenses = ()    => req2promise(tx('expenses').getAll());
export const deleteExpense = (id)  => req2promise(tx('expenses', 'readwrite').delete(id));

export const getTransactionsByDateKey = (dateKey) => new Promise((resolve, reject) => {
  const store = tx('transactions');
  const idx   = store.index('dateKey');
  const req   = idx.getAll(IDBKeyRange.only(dateKey));
  req.onsuccess = () => resolve(req.result);
  req.onerror   = () => reject(req.error);
});

/* ── Settings ── */
export const getSetting = (key) => req2promise(tx('settings').get(key)).then(r => r?.value ?? null);

export const setSetting = (key, value) => req2promise(tx('settings', 'readwrite').put({ key, value }));

/* ── Seed Default Products ── */
export const seedDefaultProducts = async () => {
  const existing = await getAllProducts();
  if (existing.length > 0) return;

  const defaults = [
    { name: 'Air Isi Ulang Galon', category: 'Galon',  price: 5000,  unit: 'galon', emoji: '🪣', stock: 999 },
    { name: 'Antar Galon (dalam)',  category: 'Galon',  price: 3000,  unit: 'kali',  emoji: '🛵', stock: 999 },
    { name: 'Antar Galon (luar)',   category: 'Galon',  price: 5000,  unit: 'kali',  emoji: '🚚', stock: 999 },
    { name: 'Galon Baru (Aqua)',    category: 'Galon',  price: 50000, unit: 'buah',  emoji: '💧', stock: 50  },
    { name: 'Galon Baru (Standar)', category: 'Galon',  price: 45000, unit: 'buah',  emoji: '💦', stock: 50  },
    { name: 'Air Botol 600ml',      category: 'Botol',  price: 3000,  unit: 'botol', emoji: '🍶', stock: 200 },
    { name: 'Air Botol 1500ml',     category: 'Botol',  price: 5000,  unit: 'botol', emoji: '🥤', stock: 100 },
    { name: 'Dispenser Galon',      category: 'Lainnya',price: 250000,'unit': 'unit', emoji: '⚗️', stock: 10  },
  ];

  for (const p of defaults) await addProduct(p);
};
