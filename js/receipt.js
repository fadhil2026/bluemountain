/**
 * receipt.js — Build JSON payload for Bluetooth Print App
 *
 * Protocol: my.bluetoothprint.scheme://<url>
 * Flow:
 *  1. Build receipt JSON array
 *  2. Store in sessionStorage as 'pendingReceipt'
 *  3. receipt-data.html serves it via the scheme
 */
import { formatDateTime }       from './utils/date.js';
import { formatRupiah }         from './utils/currency.js';
import { LOGO_THERMAL_BASE64 }  from './utils/logo-thermal.js';

/**
 * Build receipt JSON array per Bluetooth Print App spec.
 */
export const buildReceiptJSON = (txData, settings = {}) => {
  const items   = txData.items || [];
  const receipt = [];

  const text = (content, bold = 0, align = 1, format = 0) =>
    receipt.push({ type: 0, content, bold, align, format });

  const separator = () => text('--------------------------------', 0, 1, 0);
  const empty     = () => text(' ', 0, 0, 0);

  // 1. Logo (Type 1 image payload - compact spacing)
  receipt.push({
    type: 1,
    content: LOGO_THERMAL_BASE64,
    align: 1,
    width: 160,
    height: 160,
  });

  // 2. Shop Header (ALL CAPS, Bold, with distinct gap before address)
  const rawShopName = settings.shopName || 'Blue Mountain Refilling Station';
  if (rawShopName.toLowerCase().includes('blue mountain') && rawShopName.toLowerCase().includes('refilling station')) {
    text('BLUE MOUNTAIN', 1, 1, 2);
    text('REFILLING STATION', 1, 1, 1);
  } else {
    const lines = rawShopName.split('\n');
    lines.forEach(l => text(l.trim().toUpperCase(), 1, 1, 2));
  }
  empty(); // Distinct gap before address
  if (settings.shopAddress) text(settings.shopAddress, 0, 1, 4);
  if (settings.shopPhone)   text(`Telp: ${settings.shopPhone}`, 0, 1, 4);
  separator();

  // 3. Invoice info (Aligned colons)
  text(`No   : ${txData.invoiceNo || '-'}`, 0, 0, 0);
  text(`Tgl  : ${formatDateTime(new Date(txData.date))}`, 0, 0, 0);
  if (txData.customerName) text(`Cust : ${txData.customerName}`, 0, 0, 0);
  if (txData.cashier)      text(`Kasir: ${txData.cashier}`, 0, 0, 0);
  separator();

  // 4. Items
  for (const item of items) {
    if (!item?.product) continue;
    const name     = item.product.name;
    const qty      = item.qty;
    const price    = formatRupiah(item.product.price);
    const subtotal = formatRupiah(item.product.price * qty);
    text(`${name}`, 1, 0, 0);
    text(`  ${qty} x ${price} = ${subtotal}`, 0, 0, 0);
  }

  separator();

  // 5. Totals
  if (txData.discount > 0) {
    text(`Subtotal: ${formatRupiah(txData.subtotal)}`, 0, 0, 0);
    text(`Diskon:  -${formatRupiah(txData.discount)}`, 0, 0, 0);
  }
  if (txData.tax > 0) {
    text(`Pajak:    ${formatRupiah(txData.tax)}`, 0, 0, 0);
  }
  text(`TOTAL: ${formatRupiah(txData.total)}`, 1, 0, 3);

  if (txData.paymentMethod === 'cash') {
    text(`Bayar:   ${formatRupiah(txData.paid)}`, 0, 0, 0);
    text(`Kembali: ${formatRupiah(txData.change)}`, 1, 0, 0);
  } else if (txData.paymentMethod === 'transfer') {
    text(`Transfer: ${formatRupiah(txData.total)}`, 0, 0, 0);
    text(`Status: ${txData.paymentStatus === 'transfer_confirmed' ? 'TERKONFIRMASI' : 'MENUNGGU KONFIRMASI'}`, 0, 0, 0);
  } else if (txData.paymentMethod === 'debt') {
    text(`DP Dibayar: ${formatRupiah(txData.paidAmount || 0)}`, 0, 0, 0);
    text(`Sisa Hutang: ${formatRupiah(txData.remainingDebt || 0)}`, 1, 0, 0);
  }

  separator();
  empty();
  text('Terima kasih sudah berbelanja!', 1, 1, 0);
  text('BLUE MOUNTAIN REFILLING STATION', 1, 1, 0);
  empty();
  empty();

  return receipt;
};
