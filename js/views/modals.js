/**
 * views/modals.js — Payment modal, success overlay, shared modal utils
 */
import store                  from '../store.js';
import { formatRupiah }       from '../utils/currency.js';
import { esc }                from '../utils/sanitize.js';
import { saveTransaction }    from '../db.js';
import { getReceiptPreviewHTML, getPrintSchemeUrl, prepareReceiptForPrint } from '../printer.js';
import { buildReceiptJSON }   from '../receipt.js';
import { generateInvoiceNo }  from '../utils/invoice.js';
import { todayKey }           from '../utils/date.js';

/* ─────────────────────────────────────────
   Modal Utilities
   ───────────────────────────────────────── */
export const openModal = (html, id = 'generic-modal') => {
  closeModal(); // close any existing first
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = `overlay-${id}`;
  overlay.innerHTML = `<div class="modal" id="${id}" role="dialog" aria-modal="true">${html}</div>`;
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(id);
  });

  // Trap focus inside modal
  const focusable = overlay.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable.length) focusable[0].focus();

  return overlay;
};

export const closeModal = (id = null) => {
  const selector = id ? `#overlay-${id}` : '.modal-overlay';
  const overlays = id
    ? [document.querySelector(selector)]
    : [...document.querySelectorAll(selector)];

  overlays.forEach(overlay => {
    if (!overlay) return;
    overlay.querySelector('.modal')?.classList.add('closing');
    overlay.classList.add('closing');
    setTimeout(() => overlay.remove(), 200);
  });
};

/* ─────────────────────────────────────────
   Payment Modal
   ───────────────────────────────────────── */
