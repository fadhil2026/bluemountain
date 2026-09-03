/**
 * views/products.js — Product management (CRUD)
 * Features: Auto SKU Generator, Custom PNG/JPEG Upload with WebP Compression, Emoji Picker
 */
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../db.js';
import store            from '../store.js';
import { formatRupiah } from '../utils/currency.js';
import { esc }          from '../utils/sanitize.js';
import { compressImage, generateSKU } from '../utils/image.js';
import { openModal, closeModal }     from './modals.js';

const EMOJIS     = ['💧','🪣','🍶','🥤','💦','🛵','🚚','⚗️','📦','🏷️','🫙','🧊'];
const CATEGORIES = ['Galon','Botol','Layanan','Lainnya'];

export const initProducts = async () => {
  await renderProducts();
};

export const renderProducts = async () => {
  const view     = document.getElementById('view-products');
  const products = await getAllProducts();

  view.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">Manajemen Produk <span>${products.length} produk</span></h2>
      <button class="btn btn--primary" id="btn-add-product">
        ＋ Tambah Produk
      </button>
    </div>
    <div class="products-grid" id="products-grid">
      ${products.length
        ? products.map(p => renderProductCard(p)).join('')
        : `<div class="empty-state" style="grid-column:1/-1">
            <div class="empty-state__icon">📦</div>
            <div class="empty-state__text">Belum ada produk. Klik "Tambah Produk" untuk mulai.</div>
          </div>`
      }
    </div>
  `;

  bindProductEvents();
};

const renderProductCard = (p) => {
  const thumb = p.image
    ? `<img src="${p.image}" class="product-thumb" alt="${esc(p.name)}" style="width:40px;height:40px;object-fit:cover;border-radius:8px;border:1.5px solid var(--border-subtle)">`
    : `<span class="product-emoji-large">${p.emoji || '📦'}</span>`;

  return `
    <div class="product-manage-card" data-id="${p.id}">
      <div class="product-manage-card__header">
        ${thumb}
        <div class="product-manage-card__info">
          <div class="product-manage-card__name">${esc(p.name)}</div>
          <div class="product-manage-card__cat" style="display:flex;align-items:center;gap:6px;margin-top:3px">
            <span class="badge badge--blue">${esc(p.category)}</span>
            <span class="badge" style="background:var(--bg-glass);border:1px solid var(--border-default);font-size:10px;font-weight:700;color:var(--text-secondary)">${esc(p.sku || `BM-${p.id}`)}</span>
          </div>
        </div>
      </div>
      <div class="product-manage-card__price">
        ${formatRupiah(p.price)}<span style="font-size:12px;font-weight:400;color:var(--text-secondary)"> / ${esc(p.unit)}</span>
        ${p.cost > 0 ? `<div style="font-size:11px;color:var(--text-muted);font-weight:600;margin-top:2px">Modal: ${formatRupiah(p.cost)} &bull; Margin: ${formatRupiah(p.price - p.cost)}</div>` : ''}
      </div>
      <div class="product-manage-card__actions">
        <button class="btn btn--secondary btn--sm" style="flex:1" data-action="edit" data-id="${p.id}">✏️ Edit</button>
        <button class="btn btn--danger btn--sm" data-action="delete" data-id="${p.id}">🗑️</button>
      </div>
    </div>
  `;
};

const bindProductEvents = () => {
  const grid   = document.getElementById('products-grid');
  const addBtn = document.getElementById('btn-add-product');

  addBtn?.addEventListener('click', async () => {
    const products = await getAllProducts();
    showProductForm(null, products);
  });

  grid?.addEventListener('click', async (e) => {
    const editBtn = e.target.closest('[data-action="edit"]');
    const delBtn  = e.target.closest('[data-action="delete"]');

    if (editBtn) {
      const id       = parseInt(editBtn.dataset.id);
      const products = await getAllProducts();
      const product  = products.find(p => p.id === id);
      if (product) showProductForm(product, products);
    }

    if (delBtn) {
      const id = parseInt(delBtn.dataset.id);
      showDeleteConfirm(id);
    }
  });
};

const showProductForm = (product = null, allProducts = []) => {
  const isEdit = !!product;
  const autoSKU = product?.sku || generateSKU(allProducts);
  let currentImage = product?.image || null;

  const html = `
    <div class="modal-header">
      <span class="modal-title">${isEdit ? '✏️ Edit Produk' : '➕ Tambah Produk'}</span>
      <button class="modal-close" id="pf-close">✕</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="input-group">
          <label class="input-label">Nama Produk <span style="color:red">*</span></label>
          <input type="text" class="input" id="pf-name"
            value="${esc(product?.name || '')}"
            placeholder="e.g. Air Mineral 19 L"
            maxlength="80" autocomplete="off">
        </div>
        <div class="input-group">
          <label class="input-label">Kode / SKU Produk</label>
          <input type="text" class="input" id="pf-sku"
            value="${esc(autoSKU)}"
            placeholder="BM-001"
            maxlength="30" autocomplete="off">
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="input-group">
          <label class="input-label">Harga Jual (Rp) <span style="color:red">*</span></label>
          <input type="number" class="input" id="pf-price"
            value="${product?.price || ''}" min="0" max="999999999"
            placeholder="5000" inputmode="numeric">
        </div>
        <div class="input-group">
          <label class="input-label">Harga Modal / HPP (Rp)</label>
          <input type="number" class="input" id="pf-cost"
            value="${product?.cost || ''}" min="0" max="999999999"
            placeholder="2500" inputmode="numeric">
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="input-group">
          <label class="input-label">Satuan</label>
          <input type="text" class="input" id="pf-unit"
            value="${esc(product?.unit || 'galon')}"
            placeholder="galon, botol, pcs..."
            maxlength="20">
        </div>
        <div class="input-group">
          <label class="input-label">Stok Fisik Saat Ini</label>
          <input type="number" class="input" id="pf-stock"
            value="${product?.stock ?? 999}" min="0" max="999999"
            placeholder="100">
        </div>
      </div>

      <div class="input-group">
        <label class="input-label">Kategori</label>
        <select class="input" id="pf-category">
          ${CATEGORIES.map(c =>
            `<option value="${esc(c)}" ${product?.category === c ? 'selected' : ''}>${esc(c)}</option>`
          ).join('')}
        </select>
      </div>

      <!-- Icon / Image Selector -->
      <div class="input-group">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <label class="input-label" style="margin:0">Ikon / Foto Produk</label>
          <div style="display:flex;gap:6px">
            <button type="button" class="btn btn--sm ${currentImage ? 'btn--secondary' : 'btn--primary'}" id="btn-tab-emoji" style="padding:3px 8px;font-size:11px">😀 Emoji</button>
            <button type="button" class="btn btn--sm ${currentImage ? 'btn--primary' : 'btn--secondary'}" id="btn-tab-upload" style="padding:3px 8px;font-size:11px">📷 Upload Foto</button>
          </div>
        </div>

        <!-- Emoji Selector Box -->
        <div id="box-emoji-picker" style="display:${currentImage ? 'none' : 'block'}">
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px" id="emoji-picker">
            ${EMOJIS.map(e => `
              <button type="button" class="emoji-pick ${product?.emoji === e && !currentImage ? 'emoji-pick--active' : ''}"
                data-emoji="${e}"
                style="font-size:22px;width:38px;height:38px;border-radius:8px;border:2px solid ${product?.emoji === e && !currentImage ? 'var(--blue-400)' : 'var(--border-subtle)'};background:var(--bg-glass);cursor:pointer;transition:all 150ms">${e}</button>
            `).join('')}
          </div>
        </div>

        <!-- Photo Upload Box -->
        <div id="box-upload-picker" style="display:${currentImage ? 'block' : 'none'};margin-top:6px">
          <div style="display:flex;align-items:center;gap:12px;padding:10px;background:var(--bg-elevated);border-radius:10px;border:1.5px dashed var(--border-default)">
            <div id="pf-img-preview" style="width:48px;height:48px;border-radius:8px;background:white;display:flex;align-items:center;justify-content:center;overflow:hidden;border:1px solid var(--border-subtle);flex-shrink:0">
              ${currentImage ? `<img src="${currentImage}" style="width:100%;height:100%;object-fit:cover">` : '<span style="font-size:20px;opacity:0.4">🖼️</span>'}
            </div>
            <div style="flex:1">
              <label for="pf-file-input" class="btn btn--secondary btn--sm" style="cursor:pointer;display:inline-block">
                📁 Pilih Gambar (PNG/JPG)
              </label>
              <input type="file" id="pf-file-input" accept="image/png, image/jpeg, image/webp" style="display:none">
              <div style="font-size:10px;color:var(--text-muted);margin-top:4px">Otomatis di-compress WebP < 10KB</div>
            </div>
            ${currentImage ? '<button type="button" class="btn btn--danger btn--sm" id="btn-remove-img" style="padding:4px 8px">✕</button>' : ''}
          </div>
        </div>

        <input type="hidden" id="pf-emoji" value="${esc(product?.emoji || EMOJIS[0])}">
      </div>

      <div class="input-group">
        <label class="input-label">Stok</label>
        <input type="number" class="input" id="pf-stock"
          value="${product?.stock ?? 999}" min="0" max="999999" inputmode="numeric">
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

  setTimeout(() => {
    document.getElementById('pf-close')?.addEventListener('click',  () => closeModal('product-form'));
    document.getElementById('pf-cancel')?.addEventListener('click', () => closeModal('product-form'));

    const tabEmoji  = document.getElementById('btn-tab-emoji');
    const tabUpload = document.getElementById('btn-tab-upload');
    const boxEmoji  = document.getElementById('box-emoji-picker');
    const boxUpload = document.getElementById('box-upload-picker');
    const fileInput = document.getElementById('pf-file-input');
    const previewEl = document.getElementById('pf-img-preview');

    tabEmoji?.addEventListener('click', () => {
      boxEmoji.style.display  = 'block';
      boxUpload.style.display = 'none';
      tabEmoji.className  = 'btn btn--sm btn--primary';
      tabUpload.className = 'btn btn--sm btn--secondary';
    });

    tabUpload?.addEventListener('click', () => {
      boxEmoji.style.display  = 'none';
      boxUpload.style.display = 'block';
      tabUpload.className = 'btn btn--sm btn--primary';
      tabEmoji.className  = 'btn btn--sm btn--secondary';
    });

    fileInput?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        currentImage = await compressImage(file, 128, 0.85);
        previewEl.innerHTML = `<img src="${currentImage}" style="width:100%;height:100%;object-fit:cover">`;
        window.showToast('Foto produk berhasil dimuat', 'success');
      } catch (err) {
        window.showToast(err.message || 'Gagal memproses gambar', 'error');
      }
    });

    document.getElementById('btn-remove-img')?.addEventListener('click', () => {
      currentImage = null;
      previewEl.innerHTML = '<span style="font-size:20px;opacity:0.4">🖼️</span>';
      tabEmoji.click();
    });

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
        currentImage = null;
      });
    });

    // Save
    document.getElementById('pf-save')?.addEventListener('click', async () => {
      const name     = document.getElementById('pf-name')?.value.trim();
      const sku      = document.getElementById('pf-sku')?.value.trim() || autoSKU;
      const price    = parseFloat(document.getElementById('pf-price')?.value) || 0;
      const cost     = parseFloat(document.getElementById('pf-cost')?.value) || 0;
      const unit     = document.getElementById('pf-unit')?.value.trim() || 'pcs';
      const category = document.getElementById('pf-category')?.value || 'Lainnya';
      const emoji    = document.getElementById('pf-emoji')?.value || '📦';
      const stock    = parseInt(document.getElementById('pf-stock')?.value) || 0;

      if (!name) { window.showToast('Nama produk wajib diisi!', 'warning'); return; }
      if (price <= 0) { window.showToast('Harga harus lebih dari 0!', 'warning'); return; }

      try {
        const payload = {
          name,
          sku,
          price,
          cost,
          unit,
          category,
          emoji,
          image: currentImage,
          stock,
        };

        if (isEdit) {
          await updateProduct({ ...product, ...payload });
          window.showToast(`Produk [${sku}] berhasil diperbarui`, 'success');
        } else {
          await addProduct(payload);
          window.showToast(`Produk [${sku}] berhasil ditambahkan`, 'success');
        }
        closeModal('product-form');
        const allProds = await getAllProducts();
        store.setProducts(allProds);
        await renderProducts();
      } catch (err) {
        window.showToast('Gagal menyimpan produk!', 'error');
        console.error('[products]', err);
      }
    });
  }, 0);
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
  setTimeout(() => {
    document.getElementById('dc-close')?.addEventListener('click',  () => closeModal('delete-confirm'));
    document.getElementById('dc-cancel')?.addEventListener('click', () => closeModal('delete-confirm'));
    document.getElementById('dc-confirm')?.addEventListener('click', async () => {
      try {
        await deleteProduct(id);
        const allProducts = await getAllProducts();
        store.setProducts(allProducts);
        closeModal('delete-confirm');
        await renderProducts();
        window.showToast('Produk dihapus', 'success');
      } catch (err) {
        window.showToast('Gagal menghapus produk', 'error');
        console.error('[products]', err);
      }
    });
  }, 0);
};
