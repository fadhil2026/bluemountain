/**
 * store.js — Reactive state management (no framework)
 */

const _listeners = {};

const store = {
  state: {
    cart: [],
    products: [],
    transactions: [],
    expenses: [],
    currentView: 'pos',
    discount: 0,
    customerName: '',
    settings: {
      shopName:    'Blue Mountain Refilling Station',
      shopAddress: 'Jl. Contoh No. 1, Kota',
      shopPhone:   '0812-3456-7890',
      cashierName: 'Admin',
      printerUrl:  '',
      printEnabled: false,
      taxRate:     0,
      bankName:    'BCA',
      bankNumber:  '',
      bankHolder:  'Blue Mountain Refilling Station',
      modalAwal:   0,
    },
  },

  // ── Subscriptions ──
  on(event, fn) {
    (_listeners[event] ??= []).push(fn);
    return () => { _listeners[event] = _listeners[event].filter(f => f !== fn); };
  },

  emit(event, data) {
    (_listeners[event] ?? []).forEach(fn => fn(data));
    (_listeners['*'] ?? []).forEach(fn => fn(event, data));
  },

  // ── Cart ──
  addToCart(product) {
    const idx = this.state.cart.findIndex(i => i.product.id === product.id);
    if (idx >= 0) {
      this.state.cart[idx].qty++;
    } else {
      this.state.cart.push({ product, qty: 1 });
    }
    this.emit('cart:change', this.state.cart);
  },

  removeFromCart(productId) {
    this.state.cart = this.state.cart.filter(i => i.product.id !== productId);
    this.emit('cart:change', this.state.cart);
  },

  setQty(productId, qty) {
    if (qty <= 0) return this.removeFromCart(productId);
    const item = this.state.cart.find(i => i.product.id === productId);
    if (item) { item.qty = qty; this.emit('cart:change', this.state.cart); }
  },

  clearCart() {
    this.state.cart = [];
    this.state.discount = 0;
    this.state.customerName = '';
    this.emit('cart:change', this.state.cart);
  },

  setDiscount(amount) {
    this.state.discount = Math.max(0, amount);
    this.emit('cart:change', this.state.cart);
  },

  setCustomerName(name) {
    this.state.customerName = name;
  },

  // ── Computed ──
  get subtotal() {
    return this.state.cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  },

  get tax() {
    return Math.round(this.subtotal * this.state.settings.taxRate / 100);
  },

  get total() {
    return Math.max(0, this.subtotal + this.tax - this.state.discount);
  },

  get cartCount() {
    return this.state.cart.reduce((s, i) => s + i.qty, 0);
  },

  // ── Products ──
  setProducts(products) {
    this.state.products = products;
    this.emit('products:change', products);
  },

  // ── Transactions ──
  setTransactions(txs) {
    this.state.transactions = txs;
    this.emit('transactions:change', txs);
  },

  removeTransaction(id) {
    this.state.transactions = this.state.transactions.filter(t => t.id !== id);
    this.emit('transactions:change', this.state.transactions);
  },

  addTransaction(tx) {
    this.state.transactions = [tx, ...this.state.transactions];
    this.emit('transactions:change', this.state.transactions);
  },

  updateTransaction(id, patch) {
    const idx = this.state.transactions.findIndex(t => t.id === id);
    if (idx >= 0) {
      this.state.transactions[idx] = { ...this.state.transactions[idx], ...patch };
      this.emit('transactions:change', this.state.transactions);
    }
  },

  // ── Expenses ──
  setExpenses(expenses) {
    this.state.expenses = expenses;
    this.emit('expenses:change', expenses);
  },

  addExpense(expense) {
    this.state.expenses = [...this.state.expenses, expense];
    this.emit('expenses:change', this.state.expenses);
  },

  removeExpense(id) {
    this.state.expenses = this.state.expenses.filter(e => e.id !== id);
    this.emit('expenses:change', this.state.expenses);
  },

  // ── View ──
  navigate(view) {
    this.state.currentView = view;
    this.emit('navigate', view);
  },

  // ── Settings ──
  updateSettings(partial) {
    Object.assign(this.state.settings, partial);
    this.emit('settings:change', this.state.settings);
  },
};

export default store;
