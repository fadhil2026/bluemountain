/**
 * views/transactions.js — Full CRUD + Realtime + Hutang/Piutang + Transfer Konfirmasi
 * FIX: todayKas now uses paidAmount for debt transactions, not total
 */
import { getAllTransactions, deleteTransaction, updateTransaction } from '../db.js';
import { formatRupiah }          from '../utils/currency.js';
import { formatDateTime }        from '../utils/date.js';
import { esc }                   from '../utils/sanitize.js';
import { openModal, closeModal } from './modals.js';
import { getReceiptPreviewHTML, getPrintSchemeUrl, printThermalDirect } from '../printer.js';
import { buildReceiptJSON }      from '../receipt.js';
import store                     from '../store.js';

let _unsubscribe = null;

export const initTransactions = async () => {
  if (_unsubscribe) _unsubscribe();
  _unsubscribe = store.on('transactions:change', (txs) => {
    renderTransactionsUI(txs);
  });

  await renderTransactions();
};

export const renderTransactions = async () => {
  const txs = await getAllTransactions();
  store.setTransactions(txs);
  renderTransactionsUI(txs);
};

/* ── Status Helpers ── */
const statusBadge = (tx) => {
  const pm = tx.paymentMethod;
  const ps = tx.paymentStatus;
  if (pm === 'transfer' && ps === 'transfer_pending')
    return `<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">⏳ Pending</span>`;
  if (pm === 'transfer' && ps === 'transfer_confirmed')
    return `<span class="badge badge--green">✅ Confirmed</span>`;
  if (ps === 'unpaid')
    return `<span class="badge" style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5">🔴 Belum Lunas</span>`;
  if (ps === 'partial')
    return `<span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">🟡 Cicilan</span>`;
  return `<span class="badge badge--green">✅ Lunas</span>`;
};

const methodLabel = (tx) => {
  if (tx.paymentMethod === 'cash')     return '💵 Tunai';
  if (tx.paymentMethod === 'transfer') return '📲 Transfer';
  if (tx.paymentMethod === 'debt')     return '📋 Hutang';
  return esc(tx.paymentMethod) || '—';
};

const canDelete = (tx) =>
  !(tx.paymentMethod === 'debt' && (tx.remainingDebt || 0) > 0);

