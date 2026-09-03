/**
 * views/customers.js — Customer Management & CRM 360° for Blue Mountain POS
 * Full CRUD + Category Filter + Instant Search + 10x Pagination + Customer 360° Drawer
 */
import {
  getAllCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getAllTransactions
} from '../db.js';
import { formatRupiah }          from '../utils/currency.js';
import { formatDateTime }        from '../utils/date.js';
import { esc }                   from '../utils/sanitize.js';
import { openModal, closeModal } from './modals.js';
import store                     from '../store.js';

let _unsubscribe = null;
let _currentCategory = 'all';
let _searchQuery = '';
let _currentPage = 1;
const PAGE_SIZE = 10;

export const CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'Rumah Tangga', label: '🏠 Rumah Tangga' },
  { id: 'Kantor/Instansi', label: '🏢 Kantor/Instansi' },
  { id: 'Warung/Reseller', label: '🏪 Warung/Reseller' },
  { id: 'VIP', label: '🌟 VIP' },
];

/**
 * Initialize Customer View
 */
export const initCustomers = async () => {
  if (_unsubscribe) _unsubscribe();

  _unsubscribe = store.on('customers:change', () => {
    renderCustomers();
  });

  // Initial load
  const customers = await getAllCustomers();
  store.setCustomers(customers);
  renderCustomers();
};

/**
 * Render Customer Management Page
 */