export const showPaymentModal = (method = 'cash') => {
  const total    = store.total;
  const subtotal = store.subtotal;
  const discount = store.state.discount;
  const tax      = store.tax;
  const s        = store.state.settings;

  const bankName   = esc(s.bankName   || 'BCA');
  const bankNumber = esc(s.bankNumber || '—');
  const bankHolder = esc(s.bankHolder || s.shopName || 'Blue Mountain');

  const html = `
    <div class="modal-header">
      <span class="modal-title">💳 Pembayaran</span>
      <button class="modal-close" id="pay-close-btn" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">

      <div class="payment-modal-total">
        <div class="label">Total Pembayaran</div>
        <div class="amount">${formatRupiah(total)}</div>
        ${discount > 0 ? `<div style="font-size:12px;color:var(--color-success);margin-top:4px;font-weight:600">Diskon: -${formatRupiah(discount)}</div>` : ''}
        ${tax > 0 ? `<div style="font-size:12px;color:var(--color-warning);font-weight:600">Pajak: ${formatRupiah(tax)}</div>` : ''}
      </div>

      <div class="payment-method-tabs">
        <button class="pay-tab ${method === 'cash' ? 'active' : ''}" data-method="cash">
          <span class="pay-tab__icon">💵</span>Tunai
        </button>
        <button class="pay-tab ${method === 'transfer' ? 'active' : ''}" data-method="transfer">
          <span class="pay-tab__icon">📲</span>Transfer
        </button>
        <button class="pay-tab ${method === 'debt' ? 'active' : ''}" data-method="debt"
          style="background:${method === 'debt' ? '#fef3c7' : 'var(--color-warning-bg,#fef9c3)'};border-color:#d97706">
          <span class="pay-tab__icon">📋</span>Bayar Nanti
        </button>
      </div>

      <!-- Cash section -->
      <div id="pay-cash-section" style="${method !== 'cash' ? 'display:none' : ''}">
        <div class="input-group">
          <label class="input-label" for="cash-received">💰 Jumlah Bayar (Rp)</label>
          <input type="number" class="input" id="cash-received"
            value="${total}" min="${total}" max="999999999" step="1000"
            inputmode="numeric" pattern="[0-9]*">
        </div>
        <div class="quick-amounts" id="quick-amounts" style="margin-top:8px">
          ${generateQuickAmounts(total).map(a =>
            `<button class="quick-amt-btn" data-amount="${a}">${formatRupiah(a)}</button>`
          ).join('')}
        </div>
        <div class="change-row" id="change-row" style="margin-top:8px">
          <span class="label">💰 Kembalian</span>
          <span class="value" id="change-amount">${formatRupiah(0)}</span>
        </div>
      </div>

      <!-- Transfer section -->
      <div id="pay-transfer-section" style="${method !== 'transfer' ? 'display:none' : ''}">
        <div class="transfer-info">
          <div style="font-size:32px;margin-bottom:8px">📲</div>
          <div style="font-size:13px;color:var(--text-secondary)">Transfer ke rekening:</div>
          <div style="font-size:18px;font-weight:800;color:var(--text-primary);margin:6px 0">${bankName}: ${bankNumber}</div>
          <div style="font-size:13px;color:var(--text-secondary)">a/n ${bankHolder}</div>
          <div style="margin-top:10px;padding:8px 12px;background:white;border-radius:8px;font-size:13px;font-weight:700;color:var(--blue-700);border:1.5px solid var(--blue-200)">
            Nominal: ${formatRupiah(total)}
          </div>
          <div style="margin-top:8px;padding:8px 12px;background:#fef3c7;border-radius:8px;font-size:12px;color:#92400e;border:1.5px solid #fcd34d">
            ⚠️ Status: <strong>Menunggu Konfirmasi</strong> — kas baru tercatat setelah dikonfirmasi diterima
          </div>
        </div>
      </div>

      <!-- Bayar Nanti / Hutang section -->
      <div id="pay-debt-section" style="${method !== 'debt' ? 'display:none' : ''}">
        <div style="padding:10px 14px;background:#fef3c7;border:1.5px solid #fcd34d;border-radius:10px;font-size:12px;color:#92400e;margin-bottom:12px">
          📋 <strong>Hutang Piutang</strong> — dicatat sebagai piutang usaha. Wajib isi nama pelanggan.
        </div>
        <div class="input-group">
          <label class="input-label" for="debt-customer">👤 Nama Pelanggan <span style="color:red">*</span></label>
          <input type="text" class="input" id="debt-customer"
            placeholder="Nama wajib diisi untuk hutang"
            value="${esc(store.state.customerName || '')}"
            maxlength="80" autocomplete="off">
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label" for="debt-paid-now">💵 Bayar DP / Uang Muka Sekarang (Rp)</label>
          <input type="number" class="input" id="debt-paid-now"
            value="0" min="0" max="${total}" step="1000" inputmode="numeric">
        </div>
        <div style="margin-top:8px;padding:10px 14px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span>Total</span><strong>${formatRupiah(total)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-top:4px">
            <span>Dibayar sekarang</span><strong id="debt-paid-display">${formatRupiah(0)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:14px;margin-top:6px;border-top:1.5px dashed var(--border-subtle);padding-top:6px">
            <span style="font-weight:700;color:var(--color-danger)">Sisa Hutang</span>
            <strong id="debt-remaining-display" style="color:var(--color-danger)">${formatRupiah(total)}</strong>
          </div>
        </div>
      </div>

    </div>

    <div class="modal-footer">
      <button class="btn btn--secondary" id="pay-cancel-btn">Batal</button>
      <button class="btn btn--success btn--lg" id="pay-confirm-btn">
        ✅ Proses Pembayaran
      </button>
    </div>
  `;

  openModal(html, 'payment-modal');

  setTimeout(() => {
    document.getElementById('pay-close-btn')?.addEventListener('click',  () => closeModal('payment-modal'));
    document.getElementById('pay-cancel-btn')?.addEventListener('click', () => closeModal('payment-modal'));

    // Method tab switching
    document.querySelectorAll('.pay-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const m = tab.dataset.method;
        document.getElementById('pay-cash-section').style.display     = m === 'cash'     ? '' : 'none';
        document.getElementById('pay-transfer-section').style.display = m === 'transfer' ? '' : 'none';
        document.getElementById('pay-debt-section').style.display     = m === 'debt'     ? '' : 'none';
      });
    });

    // Cash input → update change
    const cashInput   = document.getElementById('cash-received');
    const updateChange = () => {
      const received = parseFloat(cashInput?.value) || 0;
      const change   = Math.max(0, received - total);
      const el = document.getElementById('change-amount');
      if (el) el.textContent = formatRupiah(change);
    };
    cashInput?.addEventListener('input', updateChange);
    updateChange();

    // Quick amounts
    document.getElementById('quick-amounts')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-amt-btn');
      if (btn && cashInput) { cashInput.value = btn.dataset.amount; updateChange(); }
    });

    // Debt input → update remaining display
    const debtPaidInput = document.getElementById('debt-paid-now');
    const updateDebt = () => {
      const paid      = Math.min(parseFloat(debtPaidInput?.value) || 0, total);
      const remaining = total - paid;
      const pd = document.getElementById('debt-paid-display');
      const rd = document.getElementById('debt-remaining-display');
      if (pd) pd.textContent = formatRupiah(paid);
      if (rd) rd.textContent = formatRupiah(remaining);
    };
    debtPaidInput?.addEventListener('input', updateDebt);

    // Confirm payment
    document.getElementById('pay-confirm-btn')?.addEventListener('click', async () => {
      const activeTab = document.querySelector('.pay-tab.active');
      const payMethod = activeTab?.dataset.method || 'cash';
      const btn       = document.getElementById('pay-confirm-btn');

      if (payMethod === 'cash') {
        const paid = parseFloat(cashInput?.value) || 0;
        if (paid < total) { window.showToast('Jumlah bayar kurang dari total!', 'warning'); return; }
      }
      if (payMethod === 'debt') {
        const custName = document.getElementById('debt-customer')?.value?.trim();
        if (!custName) { window.showToast('Nama pelanggan wajib diisi untuk hutang!', 'warning'); return; }
      }

      if (btn) { btn.disabled = true; btn.textContent = '⏳ Menyimpan...'; }

      const now = new Date().toISOString();

      let txData;
      if (payMethod === 'cash') {
        const paid   = parseFloat(cashInput?.value) || total;
        const change = Math.max(0, paid - total);
        txData = {
          invoiceNo: generateInvoiceNo(), date: now, dateKey: todayKey(),
          items: store.state.cart.map(i => ({ product: { ...i.product }, qty: i.qty })),
          subtotal, discount, tax, total,
          paymentMethod: 'cash', paymentStatus: 'paid',
          paid, change,
          paidAmount: total, remainingDebt: 0, debtPayments: [],
          customerName: store.state.customerName || '',
          cashier: store.state.settings.cashierName || 'Admin',
        };
      } else if (payMethod === 'transfer') {
        txData = {
          invoiceNo: generateInvoiceNo(), date: now, dateKey: todayKey(),
          items: store.state.cart.map(i => ({ product: { ...i.product }, qty: i.qty })),
          subtotal, discount, tax, total,
          paymentMethod: 'transfer', paymentStatus: 'transfer_pending',
          paid: 0, change: 0,
          paidAmount: 0, remainingDebt: 0, debtPayments: [],
          customerName: store.state.customerName || '',
          cashier: store.state.settings.cashierName || 'Admin',
        };
      } else {
        const paidNow   = Math.min(parseFloat(document.getElementById('debt-paid-now')?.value) || 0, total);
        const remaining = total - paidNow;
        const status    = paidNow === 0 ? 'unpaid' : (paidNow < total ? 'partial' : 'paid');
        const custName  = document.getElementById('debt-customer')?.value?.trim() || '';
        txData = {
          invoiceNo: generateInvoiceNo(), date: now, dateKey: todayKey(),
          items: store.state.cart.map(i => ({ product: { ...i.product }, qty: i.qty })),
          subtotal, discount, tax, total,
          paymentMethod: 'debt', paymentStatus: status,
          paid: paidNow, change: 0,
          paidAmount: paidNow, remainingDebt: remaining,
          debtPayments: paidNow > 0 ? [{ date: now, amount: paidNow, note: 'DP / Uang muka awal' }] : [],
          customerName: custName,
          cashier: store.state.settings.cashierName || 'Admin',
        };
      }

      try {
        const saved = await saveTransaction(txData);
        txData.id = saved;
        store.addTransaction(txData);
        closeModal('payment-modal');
        store.clearCart();
        showSuccessOverlay(txData);
      } catch (err) {
        window.showToast('Gagal menyimpan transaksi!', 'error');
        console.error('[payment]', err);
        if (btn) { btn.disabled = false; btn.innerHTML = '✅ Proses Pembayaran'; }
      }
    });
  }, 0);
};

