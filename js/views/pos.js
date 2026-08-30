/**
 * views/pos.js — POS main view (product grid + cart + manual item entry)
 * FIX: Memory leak — store.on() subscriptions properly cleaned up
 * FEATURE: Manual item & custom price entry directly in POS
 */
import store                        from '../store.js';
import { getAllProducts, addProduct } from '../db.js';
import { formatRupiah }             from '../utils/currency.js';
import { esc }                      from '../utils/sanitize.js';
import { showPaymentModal, openModal, closeModal } from './modals.js';

let _searchQuery    = '';
let _activeCategory = 'Semua';
let _posAbort       = null;
let _posUnsubs      = [];   // FIX: track store subscriptions

export const initPOS = async () => {
  const products = await getAllProducts();
  store.setProducts(products);
  renderPOS();

  // Cleanup previous listeners
  if (_posAbort) _posAbort.abort();
  _posAbort = new AbortController();
  _posUnsubs.forEach(u => u());   // FIX: cleanup previous store listeners
  _posUnsubs = [
    store.on('cart:change',     updateCartUI),
    store.on('products:change', () => renderProductGrid()),
  ];

  bindPOSEvents(_posAbort.signal);
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
            <input type="text" class="pos-search" id="pos-search"
              placeholder="Cari produk..." maxlength="60" autocomplete="off">
          </div>
          <button class="btn btn--primary btn--sm" id="btn-manual-item"
            style="padding:8px 14px;height:38px;border-radius:var(--radius-lg);white-space:nowrap;font-weight:700;box-shadow:0 2px 8px rgba(37,99,235,0.25)">
            ➕ Item Manual
          </button>
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

        <div class="customer-row" style="padding:10px 16px;border-bottom:1px solid var(--border-subtle)">
          <span style="font-size:16px">👤</span>
          <input type="text" class="customer-input" id="customer-name"
            placeholder="Nama pelanggan (opsional)" maxlength="80" autocomplete="off">
        </div>

        <div class="cart-items" id="cart-items">
          <div class="cart-empty">
            <div class="cart-empty__icon">🛒</div>
            <div style="font-size:13px;color:var(--text-muted)">Pilih produk untuk mulai</div>
          </div>
        </div>

        <div class="cart-footer">
          <div class="discount-row">
            <span style="font-size:13px;color:var(--text-secondary);flex:1">💳 Diskon (Rp)</span>
            <input type="number" class="discount-input" id="discount-input"
              value="${store.state.discount || ''}" min="0" max="99999999" placeholder="0" inputmode="numeric">
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

const getCategories = () =>
  ['Semua', ...new Set(store.state.products.map(p => p.category))];

const renderCategoryPills = () => {
  const container = document.getElementById('category-pills');
  if (!container) return;
  container.innerHTML = getCategories().map(cat => `
    <button class="cat-pill ${cat === _activeCategory ? 'active' : ''}"
      data-cat="${esc(cat)}">${esc(cat)}</button>
  `).join('');
};

const renderProductGrid = () => {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  let products = store.state.products;
  if (_activeCategory !== 'Semua') {
    products = products.filter(p => p.category === _activeCategory);
  }
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
    <div class="product-card" data-id="${p.id}" role="button" tabindex="0"
      aria-label="${esc(p.name)} — ${formatRupiah(p.price)}">
      <div class="product-card__emoji">${p.emoji || '📦'}</div>
      <div class="product-card__name">${esc(p.name)}</div>
      <div class="product-card__price">${formatRupiah(p.price)}</div>
      <div class="product-card__unit">per ${esc(p.unit)}</div>
    </div>
  `).join('');

  grid.querySelectorAll('.product-card').forEach(card => {
    const addFn = () => {
      const id      = card.dataset.id;
      const product = store.state.products.find(p => String(p.id) === String(id));
      if (!product) return;
      store.addToCart(product);
      card.style.transform = 'scale(0.94)';
      setTimeout(() => { card.style.transform = ''; }, 120);
    };
    card.addEventListener('click', addFn);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); addFn(); }
    });
  });
};

const updateCartUI = () => {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const taxAmount = document.getElementById('tax-amount');
  const taxRow    = document.getElementById('tax-row');
  const custInput = document.getElementById('customer-name');
  const discInput = document.getElementById('discount-input');

  // Automatically reset/sync customer name when cart is cleared or updated
  if (custInput && !custInput.matches(':focus')) {
    custInput.value = store.state.customerName || '';
  }

  // Automatically reset/sync discount input when cart is cleared or updated
  if (discInput && !discInput.matches(':focus')) {
    discInput.value = store.state.discount || '';
  }

  if (!cartItems) return;

  const cart = store.state.cart;

  if (cartCount) {
    const prev = cartCount.textContent;
    cartCount.textContent = store.cartCount;
    if (prev !== String(store.cartCount)) {
      cartCount.classList.remove('bump');
      void cartCount.offsetWidth;
      cartCount.classList.add('bump');
    }
  }

  if (cartTotal) cartTotal.textContent = formatRupiah(store.total);

  if (taxRow && taxAmount) {
    if (store.tax > 0) {
      taxRow.style.display = 'flex';
      taxAmount.textContent = formatRupiah(store.tax);
    } else {
      taxRow.style.display = 'none';
    }
  }

  if (!cart.length) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <div style="font-size:13px;color:var(--text-muted)">Pilih produk untuk mulai</div>
      </div>`;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" data-pid="${item.product.id}">
      <div class="cart-item__info">
        <div class="cart-item__name">${item.product.emoji || ''} ${esc(item.product.name)}</div>
        <div class="cart-item__price">${formatRupiah(item.product.price)} / ${esc(item.product.unit)}</div>
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

  cartItems.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid    = btn.dataset.pid;
      const action = btn.dataset.action;
      const item   = store.state.cart.find(i => String(i.product.id) === String(pid));
      if (!item) return;
      if (action === 'inc')         store.setQty(item.product.id, item.qty + 1);
      else if (action === 'dec')    store.setQty(item.product.id, item.qty - 1);
      else if (action === 'remove') store.removeFromCart(item.product.id);
    });
  });
};

