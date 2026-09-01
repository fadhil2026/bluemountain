/**
 * printer.js — Universal Thermal POS Printing Engine (48mm / 58mm / 80mm)
 *
 * Supported Protocols:
 * 1. Universal Direct Thermal Print (Zero Margin CSS @page: 48mm / 58mm / 80mm)
 * 2. Web Bluetooth Direct ESC/POS (Zero-app BLE on Chrome/Android/Edge)
 * 3. WebUSB Direct ESC/POS (USB Cable / OTG on Chrome/Edge/Android)
 * 4. Android App Intents (RawBT & Bluetooth Print App)
 */
import { buildReceiptJSON } from './receipt.js';
import { formatRupiah }     from './utils/currency.js';
import { formatDateTime }   from './utils/date.js';
import store                from './store.js';
import logoUrl              from '../assets/logo.png';

/**
 * Paper Configs by Width
 */
export const PAPER_SPECS = {
  '48mm': { width: '48mm', widthPx: '185px', colWidth: 30, fontSize: '10px', logoWidth: '55px' },
  '58mm': { width: '58mm', widthPx: '220px', colWidth: 32, fontSize: '11px', logoWidth: '70px' },
  '80mm': { width: '80mm', widthPx: '300px', colWidth: 48, fontSize: '12px', logoWidth: '85px' },
};

/**
 * Build receipt endpoint URL (static file for GitHub Pages / PWA)
 */
export const getReceiptUrl = () => {
  const path = window.location.pathname.replace(/\/[^/]*$/, '/');
  return `${window.location.origin}${path}receipt-data.html`;
};

/**
 * Prepare receipt JSON in sessionStorage (for Bluetooth Print App)
 */
export const prepareReceiptForPrint = (txData) => {
  const json = buildReceiptJSON(txData, store.state.settings);
  sessionStorage.setItem('pendingReceipt', JSON.stringify(json));
  return getReceiptUrl();
};

/**
 * Get full scheme URL for Bluetooth Print App
 */
export const getPrintSchemeUrl = (txData) => {
  prepareReceiptForPrint(txData);
  const settings   = store.state.settings || {};
  const receiptUrl = settings.printerUrl || getReceiptUrl();
  return `my.bluetoothprint.scheme://${receiptUrl}`;
};

/**
 * Get RawBT scheme URL for direct Android printing
 */
export const getRawBTSchemeUrl = (txData) => {
  prepareReceiptForPrint(txData);
  const receiptUrl = getReceiptUrl();
  return `rawbt:data:application/json;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(buildReceiptJSON(txData, store.state.settings)))))}`;
};

/**
 * Generate 48mm / 58mm / 80mm HTML Receipt for Direct Print & Modal Preview
 */
