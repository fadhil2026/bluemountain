/**
 * views/modals.js — Payment modal, success overlay, shared modal utils
 */
import store                  from '../store.js';
import QRCode                 from 'qrcode';
import { generateDynamicQRIS } from '../utils/qris.js';
import { formatRupiah }       from '../utils/currency.js';
import { esc }                from '../utils/sanitize.js';
import { saveTransaction, getAllCustomers, addCustomer, updateCustomer, getAllUsers, seedDefaultUsers, updateUser } from '../db.js';
import { verifyPin, generateSalt, hashPin } from '../utils/crypto.js';
import {
  getReceiptPreviewHTML,
  getPrintSchemeUrl,
  getRawBTSchemeUrl,
  getWhatsAppReceiptUrl,
  shareReceiptViaWhatsApp,
  shareReceiptPNG,
  launchBTApp,
  printThermalDirect,
  printViaWebBluetooth,
  printViaWebUSB
} from '../printer.js';
import { buildReceiptJSON }   from '../receipt.js';
import { generateInvoiceNo }  from '../utils/invoice.js';
import { todayKey }           from '../utils/date.js';

/* ─────────────────────────────────────────
   Modal Utilities
   ───────────────────────────────────────── */
export const openModal = (html, id = 'generic-modal', extraClass = '') => {
  closeModal(); // close any existing first
  const cleanId = (typeof id === 'string' && id.trim()) ? id.trim() : 'generic-modal';
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = `overlay-${cleanId}`;
  const isWide = cleanId === 'modal-cust-360' || cleanId === 'payment-modal' || extraClass.includes('modal--wide');
  const modalClass = isWide ? `modal modal--wide ${extraClass}`.trim() : `modal ${extraClass}`.trim();
  overlay.innerHTML = `<div class="${modalClass}" id="${cleanId}" role="dialog" aria-modal="true">${html}</div>`;
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(cleanId);
  });

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      document.removeEventListener('keydown', onKeyDown);
      closeModal(cleanId);
    }
  };
  document.addEventListener('keydown', onKeyDown);

  const focusable = overlay.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable.length) focusable[0].focus();

  return overlay;
};

