/**
 * receipt.js — Build JSON payload for Bluetooth Print App
 *
 * Uses "my.bluetoothprint.scheme://<url>" protocol.
 * Since we're on GitHub Pages (static), we encode the receipt JSON
 * into a data URI served from a local endpoint (sessionStorage approach).
 *
 * Flow:
 *  1. Build receipt JSON array
 *  2. Store in sessionStorage as 'pendingReceipt'
 *  3. printer.js reads it via /receipt-endpoint.html and redirects via scheme
 */

import { formatDateTime } from './utils/date.js';
import { formatRupiah }   from './utils/currency.js';

/**
 * Build receipt JSON array per Bluetooth Print App spec.
 * @param {Object} txData - Transaction data
 * @param {Object} settings - Shop settings
 * @returns {Array} JSON array for Bluetooth Print App
 */
export const buildReceiptJSON = (txData, settings) => {
  const items   = txData.items;
  const receipt = [];

  const text = (content, bold = 0, align = 1, format = 0) =>
    receipt.push({ type: 0, content, bold, align, format });

  const separator = () => text('--------------------------------', 0, 1, 0);
  const empty     = () => text(' ', 0, 0, 0);

  // Header
  empty();
  text(settings.shopName, 1, 1, 2);         // center, double-width
  text(settings.shopAddress, 0, 1, 4);       // center, small
  text(`Telp: ${settings.shopPhone}`, 0, 1, 4);
  separator();

  // Invoice info
  text(`No: ${txData.invoiceNo}`, 0, 0, 0);
  text(`Tgl: ${formatDateTime(new Date(txData.date))}`, 0, 0, 0);
  if (txData.customerName) text(`Pelanggan: ${txData.customerName}`, 0, 0, 0);
  if (txData.cashier) text(`Kasir: ${txData.cashier}`, 0, 0, 0);
  separator();

  // Items
  for (const item of items) {
    const name    = item.product.name;
    const qty     = item.qty;
    const price   = formatRupiah(item.product.price);
    const subtotal= formatRupiah(item.product.price * qty);
    text(`${name}`, 0, 0, 0);
    text(`  ${qty} x ${price} = ${subtotal}`, 0, 0, 0);
  }

  separator();

  // Totals
  if (txData.discount > 0) {
    text(`Subtotal: ${formatRupiah(txData.subtotal)}`, 0, 0, 0);
    text(`Diskon:  -${formatRupiah(txData.discount)}`, 0, 0, 0);
  }
  text(`TOTAL: ${formatRupiah(txData.total)}`, 1, 0, 3); // bold, left, double-width

  if (txData.paymentMethod === 'cash') {
    text(`Bayar:   ${formatRupiah(txData.paid)}`, 0, 0, 0);
    text(`Kembali: ${formatRupiah(txData.change)}`, 1, 0, 0);
  } else {
    text(`Transfer: ${formatRupiah(txData.total)}`, 0, 0, 0);
  }

  separator();
  empty();
  text('Terima kasih sudah berbelanja!', 1, 1, 0);
  text('Blue Mountain Refilling Station', 0, 1, 4);
  empty();
  empty();

  return receipt;
};

/**
 * Generate invoice number: BM-YYYYMMDD-XXXX
 */
export const generateInvoiceNo = () => {
  const d = new Date();
  const dateStr = d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
  return `BM-${dateStr}-${rand}`;
};
