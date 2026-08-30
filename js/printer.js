/**
 * printer.js — Bluetooth Print App integration
 * Protocol: my.bluetoothprint.scheme://<RESPONSE_URL>
 */
import { buildReceiptJSON } from './receipt.js';
import { formatRupiah }     from './utils/currency.js';
import { formatDateTime }   from './utils/date.js';
import store                from './store.js';

/**
 * Build receipt endpoint URL (static file for GitHub Pages)
 */
const getReceiptUrl = () => {
  const path = window.location.pathname.replace(/\/[^/]*$/, '/');
  return `${window.location.origin}${path}receipt-data.html`;
};

/**
 * Prepare receipt JSON in sessionStorage (call before clicking print link)
 */
export const prepareReceiptForPrint = (txData) => {
  const json = buildReceiptJSON(txData, store.state.settings);
  sessionStorage.setItem('pendingReceipt', JSON.stringify(json));
  return getReceiptUrl();
};

/**
 * Get full scheme URL for a transaction (for use in <a href>)
 */
export const getPrintSchemeUrl = (txData) => {
  prepareReceiptForPrint(txData);
  const settings   = store.state.settings;
  const receiptUrl = settings.printerUrl || getReceiptUrl();
  return `my.bluetoothprint.scheme://${receiptUrl}`;
};

/**
 * Generate receipt preview HTML (for modal display)
 */
export const getReceiptPreviewHTML = (txData) => {
  const settings = store.state.settings;
  const items    = txData.items || [];

  const line  = (t, bold = false, align = 'left') =>
    `<div style="text-align:${align};font-weight:${bold ? 'bold' : 'normal'}">${t}</div>`;
  const sep   = () => '<div style="border-top:1px dashed #bbb;margin:5px 0"></div>';
  const empty = () => '<div>&nbsp;</div>';

  let html = '';

  // Logo
  html += `<div style="text-align:center;margin-bottom:2px;margin-top:6px">
    <img src="assets/logo.png"
         alt="Logo"
         style="width:90px;height:90px;object-fit:contain;display:inline-block"
         onerror="this.style.display='none'">
  </div>`;

  html += line(settings.shopName || 'Blue Mountain Refilling Station', true, 'center');
  html += line(settings.shopAddress || '', false, 'center');
  if (settings.shopPhone) html += line(`Telp: ${settings.shopPhone}`, false, 'center');
  html += sep();
  html += line(`No: ${txData.invoiceNo || '-'}`);
  html += line(`Tgl: ${formatDateTime(new Date(txData.date))}`);
  if (txData.customerName) html += line(`Pelanggan: ${txData.customerName}`);
  if (txData.cashier) html += line(`Kasir: ${txData.cashier}`);
  html += sep();

  for (const item of items) {
    if (!item?.product) continue;
    html += line(item.product.name);
    html += line(`&nbsp;&nbsp;${item.qty} x ${formatRupiah(item.product.price)} = ${formatRupiah(item.product.price * item.qty)}`);
  }

  html += sep();
  if (txData.discount > 0) {
    html += line(`Subtotal : ${formatRupiah(txData.subtotal)}`);
    html += line(`Diskon   : -${formatRupiah(txData.discount)}`);
  }
  if (txData.tax > 0) {
    html += line(`Pajak    : ${formatRupiah(txData.tax)}`);
  }
  html += line(`<strong>TOTAL    : ${formatRupiah(txData.total)}</strong>`, true);

  if (txData.paymentMethod === 'cash') {
    html += line(`Bayar    : ${formatRupiah(txData.paid)}`);
    html += line(`<strong>Kembali  : ${formatRupiah(txData.change)}</strong>`, true);
  } else if (txData.paymentMethod === 'transfer') {
    html += line(`Transfer : ${formatRupiah(txData.total)}`);
    html += line(`Status   : ${txData.paymentStatus === 'transfer_confirmed' ? 'TERKONFIRMASI ✅' : 'MENUNGGU KONFIRMASI ⏳'}`);
  } else if (txData.paymentMethod === 'debt') {
    html += line(`DP       : ${formatRupiah(txData.paidAmount || 0)}`);
    html += line(`<strong>Sisa Hutang: ${formatRupiah(txData.remainingDebt || 0)}</strong>`, true);
  }

  html += sep();
  html += empty();
  html += line('Terima kasih sudah berbelanja!', true, 'center');
  // FIX: use settings.shopName
  html += line(settings.shopName || 'Blue Mountain Refilling Station', false, 'center');
  html += empty();

  return html;
};