const showManualItemModal = () => {
  const html = `
    <div class="modal-header">
      <span class="modal-title">🏷️ Input Item / Harga Manual</span>
      <button class="modal-close" id="mi-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="input-group">
        <label class="input-label" for="mi-name">Nama Produk / Jasa <span style="color:red">*</span></label>
        <input type="text" class="input" id="mi-name" placeholder="e.g. Servis Pompa, Galon Khusus, Ongkir..." maxlength="80" autocomplete="off">
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px">
        <div class="input-group">
          <label class="input-label" for="mi-price">Harga per Satuan (Rp) <span style="color:red">*</span></label>
          <input type="number" class="input" id="mi-price" placeholder="15000" min="0" max="999999999" step="500" inputmode="numeric">
        </div>
        <div class="input-group">
          <label class="input-label" for="mi-qty">Jumlah (Qty)</label>
          <input type="number" class="input" id="mi-qty" value="1" min="1" max="999" inputmode="numeric">
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px">
        <div class="input-group">
          <label class="input-label" for="mi-unit">Satuan</label>
          <input type="text" class="input" id="mi-unit" value="pcs" placeholder="pcs, galon, botol, kali..." maxlength="20">
        </div>
        <div class="input-group">
          <label class="input-label" for="mi-category">Kategori</label>
          <select class="input" id="mi-category">
            <option value="Lainnya">Lainnya</option>
            <option value="Galon">Galon</option>
            <option value="Botol">Botol</option>
            <option value="Layanan">Layanan</option>
          </select>
        </div>
      </div>

      <div class="input-group" style="margin-top:10px">
        <label class="input-label">Emoji Ikon</label>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px">
          ${['🏷️','💧','🪣','🍶','🥤','💦','🛵','🚚','⚗️','📦','🫙','🧊'].map((e, idx) => `
            <button type="button" class="emoji-pick-mi ${idx === 0 ? 'emoji-pick--active' : ''}"
              data-emoji="${e}"
              style="font-size:24px;width:38px;height:38px;border-radius:8px;border:2px solid ${idx === 0 ? 'var(--blue-400)' : 'var(--border-subtle)'};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${e}</button>
          `).join('')}
        </div>
        <input type="hidden" id="mi-emoji" value="🏷️">
      </div>

      <div style="margin-top:14px;padding:10px 12px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle);display:flex;align-items:center;gap:10px">
        <input type="checkbox" id="mi-save-catalog" style="width:18px;height:18px;cursor:pointer">
        <label for="mi-save-catalog" style="font-size:13px;font-weight:600;color:var(--text-primary);cursor:pointer">
          💾 Simpan juga ke Katalog Produk permanen
        </label>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn--secondary" id="mi-cancel">Batal</button>
      <button class="btn btn--primary" id="mi-save">🛒 Tambah ke Keranjang</button>
    </div>
  `;

  openModal(html, 'manual-item-modal');

  setTimeout(() => {
    document.getElementById('mi-close')?.addEventListener('click',  () => closeModal('manual-item-modal'));
    document.getElementById('mi-cancel')?.addEventListener('click', () => closeModal('manual-item-modal'));

    document.getElementById('mi-name')?.focus();

    // Emoji picker
    document.querySelectorAll('.emoji-pick-mi').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.emoji-pick-mi').forEach(b => {
          b.style.borderColor = 'var(--border-subtle)';
          b.classList.remove('emoji-pick--active');
        });
        btn.style.borderColor = 'var(--blue-400)';
        btn.classList.add('emoji-pick--active');
        document.getElementById('mi-emoji').value = btn.dataset.emoji;
      });
    });

    // Save
    document.getElementById('mi-save')?.addEventListener('click', async () => {
      const name        = document.getElementById('mi-name')?.value.trim();
      const priceInput  = document.getElementById('mi-price')?.value;
      const price       = parseFloat(priceInput) || 0;
      const qty         = Math.max(1, parseInt(document.getElementById('mi-qty')?.value) || 1);
      const unit        = document.getElementById('mi-unit')?.value.trim() || 'pcs';
      const category    = document.getElementById('mi-category')?.value || 'Lainnya';
      const emoji       = document.getElementById('mi-emoji')?.value || '🏷️';
      const saveCatalog = document.getElementById('mi-save-catalog')?.checked;

      if (!name) { window.showToast('Nama produk wajib diisi!', 'warning'); return; }
      if (priceInput === '' || price < 0) { window.showToast('Harga tidak boleh kosong atau negatif!', 'warning'); return; }

      try {
        if (saveCatalog) {
          const newId = await addProduct({ name, price, unit, category, emoji, stock: 999 });
          const allProducts = await getAllProducts();
          store.setProducts(allProducts);
          const savedProduct = allProducts.find(p => p.id === newId) || { id: newId, name, price, unit, category, emoji };
          store.addToCart(savedProduct, qty);
          window.showToast(`Product "${name}" ditambahkan ke katalog & keranjang`, 'success');
        } else {
          const manualProduct = {
            id: 'manual_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            name,
            price,
            unit,
            category,
            emoji
          };
          store.addToCart(manualProduct, qty);
          window.showToast(`"${name}" ditambahkan ke keranjang`, 'success');
        }

        closeModal('manual-item-modal');
      } catch (err) {
        window.showToast('Gagal menambahkan item manual!', 'error');
        console.error('[manual-item]', err);
      }
    });
  }, 0);
};

const bindPOSEvents = (signal) => {
  document.addEventListener('click', (e) => {
    const pill = e.target.closest('.cat-pill');
    if (pill) {
      _activeCategory = pill.dataset.cat;
      renderCategoryPills();
      renderProductGrid();
      return;
    }

    if (e.target.closest('#btn-manual-item')) {
      showManualItemModal();
      return;
    }

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
    if (e.target.closest('#btn-clear-cart')) {
      if (store.state.cart.length) {
        store.clearCart();
        window.showToast('Keranjang dikosongkan', 'info');
      }
    }
  }, { signal });

  document.addEventListener('input', (e) => {
    if (e.target.id === 'pos-search') {
      _searchQuery = e.target.value.trim();
      renderProductGrid();
    }
    if (e.target.id === 'discount-input') {
      store.setDiscount(parseFloat(e.target.value) || 0);
    }
    if (e.target.id === 'customer-name') {
      store.setCustomerName(e.target.value);
    }
  }, { signal });
};

export const refreshPOS = async () => {
  const view = document.getElementById('view-pos');
  if (!view || !view.querySelector('.pos-layout')) {
    renderPOS();
  }
  const products = await getAllProducts();
  store.setProducts(products);
  renderProductGrid();
  renderCategoryPills();
};
