/**
 * views/products.js — Product management (CRUD)
 */
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../db.js';
import store from '../store.js';
import { formatRupiah } from '../utils/currency.js';
import { openModal, closeModal } from './modals.js';

const EMOJIS = ['💧','🪣','🍶','🥤','💦','🛵','🚚','⚗️','📦','🏷️','🫙','🧊'];
const CATEGORIES = ['Galon','Botol','Layanan','Lainnya'];

export const initProducts = async () => {
  await renderProducts();
};

export const renderProducts = async () => {
  const view = document.getElementById('view-products');
  const products = await getAllProducts();

  view.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">Manajemen Produk <span>${products.length} produk</span></h2>
      <button class="btn btn--primary" id="btn-add-product">
        ＋ Tambah Produk
      </button>
    </div>
    <div class="products-grid" id="products-grid">
      ${products.length ? products.map(p => renderProductCard(p)).join('') : `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-state__icon">📦</div>
          <div class="empty-state__text">Belum ada produk. Klik "Tambah Produk" untuk mulai.</div>
        </div>
      `}
    </div>
  `;

  bindProductEvents();
};

const renderProductCard = (p) => `
  <div class="product-manage-card" data-id="${p.id}">
    <div class="product-manage-card__header">
      <span class="product-emoji-large">${p.emoji || '📦'}</span>
      <div class="product-manage-card__info">
        <div class="product-manage-card__name">${p.name}</div>
        <div class="product-manage-card__cat">
          <span class="badge badge--blue">${p.category}</span>
        </div>
      </div>
    </div>
    <div class="product-manage-card__price">${formatRupiah(p.price)}<span style="font-size:12px;font-weight:400;color:var(--text-secondary)"> / ${p.unit}</span></div>
    <div class="product-manage-card__actions">
      <button class="btn btn--secondary btn--sm" style="flex:1" data-action="edit" data-id="${p.id}">✏️ Edit</button>
      <button class="btn btn--danger btn--sm" data-action="delete" data-id="${p.id}">🗑️</button>
    </div>
  </div>
`;

const bindProductEvents = () => {
  const grid = document.getElementById('products-grid');
  const addBtn = document.getElementById('btn-add-product');

  addBtn?.addEventListener('click', () => showProductForm());

  grid?.addEventListener('click', async (e) => {
    const editBtn = e.target.closest('[data-action="edit"]');
    const delBtn  = e.target.closest('[data-action="delete"]');

    if (editBtn) {
      const id = parseInt(editBtn.dataset.id);
      const products = await getAllProducts();
      const product = products.find(p => p.id === id);
      if (product) showProductForm(product);
    }

    if (delBtn) {
      const id = parseInt(delBtn.dataset.id);
      showDeleteConfirm(id);
    }
  });
};

const showProductForm = (product = null) => {
  const isEdit = !!product;
  const html = `
    <div class="modal-header">
      <span class="modal-title">${isEdit ? '✏️ Edit Produk' : '➕ Tambah Produk'}</span>
      <button class="modal-close" id="pf-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="input-group">
        <label class="input-label">Nama Produk</label>
        <input type="text" class="input" id="pf-name" value="${product?.name || ''}" placeholder="e.g. Air Isi Ulang Galon">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="input-group">
          <label class="input-label">Harga (Rp)</label>
          <input type="number" class="input" id="pf-price" value="${product?.price || ''}" min="0" placeholder="5000">
        </div>
        <div class="input-group">
          <label class="input-label">Satuan</label>
          <input type="text" class="input" id="pf-unit" value="${product?.unit || 'pcs'}" placeholder="galon, botol, pcs...">
        </div>
      </div>
      <div class="input-group">
        <label class="input-label">Kategori</label>
        <select class="input" id="pf-category">
          ${CATEGORIES.map(c => `<option ${product?.category === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">Emoji Ikon</label>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px">
          ${EMOJIS.map(e => `
            <button class="emoji-pick ${product?.emoji === e ? 'emoji-pick--active' : ''}"
              data-emoji="${e}"
              style="font-size:24px;width:40px;height:40px;border-radius:8px;border:2px solid ${product?.emoji === e ? 'var(--blue-400)' : 'var(--border-subtle)'};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${e}</button>
          `).join('')}
        </div>
        <input type="hidden" id="pf-emoji" value="${product?.emoji || EMOJIS[0]}">
      </div>
      <div class="input-group">
        <label class="input-label">Stok</label>
        <input type="number" class="input" id="pf-stock" value="${product?.stock || 999}" min="0">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn--secondary" id="pf-cancel">Batal</button>
      <button class="btn btn--primary" id="pf-save">
        ${isEdit ? '💾 Simpan' : '➕ Tambah'}
      </button>
    </div>
  `;

  openModal(html, 'product-form');

  // Close buttons
  document.getElementById('pf-close')?.addEventListener('click', closeModal);
  document.getElementById('pf-cancel')?.addEventListener('click', closeModal);

  // Emoji picker
  document.querySelectorAll('.emoji-pick').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.emoji-pick').forEach(b => {
        b.style.borderColor = 'var(--border-subtle)';
        b.classList.remove('emoji-pick--active');
      });
      btn.style.borderColor = 'var(--blue-400)';
      btn.classList.add('emoji-pick--active');
      document.getElementById('pf-emoji').value = btn.dataset.emoji;
    });
  });

  // Save
  document.getElementById('pf-save')?.addEventListener('click', async () => {
    const name     = document.getElementById('pf-name')?.value.trim();
    const price    = parseFloat(document.getElementById('pf-price')?.value) || 0;
    const unit     = document.getElementById('pf-unit')?.value.trim() || 'pcs';
    const category = document.getElementById('pf-category')?.value || 'Lainnya';
    const emoji    = document.getElementById('pf-emoji')?.value || '📦';
    const stock    = parseInt(document.getElementById('pf-stock')?.value) || 0;

    if (!name) { window.showToast('Nama produk wajib diisi!', 'warning'); return; }
    if (price <= 0) { window.showToast('Harga harus lebih dari 0!', 'warning'); return; }

    try {
      if (isEdit) {
        await updateProduct({ ...product, name, price, unit, category, emoji, stock });
        window.showToast('Produk berhasil diperbarui', 'success');
      } else {
        await addProduct({ name, price, unit, category, emoji, stock });
        window.showToast('Produk berhasil ditambahkan', 'success');
      }
      closeModal();

      // Refresh
      const allProducts = await getAllProducts();
      store.setProducts(allProducts);
      await renderProducts();
    } catch (err) {
      window.showToast('Gagal menyimpan produk!', 'error');
      console.error(err);
    }
  });
};

const showDeleteConfirm = (id) => {
  const html = `
    <div class="modal-header">
      <span class="modal-title">🗑️ Hapus Produk</span>
      <button class="modal-close" id="dc-close">✕</button>
    </div>
    <div class="modal-body">
      <p style="color:var(--text-secondary);font-size:14px">
        Yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.
      </p>
    </div>
    <div class="modal-footer">
      <button class="btn btn--secondary" id="dc-cancel">Batal</button>
      <button class="btn btn--danger" id="dc-confirm">🗑️ Hapus</button>
    </div>
  `;

  openModal(html, 'delete-confirm');
  document.getElementById('dc-close')?.addEventListener('click', closeModal);
  document.getElementById('dc-cancel')?.addEventListener('click', closeModal);
  document.getElementById('dc-confirm')?.addEventListener('click', async () => {
    await deleteProduct(id);
    const allProducts = await getAllProducts();
    store.setProducts(allProducts);
    closeModal();
    await renderProducts();
    window.showToast('Produk dihapus', 'success');
  });
};
