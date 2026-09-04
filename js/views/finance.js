/**
 * views/finance.js — Keuangan / Arus Kas Profesional
 * Features: Multi-table pagination (10/page), Date range cashflow, Modal Awal
 */
import { getAllTransactions, getAllExpenses, saveExpense, deleteExpense, updateTransaction, getAllCustomers, updateCustomer } from '../db.js';
import { getSetting, setSetting } from '../db.js';
import { formatRupiah }           from '../utils/currency.js';
import { formatDateTime, todayKey } from '../utils/date.js';
import { esc }                    from '../utils/sanitize.js';
import { openModal, closeModal }  from './modals.js';
import { exportToCSV }            from '../utils/export.js';
import store                      from '../store.js';

let _unsubTx      = null;
let _unsubExp     = null;
let _rendering    = false;
let _piutangPage  = 1;
let _expensePage  = 1;
let _journalPage  = 1;
const PAGE_SIZE   = 10;

export const initFinance = async () => {
  if (_unsubTx)  _unsubTx();
  if (_unsubExp) _unsubExp();
  _unsubTx  = store.on('transactions:change', () => { if (!_rendering) renderFinance(); });
  _unsubExp = store.on('expenses:change',     () => { if (!_rendering) renderFinance(); });

  await renderFinance();
};

