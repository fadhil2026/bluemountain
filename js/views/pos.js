/**
 * views/pos.js — POS main view (product grid + cart)
 */
import store from '../store.js';
import { getAllProducts } from '../db.js';
import { formatRupiah }  from '../utils/currency.js';
import { showPaymentModal } from './modals.js';

let _searchQuery = '';
let _activeCategory = 'Semua';
let _posAbort = null; // AbortController for cleanup

export const initPOS = async () => {
  const products = await getAllProducts();
  store.setProducts(products);
  renderPOS();

  // Cleanup previous listeners before binding new ones
  if (_posAbort) _posAbort.abort();
  _posAbort = new AbortController();
  const { signal } = _posAbort;

  bindPOSEvents(signal);
  store.on('cart:change', updateCartUI);
  store.on('products:change', () => renderProductGrid());
};

const renderPOS = () => {
  const view = document.getElementById('view-pos');
  view.innerHTML = `
    <div class="pos-layout">
      <!-- Left: Products -->
      <div class="pos-left">
        <div class="pos-toolbar">
          <div class="pos-search-wrap">
            <span class="search-icon">🔍</span>
            <input type="text" class="pos-search" id="pos-search" placeholder="Cari produk...">
          </div>
          <div class="category-pills" id="category-pills"></div>
        </div>
        <div class="product-grid" id="product-grid"></div>
      </div>

      <!-- Right: Cart -->
      <div class="pos-right">
        <div class="cart-header">
          <div class="flex items-center gap-2">
            <span style="font-size:18px">🛒</span>
            <span class="cart-title">Keranjang</span>
          </div>
          <span class="cart-count" id="cart-count">0</span>
        </div>

        <div class="customer-row" style="padding: 10px 16px; border-bottom: 1px solid var(--border-subtle);">
          <span style="font-size:16px">👤</span>
          <input type="text" class="customer-input" id="customer-name"
            placeholder="Nama pelanggan (opsional)">
        </div>

        <div class="cart-items" id="cart-items">
          <div class="cart-empty">
            <div class="cart-empty__icon">🛒</div>
            <div style="font-size:13px; color:var(--text-muted)">Pilih produk untuk mulai</div>
          </div>
        </div>

        <div class="cart-footer">
          <div class="discount-row">
            <span style="font-size:13px; color:var(--text-secondary); flex:1">💳 Diskon (Rp)</span>
            <input type="number" class="discount-input" id="discount-input" value="0" min="0" placeholder="0">
          </div>
          <div class="cart-summary-row" id="tax-row" style="display:none">
            <span class="label">Pajak</span>
            <span class="value" id="tax-amount">Rp 0</span>
          </div>
          <div class="cart-total-row">
            <span class="cart-total-label">TOTAL</span>
            <span class="cart-total-amount" id="cart-total">Rp 0</span>
          </div>
          <div class="payment-buttons">
            <button class="btn-pay btn-pay--cash" id="btn-pay-cash">
              <span class="btn-pay__icon">💵</span>
              <span class="btn-pay__label">Tunai</span>
            </button>
            <button class="btn-pay btn-pay--transfer" id="btn-pay-transfer">
              <span class="btn-pay__icon">📲</span>
              <span class="btn-pay__label">Transfer</span>
            </button>
            <button class="btn-pay btn-pay--debt" id="btn-pay-debt">
              <span class="btn-pay__icon">📋</span>
              <span class="btn-pay__label">Hutang</span>
            </button>
          </div>
          <button class="btn-clear-cart" id="btn-clear-cart">🗑️ Kosongkan Keranjang</button>
        </div>
      </div>
    </div>
  `;

  renderCategoryPills();
  renderProductGrid();
  updateCartUI();
};

const getCategories = () => {
  const cats = ['Semua', ...new Set(store.state.products.map(p => p.category))];
  return cats;
};

const renderCategoryPills = () => {
  const container = document.getElementById('category-pills');
  if (!container) return;
  container.innerHTML = getCategories().map(cat => `
    <button class="cat-pill ${cat === _activeCategory ? 'active' : ''}"
      data-cat="${cat}">${cat}</button>
  `).join('');
};

