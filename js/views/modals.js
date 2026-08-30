/**
 * views/modals.js — Payment modal, success overlay, shared modal utils
 */
import store                  from '../store.js';
import { formatRupiah }       from '../utils/currency.js';
import { esc }                from '../utils/sanitize.js';
import { saveTransaction }    from '../db.js';
import { getReceiptPreviewHTML, getPrintSchemeUrl, printThermalDirect } from '../printer.js';
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

  const focusable = overlay.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable.length) focusable[0].focus();

  return overlay;
};

export const closeModal = (id = null) => {
  const selector = id ? `#overlay-${id}` : '.modal-overlay';
  const overlays = id
    ? [document.querySelector(selector)].filter(Boolean)
    : [...document.querySelectorAll('.modal-overlay')];

  overlays.forEach(overlay => {
    if (!overlay) return;
    overlay.querySelector('.modal')?.classList.add('closing');
    overlay.classList.add('closing');
    setTimeout(() => overlay.remove(), 180);
  });
};

/* ─────────────────────────────────────────
   Quick Amount Helper
   ───────────────────────────────────────── */
const generateQuickAmounts = (total) => {
  const round = (n) => Math.ceil(n / 5000) * 5000;
  const base  = round(total);
  const candidates = [base, base + 5000, base + 10000, base + 20000, base + 50000, base + 100000];
  return [...new Set(candidates.filter(a => a >= total))].slice(0, 4);
};

/* ─────────────────────────────────────────
   Payment Modal
   ───────────────────────────────────────── */
