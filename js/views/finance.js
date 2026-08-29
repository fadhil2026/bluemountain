/**
 * views/finance.js — Keuangan / Arus Kas Profesional
 * Pedoman: Double-entry accounting, cash basis
 * 
 * Kas masuk:
 *   - Tunai (paid)
 *   - Transfer (transfer_confirmed saja — pending TIDAK masuk kas)
 *   - Cicilan hutang (setiap debtPayment entry)
 * 
 * Piutang Usaha:
 *   - Transfer pending (menunggu konfirmasi)
 *   - Hutang / Bayar Nanti (remainingDebt > 0)
 * 
 * Pengeluaran:
 *   - Dicatat manual (operasional, HPP, lain-lain)
 * 
 * Saldo Kas = Modal Awal + Total Kas Masuk - Total Pengeluaran
 */
import { getAllTransactions, getAllExpenses, saveExpense, deleteExpense, updateTransaction } from '../db.js';
import { getSetting, setSetting } from '../db.js';
import { formatRupiah }            from '../utils/currency.js';
import { formatDateTime }          from '../utils/date.js';
import { openModal, closeModal }   from './modals.js';
import store                       from '../store.js';

let _unsubTx  = null;
let _unsubExp = null;

export const initFinance = async () => {
  await renderFinance();

  if (_unsubTx)  _unsubTx();
  if (_unsubExp) _unsubExp();
  _unsubTx  = store.on('transactions:change', () => renderFinance());
  _unsubExp = store.on('expenses:change',     () => renderFinance());
};

