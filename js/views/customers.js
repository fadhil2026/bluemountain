/**
 * views/customers.js — Customer Management & CRM 360° for Blue Mountain POS
 * Full CRUD + Category Filter + Instant Search + Responsive Data-Table + Always-Visible Pagination + Customer 360° Drawer + Instant Debt Settlement
 */
import {
  getAllCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getAllTransactions,
  updateTransaction
} from '../db.js';
import { formatRupiah }          from '../utils/currency.js';
import { formatDateTime }        from '../utils/date.js';
import { esc }                   from '../utils/sanitize.js';
import { openModal, closeModal } from './modals.js';
import store                     from '../store.js';

let _unsubscribers = [];
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
 * Initialize Customer View with Real-time Multi-module Event Listeners
 */
export const initCustomers = async () => {
  if (_unsubscribers.length) {
    _unsubscribers.forEach(u => typeof u === 'function' && u());
    _unsubscribers = [];
  }

  // Subscribe to real-time events from Store, POS, Transactions, and Supabase Cloud
  _unsubscribers.push(store.on('customers:change', () => renderCustomers()));
  _unsubscribers.push(store.on('transactions:change', () => renderCustomers()));

  // Auto-sync on window resize so mobile/tablet resolution changes re-evaluate layout
  const onResize = () => {
    const custContainer = document.getElementById('view-customers');
    if (custContainer && custContainer.classList.contains('active')) {
      renderCustomers();
    }
  };
  window.addEventListener('resize', onResize);
  _unsubscribers.push(() => window.removeEventListener('resize', onResize));

  // Initial load
  const [customers, transactions] = await Promise.all([
    getAllCustomers(),
    getAllTransactions()
  ]);
  store.setCustomers(customers);
  store.setTransactions(transactions);
  renderCustomers();
};

/**
 * Helper: Find all transactions related to a customer
 */