/* ── Render ── */
const renderTransactionsUI = (allTxs) => {
  const view = document.getElementById('view-transactions');
  if (!view) return;

  const sorted = [...allTxs].sort((a, b) => new Date(b.date) - new Date(a.date));
  const today  = new Date().toISOString().split('T')[0];

  const todayTxs = allTxs.filter(t => t.dateKey === today);

  // FIX: kas hari ini pakai paidAmount untuk debt, total untuk paid/confirmed
  const todayKas = todayTxs.reduce((s, t) => {
    if (t.paymentStatus === 'paid' && t.paymentMethod === 'cash') return s + t.total;
    if (t.paymentStatus === 'transfer_confirmed') return s + t.total;
    if (t.paymentMethod === 'debt') return s + (t.paidAmount || 0); // hanya cicilan yang masuk
    return s;
  }, 0);

  const totalPiutang    = allTxs.reduce((s, t) => s + (t.remainingDebt || 0), 0);
  const pendingTransfer = allTxs
    .filter(t => t.paymentStatus === 'transfer_pending')
    .reduce((s, t) => s + t.total, 0);

  view.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">Riwayat Transaksi <span>${allTxs.length} transaksi</span></h2>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <input type="date" class="input" id="tx-filter-date" style="width:auto" value="${today}">
        <button class="btn btn--secondary btn--sm" id="tx-clear-filter">Tampil Semua</button>
      </div>
    </div>

    <!-- Summary strip -->
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px">
      <div style="padding:10px 16px;background:white;border:1.5px solid var(--border-subtle);border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Kas Hari Ini</div>
        <div style="font-size:15px;font-weight:800;color:#16a34a">${formatRupiah(todayKas)}</div>
      </div>
      <div style="padding:10px 16px;background:white;border:1.5px solid var(--border-subtle);border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total Piutang</div>
        <div style="font-size:15px;font-weight:800;color:#dc2626">${formatRupiah(totalPiutang)}</div>
      </div>
      ${pendingTransfer > 0 ? `
      <div style="padding:10px 16px;background:#fef9c3;border:1.5px solid #fcd34d;border-radius:12px;box-shadow:var(--shadow-xs);min-width:130px">
        <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase;letter-spacing:.05em">Transfer Pending</div>
        <div style="font-size:15px;font-weight:800;color:#92400e">${formatRupiah(pendingTransfer)}</div>
      </div>` : ''}
    </div>

    ${sorted.length === 0 ? `
      <div class="card" style="padding:40px">
        <div class="empty-state">
          <div class="empty-state__icon">📋</div>
          <div class="empty-state__text">Belum ada transaksi.<br>Mulai jual dari menu Kasir POS.</div>
        </div>
      </div>
    ` : `
      <div class="card card--elevated" style="overflow:hidden;padding:0">
        <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
          <table class="data-table" id="tx-table">
            <thead>
              <tr>
                <th>No. Invoice</th>
                <th>Tanggal</th>
                <th>Pelanggan</th>
                <th>Item</th>
                <th>Total</th>
                <th>Metode</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody id="tx-tbody">
              ${renderTxRows(sorted)}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `;

  bindTxEvents(allTxs, sorted);
};

const renderTxRows = (txs) => {
  if (!txs.length) {
    return `<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:32px;font-size:13px">Tidak ada transaksi untuk filter ini</td></tr>`;
  }
  return txs.map(tx => `
    <tr>
      <td><span style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${esc(tx.invoiceNo || '-')}</span></td>
      <td style="font-size:11px;white-space:nowrap">${formatDateTime(new Date(tx.date))}</td>
      <td style="max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(tx.customerName) || '<span style="color:var(--text-muted)">—</span>'}</td>
      <td><span class="badge badge--blue">${tx.items?.length || 0} item</span></td>
      <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">
        ${formatRupiah(tx.total)}
        ${(tx.remainingDebt || 0) > 0 ? `<div style="font-size:10px;color:#dc2626;font-weight:600">Sisa: ${formatRupiah(tx.remainingDebt)}</div>` : ''}
      </td>
      <td><span class="badge badge--blue">${methodLabel(tx)}</span></td>
      <td>${statusBadge(tx)}</td>
      <td>
        <div style="display:flex;gap:4px;flex-wrap:wrap;min-width:120px">
          <button class="btn btn--secondary btn--sm" data-action="detail" data-id="${tx.id}" style="font-size:11px;padding:4px 8px">
            👁️
          </button>
          ${tx.paymentStatus === 'transfer_pending' ? `
          <button class="btn btn--sm" data-action="confirm-transfer" data-id="${tx.id}"
            style="background:#d1fae5;border:1.5px solid #6ee7b7;color:#065f46;border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer">
            ✅ Konfirmasi
          </button>` : ''}
          ${(tx.paymentMethod === 'debt' || tx.paymentStatus === 'partial' || tx.paymentStatus === 'unpaid') && (tx.remainingDebt || 0) > 0 ? `
          <button class="btn btn--sm" data-action="pay-debt" data-id="${tx.id}"
            style="background:#dbeafe;border:1.5px solid #93c5fd;color:#1e40af;border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer">
            💰 Cicil
          </button>` : ''}
          <button class="btn btn--sm" data-action="delete" data-id="${tx.id}"
            ${!canDelete(tx) ? 'disabled title="Tidak bisa hapus transaksi yang belum lunas"' : ''}
            style="background:${canDelete(tx) ? 'var(--color-danger-bg)' : '#f3f4f6'};border:1.5px solid ${canDelete(tx) ? 'var(--color-danger-border)' : '#d1d5db'};color:${canDelete(tx) ? 'var(--color-danger)' : '#9ca3af'};border-radius:var(--radius-md);padding:4px 8px;font-size:11px;font-weight:700;cursor:${canDelete(tx) ? 'pointer' : 'not-allowed'}">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `).join('');
};

const bindTxEvents = (allTxs, sortedAll) => {
  document.getElementById('tx-filter-date')?.addEventListener('change', (e) => {
    const key      = e.target.value;
    const filtered = key
      ? [...allTxs].filter(tx => tx.dateKey === key).sort((a, b) => new Date(b.date) - new Date(a.date))
      : sortedAll;
    const tbody = document.getElementById('tx-tbody');
    if (tbody) tbody.innerHTML = renderTxRows(filtered);
  });

  document.getElementById('tx-clear-filter')?.addEventListener('click', () => {
    const tbody     = document.getElementById('tx-tbody');
    const dateInput = document.getElementById('tx-filter-date');
    if (tbody) tbody.innerHTML = renderTxRows(sortedAll);
    if (dateInput) dateInput.value = '';
  });

  document.getElementById('tx-table')?.addEventListener('click', async (e) => {
    const btn    = e.target.closest('[data-action]');
    if (!btn) return;
    const id     = parseInt(btn.dataset.id);
    const action = btn.dataset.action;
    const txObj  = allTxs.find(t => t.id === id);

    if (action === 'detail') {
      if (txObj) showTxDetail(txObj);
      return;
    }

    if (action === 'confirm-transfer') {
      if (!txObj) return;
      if (!confirm(`Konfirmasi transfer ${formatRupiah(txObj.total)} dari ${esc(txObj.customerName || 'pelanggan')} sudah diterima?`)) return;
      try {
        const updated = { ...txObj, paymentStatus: 'transfer_confirmed', paidAmount: txObj.total, confirmedAt: new Date().toISOString() };
        await updateTransaction(updated);
        store.updateTransaction(id, { paymentStatus: 'transfer_confirmed', paidAmount: txObj.total, confirmedAt: updated.confirmedAt });
        window.showToast('Transfer dikonfirmasi! Kas bertambah.', 'success');
      } catch (err) { console.error('[tx]', err); window.showToast('Gagal konfirmasi', 'error'); }
      return;
    }

    if (action === 'pay-debt') {
      if (txObj) showPayDebtModal(txObj);
      return;
    }

    if (action === 'delete') {
      if (!txObj) return;
      if (!canDelete(txObj)) {
        window.showToast('Tidak bisa hapus transaksi yang masih ada sisa hutang!', 'error');
        return;
      }
      if (!confirm(`Hapus transaksi ${esc(txObj.invoiceNo)}? Tindakan tidak bisa dibatalkan.`)) return;
      try {
        await deleteTransaction(id);
        store.removeTransaction(id);
        window.showToast('Transaksi dihapus', 'success');
      } catch (err) { console.error('[tx]', err); window.showToast('Gagal menghapus', 'error'); }
    }
  });
};

/* ── Cicil Hutang Modal ── */
const showPayDebtModal = (tx) => {
  const remaining = tx.remainingDebt || 0;
  const html = `
    <div class="modal-header">
      <span class="modal-title">💰 Catat Cicilan Hutang</span>
      <button class="modal-close" id="debt-x">✕</button>
    </div>
    <div class="modal-body">
      <div style="padding:12px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle);margin-bottom:14px">
        <div style="font-size:12px;color:var(--text-muted)">Invoice</div>
        <div style="font-weight:800;font-family:monospace;color:var(--blue-700)">${esc(tx.invoiceNo)}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:6px">Pelanggan</div>
        <div style="font-weight:700">${esc(tx.customerName || '—')}</div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
        <div style="padding:10px;background:#fee2e2;border-radius:10px;text-align:center">
          <div style="font-size:10px;color:#991b1b;font-weight:700;text-transform:uppercase">Total Tagihan</div>
          <div style="font-size:16px;font-weight:900;color:#dc2626">${formatRupiah(tx.total)}</div>
        </div>
        <div style="padding:10px;background:#fef3c7;border-radius:10px;text-align:center">
          <div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase">Sisa Hutang</div>
          <div style="font-size:16px;font-weight:900;color:#d97706">${formatRupiah(remaining)}</div>
        </div>
      </div>

      ${tx.debtPayments?.length ? `
      <div style="margin-bottom:14px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);margin-bottom:8px">Riwayat Pembayaran</div>
        ${tx.debtPayments.map(p => `
          <div style="display:flex;justify-content:space-between;padding:6px 10px;background:var(--bg-elevated);border-radius:8px;margin-bottom:4px;font-size:12px">
            <span>${new Date(p.date).toLocaleDateString('id-ID')} — ${esc(p.note || '-')}</span>
            <strong style="color:#16a34a">+${formatRupiah(p.amount)}</strong>
          </div>
        `).join('')}
      </div>` : ''}

      <div class="input-group">
        <label class="input-label" for="cicil-amount">💵 Jumlah Cicilan (maks. ${formatRupiah(remaining)})</label>
        <input type="number" class="input" id="cicil-amount"
          value="${remaining}" min="1" max="${remaining}" step="1000" inputmode="numeric">
      </div>
      <div class="input-group" style="margin-top:10px">
        <label class="input-label" for="cicil-note">📝 Catatan (opsional)</label>
        <input type="text" class="input" id="cicil-note"
          placeholder="Cicilan ke-2, dll" maxlength="100">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn--secondary" id="debt-cancel">Batal</button>
      <button class="btn btn--success" id="debt-save">💾 Simpan Cicilan</button>
    </div>
  `;

  openModal(html, 'debt-modal');
  setTimeout(() => {
    document.getElementById('debt-x')?.addEventListener('click',      () => closeModal('debt-modal'));
    document.getElementById('debt-cancel')?.addEventListener('click', () => closeModal('debt-modal'));
    document.getElementById('debt-save')?.addEventListener('click',   async () => {
      const amount = parseFloat(document.getElementById('cicil-amount')?.value) || 0;
      if (amount <= 0 || amount > remaining) {
        window.showToast(`Jumlah cicilan harus antara 1 dan ${formatRupiah(remaining)}`, 'warning');
        return;
      }
      const newPaid      = (tx.paidAmount || 0) + amount;
      const newRemaining = Math.max(0, remaining - amount);
      const newStatus    = newRemaining === 0 ? 'paid' : 'partial';

      const nextCicilNum = (tx.debtPayments || []).length + 1;
      const defaultNote  = newRemaining === 0 ? `Pelunasan (#${nextCicilNum}/LUNAS ✅)` : `Cicilan #${nextCicilNum}`;
      const note         = document.getElementById('cicil-note')?.value?.trim() || defaultNote;

      const newPayments  = [...(tx.debtPayments || []), { date: new Date().toISOString(), amount, note }];

      const updated = { ...tx, paidAmount: newPaid, remainingDebt: newRemaining, paymentStatus: newStatus, debtPayments: newPayments };
      try {
        await updateTransaction(updated);
        store.updateTransaction(tx.id, { paidAmount: newPaid, remainingDebt: newRemaining, paymentStatus: newStatus, debtPayments: newPayments });
        closeModal('debt-modal');
        window.showToast(newRemaining === 0 ? '🎉 Hutang LUNAS!' : `Cicilan ${formatRupiah(amount)} dicatat`, 'success');
      } catch (err) { console.error('[debt]', err); window.showToast('Gagal simpan cicilan', 'error'); }
    });
  }, 0);
};

/* ── Detail Modal ── */
const showTxDetail = (tx) => {
  const json     = buildReceiptJSON(tx, store.state.settings);
  sessionStorage.setItem('pendingReceipt', JSON.stringify(json));
  const printUrl = getPrintSchemeUrl(tx);
  const canPrint = store.state.settings.printEnabled;

  const html = `
    <div class="modal-header">
      <span class="modal-title">📄 Detail Transaksi</span>
      <button class="modal-close" id="td-x" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Invoice</div>
          <div style="font-weight:800;color:var(--blue-700);font-family:monospace;font-size:13px;margin-top:2px">${esc(tx.invoiceNo)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Status</div>
          <div style="margin-top:4px">${statusBadge(tx)}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Pelanggan</div>
          <div style="font-weight:600;margin-top:2px">${esc(tx.customerName || '—')}</div>
        </div>
        <div style="background:var(--bg-elevated);padding:10px 12px;border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Metode</div>
          <div style="font-weight:600;margin-top:2px">${methodLabel(tx)}</div>
        </div>
      </div>

      <div class="receipt-preview" id="receipt-capture">${getReceiptPreviewHTML(tx)}</div>

      ${(tx.remainingDebt || 0) > 0 ? `
      <div style="padding:12px;background:#fee2e2;border:1.5px solid #fca5a5;border-radius:10px;text-align:center">
        <div style="font-size:12px;color:#991b1b;font-weight:700">⚠️ Sisa Hutang</div>
        <div style="font-size:20px;font-weight:900;color:#dc2626">${formatRupiah(tx.remainingDebt)}</div>
      </div>` : ''}

      <div style="display:grid;grid-template-columns:${tx.change > 0 ? '1fr 1fr' : '1fr'};gap:10px">
        <div style="padding:14px;background:var(--blue-50);border:2px solid var(--blue-200);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Total</div>
          <div style="font-size:20px;font-weight:900;color:var(--blue-700)">${formatRupiah(tx.total)}</div>
        </div>
        ${tx.change > 0 ? `
        <div style="padding:14px;background:var(--color-success-bg);border:2px solid var(--color-success-border);border-radius:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Kembalian</div>
          <div style="font-size:20px;font-weight:900;color:var(--color-success)">${formatRupiah(tx.change)}</div>
        </div>` : ''}
      </div>
    </div>

    <div class="modal-footer" style="flex-wrap:wrap;gap:8px;justify-content:flex-end">
      <button class="btn btn--secondary" id="td-close-btn">✕ Tutup</button>
      <button class="btn btn--secondary" id="btn-save-png">🖼️ PNG / Share</button>
      <a class="btn btn--secondary" href="${printUrl}" style="text-decoration:none;font-size:12px;display:flex;align-items:center;gap:4px">
        📲 Bluetooth App
      </a>
      <button class="btn btn--success" id="btn-tx-print-direct" style="font-weight:700">
        🖨️ Cetak Struk (58mm)
      </button>
    </div>
  `;

  openModal(html, 'tx-detail');

  setTimeout(() => {
    document.getElementById('td-x')?.addEventListener('click',        () => closeModal('tx-detail'));
    document.getElementById('td-close-btn')?.addEventListener('click', () => closeModal('tx-detail'));

    // Direct 58mm Thermal Print
    document.getElementById('btn-tx-print-direct')?.addEventListener('click', () => {
      printThermalDirect(tx);
    });

    // PNG export via npm html2canvas
    document.getElementById('btn-save-png')?.addEventListener('click', async () => {
      const btn = document.getElementById('btn-save-png');
      btn.textContent = '⏳...'; btn.disabled = true;
      try {
        const { default: html2canvas } = await import('html2canvas');
        const el     = document.getElementById('receipt-capture');
        const canvas = await html2canvas(el, { backgroundColor: '#fff', scale: 2, useCORS: true, logging: false });
        const blob   = await new Promise(r => canvas.toBlob(r, 'image/png'));
        const fname  = `Struk-${tx.invoiceNo || tx.id}.png`;
        if (navigator.canShare?.({ files: [new File([blob], fname, { type: 'image/png' })] })) {
          await navigator.share({ title: `Struk ${tx.invoiceNo}`, files: [new File([blob], fname, { type: 'image/png' })] });
        } else {
          const url = URL.createObjectURL(blob);
          Object.assign(document.createElement('a'), { href: url, download: fname }).click();
          setTimeout(() => URL.revokeObjectURL(url), 2000);
          window.showToast('PNG tersimpan!', 'success');
        }
      } catch (err) { console.error('[png]', err); window.showToast('Gagal buat PNG', 'error'); }
      finally { btn.textContent = '🖼️ PNG / Share'; btn.disabled = false; }
    });
  }, 0);
};