export const renderFinance = async () => {
  const view = document.getElementById('view-finance');
  if (!view) return;

  // Load data
  const [txs, expenses, modalAwalRaw] = await Promise.all([
    store.state.transactions.length ? Promise.resolve(store.state.transactions) : getAllTransactions().then(t => { store.setTransactions(t); return t; }),
    getAllExpenses().then(e => { store.setExpenses(e); return e; }),
    getSetting('modalAwal'),
  ]);

  const modalAwal = parseFloat(modalAwalRaw) || 0;

  // ── Kas Masuk Calculation (Cash Basis, Confirmed only) ──
  let kasmasukTunai      = 0;
  let kasmasukTransfer   = 0;
  let kasmasukCicilan    = 0;
  let totalPiutangTransfer = 0;
  let totalPiutangHutang   = 0;

  for (const tx of txs) {
    if (tx.paymentMethod === 'cash' && (tx.paymentStatus === 'paid' || !tx.paymentStatus)) {
      kasmasukTunai += tx.total;
    }
    if (tx.paymentMethod === 'transfer') {
      if (tx.paymentStatus === 'transfer_confirmed') {
        kasmasukTransfer += tx.total;
      } else {
        totalPiutangTransfer += tx.total; // pending → piutang sementara
      }
    }
    if (tx.paymentMethod === 'debt') {
      // Sum semua cicilan yang sudah masuk (debtPayments)
      for (const p of (tx.debtPayments || [])) {
        kasmasukCicilan += p.amount;
      }
      totalPiutangHutang += (tx.remainingDebt || 0);
    }
  }

  const totalKasMasuk   = kasmasukTunai + kasmasukTransfer + kasmasukCicilan;
  const totalPengeluaran = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const saldoKas        = modalAwal + totalKasMasuk - totalPengeluaran;
  const totalPiutang    = totalPiutangTransfer + totalPiutangHutang;

  // ── Arus Kas Harian (last 30 days) ──
  const dailyMap = buildDailyCashFlow(txs, expenses);

  // ── Jurnal Entri (last 20) ──
  const journal = buildJournal(txs, expenses);

  // ── Outstanding Piutang ──
  const outstanding = [
    ...txs.filter(t => t.paymentStatus === 'transfer_pending'),
    ...txs.filter(t => (t.paymentMethod === 'debt' || t.paymentStatus === 'partial' || t.paymentStatus === 'unpaid') && (t.remainingDebt || 0) > 0),
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  view.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">💰 Keuangan & Arus Kas</h2>
      <button class="btn btn--secondary btn--sm" id="btn-refresh-finance">🔄 Refresh</button>
    </div>

    <!-- ── Modal Awal ── -->
    <div class="card" style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted)">Modal Awal / Saldo Pembuka</div>
          <div style="font-size:22px;font-weight:900;color:var(--blue-700)">${formatRupiah(modalAwal)}</div>
        </div>
        <button class="btn btn--secondary" id="btn-set-modal-awal">✏️ Set Modal Awal</button>
      </div>
    </div>

    <!-- ── Ringkasan Saldo ── -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px">
      <div class="stat-card" style="border-left:4px solid #16a34a">
        <span class="stat-card__icon">💵</span>
        <div class="stat-card__value" style="color:#16a34a">${formatRupiah(saldoKas)}</div>
        <div class="stat-card__label">Saldo Kas Bersih</div>
        <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Modal + Masuk - Keluar</div>
      </div>
      <div class="stat-card" style="border-left:4px solid var(--blue-500)">
        <span class="stat-card__icon">📥</span>
        <div class="stat-card__value">${formatRupiah(totalKasMasuk)}</div>
        <div class="stat-card__label">Total Kas Masuk</div>
        <div class="stat-card__trend trend-up">Tunai+Transfer+Cicilan</div>
      </div>
      <div class="stat-card" style="border-left:4px solid #dc2626">
        <span class="stat-card__icon">📤</span>
        <div class="stat-card__value" style="color:#dc2626">${formatRupiah(totalPengeluaran)}</div>
        <div class="stat-card__label">Total Pengeluaran</div>
        <div class="stat-card__trend">${expenses.length} entri</div>
      </div>
      <div class="stat-card" style="border-left:4px solid #d97706">
        <span class="stat-card__icon">📋</span>
        <div class="stat-card__value" style="color:#d97706">${formatRupiah(totalPiutang)}</div>
        <div class="stat-card__label">Total Piutang</div>
        <div class="stat-card__trend">${outstanding.length} belum lunas</div>
      </div>
    </div>

    <!-- ── Sub-totals Kas Masuk ── -->
    <div class="card" style="margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">📊 Rincian Kas Masuk</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px">
        ${renderKasItem('💵 Tunai', kasmasukTunai, '#16a34a')}
        ${renderKasItem('📲 Transfer', kasmasukTransfer, '#2563eb')}
        ${renderKasItem('📋 Cicilan Hutang', kasmasukCicilan, '#7c3aed')}
        ${renderKasItem('⏳ Transfer Pending', totalPiutangTransfer, '#d97706', true)}
        ${renderKasItem('🔴 Piutang Hutang', totalPiutangHutang, '#dc2626', true)}
      </div>
    </div>

    <!-- ── Piutang Outstanding ── -->
    ${outstanding.length > 0 ? `
    <div class="card" style="margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">⚠️ Piutang Belum Lunas (${outstanding.length})</div>
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
        <table class="data-table" id="piutang-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Pelanggan</th>
              <th>Tanggal</th>
              <th>Total</th>
              <th>Sisa</th>
              <th>Tipe</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${outstanding.map(t => `
            <tr>
              <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${t.invoiceNo}</td>
              <td>${t.customerName || '—'}</td>
              <td style="font-size:11px">${new Date(t.date).toLocaleDateString('id-ID')}</td>
              <td style="font-weight:700">${formatRupiah(t.total)}</td>
              <td style="font-weight:800;color:#dc2626">${formatRupiah(t.paymentStatus === 'transfer_pending' ? t.total : (t.remainingDebt||0))}</td>
              <td>${t.paymentStatus === 'transfer_pending' ? '<span class="badge" style="background:#fef3c7;color:#92400e">⏳ Transfer</span>' : '<span class="badge" style="background:#fee2e2;color:#991b1b">📋 Hutang</span>'}</td>
              <td>
                ${t.paymentStatus === 'transfer_pending' ? `
                  <button class="btn btn--sm" data-action="confirm-transfer" data-id="${t.id}"
                    style="background:#d1fae5;border:1.5px solid #6ee7b7;color:#065f46;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                    ✅ Konfirmasi
                  </button>` : `
                  <button class="btn btn--sm" data-action="pay-debt" data-id="${t.id}"
                    style="background:#dbeafe;border:1.5px solid #93c5fd;color:#1e40af;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                    💰 Cicil
                  </button>`}
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>` : ''}

    <!-- ── Pengeluaran ── -->
    <div class="card" style="margin-bottom:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted)">📤 Pengeluaran Operasional</div>
        <button class="btn btn--secondary btn--sm" id="btn-add-expense">+ Tambah Pengeluaran</button>
      </div>
      ${expenses.length === 0 ? `
        <div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px">Belum ada pengeluaran tercatat</div>
      ` : `
        <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
          <table class="data-table" id="expense-table">
            <thead>
              <tr><th>Tanggal</th><th>Kategori</th><th>Keterangan</th><th>Jumlah</th><th>Aksi</th></tr>
            </thead>
            <tbody>
              ${expenses.sort((a,b) => new Date(b.date) - new Date(a.date)).map(exp => `
              <tr>
                <td style="font-size:11px;white-space:nowrap">${new Date(exp.date).toLocaleDateString('id-ID')}</td>
                <td><span class="badge badge--blue">${exp.category || 'Lainnya'}</span></td>
                <td>${exp.note || '—'}</td>
                <td style="font-weight:800;color:#dc2626">${formatRupiah(exp.amount)}</td>
                <td>
                  <button class="btn btn--sm" data-action="delete-expense" data-id="${exp.id}"
                    style="background:var(--color-danger-bg);border:1.5px solid var(--color-danger-border);color:var(--color-danger);border-radius:var(--radius-md);padding:4px 8px;font-size:11px;cursor:pointer">
                    🗑️
                  </button>
                </td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>

    <!-- ── Arus Kas Harian ── -->
    <div class="card" style="margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">📈 Arus Kas Harian (30 Hari Terakhir)</div>
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
        <table class="data-table">
          <thead>
            <tr><th>Tanggal</th><th>Kas Masuk</th><th>Pengeluaran</th><th>Net Harian</th><th>Saldo Kumulatif</th></tr>
          </thead>
          <tbody>
            ${renderDailyTable(dailyMap, modalAwal)}
          </tbody>
        </table>
      </div>
    </div>

    <!-- ── Jurnal Entri ── -->
    <div class="card">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px">📒 Jurnal Entri (20 Terbaru)</div>
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
        <table class="data-table">
          <thead>
            <tr><th>Tanggal</th><th>Keterangan</th><th>Debit</th><th>Kredit</th><th>Akun</th></tr>
          </thead>
          <tbody>
            ${journal.slice(0,20).map(j => `
            <tr>
              <td style="font-size:11px;white-space:nowrap">${new Date(j.date).toLocaleDateString('id-ID')}</td>
              <td style="font-size:12px">${j.desc}</td>
              <td style="color:#16a34a;font-weight:700">${j.debit > 0 ? formatRupiah(j.debit) : '—'}</td>
              <td style="color:#dc2626;font-weight:700">${j.credit > 0 ? formatRupiah(j.credit) : '—'}</td>
              <td><span class="badge ${j.type === 'kas' ? 'badge--green' : j.type === 'piutang' ? '' : 'badge--blue'}" style="${j.type === 'piutang' ? 'background:#fef3c7;color:#92400e' : ''}">${j.account}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  bindFinanceEvents(txs);
};

const renderKasItem = (label, amount, color, isPiutang = false) => `
  <div style="padding:10px 14px;background:${isPiutang ? '#fef9c3' : 'var(--bg-elevated)'};border:1.5px solid var(--border-subtle);border-radius:10px">
    <div style="font-size:11px;color:var(--text-muted);font-weight:600">${label}</div>
    <div style="font-size:16px;font-weight:800;color:${color}">${formatRupiah(amount)}</div>
    ${isPiutang ? '<div style="font-size:10px;color:#92400e">⚠️ Belum jadi kas</div>' : ''}
  </div>
`;

const buildDailyCashFlow = (txs, expenses) => {
  const map = {};

  for (const tx of txs) {
    const key = tx.dateKey;
    if (!key) continue;
    if (!map[key]) map[key] = { masuk: 0, keluar: 0 };

    if (tx.paymentMethod === 'cash' && (tx.paymentStatus === 'paid' || !tx.paymentStatus)) {
      map[key].masuk += tx.total;
    }
    if (tx.paymentMethod === 'transfer' && tx.paymentStatus === 'transfer_confirmed') {
      const confDate = tx.confirmedAt ? tx.confirmedAt.split('T')[0] : key;
      if (!map[confDate]) map[confDate] = { masuk: 0, keluar: 0 };
      map[confDate].masuk += tx.total;
    }
    if (tx.paymentMethod === 'debt') {
      for (const p of (tx.debtPayments || [])) {
        const pd = p.date ? p.date.split('T')[0] : key;
        if (!map[pd]) map[pd] = { masuk: 0, keluar: 0 };
        map[pd].masuk += p.amount;
      }
    }
  }

  for (const exp of expenses) {
    const key = exp.dateKey || (exp.date ? exp.date.split('T')[0] : null);
    if (!key) continue;
    if (!map[key]) map[key] = { masuk: 0, keluar: 0 };
    map[key].keluar += exp.amount || 0;
  }

  // Last 30 days only
  const result = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    result.push({ key, ...(map[key] || { masuk: 0, keluar: 0 }) });
  }
  return result;
};

const renderDailyTable = (days, modalAwal) => {
  let cumulative = modalAwal;
  return days.filter(d => d.masuk > 0 || d.keluar > 0).map(d => {
    const net = d.masuk - d.keluar;
    cumulative += net;
    return `
    <tr>
      <td style="font-size:12px;white-space:nowrap">${new Date(d.key).toLocaleDateString('id-ID',{weekday:'short',day:'2-digit',month:'short'})}</td>
      <td style="color:#16a34a;font-weight:700">${d.masuk > 0 ? formatRupiah(d.masuk) : '—'}</td>
      <td style="color:#dc2626;font-weight:700">${d.keluar > 0 ? formatRupiah(d.keluar) : '—'}</td>
      <td style="font-weight:800;color:${net >= 0 ? '#16a34a' : '#dc2626'}">${net >= 0 ? '+' : ''}${formatRupiah(net)}</td>
      <td style="font-weight:800;color:var(--blue-700)">${formatRupiah(cumulative)}</td>
    </tr>`;
  }).join('') || `<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted)">Tidak ada transaksi 30 hari terakhir</td></tr>`;
};

const buildJournal = (txs, expenses) => {
  const entries = [];

  for (const tx of txs) {
    if (tx.paymentMethod === 'cash') {
      entries.push({ date: tx.date, desc: `Penjualan Tunai — ${tx.invoiceNo}`, debit: tx.total, credit: 0, account: 'Kas', type: 'kas' });
    } else if (tx.paymentMethod === 'transfer') {
      if (tx.paymentStatus === 'transfer_confirmed') {
        entries.push({ date: tx.confirmedAt || tx.date, desc: `Transfer Confirmed — ${tx.invoiceNo}`, debit: tx.total, credit: 0, account: 'Kas', type: 'kas' });
        entries.push({ date: tx.date, desc: `Piutang Transfer — ${tx.invoiceNo}`, debit: 0, credit: tx.total, account: 'Piutang Usaha', type: 'piutang' });
      } else {
        entries.push({ date: tx.date, desc: `Transfer Pending — ${tx.invoiceNo} (${tx.customerName||'—'})`, debit: tx.total, credit: 0, account: 'Piutang Usaha', type: 'piutang' });
      }
    } else if (tx.paymentMethod === 'debt') {
      entries.push({ date: tx.date, desc: `Penjualan Hutang — ${tx.invoiceNo} (${tx.customerName||'—'})`, debit: tx.total, credit: 0, account: 'Piutang Usaha', type: 'piutang' });
      for (const p of (tx.debtPayments || [])) {
        entries.push({ date: p.date, desc: `Cicilan — ${tx.invoiceNo} (${p.note||'—'})`, debit: p.amount, credit: 0, account: 'Kas', type: 'kas' });
      }
    }
  }

  for (const exp of expenses) {
    entries.push({ date: exp.date, desc: `Pengeluaran — ${exp.category||'Lainnya'}: ${exp.note||'—'}`, debit: 0, credit: exp.amount, account: 'Beban', type: 'beban' });
  }

  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const bindFinanceEvents = (txs) => {
  document.getElementById('btn-refresh-finance')?.addEventListener('click', renderFinance);

  // Set Modal Awal
  document.getElementById('btn-set-modal-awal')?.addEventListener('click', () => {
    const current = store.state.settings.modalAwal || 0;
    const html = `
      <div class="modal-header"><span class="modal-title">🏦 Set Modal Awal</span><button class="modal-close" id="ma-x">✕</button></div>
      <div class="modal-body">
        <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
          ℹ️ Modal Awal adalah saldo kas sebelum operasional dimulai. Diisi sekali saat setup awal.
        </div>
        <div class="input-group">
          <label class="input-label">💰 Jumlah Modal Awal (Rp)</label>
          <input type="number" class="input" id="modal-awal-input" value="${current}" min="0" step="10000" inputmode="numeric">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" id="ma-cancel">Batal</button>
        <button class="btn btn--success" id="ma-save">💾 Simpan</button>
      </div>
    `;
    openModal(html, 'modal-awal');
    setTimeout(() => {
      document.getElementById('ma-x')?.addEventListener('click',      () => closeModal('modal-awal'));
      document.getElementById('ma-cancel')?.addEventListener('click', () => closeModal('modal-awal'));
      document.getElementById('ma-save')?.addEventListener('click',   async () => {
        const val = parseFloat(document.getElementById('modal-awal-input')?.value) || 0;
        await setSetting('modalAwal', val);
        store.updateSettings({ modalAwal: val });
        closeModal('modal-awal');
        window.showToast('Modal Awal disimpan!', 'success');
        renderFinance();
      });
    }, 0);
  });

  // Add Expense
  document.getElementById('btn-add-expense')?.addEventListener('click', () => {
    const cats = ['Belanja Bahan', 'Operasional', 'Gaji/Upah', 'Listrik/Air', 'Transportasi', 'Peralatan', 'Lainnya'];
    const html = `
      <div class="modal-header"><span class="modal-title">➕ Tambah Pengeluaran</span><button class="modal-close" id="exp-x">✕</button></div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">📂 Kategori</label>
          <select class="input" id="exp-category">
            ${cats.map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label">📝 Keterangan</label>
          <input type="text" class="input" id="exp-note" placeholder="Keterangan singkat">
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label">💵 Jumlah (Rp)</label>
          <input type="number" class="input" id="exp-amount" value="0" min="1" step="1000" inputmode="numeric">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" id="exp-cancel">Batal</button>
        <button class="btn btn--success" id="exp-save">💾 Simpan</button>
      </div>
    `;
    openModal(html, 'expense-modal');
    setTimeout(() => {
      document.getElementById('exp-x')?.addEventListener('click',      () => closeModal('expense-modal'));
      document.getElementById('exp-cancel')?.addEventListener('click', () => closeModal('expense-modal'));
      document.getElementById('exp-save')?.addEventListener('click',   async () => {
        const amount   = parseFloat(document.getElementById('exp-amount')?.value) || 0;
        const category = document.getElementById('exp-category')?.value || 'Lainnya';
        const note     = document.getElementById('exp-note')?.value?.trim() || '';
        if (amount <= 0) { window.showToast('Jumlah harus lebih dari 0!', 'warning'); return; }
        const now  = new Date().toISOString();
        const exp  = { date: now, dateKey: now.split('T')[0], category, note, amount };
        const id   = await saveExpense(exp);
        exp.id = id;
        store.addExpense(exp);
        closeModal('expense-modal');
        window.showToast('Pengeluaran dicatat!', 'success');
      });
    }, 0);
  });

  // Expense delete
  document.getElementById('expense-table')?.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-action="delete-expense"]');
    if (!btn) return;
    if (!confirm('Hapus pengeluaran ini?')) return;
    const id = parseInt(btn.dataset.id);
    await deleteExpense(id);
    store.removeExpense(id);
    window.showToast('Pengeluaran dihapus', 'success');
  });

  // Piutang actions (confirm transfer / cicil)
  document.getElementById('piutang-table')?.addEventListener('click', async (e) => {
    const btn    = e.target.closest('[data-action]');
    if (!btn) return;
    const id     = parseInt(btn.dataset.id);
    const action = btn.dataset.action;
    const txObj  = (store.state.transactions || txs).find(t => t.id === id);

    if (action === 'confirm-transfer' && txObj) {
      if (!confirm(`Konfirmasi transfer ${formatRupiah(txObj.total)} dari ${txObj.customerName||'pelanggan'} sudah diterima?`)) return;
      const updated = { ...txObj, paymentStatus: 'transfer_confirmed', paidAmount: txObj.total, confirmedAt: new Date().toISOString() };
      await updateTransaction(updated);
      store.updateTransaction(id, { paymentStatus: 'transfer_confirmed', paidAmount: txObj.total, confirmedAt: updated.confirmedAt });
      window.showToast('Transfer dikonfirmasi! Kas bertambah.', 'success');
    }

    if (action === 'pay-debt' && txObj) {
      // Reuse cicilan modal from transactions.js — inline mini modal
      const remaining = txObj.remainingDebt || 0;
      const mini = `
        <div class="modal-header"><span class="modal-title">💰 Catat Cicilan</span><button class="modal-close" id="mc-x">✕</button></div>
        <div class="modal-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
            <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#991b1b;font-weight:700">Total</div>
              <div style="font-size:16px;font-weight:900;color:#dc2626">${formatRupiah(txObj.total)}</div>
            </div>
            <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
              <div style="font-size:10px;color:#92400e;font-weight:700">Sisa</div>
              <div style="font-size:16px;font-weight:900;color:#d97706">${formatRupiah(remaining)}</div>
            </div>
          </div>
          <div class="input-group">
            <label class="input-label">💵 Jumlah Cicilan</label>
            <input type="number" class="input" id="mc-amount" value="${remaining}" min="1" max="${remaining}" step="1000" inputmode="numeric">
          </div>
          <div class="input-group" style="margin-top:10px">
            <label class="input-label">📝 Catatan</label>
            <input type="text" class="input" id="mc-note" placeholder="Cicilan ke-...">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn--secondary" id="mc-cancel">Batal</button>
          <button class="btn btn--success" id="mc-save">💾 Simpan Cicilan</button>
        </div>
      `;
      openModal(mini, 'mini-cicil');
      setTimeout(() => {
        document.getElementById('mc-x')?.addEventListener('click',      () => closeModal('mini-cicil'));
        document.getElementById('mc-cancel')?.addEventListener('click', () => closeModal('mini-cicil'));
        document.getElementById('mc-save')?.addEventListener('click',   async () => {
          const amount   = parseFloat(document.getElementById('mc-amount')?.value) || 0;
          const note     = document.getElementById('mc-note')?.value?.trim() || 'Cicilan';
          if (amount <= 0 || amount > remaining) { window.showToast('Jumlah tidak valid', 'warning'); return; }
          const newPaid     = (txObj.paidAmount||0) + amount;
          const newRemaining = Math.max(0, remaining - amount);
          const newStatus   = newRemaining === 0 ? 'paid' : 'partial';
          const newPayments = [...(txObj.debtPayments||[]), { date: new Date().toISOString(), amount, note }];
          const updated     = { ...txObj, paidAmount: newPaid, remainingDebt: newRemaining, paymentStatus: newStatus, debtPayments: newPayments };
          await updateTransaction(updated);
          store.updateTransaction(id, { paidAmount: newPaid, remainingDebt: newRemaining, paymentStatus: newStatus, debtPayments: newPayments });
          closeModal('mini-cicil');
          window.showToast(newRemaining === 0 ? '🎉 Hutang LUNAS!' : `Cicilan ${formatRupiah(amount)} dicatat`, 'success');
        });
      }, 0);
    }
  });
};