export const getReceiptPreviewHTML = (txData, paperWidth = null) => {
  const settings = store.state.settings || {};
  const sizeKey  = paperWidth || settings.printerPaper || '58mm';
  const spec     = PAPER_SPECS[sizeKey] || PAPER_SPECS['58mm'];
  const items    = txData.items || [];

  const line = (t, bold = false, align = 'left', size = spec.fontSize) =>
    `<div style="text-align:${align};font-weight:${bold ? '700' : '400'};font-size:${size};line-height:1.35;word-break:break-word">${t}</div>`;
  const sep = () => '<div style="border-top:1px dashed #444;margin:4px 0"></div>';
  const empty = () => '<div style="height:4px"></div>';

  let html = `<div class="thermal-receipt" style="width:${spec.widthPx};margin:0 auto;font-family:'Courier New',Consolas,monospace;color:#000;background:#fff;padding:4px">`;

  // Logo
  html += `<div style="text-align:center;margin-bottom:6px;margin-top:2px">
    <img src="${logoUrl}"
         alt="Logo"
         style="width:${spec.logoWidth};height:${spec.logoWidth};object-fit:contain;display:inline-block">
  </div>`;

  // Shop Info
  html += line(settings.shopName || 'Blue Mountain Refilling Station', true, 'center', sizeKey === '80mm' ? '14px' : '12px');
  if (settings.shopAddress) html += line(settings.shopAddress, false, 'center', '10px');
  if (settings.shopPhone)   html += line(`Telp: ${settings.shopPhone}`, false, 'center', '10px');
  
  html += sep();
  html += line(`No  : ${txData.invoiceNo || '-'}`);
  html += line(`Tgl : ${formatDateTime(new Date(txData.date || Date.now()))}`);
  if (txData.customerName) html += line(`Cust: ${txData.customerName}`);
  if (txData.cashier)      html += line(`Kasir: ${txData.cashier}`);
  html += sep();

  // Item List
  for (const item of items) {
    if (!item?.product) continue;
    const pName = item.product.name;
    const pQty = item.qty;
    const pPrice = item.product.price;
    const pSubtotal = pPrice * pQty;

    html += line(pName, true);
    html += `<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.3">
      <span>&nbsp;&nbsp;${pQty} x ${formatRupiah(pPrice)}</span>
      <span>${formatRupiah(pSubtotal)}</span>
    </div>`;
  }

  html += sep();

  // Totals & Discounts
  if (txData.discount > 0) {
    html += `<div style="display:flex;justify-content:space-between;font-size:10px">
      <span>Subtotal</span><span>${formatRupiah(txData.subtotal || txData.total + txData.discount)}</span>
    </div>`;
    html += `<div style="display:flex;justify-content:space-between;font-size:10px">
      <span>Diskon</span><span>-${formatRupiah(txData.discount)}</span>
    </div>`;
  }
  if (txData.tax > 0) {
    html += `<div style="display:flex;justify-content:space-between;font-size:10px">
      <span>Pajak</span><span>${formatRupiah(txData.tax)}</span>
    </div>`;
  }

  // Grand Total
  html += `<div style="display:flex;justify-content:space-between;font-size:${sizeKey === '80mm' ? '14px' : '12px'};font-weight:900;margin-top:2px">
    <span>TOTAL</span><span>${formatRupiah(txData.total)}</span>
  </div>`;

  // Payment Breakdown
  if (txData.paymentMethod === 'cash') {
    html += `<div style="display:flex;justify-content:space-between;font-size:10px;margin-top:2px">
      <span>Bayar Tunai</span><span>${formatRupiah(txData.paid || txData.total)}</span>
    </div>`;
    html += `<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700">
      <span>Kembali</span><span>${formatRupiah(txData.change || 0)}</span>
    </div>`;
  } else if (txData.paymentMethod === 'transfer') {
    html += `<div style="display:flex;justify-content:space-between;font-size:10px;margin-top:2px">
      <span>Transfer Bank</span><span>${formatRupiah(txData.total)}</span>
    </div>`;
    html += line(`Status: ${txData.paymentStatus === 'transfer_confirmed' ? 'TERKONFIRMASI ✅' : 'MENUNGGU KONFIRMASI ⏳'}`, false, 'center', '9px');
  } else if (txData.paymentMethod === 'debt') {
    html += `<div style="display:flex;justify-content:space-between;font-size:10px;margin-top:2px">
      <span>DP Dibayar</span><span>${formatRupiah(txData.paidAmount || 0)}</span>
    </div>`;
    html += `<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;color:#000">
      <span>Sisa Hutang</span><span>${formatRupiah(txData.remainingDebt || 0)}</span>
    </div>`;
  }

  html += sep();
  html += empty();
  html += line('Terima kasih atas kunjungan Anda!', true, 'center', '10px');
  html += line(settings.shopName || 'Blue Mountain Refilling Station', false, 'center', '9px');
  html += empty();
  html += `</div>`;

  return html;
};

/**
 * Universal Direct Thermal Print (48mm / 58mm / 80mm) via Browser Print Dialog
 */
export const printThermalDirect = (txData, customPaper = null) => {
  const settings   = store.state.settings || {};
  const paperSize  = customPaper || settings.printerPaper || '58mm';
  const spec       = PAPER_SPECS[paperSize] || PAPER_SPECS['58mm'];
  const receiptHTML = getReceiptPreviewHTML(txData, paperSize);

  const printFrame = document.createElement('iframe');
  printFrame.style.position = 'fixed';
  printFrame.style.right    = '0';
  printFrame.style.bottom   = '0';
  printFrame.style.width    = '0';
  printFrame.style.height   = '0';
  printFrame.style.border   = '0';
  document.body.appendChild(printFrame);

  const doc = printFrame.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Struk-${txData.invoiceNo || 'KASIR'}</title>
  <style>
    @page {
      size: ${spec.width} auto;
      margin: 0mm;
    }
    @media print {
      html, body {
        width: ${spec.width};
        margin: 0 !important;
        padding: 1mm 2mm !important;
        background: #fff !important;
        color: #000 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .thermal-receipt {
        width: 100% !important;
        padding: 0 !important;
      }
      img {
        max-width: ${spec.logoWidth} !important;
        height: auto !important;
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
      }
    }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Courier New', Consolas, monospace;
      color: #000;
      background: #fff;
    }
  </style>