const renderProductGrid = () => {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  let products = store.state.products;

  // Filter by category
  if (_activeCategory !== 'Semua') {
    products = products.filter(p => p.category === _activeCategory);
  }

  // Filter by search
  if (_searchQuery) {
    const q = _searchQuery.toLowerCase();
    products = products.filter(p => p.name.toLowerCase().includes(q));
  }

  if (!products.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state__icon">🔍</div>
      <div class="empty-state__text">Produk tidak ditemukan</div>
    </div>`;
    return;
  }

  grid.innerHTML = products.map(p => `
    <div class="product-card" data-id="${p.id}" role="button" tabindex="0">
      <div class="product-card__emoji">${p.emoji || '📦'}</div>
      <div class="product-card__name">${p.name}</div>
      <div class="product-card__price">${formatRupiah(p.price)}</div>
      <div class="product-card__unit">per ${p.unit}</div>
    </div>
  `).join('');

  // Bind click events
  grid.querySelectorAll('.product-card').forEach(card => {
    const addFn = () => {
      const id = parseInt(card.dataset.id);
      const product = store.state.products.find(p => p.id === id);
      if (product) {
        store.addToCart(product);
        // Visual feedback
        card.style.transform = 'scale(0.94)';
        setTimeout(() => { card.style.transform = ''; }, 120);
      }
    };
    card.addEventListener('click', addFn);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') addFn(); });
  });
};

const updateCartUI = () => {
  const cartItems  = document.getElementById('cart-items');
  const cartCount  = document.getElementById('cart-count');
  const cartTotal  = document.getElementById('cart-total');
  const taxAmount  = document.getElementById('tax-amount');
  const taxRow     = document.getElementById('tax-row');

  if (!cartItems) return;

  const cart = store.state.cart;

  // Update count badge
  if (cartCount) {
    const prev = cartCount.textContent;
    cartCount.textContent = store.cartCount;
    if (prev !== String(store.cartCount)) {
      cartCount.classList.remove('bump');
      void cartCount.offsetWidth;
      cartCount.classList.add('bump');
    }
  }

  // Update total
  if (cartTotal) cartTotal.textContent = formatRupiah(store.total);

  // Tax
  if (taxRow && taxAmount) {
    if (store.tax > 0) {
      taxRow.style.display = 'flex';
      taxAmount.textContent = formatRupiah(store.tax);
    } else {
      taxRow.style.display = 'none';
    }
  }

  // Cart items list
  if (!cart.length) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <div style="font-size:13px; color:var(--text-muted)">Pilih produk untuk mulai</div>
      </div>`;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" data-pid="${item.product.id}">
      <div>
        <div class="cart-item__name">${item.product.emoji || ''} ${item.product.name}</div>
        <div class="cart-item__price">${formatRupiah(item.product.price)} / ${item.product.unit}</div>
      </div>
      <div class="cart-item__controls">
        <div class="cart-item__subtotal">${formatRupiah(item.product.price * item.qty)}</div>
        <div class="qty-controls">
          <button class="qty-btn remove" data-action="remove" data-pid="${item.product.id}" title="Hapus">🗑</button>
          <button class="qty-btn" data-action="dec" data-pid="${item.product.id}">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-pid="${item.product.id}">+</button>
        </div>
      </div>
    </div>
  `).join('');

  // Bind qty buttons
  cartItems.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = parseInt(btn.dataset.pid);
      const action = btn.dataset.action;
      const item = store.state.cart.find(i => i.product.id === pid);
      if (!item) return;
      if (action === 'inc') store.setQty(pid, item.qty + 1);
      else if (action === 'dec') store.setQty(pid, item.qty - 1);
      else if (action === 'remove') store.removeFromCart(pid);
    });
  });
};

const bindPOSEvents = (signal) => {
  document.addEventListener('click', (e) => {
    // Category pills
    const pill = e.target.closest('.cat-pill');
    if (pill) {
      _activeCategory = pill.dataset.cat;
      renderCategoryPills();
      renderProductGrid();
    }

    // Pay buttons
    if (e.target.closest('#btn-pay-cash')) {
      if (!store.state.cart.length) { window.showToast('Keranjang kosong!', 'warning'); return; }
      showPaymentModal('cash');
    }
    if (e.target.closest('#btn-pay-transfer')) {
      if (!store.state.cart.length) { window.showToast('Keranjang kosong!', 'warning'); return; }
      showPaymentModal('transfer');
    }
    if (e.target.closest('#btn-pay-debt')) {
      if (!store.state.cart.length) { window.showToast('Keranjang kosong!', 'warning'); return; }
      showPaymentModal('debt');
    }

    // Clear cart
    if (e.target.closest('#btn-clear-cart')) {
      if (store.state.cart.length) {
        store.clearCart();
        window.showToast('Keranjang dikosongkan', 'info');
      }
    }
  }, { signal });

  // Search + inputs
  document.addEventListener('input', (e) => {
    if (e.target.id === 'pos-search') {
      _searchQuery = e.target.value.trim();
      renderProductGrid();
    }
    if (e.target.id === 'discount-input') {
      store.setDiscount(parseInt(e.target.value) || 0);
    }
    if (e.target.id === 'customer-name') {
      store.setCustomerName(e.target.value);
    }
  }, { signal });
};

// Re-render products when navigating back to POS
export const refreshPOS = async () => {
  const products = await getAllProducts();
  store.setProducts(products);
  renderProductGrid();
  renderCategoryPills();
};