/* ─────────────────────────────────────────
   Quick Amount Helper
   ───────────────────────────────────────── */
const generateQuickAmounts = (total) => {
  const round      = (n) => Math.ceil(n / 5000) * 5000;
  const base       = round(total);
  const candidates = [base, base + 5000, base + 10000, base + 20000, base + 50000, base + 100000];
  return [...new Set(candidates.filter(a => a >= total))].slice(0, 4);
};

/* ─────────────────────────────────────────
   Success Overlay
   ───────────────────────────────────────── */
const showSuccessOverlay = (txData) => {
  const json = buildReceiptJSON(txData, store.state.settings);
  sessionStorage.setItem('pendingReceipt', JSON.stringify(json));

  const canPrint    = store.state.settings.printEnabled;
  const printUrl    = getPrintSchemeUrl(txData);
  const receiptHTML = getReceiptPreviewHTML(txData);

  const overlay = document.createElement('div');
  overlay.className = 'success-overlay';
  overlay.id = 'success-overlay';

  overlay.innerHTML = `
    <button class="modal-close" id="success-close-btn" aria-label="Tutup"
      style="position:absolute;top:20px;right:20px;width:38px;height:38px;font-size:20px;box-shadow:var(--shadow-md);z-index:10">✕</button>
    <div class="success-checkmark">✅</div>
    <div class="success-text">
      <h2>Transaksi Berhasil!</h2>
      <p>${esc(txData.invoiceNo)} &bull; ${formatRupiah(txData.total)}</p>
      ${txData.change > 0
        ? `<p style="color:var(--color-success);font-weight:800;margin-top:6px;font-size:18px">Kembalian: ${formatRupiah(txData.change)}</p>`
        : ''}
      ${txData.paymentMethod === 'transfer'
        ? `<p style="color:#d97706;font-size:13px;margin-top:4px">⏳ Transfer menunggu konfirmasi</p>`
        : ''}
      ${txData.remainingDebt > 0
        ? `<p style="color:var(--color-danger);font-size:13px;margin-top:4px">📋 Sisa hutang: ${formatRupiah(txData.remainingDebt)}</p>`
        : ''}
    </div>
    <div class="success-actions">
      ${canPrint
        ? `<a class="print-btn" href="${printUrl}" id="btn-print-receipt">🖨️ Cetak Struk</a>`
        : ''}
      <button class="btn btn--primary" id="btn-new-tx">🔄 Transaksi Baru</button>
      <button class="btn btn--secondary" id="btn-close-overlay">✕ Tutup</button>
    </div>
    <details style="margin-top:12px;max-width:340px;width:100%">
      <summary style="cursor:pointer;font-size:12px;color:var(--text-secondary);text-align:center;margin-bottom:8px;font-weight:600">
        📄 Preview Struk
      </summary>
      <div class="receipt-preview">${receiptHTML}</div>
    </details>
  `;

  document.body.appendChild(overlay);

  const closeOverlay = () => {
    overlay.classList.add('closing');
    setTimeout(() => overlay.remove(), 180);
  };

  document.getElementById('success-close-btn')?.addEventListener('click', closeOverlay);
  document.getElementById('btn-close-overlay')?.addEventListener('click', closeOverlay);

  document.getElementById('btn-new-tx')?.addEventListener('click', () => {
    closeOverlay();
    window.showToast('Siap transaksi baru! 👍', 'success');
  });

  setTimeout(() => { if (overlay.parentNode) closeOverlay(); }, 15000);
};