export const showPaymentModal = (method = 'cash') => {
  const total    = store.total;
  const subtotal = store.subtotal;
  const discount = store.state.discount || 0;
  const tax      = store.tax;
  const s        = store.state.settings || {};

  const bankName   = esc(s.bankName   || 'BCA');
  const bankNumber = esc(s.bankNumber || '—');
  const bankHolder = esc(s.bankHolder || s.shopName || 'Blue Mountain');

  const html = `
    <div class="modal-header">
      <span class="modal-title">💳 Pembayaran Transaksi</span>
      <button class="modal-close" id="pay-close-btn" aria-label="Tutup">✕</button>
    </div>
    <div class="modal-body">

      <div class="payment-modal-total">
        <div class="label">Total Tagihan</div>
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
          <span class="pay-tab__icon">📋</span>Hutang / Cicil
        </button>
      </div>

      <!-- Cash Section -->
      <div id="pay-cash-section" style="${method !== 'cash' ? 'display:none' : ''}">
        <div class="input-group">
          <label class="input-label" for="cash-received">💰 Jumlah Uang Diterima (Rp)</label>
          <input type="number" class="input" id="cash-received"
            value="${total}" min="${total}" max="999999999" step="1000"
            inputmode="numeric" placeholder="${total}">
        </div>
        <div class="quick-amounts" id="quick-amounts" style="margin-top:8px">
          ${generateQuickAmounts(total).map(a =>
            `<button class="quick-amt-btn" data-amount="${a}">${formatRupiah(a)}</button>`
          ).join('')}
        </div>
        <div class="change-row" id="change-row" style="margin-top:8px;padding:10px 14px;background:var(--color-success-bg);border:1.5px solid var(--color-success-border);border-radius:10px;display:flex;justify-content:space-between;align-items:center">
          <span class="label" style="font-weight:700;color:var(--color-success)">💰 Kembalian</span>
          <span class="value" id="change-amount" style="font-size:18px;font-weight:900;color:var(--color-success)">${formatRupiah(0)}</span>
        </div>
      </div>

      <!-- Transfer Section -->
      <div id="pay-transfer-section" style="${method !== 'transfer' ? 'display:none' : ''}">
        <div class="transfer-info" style="text-align:center;padding:12px;background:var(--bg-elevated);border-radius:12px;border:1px solid var(--border-subtle)">
          <div style="font-size:32px;margin-bottom:4px">📲</div>
          <div style="font-size:13px;color:var(--text-secondary)">Silakan transfer nominal berikut:</div>
          <div style="font-size:22px;font-weight:900;color:var(--blue-600);margin:6px 0">${formatRupiah(total)}</div>
          <div style="margin-top:8px;padding:10px;background:#fff;border-radius:8px;border:1.5px dashed var(--blue-300);text-align:left">
            <div style="font-size:12px;color:var(--text-secondary)">Bank: <strong>${bankName}</strong></div>
            <div style="font-size:14px;font-weight:800;color:var(--text-primary);margin:2px 0">
              No. Rek: <span id="trans-acc-num">${bankNumber}</span>
            </div>
            <div style="font-size:12px;color:var(--text-secondary)">Atas Nama: <strong>${bankHolder}</strong></div>
          </div>
        </div>
      </div>

      <!-- Hutang / Cicil Section -->
      <div id="pay-debt-section" style="${method !== 'debt' ? 'display:none' : ''}">
        <div style="padding:10px 14px;background:#fef3c7;border:1.5px solid #fcd34d;border-radius:10px;font-size:12px;color:#92400e;margin-bottom:12px">
          📋 <strong>Pencatatan Piutang Usaha</strong> — Wajib masukkan nama pelanggan.
        </div>
        <div class="input-group">
          <label class="input-label" for="debt-customer">👤 Nama Pelanggan <span style="color:red">*</span></label>
          <input type="text" class="input" id="debt-customer"
            placeholder="Ketik nama pelanggan"
            value="${esc(store.state.customerName || '')}"
            maxlength="80" autocomplete="off">
        </div>
        <div class="input-group" style="margin-top:10px">
          <label class="input-label" for="debt-paid-now">💵 Bayar DP / Uang Muka Sekarang (Rp)</label>
          <input type="number" class="input" id="debt-paid-now"
            placeholder="0" min="0" max="${total}" step="1000" inputmode="numeric">
        </div>
        <div style="margin-top:8px;padding:10px 14px;background:var(--bg-elevated);border-radius:10px;border:1.5px solid var(--border-subtle)">
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span>Total Tagihan</span><strong>${formatRupiah(total)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-top:4px">
            <span>DP Dibayar Sekarang</span><strong id="debt-paid-display" style="color:var(--color-success)">${formatRupiah(0)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:14px;margin-top:6px;border-top:1.5px dashed var(--border-subtle);padding-top:6px">
            <span style="font-weight:700;color:var(--color-danger)">Sisa Hutang Berjalan</span>
            <strong id="debt-remaining-display" style="color:var(--color-danger);font-size:16px">${formatRupiah(total)}</strong>
          </div>
        </div>
      </div>

    </div>

    <div class="modal-footer">
      <button class="btn btn--secondary" id="pay-cancel-btn">Batal</button>
      <button class="btn btn--success btn--lg" id="pay-confirm-btn" style="font-weight:700;box-shadow:0 4px 12px rgba(16,185,129,0.3)">
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

    // Cash calculation
    const cashInput    = document.getElementById('cash-received');
    const changeAmount = document.getElementById('change-amount');
    const updateChange = () => {
      const received = parseFloat(cashInput?.value) || total;
      const change   = Math.max(0, received - total);
      if (changeAmount) changeAmount.textContent = formatRupiah(change);
    };
    cashInput?.addEventListener('input', updateChange);
    updateChange();

    // Quick cash buttons
    document.getElementById('quick-amounts')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-amt-btn');
      if (btn && cashInput) {
        cashInput.value = btn.dataset.amount;
        updateChange();
      }
    });

    // Debt calculation
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

    // Confirm Payment
    document.getElementById('pay-confirm-btn')?.addEventListener('click', async () => {
      const activeTab = document.querySelector('.pay-tab.active');
      const payMethod = activeTab?.dataset.method || 'cash';
      const btn       = document.getElementById('pay-confirm-btn');

      if (payMethod === 'cash') {
        const paid = parseFloat(cashInput?.value) || total;
        if (paid < total) {
          window.showToast('Jumlah uang tunai kurang dari total tagihan!', 'warning');
          cashInput?.focus();
          return;
        }
      }

      if (payMethod === 'debt') {
        const custName = document.getElementById('debt-customer')?.value?.trim();
        if (!custName) {
          window.showToast('Nama pelanggan wajib diisi untuk transaksi hutang/cicil!', 'warning');
          document.getElementById('debt-customer')?.focus();
          return;
        }
      }

      if (btn) { btn.disabled = true; btn.textContent = '⏳ Menyimpan...'; }

      const now = new Date().toISOString();
      let txData;

      if (payMethod === 'cash') {
        const paid   = parseFloat(cashInput?.value) || total;
        const change = Math.max(0, paid - total);
        txData = {
          invoiceNo:     generateInvoiceNo(),
          date:          now,
          dateKey:       todayKey(),
          items:         store.state.cart.map(i => ({ product: { ...i.product }, qty: i.qty })),
          subtotal,
          discount,
          tax,
          total,
          paymentMethod: 'cash',
          paymentStatus: 'paid',
          paid,
          change,
          paidAmount:    total,
          remainingDebt: 0,
          debtPayments:  [],
          customerName:  store.state.customerName || '',
          cashier:       store.state.settings.cashierName || 'Kasir',
        };
      } else if (payMethod === 'transfer') {
        txData = {
          invoiceNo:     generateInvoiceNo(),
          date:          now,
          dateKey:       todayKey(),
          items:         store.state.cart.map(i => ({ product: { ...i.product }, qty: i.qty })),
          subtotal,
          discount,
          tax,
          total,
          paymentMethod: 'transfer',
          paymentStatus: 'transfer_confirmed',
          paid:          total,
          change:        0,
          paidAmount:    total,
          remainingDebt: 0,
          debtPayments:  [],
          customerName:  store.state.customerName || '',
          cashier:       store.state.settings.cashierName || 'Kasir',
        };
      } else {
        const paidNow   = Math.min(parseFloat(document.getElementById('debt-paid-now')?.value) || 0, total);
        const remaining = total - paidNow;
        const status    = remaining === 0 ? 'paid' : (paidNow > 0 ? 'partial' : 'unpaid');
        const custName  = document.getElementById('debt-customer')?.value?.trim() || store.state.customerName || 'Pelanggan';

        txData = {
          invoiceNo:     generateInvoiceNo(),
          date:          now,
          dateKey:       todayKey(),
          items:         store.state.cart.map(i => ({ product: { ...i.product }, qty: i.qty })),
          subtotal,
          discount,
          tax,
          total,
          paymentMethod: 'debt',
          paymentStatus: status,
          paid:          paidNow,
          change:        0,
          paidAmount:    paidNow,
          remainingDebt: remaining,
          debtPayments:  paidNow > 0 ? [{ date: now, amount: paidNow, note: 'DP / Uang muka awal' }] : [],
          customerName:  custName,
          cashier:       store.state.settings.cashierName || 'Kasir',
        };
      }

      try {
        const savedId = await saveTransaction(txData);
        txData.id = savedId;
        store.addTransaction(txData);
        closeModal('payment-modal');
        store.clearCart();
        showSuccessOverlay(txData);
      } catch (err) {
        console.error('[payment-save]', err);
        window.showToast('Gagal menyimpan transaksi: ' + (err.message || 'Error'), 'error');
        if (btn) { btn.disabled = false; btn.textContent = '✅ Proses Pembayaran'; }
      }
    });
  }, 0);
};

/* ─────────────────────────────────────────
   Success Overlay with Prominent 58mm Print Options
   ───────────────────────────────────────── */
const showSuccessOverlay = (txData) => {
  const json = buildReceiptJSON(txData, store.state.settings);
  sessionStorage.setItem('pendingReceipt', JSON.stringify(json));

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
        ? `<p style="color:var(--blue-600);font-size:13px;margin-top:4px">📲 Transfer Terkonfirmasi ✅</p>`
        : ''}
      ${txData.remainingDebt > 0
        ? `<p style="color:var(--color-danger);font-size:13px;margin-top:4px">📋 Sisa Piutang: ${formatRupiah(txData.remainingDebt)}</p>`
        : ''}
    </div>

    <!-- Print & Navigation Actions -->
    <div class="success-actions" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:380px;margin-top:14px">
      <button class="btn btn--success" id="btn-print-direct" style="flex:1;min-width:140px;font-weight:700;box-shadow:0 4px 12px rgba(16,185,129,0.3)">
        🖨️ Cetak Struk (58mm)
      </button>
      <a class="btn btn--secondary" href="${printUrl}" id="btn-print-bluetooth" style="text-decoration:none;font-size:12px;display:flex;align-items:center;gap:4px">
        📲 Bluetooth App
      </a>
      <button class="btn btn--primary" id="btn-new-tx" style="flex:1;min-width:140px">
        🔄 Transaksi Baru
      </button>
      <button class="btn btn--secondary" id="btn-close-overlay">
        ✕ Tutup
      </button>
    </div>

    <details style="margin-top:14px;max-width:340px;width:100%">
      <summary style="cursor:pointer;font-size:12px;color:var(--text-secondary);text-align:center;margin-bottom:8px;font-weight:600">
        📄 Preview Struk Thermal
      </summary>
      <div class="receipt-preview" style="background:#fff;border-radius:8px;padding:8px">${receiptHTML}</div>
    </details>
  `;

  document.body.appendChild(overlay);

  const closeOverlay = () => {
    overlay.classList.add('closing');
    setTimeout(() => overlay.remove(), 180);
  };

  document.getElementById('success-close-btn')?.addEventListener('click', closeOverlay);
  document.getElementById('btn-close-overlay')?.addEventListener('click', closeOverlay);

  // Direct 58mm Thermal Print
  document.getElementById('btn-print-direct')?.addEventListener('click', () => {
    printThermalDirect(txData);
  });

  document.getElementById('btn-new-tx')?.addEventListener('click', () => {
    closeOverlay();
    window.showToast('Siap transaksi baru! 👍', 'success');
  });

  setTimeout(() => { if (overlay.parentNode) closeOverlay(); }, 15000);
};