const getTransactionsForCustomer = (cust, transactions = []) => {
  const custId = cust.id ? String(cust.id) : null;
  const nameKey = (cust.name || '').trim().toLowerCase();
  const cleanPhone = (cust.phone || '').replace(/\D/g, '');

  return transactions.filter(t => {
    if (custId && t.customerId && String(t.customerId) === custId) return true;
    if (nameKey && t.customerName && t.customerName.trim().toLowerCase() === nameKey) return true;
    if (cleanPhone && t.customerPhone && t.customerPhone.replace(/\D/g, '') === cleanPhone) return true;
    return false;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Render Customer Management Page
 */
export const renderCustomers = async () => {
  const container = document.getElementById('view-customers');
  if (!container) return;

  const customers = store.state.customers || [];
  const transactions = await getAllTransactions();

  // Aggregate live stats per customer
  const customerStatsMap = {};
  for (const tx of transactions) {
    const custId = tx.customerId ? String(tx.customerId) : null;
    const nameKey = (tx.customerName || '').trim().toLowerCase();

    const keys = [];
    if (custId) keys.push(`id:${custId}`);
    if (nameKey) keys.push(`name:${nameKey}`);

    for (const k of keys) {
      if (!customerStatsMap[k]) {
        customerStatsMap[k] = { orders: 0, spent: 0, debt: 0, txIds: new Set() };
      }
      if (!customerStatsMap[k].txIds.has(tx.id)) {
        customerStatsMap[k].txIds.add(tx.id);
        customerStatsMap[k].orders += 1;
        customerStatsMap[k].spent += Number(tx.total) || 0;
        if (tx.paymentMethod === 'debt' && (Number(tx.remainingDebt) || 0) > 0) {
          customerStatsMap[k].debt += Number(tx.remainingDebt) || 0;
        }
      }
    }
  }

  // Aggregate global metrics
  const totalCustomers = customers.length;
  let totalAllDebt = 0;
  let totalAllLoanedGalon = 0;
  let totalAllSpent = 0;

  customers.forEach(c => {
    const idKey = `id:${c.id}`;
    const nameKey = `name:${(c.name || '').trim().toLowerCase()}`;
    const liveStatsId = customerStatsMap[idKey];
    const liveStatsName = customerStatsMap[nameKey];

    const liveDebt = Math.max(liveStatsId?.debt || 0, liveStatsName?.debt || 0);
    const liveSpent = Math.max(liveStatsId?.spent || 0, liveStatsName?.spent || 0);

    const debt = Math.max(Number(c.totalDebt || 0), liveDebt);
    const spent = Math.max(Number(c.totalSpent || 0), liveSpent);

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

  // Pagination calculation (consistent with transactions & other modules)
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  if (_currentPage > totalPages) _currentPage = totalPages;
  if (_currentPage < 1) _currentPage = 1;

  const startIdx = totalItems === 0 ? 0 : (_currentPage - 1) * PAGE_SIZE + 1;
  const endIdx   = Math.min(_currentPage * PAGE_SIZE, totalItems);
  const paginated = filtered.slice((_currentPage - 1) * PAGE_SIZE, _currentPage * PAGE_SIZE);

  container.innerHTML = `
    <!-- Responsive Section Header matching other POS modules -->
    <div class="section-header" style="flex-wrap:wrap;gap:12px;margin-bottom:var(--space-4)">
      <div>
        <h2 class="section-title">
          👥 Manajemen Pelanggan <span>${totalCustomers} total (${filtered.length} terfilter)</span>
        </h2>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">
          Data langganan, pelacakan piutang real-time, pinjaman galon & broadcast WhatsApp
        </div>
      </div>
      <button class="btn btn--primary" id="btn-add-customer" style="font-weight:700;display:flex;align-items:center;gap:6px">
        <span>➕</span> Tambah Pelanggan Baru
      </button>
    </div>

    <!-- Summary Metrics Cards: responsive 4-card / 2x2 grid via CSS -->
    <div class="stats-grid">
      <div class="stat-card">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total Pelanggan</div>
        <div style="font-size:20px;font-weight:800;color:var(--blue-700);margin-top:4px">${totalCustomers} <span style="font-size:12px;font-weight:600;color:var(--text-muted)">orang</span></div>
      </div>
      <div class="stat-card">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Sisa Piutang</div>
        <div style="font-size:20px;font-weight:800;color:#dc2626;margin-top:4px">${formatRupiah(totalAllDebt)}</div>
      </div>
      <div class="stat-card">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Galon Dipinjam</div>
        <div style="font-size:20px;font-weight:800;color:#d97706;margin-top:4px">${totalAllLoanedGalon} <span style="font-size:12px;font-weight:600;color:var(--text-muted)">galon</span></div>
      </div>
      <div class="stat-card">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Akumulasi Omzet (LTV)</div>
        <div style="font-size:20px;font-weight:800;color:#16a34a;margin-top:4px">${formatRupiah(totalAllSpent)}</div>
      </div>
    </div>

    <!-- Filters & Responsive Search Bar -->
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px">
      <div class="category-pills" style="display:flex;flex-wrap:wrap;gap:6px;max-width:100%">
        ${CATEGORIES.map(cat => `
          <button class="btn btn--sm ${cat.id === _currentCategory ? 'btn--primary' : 'btn--secondary'} cat-filter-btn"
                  data-cat="${cat.id}" style="border-radius:20px;font-size:12px;padding:5px 12px">
            ${cat.label}
          </button>
        `).join('')}
      </div>

      <div style="position:relative;flex:1;min-width:200px;max-width:320px">
        <input type="text" class="input" id="cust-search"
               placeholder="Cari nama, nomor HP, alamat..."
               value="${esc(_searchQuery)}"
               style="width:100%;border-radius:20px;padding-left:34px;font-size:12px">
        <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:13px;color:var(--text-muted)">🔍</span>
      </div>
    </div>

    <!-- Customer Card with Native Scroll & Always-Visible Pagination -->
    <div class="card card--elevated" style="overflow:hidden;padding:0;margin-bottom:var(--space-6)">
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;width:100%">
        <table class="data-table" id="cust-table" style="width:100%;min-width:720px">
          <thead>
            <tr>
              <th>Nama Pelanggan</th>
              <th>Kategori</th>
              <th>Kontak WhatsApp</th>
              <th>Alamat Pengantaran</th>
              <th style="text-align:right">Total Piutang</th>
              <th style="text-align:center">Galon Dipinjam</th>
              <th style="text-align:center">Aksi</th>
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
              const idKey = `id:${c.id}`;
              const nameKey = `name:${(c.name || '').trim().toLowerCase()}`;
              const liveStatsId = customerStatsMap[idKey];
              const liveStatsName = customerStatsMap[nameKey];
              const liveDebt = Math.max(liveStatsId?.debt || 0, liveStatsName?.debt || 0);
              const debt = Math.max(Number(c.totalDebt || 0), liveDebt);

              const cleanPhone = (c.phone || '').replace(/\D/g, '');
              const waPhone = cleanPhone.startsWith('08') ? '62' + cleanPhone.slice(1) : cleanPhone;

              return `
                <tr>
                  <td>
                    <div style="font-weight:700;color:var(--text-primary)">${esc(c.name)}</div>
                    ${c.creditLimit > 0 ? `<div style="font-size:11px;color:var(--text-muted)">Limit: ${formatRupiah(c.creditLimit)}</div>` : ''}
                  </td>
                  <td>
                    <span class="badge badge--blue">
                      ${esc(c.category || 'Rumah Tangga')}
                    </span>
                  </td>
                  <td>
                    ${waPhone ? `
                      <a href="https://wa.me/${waPhone}" target="_blank" rel="noopener noreferrer"
                         style="display:inline-flex;align-items:center;gap:4px;color:#166534;background:#dcfce7;border:1px solid #86efac;padding:3px 8px;border-radius:8px;font-size:11px;font-weight:700;text-decoration:none">
                        💬 ${esc(c.phone)}
                      </a>
                    ` : '<span style="color:var(--text-muted)">-</span>'}
                  </td>
                  <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${esc(c.address || '-')}">
                    ${esc(c.address || '-')}
                  </td>
                  <td style="text-align:right">
                    ${debt > 0 ? `
                      <div style="color:#dc2626;font-weight:800;font-size:13px">${formatRupiah(debt)}</div>
                      <button class="btn btn--sm btn-pay-debt-quick" data-id="${c.id}"
                              style="margin-top:3px;padding:2px 8px;font-size:10px;font-weight:700;background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;border-radius:6px;cursor:pointer">
                        💰 Bayar
                      </button>
                    ` : '<span style="color:#16a34a;font-weight:700;font-size:12px">Lunas ✅</span>'}
                  </td>
                  <td style="text-align:center">
                    ${c.galonLoaned > 0 ? `
                      <span style="font-weight:800;color:#d97706;background:rgba(245,158,11,0.1);padding:2px 8px;border-radius:8px;font-size:12px">
                        🪣 ${c.galonLoaned}
                      </span>
                    ` : '<span style="color:var(--text-muted)">0</span>'}
                  </td>
                  <td style="text-align:center">
                    <div style="display:inline-flex;gap:4px">
                      <button class="btn btn--secondary btn--sm btn-view-360" data-id="${c.id}" title="Detail Profil 360°" style="padding:4px 8px;font-size:11px">
                        🔍 Profil
                      </button>
                      <button class="btn btn--secondary btn--sm btn-edit-cust" data-id="${c.id}" title="Edit Pelanggan" style="padding:4px 8px;font-size:11px">
                        ✏️
                      </button>
                      <button class="btn btn--danger btn--sm btn-del-cust" data-id="${c.id}" title="Hapus Pelanggan" style="padding:4px 8px;font-size:11px">
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

      <!-- Pagination ALWAYS Visible matching Riwayat Transaksi -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:white;border-top:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
        <div style="font-size:12px;color:var(--text-muted)">
          Menampilkan <strong>${startIdx}-${endIdx}</strong> dari <strong>${totalItems}</strong> pelanggan
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          <button class="btn btn--secondary btn--sm" id="cust-prev-page" ${_currentPage <= 1 ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>
            ◀ Sebelumnya
          </button>
          <span style="font-size:12px;font-weight:700;padding:0 8px;color:var(--blue-700)">
            Hal ${_currentPage} / ${totalPages}
          </span>
          <button class="btn btn--secondary btn--sm" id="cust-next-page" ${_currentPage >= totalPages ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>
            Berikutnya ▶
          </button>
        </div>
      </div>
    </div>

    <!-- Dock Clearance Spacer: prevents bottom navigation dock from overlapping content -->
    <div style="height:48px" aria-hidden="true"></div>
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
      if (cust) showCustomer360Drawer(cust);
    });
  });

  container.querySelectorAll('.btn-pay-debt-quick').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const cust = customers.find(c => String(c.id) === String(id));
      if (cust) showPayCustomerDebtModal(cust);
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
      <button class="modal-close" id="modal-cust-close" type="button">✕</button>
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
        ${isEdit ? `
          <div>
            <label class="form-label" style="font-size:12px;font-weight:700">Penyesuaian Saldo Piutang (Rp)</label>
            <input type="number" class="input" id="cf-totalDebt" value="${cust?.totalDebt || 0}" min="0" step="1000" placeholder="0">
            <small style="font-size:11px;color:var(--text-muted)">Ubah jika ingin merekonsiliasi sisa hutang pelanggan ini secara manual.</small>
          </div>
        ` : ''}
        <div>
          <label class="form-label" style="font-size:12px;font-weight:700">Catatan Khusus (Opsional)</label>
          <input type="text" class="input" id="cf-notes" value="${esc(cust?.notes || '')}" placeholder="e.g. Antar tiap hari Selasa & Jumat" maxlength="150">
        </div>
      </form>
    </div>
    <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px">
      <button class="btn btn--secondary" id="cust-cancel-btn" type="button">Batal</button>
      <button class="btn btn--primary" id="cust-save-btn" type="button">${isEdit ? '💾 Simpan Perubahan' : '➕ Tambahkan Pelanggan'}</button>
    </div>
  `;

  openModal(html, 'modal-cust');

  document.getElementById('modal-cust-close')?.addEventListener('click', () => closeModal('modal-cust'));
  document.getElementById('cust-cancel-btn')?.addEventListener('click', () => closeModal('modal-cust'));

  document.getElementById('cust-save-btn')?.addEventListener('click', async () => {
    const name = document.getElementById('cf-name').value.trim();
    const phone = document.getElementById('cf-phone').value.trim();
    const category = document.getElementById('cf-category').value;
    const address = document.getElementById('cf-address').value.trim();
    const creditLimit = Math.max(0, Number(document.getElementById('cf-creditLimit').value) || 0);
    const galonLoaned = Math.max(0, Number(document.getElementById('cf-galonLoaned').value) || 0);
    const notes = document.getElementById('cf-notes').value.trim();
    const debtInput = document.getElementById('cf-totalDebt');
    const totalDebt = debtInput ? Math.max(0, Number(debtInput.value) || 0) : (cust?.totalDebt || 0);

    if (!name) {
      window.showToast?.('Nama pelanggan wajib diisi!', 'warning');
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
      totalDebt,
    };

    if (isEdit) {
      await updateCustomer({ ...payload, id: cust.id });
      window.showToast?.('Data pelanggan berhasil diperbarui!', 'success');
    } else {
      await addCustomer(payload);
      window.showToast?.('Pelanggan baru berhasil ditambahkan!', 'success');
    }

    closeModal('modal-cust');
    const updated = await getAllCustomers();
    store.setCustomers(updated);
  });
};

/**
 * Drawer / Modal Profil Pelanggan 360°
 */
export const showCustomer360Drawer = async (cust) => {
  const transactions = await getAllTransactions();
  const custTxs = getTransactionsForCustomer(cust, transactions);

  const cleanPhone = (cust.phone || '').replace(/\D/g, '');
  const waPhone = cleanPhone.startsWith('08') ? '62' + cleanPhone.slice(1) : cleanPhone;

  let txSpent = 0;
  let txDebt = 0;

  custTxs.forEach(t => {
    txSpent += Number(t.total || 0);
    if (t.paymentMethod === 'debt' && (Number(t.remainingDebt) || 0) > 0) {
      txDebt += Number(t.remainingDebt || 0);
    }
  });

  const totalSpent = Math.max(Number(cust.totalSpent || 0), txSpent);
  const activeDebt = Math.max(Number(cust.totalDebt || 0), txDebt);
  const totalOrders = Math.max(Number(cust.totalOrders || 0), custTxs.length);

  const tagihanMsg = encodeURIComponent(
    `Halo *${cust.name}*, ini pengingat dari *${store.state.settings?.shopName || 'Blue Mountain'}* terkait sisa piutang Anda sebesar *${formatRupiah(activeDebt)}*. Terima kasih!`
  );

  const html = `
    <div class="modal-header">
      <div>
        <h3 class="modal-title">👤 Profil Pelanggan 360°</h3>
        <p style="margin:2px 0 0;font-size:12px;color:var(--text-secondary)">${esc(cust.name)} &bull; ${esc(cust.category || 'Rumah Tangga')}</p>
      </div>
      <button class="modal-close" id="drawer-close-btn" type="button">✕</button>
    </div>
    <div class="modal-body" style="max-height:75vh;overflow-y:auto;display:flex;flex-direction:column;gap:14px">
      <!-- Quick Info Bar -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px;background:rgba(0,0,0,0.02);padding:12px;border-radius:10px">
        <div>
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700">Total Transaksi</div>
          <div style="font-size:16px;font-weight:900;color:var(--blue-600)">${totalOrders} kali</div>
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
        ${activeDebt > 0 ? `
          <button class="btn btn--primary" id="btn-drawer-pay-debt" style="font-size:12px;display:inline-flex;align-items:center;gap:4px;font-weight:700">
            💰 Bayar / Pelunasan Hutang (${formatRupiah(activeDebt)})
          </button>
        ` : ''}
        ${waPhone ? `
          <a href="https://wa.me/${waPhone}" target="_blank" rel="noopener noreferrer"
             class="btn btn--secondary" style="text-decoration:none;font-size:12px;display:inline-flex;align-items:center;gap:4px">
            💬 Chat WhatsApp
          </a>
        ` : ''}
        ${waPhone && activeDebt > 0 ? `
          <a href="https://wa.me/${waPhone}?text=${tagihanMsg}" target="_blank" rel="noopener noreferrer"
             class="btn btn--secondary" style="text-decoration:none;font-size:12px;display:inline-flex;align-items:center;gap:4px;background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;font-weight:700">
            📲 Kirim Tagihan WhatsApp
          </a>
        ` : ''}
      </div>

      <!-- Order History List -->
      <div style="margin-top:8px">
        <h4 style="margin:0 0 8px;font-size:14px;font-weight:800">📋 Riwayat Pembelian (${custTxs.length})</h4>
        ${custTxs.length === 0 ? `
          <div style="font-size:12px;color:var(--text-muted);text-align:center;padding:20px;border:1px dashed var(--card-border);border-radius:10px">
            Belum ada data transaksi individual yang terhubung.
          </div>
        ` : `
          <div style="border:1px solid var(--card-border);border-radius:10px;overflow:hidden">
            <table class="table" style="width:100%;font-size:12px">
              <thead>
                <tr style="background:rgba(0,0,0,0.02)">
                  <th style="padding:8px 12px">Invoice</th>
                  <th style="padding:8px 12px">Tanggal</th>
                  <th style="padding:8px 12px;text-align:right">Total</th>
                  <th style="padding:8px 12px;text-align:center">Status / Metode</th>
                  <th style="padding:8px 12px;text-align:right">Sisa Hutang</th>
                </tr>
              </thead>
              <tbody>
                ${custTxs.slice(0, 15).map(tx => {
                  const remaining = Number(tx.remainingDebt) || 0;
                  return `
                    <tr style="border-bottom:1px solid var(--card-border)">
                      <td style="padding:8px 12px;font-weight:700">${esc(tx.invoiceNo)}</td>
                      <td style="padding:8px 12px">${formatDateTime(new Date(tx.date))}</td>
                      <td style="padding:8px 12px;text-align:right;font-weight:700">${formatRupiah(tx.total)}</td>
                      <td style="padding:8px 12px;text-align:center">
                        <span class="badge" style="font-size:10px;text-transform:uppercase">${esc(tx.paymentStatus || tx.paymentMethod)}</span>
                      </td>
                      <td style="padding:8px 12px;text-align:right">
                        ${remaining > 0 ? `
                          <strong style="color:var(--color-danger)">${formatRupiah(remaining)}</strong>
                        ` : '<span style="color:var(--color-success)">Lunas ✅</span>'}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
    <div class="modal-footer" style="display:flex;justify-content:flex-end">
      <button class="btn btn--secondary" id="drawer-ok-btn" type="button">Tutup</button>
    </div>
  `;

  openModal(html, 'modal-cust-360');

  document.getElementById('drawer-close-btn')?.addEventListener('click', () => closeModal('modal-cust-360'));
  document.getElementById('drawer-ok-btn')?.addEventListener('click', () => closeModal('modal-cust-360'));
  document.getElementById('btn-drawer-pay-debt')?.addEventListener('click', () => {
    closeModal('modal-cust-360');
    showPayCustomerDebtModal(cust);
  });
};

/**
 * Modal Pelunasan / Cicilan Hutang Pelanggan Terintegrasi
 */
export const showPayCustomerDebtModal = async (cust) => {
  const transactions = await getAllTransactions();
  const custTxs = getTransactionsForCustomer(cust, transactions);
  const activeTxs = custTxs.filter(t => t.paymentMethod === 'debt' && (Number(t.remainingDebt) || 0) > 0);

  const totalRemainingDebt = Math.max(
    Number(cust.totalDebt || 0),
    activeTxs.reduce((sum, t) => sum + (Number(t.remainingDebt) || 0), 0)
  );

  if (totalRemainingDebt <= 0) {
    window.showToast?.('Pelanggan ini tidak memiliki sisa piutang.', 'info');
    return;
  }

  const html = `
    <div class="modal-header">
      <h3 class="modal-title">💰 Pembayaran Piutang: ${esc(cust.name)}</h3>
      <button class="modal-close" id="pcd-close-btn" type="button">✕</button>
    </div>
    <div class="modal-body" style="display:flex;flex-direction:column;gap:12px">
      <div style="background:rgba(239,68,68,0.06);border:1.5px solid rgba(239,68,68,0.2);padding:12px 16px;border-radius:10px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-secondary);text-transform:uppercase">Total Sisa Piutang</div>
          <div style="font-size:22px;font-weight:900;color:var(--color-danger);margin-top:2px">${formatRupiah(totalRemainingDebt)}</div>
        </div>
        <div style="font-size:12px;color:var(--text-secondary)">
          ${activeTxs.length > 0 ? `${activeTxs.length} transaksi berjalan` : 'Pencatatan saldo CRM'}
        </div>
      </div>

      <div>
        <label class="form-label" style="font-size:12px;font-weight:700">Jumlah Pembayaran / Cicilan (Rp) *</label>
        <input type="number" class="input" id="pcd-amount" min="1" max="${totalRemainingDebt}" value="${totalRemainingDebt}"
               style="font-size:16px;font-weight:800;color:var(--text-primary);padding:10px" autofocus>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:6px">
        <button type="button" class="btn btn--sm btn--secondary pcd-quick-amt" data-amt="${totalRemainingDebt}">
          Pelunasan Penuh (${formatRupiah(totalRemainingDebt)})
        </button>
        ${totalRemainingDebt > 10000 ? `
          <button type="button" class="btn btn--sm btn--secondary pcd-quick-amt" data-amt="10000">Rp 10.000</button>
        ` : ''}
        ${totalRemainingDebt > 20000 ? `
          <button type="button" class="btn btn--sm btn--secondary pcd-quick-amt" data-amt="20000">Rp 20.000</button>
        ` : ''}
        ${totalRemainingDebt > 50000 ? `
          <button type="button" class="btn btn--sm btn--secondary pcd-quick-amt" data-amt="50000">Rp 50.000</button>
        ` : ''}
      </div>

      <div>
        <label class="form-label" style="font-size:12px;font-weight:700">Catatan Pembayaran</label>
        <input type="text" class="input" id="pcd-note" placeholder="e.g. Pembayaran tunai / transfer pelunasan" value="Pembayaran piutang pelanggan">
      </div>
    </div>
    <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px">
      <button class="btn btn--secondary" id="pcd-cancel-btn" type="button">Batal</button>
      <button class="btn btn--primary" id="pcd-submit-btn" type="button" style="font-weight:700">
        ✅ Catat Pembayaran
      </button>
    </div>
  `;

  openModal(html, 'modal-pay-customer-debt');

  document.getElementById('pcd-close-btn')?.addEventListener('click', () => closeModal('modal-pay-customer-debt'));
  document.getElementById('pcd-cancel-btn')?.addEventListener('click', () => closeModal('modal-pay-customer-debt'));

  document.querySelectorAll('.pcd-quick-amt').forEach(btn => {
    btn.addEventListener('click', () => {
      const amtInput = document.getElementById('pcd-amount');
      if (amtInput) amtInput.value = btn.dataset.amt;
    });
  });

  document.getElementById('pcd-submit-btn')?.addEventListener('click', async () => {
    const amount = Number(document.getElementById('pcd-amount')?.value) || 0;
    const note = document.getElementById('pcd-note')?.value?.trim() || 'Pembayaran piutang';

    if (amount <= 0 || amount > totalRemainingDebt) {
      window.showToast?.(`Jumlah pembayaran harus antara Rp 1 dan ${formatRupiah(totalRemainingDebt)}`, 'warning');
      return;
    }

    try {
      let unallocated = amount;
      const nowIso = new Date().toISOString();

      // Allocate payment to active debt transactions (oldest first)
      const sortedActiveTxs = [...activeTxs].sort((a, b) => new Date(a.date) - new Date(b.date));
      for (const tx of sortedActiveTxs) {
        if (unallocated <= 0) break;
        const currentRem = Number(tx.remainingDebt) || 0;
        const payPortion = Math.min(unallocated, currentRem);

        const newPaid = (Number(tx.paidAmount) || 0) + payPortion;
        const newRem = Math.max(0, currentRem - payPortion);
        const newStatus = newRem === 0 ? 'paid' : 'partial';

        const nextCicilNum = (tx.debtPayments || []).length + 1;
        const cicilNote = newRem === 0 ? `${note} (Pelunasan/LUNAS ✅)` : `${note} (Cicilan #${nextCicilNum})`;
        const newPayments = [...(tx.debtPayments || []), { date: nowIso, amount: payPortion, note: cicilNote }];

        const updatedTx = {
          ...tx,
          paidAmount: newPaid,
          remainingDebt: newRem,
          paymentStatus: newStatus,
          debtPayments: newPayments
        };

        await updateTransaction(updatedTx);
        store.updateTransaction(tx.id, updatedTx);
        unallocated -= payPortion;
      }

      // Decrement customer's totalDebt in CRM database
      const freshCusts = await getAllCustomers();
      const targetCust = freshCusts.find(c => String(c.id) === String(cust.id)) || cust;
      targetCust.totalDebt = Math.max(0, (Number(targetCust.totalDebt) || 0) - amount);
      await updateCustomer(targetCust);

      const finalCusts = await getAllCustomers();
      store.setCustomers(finalCusts);

      closeModal('modal-pay-customer-debt');
      window.showToast?.(`Pembayaran ${formatRupiah(amount)} untuk ${cust.name} berhasil dicatat!`, 'success');
    } catch (err) {
      console.error('[customer-debt-pay]', err);
      window.showToast?.('Gagal mencatat pembayaran hutang: ' + (err.message || 'Error'), 'error');
    }
  });
};