export const closeModal = (id = null) => {
  const targetId = (typeof id === 'string' && id.trim()) ? id.trim() : null;
  let overlays = [];
  try {
    if (targetId) {
      const el = document.getElementById(`overlay-${targetId}`) || document.querySelector(`#overlay-${targetId}`);
      if (el) overlays = [el];
    }
  } catch (_) {}

  if (!overlays.length) {
    overlays = [...document.querySelectorAll('.modal-overlay')];
  }

  overlays.forEach(overlay => {
    if (!overlay) return;
    overlay.querySelector('.modal')?.classList.add('closing');
    overlay.classList.add('closing');
    setTimeout(() => {
      try { overlay.remove(); } catch (_) {}
    }, 180);
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
          <div style="margin-top:12px;text-align:center">
            <canvas id="qris-dynamic-canvas" style="display:block;margin:0 auto;border-radius:10px;border:1px solid var(--border-subtle);background:#fff;max-width:170px;height:auto"></canvas>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:6px;font-weight:700">
              ⚡ QRIS Dinamis Otomatis Nominal: <span style="color:var(--blue-600)">${formatRupiah(total)}</span>
            </div>
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

    // Dynamic QRIS Renderer
    const renderQR = () => {
      const canvas = document.getElementById('qris-dynamic-canvas');
      if (!canvas) return;
      const staticQRIS = store.state.settings?.qrisNumber || '';
      const dynPayload = generateDynamicQRIS(staticQRIS, total);
      QRCode.toCanvas(canvas, dynPayload, { width: 170, margin: 1, errorCorrectionLevel: 'M' }, (err) => {
        if (err) console.warn('[QRIS] QR code render warning:', err);
      });
    };
    renderQR();

    // Tab switching
    document.querySelectorAll('.pay-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const m = tab.dataset.method;
        document.getElementById('pay-cash-section').style.display     = m === 'cash'     ? '' : 'none';
        document.getElementById('pay-transfer-section').style.display = m === 'transfer' ? '' : 'none';
        document.getElementById('pay-debt-section').style.display     = m === 'debt'     ? '' : 'none';
        
        if (m === 'cash') document.getElementById('cash-received')?.focus();
        if (m === 'transfer') renderQR();
        if (m === 'debt') document.getElementById('debt-customer')?.focus();
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

        const paidNow   = Math.min(parseFloat(document.getElementById('debt-paid-now')?.value) || 0, total);
        const remaining = total - paidNow;

        // Credit limit guard
        const matchedCust = (store.state.customers || []).find(c => (c.name || '').trim().toLowerCase() === custName.toLowerCase());
        if (matchedCust && matchedCust.creditLimit > 0) {
          const projectedDebt = (Number(matchedCust.totalDebt) || 0) + remaining;
          if (projectedDebt > matchedCust.creditLimit) {
            const proceed = confirm(
              `⚠️ Peringatan Limit Piutang!\nTotal piutang ${matchedCust.name} akan menjadi ${formatRupiah(projectedDebt)}, melebihi batas kredit (${formatRupiah(matchedCust.creditLimit)}).\n\nTetap lanjutkan transaksi?`
            );
            if (!proceed) return;
          }
        }
      }

      if (btn) { btn.disabled = true; btn.textContent = '⏳ Menyimpan...'; }

      const now = new Date().toISOString();
      const allCusts = await getAllCustomers();
      let resolvedCust = store.state.selectedCustomer || null;
      let effectiveCustName = '';

      if (payMethod === 'debt') {
        effectiveCustName = document.getElementById('debt-customer')?.value?.trim() || store.state.customerName || 'Pelanggan';
      } else {
        effectiveCustName = store.state.customerName || '';
      }

      if (!resolvedCust && effectiveCustName) {
        resolvedCust = allCusts.find(c => (c.name || '').trim().toLowerCase() === effectiveCustName.toLowerCase()) || null;
      }

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
          customerId:    resolvedCust?.id || null,
          customerName:  resolvedCust?.name || effectiveCustName,
          customerPhone: resolvedCust?.phone || '',
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
          customerId:    resolvedCust?.id || null,
          customerName:  resolvedCust?.name || effectiveCustName,
          customerPhone: resolvedCust?.phone || '',
          cashier:       store.state.settings.cashierName || 'Kasir',
        };
      } else {
        const paidNow   = Math.min(parseFloat(document.getElementById('debt-paid-now')?.value) || 0, total);
        const remaining = total - paidNow;
        const status    = remaining === 0 ? 'paid' : (paidNow > 0 ? 'partial' : 'unpaid');

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
          customerId:    resolvedCust?.id || null,
          customerName:  resolvedCust?.name || effectiveCustName,
          customerPhone: resolvedCust?.phone || '',
          cashier:       store.state.settings.cashierName || 'Kasir',
        };
      }

      try {
        // Sync and update customer statistics in CRM
        if (effectiveCustName) {
          if (resolvedCust) {
            resolvedCust.totalOrders = (Number(resolvedCust.totalOrders) || 0) + 1;
            resolvedCust.totalSpent = (Number(resolvedCust.totalSpent) || 0) + txData.total;
            if (txData.remainingDebt > 0) {
              resolvedCust.totalDebt = (Number(resolvedCust.totalDebt) || 0) + txData.remainingDebt;
            }
            await updateCustomer(resolvedCust);
            txData.customerId = resolvedCust.id;
            txData.customerName = resolvedCust.name;
          } else {
            const newCustId = await addCustomer({
              name: effectiveCustName,
              phone: '',
              category: 'Rumah Tangga',
              address: '',
              totalOrders: 1,
              totalSpent: txData.total,
              totalDebt: txData.remainingDebt || 0,
              creditLimit: 0,
              galonLoaned: 0,
            });
            txData.customerId = newCustId;
            txData.customerName = effectiveCustName;
          }
          const freshCusts = await getAllCustomers();
          store.setCustomers(freshCusts);
        }

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
   Success Overlay with Universal Multi-Protocol Printing
   ───────────────────────────────────────── */
const showSuccessOverlay = (txData) => {
  const json = buildReceiptJSON(txData, store.state.settings);
  sessionStorage.setItem('pendingReceipt', JSON.stringify(json));

  const printUrl    = getPrintSchemeUrl(txData);
  const rawbtUrl    = getRawBTSchemeUrl(txData);
  const paperSize   = store.state.settings?.printerPaper || '58mm';
  const receiptHTML = getReceiptPreviewHTML(txData, paperSize);

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
    <div class="success-actions" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:440px;margin-top:14px">
      <button class="btn btn--success" id="btn-print-direct" style="flex:1;min-width:150px;font-weight:700;box-shadow:0 4px 12px rgba(16,185,129,0.3)">
        🖨️ Cetak Struk (${paperSize})
      </button>
      <button class="btn btn--secondary" id="btn-mo-png" style="font-size:12px">
        🖼️ PNG / Share
      </button>
      <button class="btn btn--secondary" id="btn-mo-whatsapp" style="font-size:12px;display:flex;align-items:center;gap:4px;background:#dcfce7;border:1.5px solid #86efac;color:#166534;font-weight:700">
        💬 WhatsApp
      </button>
      <button class="btn btn--secondary" id="btn-print-ble" style="font-size:12px;display:flex;align-items:center;gap:4px">
        📲 Web BLE
      </button>
      <button class="btn btn--secondary" id="btn-print-usb" style="font-size:12px;display:flex;align-items:center;gap:4px">
        🔌 USB
      </button>
      <button class="btn btn--secondary" id="btn-mo-btapp" style="font-size:12px;display:flex;align-items:center;gap:4px">
        🌐 BT App
      </button>
      <a class="btn btn--secondary" href="${rawbtUrl}" style="text-decoration:none;font-size:12px;display:flex;align-items:center;gap:4px">
        ⚡ RawBT
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
        📄 Preview Struk (${paperSize})
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

  // Direct Universal Thermal Print
  document.getElementById('btn-print-direct')?.addEventListener('click', () => {
    printThermalDirect(txData);
  });

  // WhatsApp with image attachment on mobile / clipboard on PC
  document.getElementById('btn-mo-whatsapp')?.addEventListener('click', () => {
    shareReceiptViaWhatsApp(txData);
  });

  // Precision unclipped PNG export / share
  document.getElementById('btn-mo-png')?.addEventListener('click', () => {
    shareReceiptPNG(txData);
  });

  // Web Bluetooth
  document.getElementById('btn-print-ble')?.addEventListener('click', async () => {
    try {
      window.showToast('Menghubungkan ke printer Bluetooth...', 'info');
      await printViaWebBluetooth(txData);
      window.showToast('Struk terkirim ke printer Bluetooth!', 'success');
    } catch (err) {
      console.warn('[ble-print]', err);
      window.showToast(err.message || 'Gagal koneksi Bluetooth', 'error');
    }
  });

  // WebUSB (with auto-system print fallback)
  document.getElementById('btn-print-usb')?.addEventListener('click', async () => {
    try {
      window.showToast('Menghubungkan ke printer USB...', 'info');
      await printViaWebUSB(txData);
    } catch (err) {
      console.warn('[usb-print]', err);
      window.showToast(err.message || 'Gagal koneksi WebUSB', 'error');
    }
  });

  // BT App with offline RawBT auto-fallback
  document.getElementById('btn-mo-btapp')?.addEventListener('click', () => {
    launchBTApp(txData);
  });

  document.getElementById('btn-new-tx')?.addEventListener('click', () => {
    closeOverlay();
    window.showToast('Siap transaksi baru! 👍', 'success');
  });

  setTimeout(() => { if (overlay.parentNode) closeOverlay(); }, 20000);
};

/* ─────────────────────────────────────────
   Operator Switch & Login Modal (RBAC PIN)
   ───────────────────────────────────────── */
export const openLoginModal = async ({ onLogin = null, forceLock = false } = {}) => {
  let users = await getAllUsers();
  if (users.length === 0) {
    await seedDefaultUsers();
    users = await getAllUsers();
  }

  const activeUsers = users.filter(u => u.isActive !== false);
  if (activeUsers.length === 0) {
    window.showToast?.('Tidak ada akun operator aktif.', 'error');
    return;
  }

  let selectedUserId = activeUsers[0].id;
  let enteredPin = '';

  const modalId = 'modal-login-operator';
  const roleColors = {
    owner: { color: '#8b5cf6', label: '👑 Owner' },
    supervisor: { color: '#2563eb', label: '⭐ Supervisor' },
    cashier: { color: '#10b981', label: '👤 Kasir' }
  };

  const renderModalContent = () => `
    <div style="padding: 24px; text-align: center;">
      <div style="font-size: 36px; margin-bottom: 8px;">🔐</div>
      <h2 style="font-size: 20px; font-weight: 800; margin: 0 0 6px 0; color: var(--text-primary, #1e293b);">
        ${forceLock ? 'Sistem Terkunci' : 'Beralih Operator Kasir'}
      </h2>
      <p style="font-size: 13px; color: var(--text-muted, #64748b); margin: 0 0 20px 0;">
        Pilih nama operator dan masukkan 4-6 digit PIN masuk Anda
      </p>

      <!-- Operator Selection Grid -->
      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px;">
        ${activeUsers.map(u => {
          const isSelected = String(u.id) === String(selectedUserId);
          const r = roleColors[u.role] || roleColors.cashier;
          return `
            <button type="button" class="btn-select-operator" data-id="${u.id}" style="
              padding: 10px 14px;
              border-radius: 12px;
              border: 2px solid ${isSelected ? 'var(--primary, #2563eb)' : 'var(--border, #e2e8f0)'};
              background: ${isSelected ? 'rgba(37, 99, 235, 0.08)' : 'var(--bg-card, #ffffff)'};
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 10px;
              transition: all 0.2s;
            ">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: ${r.color}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">
                ${(u.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div style="text-align: left;">
                <div style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${esc(u.name)}</div>
                <div style="font-size: 11px; color: ${r.color}; font-weight: 600;">${r.label}</div>
              </div>
            </button>
          `;
        }).join('')}
      </div>

      <!-- PIN Display -->
      <div id="pin-display-box" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 8px;">
          ${[0, 1, 2, 3, 4, 5].map(i => `
            <span class="pin-dot" style="
              width: 16px;
              height: 16px;
              border-radius: 50%;
              border: 2px solid var(--primary, #2563eb);
              background: ${i < enteredPin.length ? 'var(--primary, #2563eb)' : 'transparent'};
              display: inline-block;
              transition: background 0.15s;
            "></span>
          `).join('')}
        </div>
        <div id="pin-error-msg" style="min-height: 18px; font-size: 12px; font-weight: 600; color: #dc2626;"></div>
      </div>

      <!-- Numpad -->
      <div style="max-width: 260px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `
          <button type="button" class="btn-numpad" data-val="${n}" style="
            height: 52px;
            font-size: 20px;
            font-weight: 700;
            border-radius: 12px;
            border: 1px solid var(--border, #cbd5e1);
            background: var(--bg-card, #ffffff);
            color: var(--text-primary, #1e293b);
            cursor: pointer;
          ">${n}</button>
        `).join('')}
        <button type="button" class="btn-numpad" data-val="clear" style="
          height: 52px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 12px;
          border: 1px solid #fecaca;
          background: #fff1f2;
          color: #dc2626;
          cursor: pointer;
        ">C</button>
        <button type="button" class="btn-numpad" data-val="0" style="
          height: 52px;
          font-size: 20px;
          font-weight: 700;
          border-radius: 12px;
          border: 1px solid var(--border, #cbd5e1);
          background: var(--bg-card, #ffffff);
          color: var(--text-primary, #1e293b);
          cursor: pointer;
        ">0</button>
        <button type="button" class="btn-numpad" data-val="submit" style="
          height: 52px;
          font-size: 18px;
          font-weight: 700;
          border-radius: 12px;
          border: none;
          background: var(--primary, #2563eb);
          color: white;
          cursor: pointer;
        ">✓</button>
      </div>

      <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--border, #e2e8f0);">
        <button type="button" id="btn-modal-reset-owner" style="
          background: none;
          border: none;
          color: var(--text-muted, #64748b);
          font-size: 11px;
          cursor: pointer;
          text-decoration: underline;
        ">🔄 Lupa PIN? Reset PIN Owner ke "1234"</button>
      </div>

      ${!forceLock ? `
        <div style="margin-top: 12px;">
          <button type="button" id="btn-cancel-login" style="
            background: transparent;
            border: none;
            color: var(--text-muted, #64748b);
            font-size: 13px;
            cursor: pointer;
            text-decoration: underline;
          ">Tutup / Batal</button>
        </div>
      ` : ''}
    </div>
  `;

  openModal(renderModalContent(), modalId, 'modal--login');

  const updateDots = () => {
    const dots = document.querySelectorAll('#pin-display-box .pin-dot');
    dots.forEach((dot, idx) => {
      dot.style.background = idx < enteredPin.length ? 'var(--primary, #2563eb)' : 'transparent';
    });
  };

  const handleVerify = async (isManual = false) => {
    const targetUser = activeUsers.find(u => String(u.id) === String(selectedUserId));
    if (!targetUser) return;

    if (enteredPin.length >= 4) {
      const isValid = await verifyPin(enteredPin, targetUser.pinSalt, targetUser.pinHash);
      if (isValid) {
        store.login(targetUser);
        closeModal(modalId);
        window.showToast?.(`Operator aktif: ${targetUser.name} (${targetUser.role})`, 'success');
        if (typeof onLogin === 'function') onLogin(targetUser);
        return;
      }
    }

    if (isManual || enteredPin.length >= 6) {
      const err = document.getElementById('pin-error-msg');
      if (err) err.textContent = enteredPin.length < 4 ? 'Masukkan minimal 4 digit PIN' : 'PIN salah! Silakan coba lagi.';
      enteredPin = '';
      updateDots();
    }
  };

  const bindEvents = () => {
    document.querySelectorAll('.btn-select-operator').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedUserId = btn.getAttribute('data-id');
        enteredPin = '';
        const container = document.getElementById(modalId);
        if (container) {
          container.innerHTML = renderModalContent();
          bindEvents();
        }
      });
    });

    document.querySelectorAll('.btn-numpad').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val');
        const err = document.getElementById('pin-error-msg');
        if (err) err.textContent = '';

        if (val === 'clear') {
          enteredPin = '';
          updateDots();
        } else if (val === 'submit') {
          handleVerify(true);
        } else if (enteredPin.length < 6) {
          enteredPin += val;
          updateDots();
          handleVerify(false);
        }
      });
    });

    document.getElementById('btn-cancel-login')?.addEventListener('click', () => {
      closeModal(modalId);
    });

    document.getElementById('btn-modal-reset-owner')?.addEventListener('click', async () => {
      const ownerUser = activeUsers.find(u => u.role === 'owner');
      if (!ownerUser) {
        window.showToast?.('Akun Owner tidak ditemukan.', 'error');
        return;
      }
      if (confirm(`Atur ulang PIN akun Owner "${ownerUser.name}" kembali ke default "1234"?`)) {
        try {
          const salt = generateSalt();
          const pinHash = await hashPin('1234', salt);
          const updated = {
            ...ownerUser,
            pinHash,
            pinSalt: salt,
            updatedAt: new Date().toISOString()
          };
          await updateUser(updated);
          activeUsers = (await getAllUsers()).filter(u => u.isActive !== false);
          selectedUserId = ownerUser.id;
          enteredPin = '';
          const container = document.getElementById(modalId);
          if (container) {
            container.innerHTML = renderModalContent();
            bindEvents();
          }
          window.showToast?.('PIN Owner berhasil direset ke default "1234". Silakan masukkan 1234.', 'success');
        } catch (err) {
          window.showToast?.('Gagal mereset PIN: ' + err.message, 'error');
        }
      }
    });

    // Keyboard support inside modal
    const keyHandler = (e) => {
      const modalEl = document.getElementById(modalId);
      if (!modalEl || !modalEl.classList.contains('active')) {
        window.removeEventListener('keydown', keyHandler);
        return;
      }
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        if (enteredPin.length < 6) {
          enteredPin += e.key;
          updateDots();
          handleVerify(false);
        }
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        enteredPin = enteredPin.slice(0, -1);
        updateDots();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleVerify(true);
      } else if (e.key === 'Escape' && !forceLock) {
        e.preventDefault();
        closeModal(modalId);
      }
    };
    window.addEventListener('keydown', keyHandler);
  };

  bindEvents();
};