export const renderFinance = async () => {
  if (_rendering) return;
  _rendering = true;

  try {
    const view = document.getElementById('view-finance');
    if (!view) return;

    const [txs, expenses, modalAwalRaw] = await Promise.all([
      store.state.transactions.length
        ? Promise.resolve(store.state.transactions)
        : getAllTransactions().then(t => { store.setTransactions(t); return t; }),
      getAllExpenses().then(e => { store.setExpenses(e); return e; }),
      getSetting('modalAwal'),
    ]);

    const modalAwal = parseFloat(modalAwalRaw) || 0;

    // ── Kas Masuk Calculation ──
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
          totalPiutangTransfer += tx.total;
        }
      }
      if (tx.paymentMethod === 'debt') {
        for (const p of (tx.debtPayments || [])) {
          kasmasukCicilan += p.amount;
        }
        totalPiutangHutang += (tx.remainingDebt || 0);
      }
    }

    const totalKasMasuk    = kasmasukTunai + kasmasukTransfer + kasmasukCicilan;
    const totalPengeluaran = expenses.reduce((s, e) => s + (e.amount || 0), 0);
    const saldoKas         = modalAwal + totalKasMasuk - totalPengeluaran;
    const totalPiutang     = totalPiutangTransfer + totalPiutangHutang;

    const dailyMap   = buildDailyCashFlow(txs, expenses);
    const journal    = buildJournal(txs, expenses);
    const totalJournalDebit  = journal.reduce((s, j) => s + (j.debit || 0), 0);
    const totalJournalCredit = journal.reduce((s, j) => s + (j.credit || 0), 0);
    const isJournalBalanced  = totalJournalDebit === totalJournalCredit;

    const totalGalonDipinjam = (store.state.customers || []).reduce((s, c) => s + (Number(c.galonLoaned) || 0), 0);

    const outstanding = [
      ...txs.filter(t => t.paymentStatus === 'transfer_pending'),
      ...txs.filter(t => (t.paymentMethod === 'debt' || t.paymentStatus === 'partial' || t.paymentStatus === 'unpaid') && (t.remainingDebt || 0) > 0),
    ].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Pagination for Piutang (10/page)
    const piutangTotalPages = Math.max(1, Math.ceil(outstanding.length / PAGE_SIZE));
    if (_piutangPage > piutangTotalPages) _piutangPage = piutangTotalPages;
    const piutangPageItems = outstanding.slice((_piutangPage - 1) * PAGE_SIZE, _piutangPage * PAGE_SIZE);

    // Pagination for Expenses (10/page)
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
    const expTotalPages  = Math.max(1, Math.ceil(sortedExpenses.length / PAGE_SIZE));
    if (_expensePage > expTotalPages) _expensePage = expTotalPages;
    const expPageItems = sortedExpenses.slice((_expensePage - 1) * PAGE_SIZE, _expensePage * PAGE_SIZE);

    // Pagination for Journal (10/page)
    const journalTotalPages = Math.max(1, Math.ceil(journal.length / PAGE_SIZE));
    if (_journalPage > journalTotalPages) _journalPage = journalTotalPages;
    const journalPageItems = journal.slice((_journalPage - 1) * PAGE_SIZE, _journalPage * PAGE_SIZE);

    view.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">💰 Keuangan &amp; Arus Kas</h2>
        <button class="btn btn--secondary btn--sm" id="btn-refresh-finance">🔄 Refresh</button>
      </div>

      <!-- Modal Awal -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div>
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted)">Modal Awal / Saldo Pembuka</div>
            <div style="font-size:22px;font-weight:900;color:var(--blue-700)">${formatRupiah(modalAwal)}</div>
          </div>
          <button class="btn btn--secondary" id="btn-set-modal-awal">✏️ Set Modal Awal</button>
        </div>
      </div>

      <!-- Ringkasan Saldo -->
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

      <!-- Pelacakan Aset Galon Fisik Toko -->
      <div class="card" style="margin-bottom:16px;background:linear-gradient(135deg, rgba(37,99,235,0.03), rgba(16,185,129,0.03));border:1.5px solid var(--border-subtle)">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:10px">
          🪣 Pelacakan Aset Galon Fisik Toko
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px">
          <div style="padding:10px 14px;background:white;border-radius:10px;border:1px solid var(--border-subtle)">
            <div style="font-size:11px;color:var(--text-muted);font-weight:600">Galon Dipinjam Pelanggan</div>
            <div style="font-size:18px;font-weight:900;color:var(--color-warning)">${totalGalonDipinjam} <span style="font-size:12px;font-weight:600">galon</span></div>
            <div style="font-size:10px;color:var(--text-muted)">Di ${(store.state.customers || []).filter(c => (c.galonLoaned || 0) > 0).length} pelanggan</div>
          </div>
          <div style="padding:10px 14px;background:white;border-radius:10px;border:1px solid var(--border-subtle)">
            <div style="font-size:11px;color:var(--text-muted);font-weight:600">Nilai Aset Galon Toko</div>
            <div style="font-size:18px;font-weight:900;color:var(--blue-600)">${formatRupiah(totalGalonDipinjam * 45000)}</div>
            <div style="font-size:10px;color:var(--text-muted)">Estimasi @ Rp 45.000 / galon</div>
          </div>
          <div style="padding:10px 14px;background:white;border-radius:10px;border:1px solid var(--border-subtle)">
            <div style="font-size:11px;color:var(--text-muted);font-weight:600">Buku Pembantu Galon</div>
            <div style="font-size:13px;font-weight:800;color:var(--color-success);margin-top:4px">Tersinkronisasi ✅</div>
            <div style="font-size:10px;color:var(--text-muted)">CRM Master Pelanggan</div>
          </div>
        </div>
      </div>

      <!-- Sub-totals Kas Masuk -->
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

      <!-- Piutang Outstanding Table with Pagination (10/page) -->
      ${outstanding.length > 0 ? `
      <div class="card card--elevated" style="margin-bottom:16px;overflow:hidden;padding:0">
        <div style="padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">
          ⚠️ Daftar Piutang &amp; Cicilan Berjalan (${outstanding.length} transaksi)
        </div>
        <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
          <table class="data-table" id="piutang-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Pelanggan</th>
                <th>Tanggal</th>
                <th>Total Tagihan</th>
                <th>Terbayar</th>
                <th>Sisa Piutang</th>
                <th>Progress Pelunasan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${piutangPageItems.map(t => {
                const totalAmt = t.total || 0;
                const remAmt   = t.paymentStatus === 'transfer_pending' ? totalAmt : (t.remainingDebt || 0);
                const paidAmt  = totalAmt - remAmt;
                const percent  = Math.min(100, Math.max(0, Math.round((paidAmt / totalAmt) * 100)));
                const numPayments = (t.debtPayments || []).length;
                return `
              <tr>
                <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${esc(t.invoiceNo)}</td>
                <td><strong style="color:var(--text-primary)">${esc(t.customerName || '—')}</strong></td>
                <td style="font-size:11px;white-space:nowrap">${new Date(t.date).toLocaleDateString('id-ID')}</td>
                <td style="font-weight:700">${formatRupiah(totalAmt)}</td>
                <td style="color:#16a34a;font-weight:700">${formatRupiah(paidAmt)}</td>
                <td style="font-weight:800;color:#dc2626">${formatRupiah(remAmt)}</td>
                <td style="min-width:140px">
                  <div style="font-size:11px;font-weight:700;color:var(--blue-700);display:flex;justify-content:space-between">
                    <span>${percent}%</span>
                    <span style="font-size:10px;color:var(--text-muted)">${numPayments > 0 ? `${numPayments}x cicilan` : 'Belum ada'}</span>
                  </div>
                  <div style="height:6px;width:100%;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-top:2px">
                    <div style="height:100%;width:${percent}%;background:${percent === 100 ? '#10b981' : '#3b82f6'};border-radius:3px"></div>
                  </div>
                </td>
                <td>
                  ${t.paymentStatus === 'transfer_pending' ? `
                    <button class="btn btn--sm" data-action="confirm-transfer" data-id="${t.id}"
                      style="background:#d1fae5;border:1.5px solid #6ee7b7;color:#065f46;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                      ✅ Konfirmasi
                    </button>` : `
                    <button class="btn btn--sm" data-action="pay-debt" data-id="${t.id}"
                      style="background:#dbeafe;border:1.5px solid #93c5fd;color:#1e40af;border-radius:var(--radius-md);padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer">
                      💰 Cicil / Pelunasan
                    </button>`}
                </td>
              </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">Hal ${_piutangPage} dari ${piutangTotalPages}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn--secondary btn--sm" id="piutang-prev" ${_piutangPage <= 1 ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>◀ Sebelumnya</button>
            <button class="btn btn--secondary btn--sm" id="piutang-next" ${_piutangPage >= piutangTotalPages ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>Berikutnya ▶</button>
          </div>
        </div>
      </div>` : ''}

      <!-- Pengeluaran Operasional Table with Pagination (10/page) -->
      <div class="card card--elevated" style="margin-bottom:16px;overflow:hidden;padding:0">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">📤 Pengeluaran Operasional (${expenses.length} entri)</div>
          <button class="btn btn--primary btn--sm" id="btn-add-expense">+ Tambah Pengeluaran</button>
        </div>
        ${expenses.length === 0 ? `
          <div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px">Belum ada pengeluaran tercatat</div>
        ` : `
          <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
            <table class="data-table" id="expense-table">
              <thead>
                <tr><th>Tanggal</th><th>Kategori</th><th>Keterangan</th><th>Jumlah</th><th>Aksi</th></tr>
              </thead>
              <tbody>
                ${expPageItems.map(exp => `
                <tr>
                  <td style="font-size:11px;white-space:nowrap">${new Date(exp.date).toLocaleDateString('id-ID')}</td>
                  <td><span class="badge badge--blue">${esc(exp.category || 'Lainnya')}</span></td>
                  <td>${esc(exp.note || '—')}</td>
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
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
            <div style="font-size:12px;color:var(--text-muted)">Hal ${_expensePage} dari ${expTotalPages}</div>
            <div style="display:flex;gap:6px">
              <button class="btn btn--secondary btn--sm" id="exp-prev" ${_expensePage <= 1 ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>◀ Sebelumnya</button>
              <button class="btn btn--secondary btn--sm" id="exp-next" ${_expensePage >= expTotalPages ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>Berikutnya ▶</button>
            </div>
          </div>
        `}
      </div>

      <!-- Arus Kas Harian -->
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

      <!-- Jurnal Entri with Pagination (10/page) -->
      <div class="card card--elevated" style="overflow:hidden;padding:0">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-primary)">
            📒 Jurnal Entri Akuntansi SAK EMKM (${journal.length} baris)
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <span class="badge" style="background:${isJournalBalanced ? '#dcfce7' : '#fee2e2'};color:${isJournalBalanced ? '#166534' : '#991b1b'};border:1px solid ${isJournalBalanced ? '#86efac' : '#fca5a5'};font-size:11px;font-weight:700;padding:4px 10px">
              ⚖️ Debit: ${formatRupiah(totalJournalDebit)} | Kredit: ${formatRupiah(totalJournalCredit)} (${isJournalBalanced ? 'Seimbang ✅' : 'Selisih ⚠️'})
            </span>
            <button class="btn btn--secondary btn--sm" id="btn-export-journal-csv" style="font-size:11px;font-weight:700">
              📊 Export Jurnal (CSV)
            </button>
          </div>
        </div>
        <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
          <table class="data-table">
            <thead>
              <tr><th>Tanggal</th><th>Keterangan</th><th>Debit (Rp)</th><th>Kredit (Rp)</th><th>Bagan Akun (COA SAK EMKM)</th></tr>
            </thead>
            <tbody>
              ${journalPageItems.map(j => `
              <tr>
                <td style="font-size:11px;white-space:nowrap">${new Date(j.date).toLocaleDateString('id-ID')}</td>
                <td style="font-size:12px">${esc(j.desc)}</td>
                <td style="color:#16a34a;font-weight:700">${j.debit > 0 ? formatRupiah(j.debit) : '—'}</td>
                <td style="color:#dc2626;font-weight:700">${j.credit > 0 ? formatRupiah(j.credit) : '—'}</td>
                <td><span class="badge ${j.type === 'kas' ? 'badge--green' : j.type === 'piutang' ? '' : 'badge--blue'}"
                  style="${j.type === 'piutang' ? 'background:#fef3c7;color:#92400e' : ''}">${esc(j.account)}</span></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
          <div style="font-size:12px;color:var(--text-muted)">Hal ${_journalPage} dari ${journalTotalPages}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn--secondary btn--sm" id="journal-prev" ${_journalPage <= 1 ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>◀ Sebelumnya</button>
            <button class="btn btn--secondary btn--sm" id="journal-next" ${_journalPage >= journalTotalPages ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>Berikutnya ▶</button>
          </div>
        </div>
      </div>
    `;

    bindFinanceEvents(txs);
  } finally {
    _rendering = false;
  }
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

  const result = [];
  for (let i = 29; i >= 0; i--) {
    const d   = new Date();
    d.setDate(d.getDate() - i);
    const key = todayKey(d);
    result.push({ key, ...(map[key] || { masuk: 0, keluar: 0 }) });
  }
  return result;
};

const renderDailyTable = (days, modalAwal) => {
  let cumulative = modalAwal;
  const rows = days.filter(d => d.masuk > 0 || d.keluar > 0).map(d => {
    const net = d.masuk - d.keluar;
    cumulative += net;
    return `
    <tr>
      <td style="font-size:12px;white-space:nowrap">${new Date(d.key).toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit', month: 'short' })}</td>
      <td style="color:#16a34a;font-weight:700">${d.masuk > 0 ? formatRupiah(d.masuk) : '—'}</td>
      <td style="color:#dc2626;font-weight:700">${d.keluar > 0 ? formatRupiah(d.keluar) : '—'}</td>
      <td style="font-weight:800;color:${net >= 0 ? '#16a34a' : '#dc2626'}">${net >= 0 ? '+' : ''}${formatRupiah(net)}</td>
      <td style="font-weight:800;color:var(--blue-700)">${formatRupiah(cumulative)}</td>
    </tr>`;
  });
  return rows.length
    ? rows.join('')
    : `<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted)">Tidak ada transaksi 30 hari terakhir</td></tr>`;
};

const buildJournal = (txs, expenses) => {
  const entries = [];

  for (const tx of txs) {
    const cust = esc(tx.customerName || 'Pelanggan');

    if (tx.paymentMethod === 'cash') {
      entries.push({
        date: tx.date,
        desc: `Penjualan Tunai — ${tx.invoiceNo} (${cust})`,
        debit: tx.total,
        credit: tx.total,
        account: '[1001] Kas Toko / [4001] Pendapatan Penjualan',
        type: 'kas',
      });
    } else if (tx.paymentMethod === 'transfer') {
      if (tx.paymentStatus === 'transfer_confirmed') {
        entries.push({
          date: tx.confirmedAt || tx.date,
          desc: `Transfer Terkonfirmasi — ${tx.invoiceNo} (${cust})`,
          debit: tx.total,
          credit: tx.total,
          account: '[1002] Bank Transfer & QRIS / [4001] Pendapatan',
          type: 'kas',
        });
      } else {
        entries.push({
          date: tx.date,
          desc: `Transfer Pending — ${tx.invoiceNo} (${cust}) [Menunggu Konfirmasi]`,
          debit: tx.total,
          credit: tx.total,
          account: '[1101] Piutang Transfer / [4001] Pendapatan',
          type: 'piutang',
        });
      }
    } else if (tx.paymentMethod === 'debt') {
      entries.push({
        date: tx.date,
        desc: `Penjualan Kredit/Tempo — ${tx.invoiceNo} (${cust}) [Total: ${formatRupiah(tx.total)}]`,
        debit: tx.total,
        credit: tx.total,
        account: '[1101] Piutang Usaha / [4001] Pendapatan',
        type: 'piutang',
      });

      const payments = tx.debtPayments || [];
      let cumulativePaid = 0;

      payments.forEach((p, idx) => {
        cumulativePaid += (p.amount || 0);
        const remaining = Math.max(0, tx.total - cumulativePaid);
        const isLunas   = remaining === 0;
        const cicilNum  = idx + 1;

        const label = isLunas
          ? `Pelunasan Piutang (#${cicilNum}/LUNAS ✅)`
          : `Cicilan Piutang #${cicilNum} (dari ${payments.length})`;

        const noteStr = p.note ? ` — ${esc(p.note)}` : '';

        entries.push({
          date: p.date,
          desc: `${label} — ${tx.invoiceNo} (${cust})${noteStr} [Bayar: ${formatRupiah(p.amount)} | Sisa: ${formatRupiah(remaining)}]`,
          debit: p.amount,
          credit: p.amount,
          account: isLunas ? '[1001] Kas Toko / [1101] Piutang (LUNAS ✅)' : '[1001] Kas Toko / [1101] Piutang Usaha',
          type: 'kas',
        });
      });
    }
  }

  for (const exp of expenses) {
    const cat = (exp.category || '').toLowerCase();
    let coaCode = '[6099] Beban Operasional';
    if (cat.includes('tutup') || cat.includes('tisu') || cat.includes('galon') || cat.includes('bahan')) {
      coaCode = '[6001] Beban Tutup & Tisu';
    } else if (cat.includes('listrik') || cat.includes('air') || cat.includes('utilitas')) {
      coaCode = '[6002] Beban Utilitas/Listrik';
    } else if (cat.includes('gaji') || cat.includes('upah')) {
      coaCode = '[6003] Beban Gaji Karyawan';
    } else if (cat.includes('bensin') || cat.includes('antar') || cat.includes('transport')) {
      coaCode = '[6004] Beban Transportasi';
    }

    entries.push({
      date: exp.date,
      desc: `Beban ${esc(exp.category || 'Operasional')} — ${esc(exp.note || 'Pengeluaran kas')}`,
      debit: exp.amount,
      credit: exp.amount,
      account: `${coaCode} / [1001] Kas Toko`,
      type: 'beban',
    });
  }

  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const bindFinanceEvents = (txs) => {
  document.getElementById('btn-refresh-finance')?.addEventListener('click', renderFinance);

  // Piutang Pagination
  document.getElementById('piutang-prev')?.addEventListener('click', () => {
    if (_piutangPage > 1) { _piutangPage--; renderFinance(); }
  });
  document.getElementById('piutang-next')?.addEventListener('click', () => {
    _piutangPage++; renderFinance();
  });

  // Expense Pagination
  document.getElementById('exp-prev')?.addEventListener('click', () => {
    if (_expensePage > 1) { _expensePage--; renderFinance(); }
  });
  document.getElementById('exp-next')?.addEventListener('click', () => {
    _expensePage++; renderFinance();
  });

  // Journal Pagination
  document.getElementById('journal-prev')?.addEventListener('click', () => {
    if (_journalPage > 1) { _journalPage--; renderFinance(); }
  });
  document.getElementById('journal-next')?.addEventListener('click', () => {
    _journalPage++; renderFinance();
  });

  // Export Journal CSV
  document.getElementById('btn-export-journal-csv')?.addEventListener('click', () => {
    const headers = ['Tanggal', 'Keterangan', 'Debit', 'Kredit', 'Bagan Akun COA'];
    const rows = journal.map(j => [
      formatDateTime(new Date(j.date)),
      j.desc || '',
      j.debit || 0,
      j.credit || 0,
      j.account || '',
    ]);
    const dateTag = todayKey();
    exportToCSV(`Jurnal-Akuntansi-${dateTag}.csv`, headers, rows);
    window.showToast?.('✅ Jurnal akuntansi berhasil diekspor ke file CSV/Excel!', 'success');
  });

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
          <input type="number" class="input" id="modal-awal-input" value="${current || ''}" placeholder="0" min="0" max="999999999999" step="10000" inputmode="numeric">
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
            ${cats.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('')}
          </select>
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label">📝 Keterangan</label>
          <input type="text" class="input" id="exp-note" placeholder="Keterangan singkat" maxlength="100">
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label">💵 Jumlah (Rp)</label>
          <input type="number" class="input" id="exp-amount" placeholder="0" min="1" max="999999999" step="1000" inputmode="numeric">
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
        const now = new Date().toISOString();
        const exp = { date: now, dateKey: now.split('T')[0], category, note, amount };
        try {
          const id = await saveExpense(exp);
          exp.id = id;
          store.addExpense(exp);
          closeModal('expense-modal');
          window.showToast('Pengeluaran dicatat!', 'success');
        } catch (err) {
          console.error('[expense]', err);
          window.showToast('Gagal simpan pengeluaran', 'error');
        }
      });
    }, 0);
  });

  // Expense delete
  document.getElementById('expense-table')?.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-action="delete-expense"]');
    if (!btn) return;
    if (!confirm('Hapus pengeluaran ini?')) return;
    const id = parseInt(btn.dataset.id);
    try {
      await deleteExpense(id);
      store.removeExpense(id);
      window.showToast('Pengeluaran dihapus', 'success');
    } catch (err) { console.error('[expense]', err); window.showToast('Gagal hapus', 'error'); }
  });

  // Piutang actions
  document.getElementById('piutang-table')?.addEventListener('click', async (e) => {
    const btn    = e.target.closest('[data-action]');
    if (!btn) return;
    const id     = parseInt(btn.dataset.id);
    const action = btn.dataset.action;
    const txObj  = (store.state.transactions || txs).find(t => t.id === id);
    if (!txObj) return;

    if (action === 'confirm-transfer') {
      if (!confirm(`Konfirmasi transfer ${formatRupiah(txObj.total)} dari ${esc(txObj.customerName || 'pelanggan')} sudah diterima?`)) return;
      const updated = { ...txObj, paymentStatus: 'transfer_confirmed', paidAmount: txObj.total, confirmedAt: new Date().toISOString() };
      try {
        await updateTransaction(updated);
        store.updateTransaction(id, { paymentStatus: 'transfer_confirmed', paidAmount: txObj.total, confirmedAt: updated.confirmedAt });
        window.showToast('Transfer dikonfirmasi! Kas bertambah.', 'success');
      } catch (err) { console.error('[confirm]', err); window.showToast('Gagal konfirmasi', 'error'); }
    }

    if (action === 'pay-debt') {
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
            <input type="text" class="input" id="mc-note" placeholder="Cicilan ke-..." maxlength="100">
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
          const amount      = parseFloat(document.getElementById('mc-amount')?.value) || 0;
          if (amount <= 0 || amount > remaining) { window.showToast('Jumlah tidak valid', 'warning'); return; }
          const newPaid      = (txObj.paidAmount || 0) + amount;
          const newRemaining = Math.max(0, remaining - amount);
          const newStatus    = newRemaining === 0 ? 'paid' : 'partial';

          const nextCicilNum = (txObj.debtPayments || []).length + 1;
          const defaultNote  = newRemaining === 0 ? `Pelunasan (#${nextCicilNum}/LUNAS ✅)` : `Cicilan #${nextCicilNum}`;
          const note         = document.getElementById('mc-note')?.value?.trim() || defaultNote;

          const newPayments  = [...(txObj.debtPayments || []), { date: new Date().toISOString(), amount, note }];
          const updated      = { ...txObj, paidAmount: newPaid, remainingDebt: newRemaining, paymentStatus: newStatus, debtPayments: newPayments };
          try {
            await updateTransaction(updated);
            store.updateTransaction(id, { paidAmount: newPaid, remainingDebt: newRemaining, paymentStatus: newStatus, debtPayments: newPayments });

            // Decrement customer's totalDebt in CRM customer database
            if (txObj.customerId || txObj.customerName) {
              const custs = await getAllCustomers();
              const targetCust = custs.find(c =>
                (txObj.customerId && String(c.id) === String(txObj.customerId)) ||
                (c.name || '').trim().toLowerCase() === (txObj.customerName || '').trim().toLowerCase()
              );
              if (targetCust) {
                targetCust.totalDebt = Math.max(0, (Number(targetCust.totalDebt) || 0) - amount);
                await updateCustomer(targetCust);
                const freshCusts = await getAllCustomers();
                store.setCustomers(freshCusts);
              }
            }

            closeModal('mini-cicil');
            window.showToast(newRemaining === 0 ? '🎉 Hutang LUNAS!' : `Cicilan #${nextCicilNum} (${formatRupiah(amount)}) dicatat`, 'success');
          } catch (err) { console.error('[cicil]', err); window.showToast('Gagal simpan cicilan', 'error'); }
        });
      }, 0);
    }
  });
};