export const renderCustomers = async () => {
  const container = document.getElementById('view-customers');
  if (!container) return;

  const customers = store.state.customers || [];
  const transactions = await getAllTransactions();

  // Recalculate metrics per customer from real transactions
  const customerStatsMap = {};
  for (const tx of transactions) {
    const nameKey = (tx.customerName || '').trim().toLowerCase();
    if (!nameKey) continue;
    if (!customerStatsMap[nameKey]) {
      customerStatsMap[nameKey] = { orders: 0, spent: 0, debt: 0 };
    }
    customerStatsMap[nameKey].orders += 1;
    customerStatsMap[nameKey].spent += Number(tx.total) || 0;
    if (tx.paymentMethod === 'debt' && (tx.remainingDebt || 0) > 0) {
      customerStatsMap[nameKey].debt += Number(tx.remainingDebt) || 0;
    }
  }

  // Aggregate global stats
  const totalCustomers = customers.length;
  let totalAllDebt = 0;
  let totalAllLoanedGalon = 0;
  let totalAllSpent = 0;

  customers.forEach(c => {
    const key = (c.name || '').trim().toLowerCase();
    const liveStats = customerStatsMap[key] || { orders: 0, spent: 0, debt: 0 };
    const debt = Math.max(Number(c.totalDebt || 0), liveStats.debt);
    const spent = Math.max(Number(c.totalSpent || 0), liveStats.spent);
    totalAllDebt += debt;
    totalAllSpent += spent;
    totalAllLoanedGalon += Number(c.galonLoaned || 0);
  });

  // Filter & Search
  let filtered = customers.filter(c => {
    const matchCat = _currentCategory === 'all' || c.category === _currentCategory;
    const matchSearch = !_searchQuery ||
      (c.name || '').toLowerCase().includes(_searchQuery.toLowerCase()) ||
      (c.phone || '').includes(_searchQuery) ||
      (c.address || '').toLowerCase().includes(_searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Pagination (10 per page)
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  if (_currentPage > totalPages) _currentPage = totalPages;
  if (_currentPage < 1) _currentPage = 1;

  const startIndex = (_currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  container.innerHTML = `
    <div class="view-header" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px">
      <div>
        <h1 class="view-title" style="margin:0;font-size:24px;font-weight:900;color:var(--text-primary)">👥 Manajemen Pelanggan (CRM)</h1>
        <p style="margin:4px 0 0;font-size:13px;color:var(--text-secondary)">Data langganan, pelacakan piutang, pinjaman galon fisik & broadcast WhatsApp</p>
      </div>
      <button class="btn btn--primary" id="btn-add-customer" style="font-weight:700;display:flex;align-items:center;gap:6px">
        <span>➕</span> Tambah Pelanggan Baru
      </button>
    </div>

    <!-- Summary Metrics Cards -->
    <div class="stats-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:14px;margin-bottom:20px">
      <div class="stat-card" style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm)">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-secondary);letter-spacing:.05em">Total Pelanggan</div>
        <div style="font-size:24px;font-weight:900;color:var(--blue-600);margin-top:6px">${totalCustomers} <span style="font-size:13px;font-weight:600;color:var(--text-muted)">orang</span></div>
      </div>
      <div class="stat-card" style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm)">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-secondary);letter-spacing:.05em">Sisa Piutang Pelanggan</div>
        <div style="font-size:24px;font-weight:900;color:var(--color-danger);margin-top:6px">${formatRupiah(totalAllDebt)}</div>
      </div>
      <div class="stat-card" style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm)">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-secondary);letter-spacing:.05em">Galon Toko Dipinjam</div>
        <div style="font-size:24px;font-weight:900;color:var(--color-warning);margin-top:6px">${totalAllLoanedGalon} <span style="font-size:13px;font-weight:600;color:var(--text-muted)">galon</span></div>
      </div>
      <div class="stat-card" style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm)">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-secondary);letter-spacing:.05em">Akumulasi Omzet (LTV)</div>
        <div style="font-size:24px;font-weight:900;color:var(--color-success);margin-top:6px">${formatRupiah(totalAllSpent)}</div>
      </div>
    </div>

    <!-- Filters & Search Bar -->
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px">
      <div class="category-pills" style="display:flex;flex-wrap:wrap;gap:6px">
        ${CATEGORIES.map(cat => `
          <button class="btn btn--sm ${cat.id === _currentCategory ? 'btn--primary' : 'btn--secondary'} cat-filter-btn"
                  data-cat="${cat.id}" style="border-radius:20px;font-size:12px;padding:6px 14px">
            ${cat.label}
          </button>
        `).join('')}
      </div>

      <div style="position:relative;width:280px">
        <input type="text" class="input" id="cust-search"
               placeholder="Cari nama, nomor HP, alamat..."
               value="${esc(_searchQuery)}"
               style="width:100%;border-radius:20px;padding-left:34px;font-size:13px">
        <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:14px;color:var(--text-muted)">🔍</span>
      </div>
    </div>

    <!-- Customer Table -->
    <div class="table-container" style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:14px;overflow:hidden;box-shadow:var(--shadow-sm)">
      <table class="table" style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:rgba(0,0,0,0.02);border-bottom:1px solid var(--card-border);font-size:12px;text-align:left">
            <th style="padding:12px 16px">Nama Pelanggan</th>
            <th style="padding:12px 16px">Kategori</th>
            <th style="padding:12px 16px">Kontak WhatsApp</th>
            <th style="padding:12px 16px">Alamat Pengantaran</th>
            <th style="padding:12px 16px;text-align:right">Total Piutang</th>
            <th style="padding:12px 16px;text-align:center">Galon Dipinjam</th>
            <th style="padding:12px 16px;text-align:center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${paginated.length === 0 ? `
            <tr>
              <td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)">
                Belum ada data pelanggan yang sesuai filter.
              </td>
            </tr>
          ` : paginated.map(c => {
            const key = (c.name || '').trim().toLowerCase();
            const liveStats = customerStatsMap[key] || { orders: 0, spent: 0, debt: 0 };
            const debt = Math.max(Number(c.totalDebt || 0), liveStats.debt);
            const cleanPhone = (c.phone || '').replace(/\D/g, '');
            const waPhone = cleanPhone.startsWith('08') ? '62' + cleanPhone.slice(1) : cleanPhone;

            return `
              <tr style="border-bottom:1px solid var(--card-border);font-size:13px" class="hover-row">
                <td style="padding:12px 16px">
                  <div style="font-weight:700;color:var(--text-primary)">${esc(c.name)}</div>
                  ${c.creditLimit > 0 ? `<div style="font-size:11px;color:var(--text-muted)">Limit: ${formatRupiah(c.creditLimit)}</div>` : ''}
                </td>
                <td style="padding:12px 16px">
                  <span class="badge" style="background:rgba(37,99,235,0.08);color:var(--blue-600);border:1px solid rgba(37,99,235,0.2);padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600">
                    ${esc(c.category || 'Rumah Tangga')}
                  </span>
                </td>
                <td style="padding:12px 16px">
                  ${waPhone ? `
                    <a href="https://wa.me/${waPhone}" target="_blank" rel="noopener noreferrer"
                       style="display:inline-flex;align-items:center;gap:4px;color:#166534;background:#dcfce7;border:1px solid #86efac;padding:3px 8px;border-radius:8px;font-size:11px;font-weight:700;text-decoration:none">
                      💬 ${esc(c.phone)}
                    </a>
                  ` : '<span style="color:var(--text-muted)">-</span>'}
                </td>
                <td style="padding:12px 16px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${esc(c.address || '-')}">
                  ${esc(c.address || '-')}
                </td>
                <td style="padding:12px 16px;text-align:right">
                  ${debt > 0 ? `
                    <span style="color:var(--color-danger);font-weight:800;font-size:13px">${formatRupiah(debt)}</span>
                  ` : '<span style="color:var(--color-success);font-weight:600;font-size:12px">Lunas ✅</span>'}
                </td>
                <td style="padding:12px 16px;text-align:center">
                  ${c.galonLoaned > 0 ? `
                    <span style="font-weight:800;color:var(--color-warning);background:rgba(245,158,11,0.1);padding:2px 8px;border-radius:8px;font-size:12px">
                      🪣 ${c.galonLoaned}
                    </span>
                  ` : '<span style="color:var(--text-muted)">0</span>'}
                </td>
                <td style="padding:12px 16px;text-align:center">
                  <div style="display:inline-flex;gap:6px">
                    <button class="btn btn--sm btn--secondary btn-view-360" data-id="${c.id}" title="Detail Profil 360°" style="padding:4px 8px;font-size:12px">
                      🔍 Profil
                    </button>
                    <button class="btn btn--sm btn--secondary btn-edit-cust" data-id="${c.id}" title="Edit Pelanggan" style="padding:4px 8px;font-size:12px">
                      ✏️
                    </button>
                    <button class="btn btn--sm btn--danger btn-del-cust" data-id="${c.id}" title="Hapus Pelanggan" style="padding:4px 8px;font-size:12px">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    ${totalPages > 1 ? `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;font-size:12px;color:var(--text-secondary)">
        <div>Menampilkan ${startIndex + 1} - ${Math.min(totalItems, startIndex + PAGE_SIZE)} dari ${totalItems} pelanggan</div>
        <div style="display:flex;gap:6px">
          <button class="btn btn--sm btn--secondary" id="cust-prev-page" ${_currentPage <= 1 ? 'disabled' : ''}>← Sebelumnya</button>
          <span style="padding:4px 10px;font-weight:700">Halaman ${_currentPage} / ${totalPages}</span>
          <button class="btn btn--sm btn--secondary" id="cust-next-page" ${_currentPage >= totalPages ? 'disabled' : ''}>Selanjutnya →</button>
        </div>
      </div>
    ` : ''}
  `;

  // Attach Event Handlers
  container.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      _currentCategory = btn.dataset.cat;
      _currentPage = 1;
      renderCustomers();
    });
  });

  const searchInput = document.getElementById('cust-search');
  searchInput?.addEventListener('input', (e) => {
    _searchQuery = e.target.value;
    _currentPage = 1;
    renderCustomers();
  });

  document.getElementById('cust-prev-page')?.addEventListener('click', () => {
    if (_currentPage > 1) {
      _currentPage--;
      renderCustomers();
    }
  });

  document.getElementById('cust-next-page')?.addEventListener('click', () => {
    if (_currentPage < totalPages) {
      _currentPage++;
      renderCustomers();
    }
  });

  document.getElementById('btn-add-customer')?.addEventListener('click', () => {
    showCustomerModal();
  });

  container.querySelectorAll('.btn-edit-cust').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const cust = customers.find(c => String(c.id) === String(id));
      if (cust) showCustomerModal(cust);
    });
  });

  container.querySelectorAll('.btn-del-cust').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const cust = customers.find(c => String(c.id) === String(id));
      if (cust && confirm(`Hapus pelanggan "${cust.name}"?`)) {
        await deleteCustomer(cust.id);
        const updated = await getAllCustomers();
        store.setCustomers(updated);
        window.showToast?.('Pelanggan berhasil dihapus.', 'info');
      }
    });
  });

  container.querySelectorAll('.btn-view-360').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const cust = customers.find(c => String(c.id) === String(id));
      if (cust) showCustomer360Drawer(cust, transactions);
    });
  });
};

/**
 * Modal Tambah / Edit Pelanggan
 */
export const showCustomerModal = (cust = null) => {
  const isEdit = !!cust;
  const html = `
    <div class="modal-header">
      <h3 class="modal-title">${isEdit ? '✏️ Edit Data Pelanggan' : '➕ Tambah Pelanggan Baru'}</h3>
      <button class="modal-close" id="modal-cust-close">✕</button>
    </div>
    <div class="modal-body">
      <form id="cust-form" style="display:flex;flex-direction:column;gap:12px">
        <div>
          <label class="form-label" style="font-size:12px;font-weight:700">Nama Lengkap *</label>
          <input type="text" class="input" id="cf-name" value="${esc(cust?.name || '')}" placeholder="e.g. Ibu Rina, Kantor PLN..." required maxlength="80">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div>
            <label class="form-label" style="font-size:12px;font-weight:700">Kategori</label>
            <select class="input" id="cf-category">
              <option value="Rumah Tangga" ${cust?.category === 'Rumah Tangga' ? 'selected' : ''}>🏠 Rumah Tangga</option>
              <option value="Kantor/Instansi" ${cust?.category === 'Kantor/Instansi' ? 'selected' : ''}>🏢 Kantor/Instansi</option>
              <option value="Warung/Reseller" ${cust?.category === 'Warung/Reseller' ? 'selected' : ''}>🏪 Warung/Reseller</option>
              <option value="VIP" ${cust?.category === 'VIP' ? 'selected' : ''}>🌟 VIP</option>
            </select>
          </div>
          <div>
            <label class="form-label" style="font-size:12px;font-weight:700">Nomor WhatsApp *</label>
            <input type="tel" class="input" id="cf-phone" value="${esc(cust?.phone || '')}" placeholder="081234567890" required maxlength="20">
          </div>
        </div>
        <div>
          <label class="form-label" style="font-size:12px;font-weight:700">Alamat Lengkap / Patokan Pengantaran</label>
          <textarea class="input" id="cf-address" rows="2" placeholder="Jl. Anggrek No. 5 Blok C (Pagar Biru)..." maxlength="200">${esc(cust?.address || '')}</textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div>
            <label class="form-label" style="font-size:12px;font-weight:700">Limit Piutang (Rp)</label>
            <input type="number" class="input" id="cf-creditLimit" value="${cust?.creditLimit || 0}" min="0" step="50000" placeholder="0 = Tanpa batas">
          </div>
          <div>
            <label class="form-label" style="font-size:12px;font-weight:700">Galon Fisik Dipinjam</label>
            <input type="number" class="input" id="cf-galonLoaned" value="${cust?.galonLoaned || 0}" min="0" step="1" placeholder="0">
          </div>
        </div>
        <div>
          <label class="form-label" style="font-size:12px;font-weight:700">Catatan Khusus (Opsional)</label>
          <input type="text" class="input" id="cf-notes" value="${esc(cust?.notes || '')}" placeholder="e.g. Antar tiap hari Selasa & Jumat" maxlength="150">
        </div>
      </form>
    </div>
    <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px">
      <button class="btn btn--secondary" id="cust-cancel-btn">Batal</button>
      <button class="btn btn--primary" id="cust-save-btn">${isEdit ? '💾 Simpan Perubahan' : '➕ Tambahkan Pelanggan'}</button>
    </div>
  `;

  openModal(html, 'modal-cust');

  document.getElementById('modal-cust-close')?.addEventListener('click', closeModal);
  document.getElementById('cust-cancel-btn')?.addEventListener('click', closeModal);

  document.getElementById('cust-save-btn')?.addEventListener('click', async () => {
    const name = document.getElementById('cf-name').value.trim();
    const phone = document.getElementById('cf-phone').value.trim();
    const category = document.getElementById('cf-category').value;
    const address = document.getElementById('cf-address').value.trim();
    const creditLimit = Math.max(0, Number(document.getElementById('cf-creditLimit').value) || 0);
    const galonLoaned = Math.max(0, Number(document.getElementById('cf-galonLoaned').value) || 0);
    const notes = document.getElementById('cf-notes').value.trim();

    if (!name) {
      alert('Nama pelanggan wajib diisi!');
      return;
    }

    const payload = {
      name,
      phone,
      category,
      address,
      creditLimit,
      galonLoaned,
      notes,
      totalOrders: cust?.totalOrders || 0,
      totalSpent: cust?.totalSpent || 0,
      totalDebt: cust?.totalDebt || 0,
    };

    if (isEdit) {
      await updateCustomer({ ...payload, id: cust.id });
      window.showToast?.('Data pelanggan berhasil diperbarui!', 'success');
    } else {
      await addCustomer(payload);
      window.showToast?.('Pelanggan baru berhasil ditambahkan!', 'success');
    }

    closeModal();
    const updated = await getAllCustomers();
    store.setCustomers(updated);
  });
};

/**
 * Drawer / Modal Profil Pelanggan 360°
 */
export const showCustomer360Drawer = (cust, transactions = []) => {
  const custTxs = transactions.filter(t => (t.customerName || '').trim().toLowerCase() === (cust.name || '').trim().toLowerCase());
  
  const cleanPhone = (cust.phone || '').replace(/\D/g, '');
  const waPhone = cleanPhone.startsWith('08') ? '62' + cleanPhone.slice(1) : cleanPhone;
  
  let totalSpent = 0;
  let activeDebt = 0;

  custTxs.forEach(t => {
    totalSpent += Number(t.total || 0);
    if (t.paymentMethod === 'debt' && (t.remainingDebt || 0) > 0) {
      activeDebt += Number(t.remainingDebt || 0);
    }
  });

  const tagihanMsg = encodeURIComponent(
    `Halo *${cust.name}*, ini pengingat dari *${store.state.settings?.shopName || 'Blue Mountain'}* terkait sisa piutang Anda sebesar *${formatRupiah(activeDebt)}*. Terima kasih!`
  );

  const html = `
    <div class="modal-header">
      <div>
        <h3 class="modal-title">👤 Profil Pelanggan 360°</h3>
        <p style="margin:2px 0 0;font-size:12px;color:var(--text-secondary)">${esc(cust.name)} &bull; ${esc(cust.category || 'Rumah Tangga')}</p>
      </div>
      <button class="modal-close" id="drawer-close-btn">✕</button>
    </div>
    <div class="modal-body" style="max-height:75vh;overflow-y:auto;display:flex;flex-direction:column;gap:14px">
      <!-- Quick Info Bar -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px;background:rgba(0,0,0,0.02);padding:12px;border-radius:10px">
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Total Transaksi</div>
          <div style="font-size:16px;font-weight:900;color:var(--blue-600)">${custTxs.length} kali</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Total Belanja (LTV)</div>
          <div style="font-size:16px;font-weight:900;color:var(--color-success)">${formatRupiah(totalSpent)}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Sisa Piutang</div>
          <div style="font-size:16px;font-weight:900;color:var(--color-danger)">${formatRupiah(activeDebt)}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Galon Dipinjam</div>
          <div style="font-size:16px;font-weight:900;color:var(--color-warning)">🪣 ${cust.galonLoaned || 0} buah</div>
        </div>
      </div>

      <!-- Detail Info -->
      <div style="font-size:13px;line-height:1.6">
        <div><strong>📍 Alamat:</strong> ${esc(cust.address || '-')}</div>
        <div><strong>📞 WhatsApp:</strong> ${esc(cust.phone || '-')}</div>
        <div><strong>💳 Limit Kredit:</strong> ${cust.creditLimit > 0 ? formatRupiah(cust.creditLimit) : 'Tanpa batas'}</div>
        ${cust.notes ? `<div><strong>📝 Catatan:</strong> ${esc(cust.notes)}</div>` : ''}
      </div>

      <!-- Action Buttons -->
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${waPhone ? `
          <a href="https://wa.me/${waPhone}" target="_blank" rel="noopener noreferrer"
             class="btn btn--secondary" style="text-decoration:none;font-size:12px;display:inline-flex;align-items:center;gap:4px">
            💬 Chat WhatsApp
          </a>
        ` : ''}
        ${waPhone && activeDebt > 0 ? `
          <a href="https://wa.me/${waPhone}?text=${tagihanMsg}" target="_blank" rel="noopener noreferrer"
             class="btn btn--secondary" style="text-decoration:none;font-size:12px;display:inline-flex;align-items:center;gap:4px;background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;font-weight:700">
            📲 Kirim Tagihan WhatsApp (${formatRupiah(activeDebt)})
          </a>
        ` : ''}
      </div>

      <!-- Order History List -->
      <div style="margin-top:8px">
        <h4 style="margin:0 0 8px;font-size:14px;font-weight:800">📋 Riwayat Pembelian (${custTxs.length})</h4>
        ${custTxs.length === 0 ? `
          <div style="font-size:12px;color:var(--text-muted);text-align:center;padding:20px">Belum ada riwayat transaksi.</div>
        ` : `
          <div style="border:1px solid var(--card-border);border-radius:10px;overflow:hidden">
            <table class="table" style="width:100%;font-size:12px">
              <thead>
                <tr style="background:rgba(0,0,0,0.02)">
                  <th style="padding:8px 12px">Invoice</th>
                  <th style="padding:8px 12px">Tanggal</th>
                  <th style="padding:8px 12px;text-align:right">Total</th>
                  <th style="padding:8px 12px;text-align:center">Metode</th>
                </tr>
              </thead>
              <tbody>
                ${custTxs.slice(0, 10).map(tx => `
                  <tr style="border-bottom:1px solid var(--card-border)">
                    <td style="padding:8px 12px;font-weight:700">${esc(tx.invoiceNo)}</td>
                    <td style="padding:8px 12px">${formatDateTime(new Date(tx.date))}</td>
                    <td style="padding:8px 12px;text-align:right;font-weight:700">${formatRupiah(tx.total)}</td>
                    <td style="padding:8px 12px;text-align:center">
                      <span class="badge" style="font-size:10px">${esc(tx.paymentMethod)}</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
    <div class="modal-footer" style="display:flex;justify-content:flex-end">
      <button class="btn btn--secondary" id="drawer-ok-btn">Tutup</button>
    </div>
  `;

  openModal(html, 'modal-cust-360');
  document.getElementById('drawer-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('drawer-ok-btn')?.addEventListener('click', closeModal);
};