</head>
<body>
  ${receiptHTML}
</body>
</html>`);
  doc.close();

  setTimeout(() => {
    try {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
    } catch (e) {
      console.warn('[print-frame] Direct iframe print failed, falling back to popup', e);
      const win = window.open('', '_blank', 'width=350,height=600');
      if (win) {
        win.document.write(doc.documentElement.outerHTML);
        win.document.close();
        win.focus();
        win.print();
        setTimeout(() => win.close(), 1000);
      }
    } finally {
      setTimeout(() => printFrame.remove(), 1500);
    }
  }, 350);
};

/**
 * Build Raw ESC/POS Binary Buffer for 48mm, 58mm, or 80mm
 */
export const buildESCPOSBuffer = (txData, paperSize = null) => {
  const encoder  = new TextEncoder();
  const settings = store.state.settings || {};
  const sizeKey  = paperSize || settings.printerPaper || '58mm';
  const spec     = PAPER_SPECS[sizeKey] || PAPER_SPECS['58mm'];
  const colWidth = spec.colWidth;

  const padLR = (left, right, width = colWidth) => {
    const space = Math.max(1, width - left.length - right.length);
    return left + ' '.repeat(space) + right;
  };

  let buffer = [];
  const pushCmd = (arr) => buffer.push(...arr);
  const pushText = (txt) => {
    const encoded = encoder.encode(txt + '\n');
    for (const b of encoded) buffer.push(b);
  };

  // Init Printer
  pushCmd([0x1B, 0x40]); // ESC @

  // Shop Header (Center, Double Height)
  pushCmd([0x1B, 0x61, 0x01]); // Align Center
  pushCmd([0x1B, 0x21, 0x10]); // Double Height
  pushText(settings.shopName || 'Blue Mountain');
  pushCmd([0x1B, 0x21, 0x00]); // Normal
  if (settings.shopAddress) pushText(settings.shopAddress);
  if (settings.shopPhone) pushText(`Telp: ${settings.shopPhone}`);
  
  // Divider
  pushCmd([0x1B, 0x61, 0x00]); // Align Left
  pushText('-'.repeat(colWidth));

  // Invoice Meta
  pushText(padLR(`No: ${txData.invoiceNo || '-'}`, ''));
  pushText(padLR(`Tgl: ${formatDateTime(new Date(txData.date || Date.now()))}`, ''));
  if (txData.customerName) pushText(padLR(`Cust: ${txData.customerName}`, ''));
  if (txData.cashier)      pushText(padLR(`Kasir: ${txData.cashier}`, ''));
  pushText('-'.repeat(colWidth));

  // Items
  for (const item of (txData.items || [])) {
    if (!item?.product) continue;
    pushCmd([0x1B, 0x45, 0x01]); // Bold
    pushText(item.product.name);
    pushCmd([0x1B, 0x45, 0x00]); // Normal
    pushText(padLR(`  ${item.qty} x ${formatRupiah(item.product.price)}`, formatRupiah(item.product.price * item.qty)));
  }
  pushText('-'.repeat(colWidth));

  // Totals
  if (txData.discount > 0) {
    pushText(padLR('Subtotal', formatRupiah(txData.subtotal || txData.total + txData.discount)));
    pushText(padLR('Diskon', '-' + formatRupiah(txData.discount)));
  }
  if (txData.tax > 0) {
    pushText(padLR('Pajak', formatRupiah(txData.tax)));
  }

  // Grand Total Bold
  pushCmd([0x1B, 0x45, 0x01]); // Bold
  pushCmd([0x1B, 0x21, 0x10]); // Double Height
  pushText(padLR('TOTAL', formatRupiah(txData.total)));
  pushCmd([0x1B, 0x21, 0x00]); // Normal
  pushCmd([0x1B, 0x45, 0x00]); // Normal

  if (txData.paymentMethod === 'cash') {
    pushText(padLR('Bayar Tunai', formatRupiah(txData.paid || txData.total)));
    pushCmd([0x1B, 0x45, 0x01]);
    pushText(padLR('Kembali', formatRupiah(txData.change || 0)));
    pushCmd([0x1B, 0x45, 0x00]);
  } else if (txData.paymentMethod === 'debt') {
    pushText(padLR('DP Dibayar', formatRupiah(txData.paidAmount || 0)));
    pushCmd([0x1B, 0x45, 0x01]);
    pushText(padLR('Sisa Hutang', formatRupiah(txData.remainingDebt || 0)));
    pushCmd([0x1B, 0x45, 0x00]);
  }

  // Footer
  pushText('-'.repeat(colWidth));
  pushCmd([0x1B, 0x61, 0x01]); // Align Center
  pushText('Terima kasih sudah berbelanja!');
  pushText(settings.shopName || 'Blue Mountain Refilling Station');
  
  // Feed 3 lines and cut
  pushCmd([0x0A, 0x0A, 0x0A, 0x1D, 0x56, 0x42, 0x00]);

  return new Uint8Array(buffer);
};

/**
 * Direct Web Bluetooth ESC/POS Direct Print (Zero App Required)
 */
export const printViaWebBluetooth = async (txData) => {
  if (!navigator.bluetooth) {
    throw new Error('Web Bluetooth tidak didukung pada browser ini. Gunakan Chrome di Android/PC atau gunakan opsi Cetak Direct.');
  }

  const device = await navigator.bluetooth.requestDevice({
    filters: [
      { services: ['000018f0-0000-1000-8000-00805f9b34fb'] },
      { services: ['e7810a71-73ae-499d-8c15-faa9aef0c3f2'] },
      { namePrefix: 'MPT' },
      { namePrefix: 'RP' },
      { namePrefix: 'POS' },
      { namePrefix: 'Thermal' },
      { namePrefix: 'Bluetooth' },
      { namePrefix: 'Printer' },
    ],
    optionalServices: [
      '000018f0-0000-1000-8000-00805f9b34fb',
      'e7810a71-73ae-499d-8c15-faa9aef0c3f2',
      '49535343-fe7d-4ae5-8fa9-9fafd205e455',
    ]
  });

  const server = await device.gatt.connect();
  const services = await server.getPrimaryServices();
  let writeChar = null;

  for (const service of services) {
    const chars = await service.getCharacteristics();
    for (const c of chars) {
      if (c.properties.write || c.properties.writeWithoutResponse) {
        writeChar = c;
        break;
      }
    }
    if (writeChar) break;
  }

  if (!writeChar) {
    throw new Error('Karakteristik printer Bluetooth tidak ditemukan.');
  }

  const data = buildESCPOSBuffer(txData);
  const chunkSize = 64;
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    if (writeChar.properties.write) {
      await writeChar.writeValueWithResponse(chunk);
    } else {
      await writeChar.writeValueWithoutResponse(chunk);
    }
  }

  await server.disconnect();
};

/**
 * Direct WebUSB ESC/POS Printing (USB Cable / OTG)
 */
export const printViaWebUSB = async (txData) => {
  if (!navigator.usb) {
    throw new Error('WebUSB tidak didukung pada browser ini. Gunakan Chrome/Edge.');
  }

  const device = await navigator.usb.requestDevice({ filters: [] });
  await device.open();
  await device.selectConfiguration(1);
  await device.claimInterface(0);

  const data = buildESCPOSBuffer(txData);
  // Endpoint 1 is standard for USB thermal printers
  await device.transferOut(1, data);
  await device.close();
};

/**
 * Instant Multi-Size Test Receipt
 */
export const printTestReceipt = (paperSize = '58mm') => {
  const dummyTx = {
    invoiceNo: `TEST-${paperSize.toUpperCase()}-` + Math.floor(Math.random() * 8999 + 1000),
    date: new Date().toISOString(),
    customerName: 'Pelanggan Uji Coba',
    cashier: store.state.settings.cashierName || 'Kasir',
    paymentMethod: 'cash',
    paid: 50000,
    change: 15000,
    total: 35000,
    subtotal: 35000,
    discount: 0,
    tax: 0,
    items: [
      { product: { name: 'Air Mineral 19 L (Galon)', price: 10000 }, qty: 2 },
      { product: { name: 'Pembersihan Galon', price: 15000 }, qty: 1 },
    ]
  };
  printThermalDirect(dummyTx, paperSize);
};
