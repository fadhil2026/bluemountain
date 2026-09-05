/**
 * printer.js — Universal Thermal POS Printing Engine (48mm / 58mm / 80mm)
 *
 * Supported Protocols:
 * 1. Universal Direct Thermal Print (Zero Margin CSS @page: 48mm / 58mm / 80mm)
 * 2. Web Bluetooth Direct ESC/POS (Zero-app BLE on Chrome/Android/Edge)
 * 3. WebUSB Direct ESC/POS (USB Cable / OTG on Chrome/Edge/Android)
 * 4. Android App Intents (RawBT & Bluetooth Print App)
 * 5. WhatsApp Digital Receipt (Direct wa.me Text Invoice)
 */
import { buildReceiptJSON }                     from './receipt.js';
import { formatRupiah }                         from './utils/currency.js';
import { formatDateTime }                       from './utils/date.js';
import { LOGO_THERMAL_BASE64, LOGO_ESCPOS_RASTER } from './utils/logo-thermal.js';
import store                                    from './store.js';

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
 * Generate WhatsApp Text Invoice Link (wa.me)
 */
export const getWhatsAppReceiptUrl = (txData, targetPhone = '') => {
  const s = store.state.settings || {};
  const phone = (targetPhone || txData.customerPhone || '').replace(/\D/g, '');
  const cleanPhone = phone.startsWith('08') ? '62' + phone.slice(1) : (phone.startsWith('8') ? '62' + phone : phone);
  
  let msg = `*STRUK PEMBELIAN — ${s.shopName || 'BLUE MOUNTAIN'}*\n`;
  msg += `--------------------------------\n`;
  msg += `No. Invoice : ${txData.invoiceNo || '-'}\n`;
  msg += `Tanggal     : ${formatDateTime(new Date(txData.date || Date.now()))}\n`;
  if (txData.customerName) msg += `Pelanggan   : ${txData.customerName}\n`;
  msg += `Kasir       : ${txData.cashier || 'Kasir'}\n`;
  msg += `--------------------------------\n`;

  for (const item of (txData.items || [])) {
    if (!item?.product) continue;
    const pName = item.product.name;
    const pQty = item.qty;
    const pPrice = item.product.price;
    msg += `${pName}\n  ${pQty} x ${formatRupiah(pPrice)} = ${formatRupiah(pPrice * pQty)}\n`;
  }

  msg += `--------------------------------\n`;
  if (txData.discount > 0) msg += `Diskon      : -${formatRupiah(txData.discount)}\n`;
  if (txData.tax > 0)      msg += `Pajak       : ${formatRupiah(txData.tax)}\n`;
  msg += `*TOTAL       : ${formatRupiah(txData.total)}*\n`;
  
  if (txData.paymentMethod === 'cash') {
    msg += `Bayar Tunai : ${formatRupiah(txData.paid || txData.total)}\n`;
    if (txData.change > 0) msg += `Kembalian   : ${formatRupiah(txData.change)}\n`;
  } else if (txData.paymentMethod === 'transfer') {
    msg += `Metode      : Transfer Bank (Lunas ✅)\n`;
  } else if (txData.paymentMethod === 'debt') {
    msg += `DP Dibayar  : ${formatRupiah(txData.paidAmount || 0)}\n`;
    msg += `*Sisa Hutang : ${formatRupiah(txData.remainingDebt || 0)}*\n`;
  }

  msg += `--------------------------------\n`;
  msg += `Terima kasih atas kunjungan Anda!\n`;
  if (s.shopAddress) msg += `${s.shopAddress}\n`;
  if (s.shopPhone)   msg += `Telp: ${s.shopPhone}\n`;

  const encoded = encodeURIComponent(msg);
  return cleanPhone ? `https://wa.me/${cleanPhone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
};

/**
 * Generate 48mm / 58mm / 80mm HTML Receipt for Direct Print & Modal Preview
 */
export const getReceiptPreviewHTML = (txData, paperWidth = null) => {
  const settings = store.state.settings || {};
  const sizeKey  = paperWidth || settings.printerPaper || '58mm';
  const spec     = PAPER_SPECS[sizeKey] || PAPER_SPECS['58mm'];
  const items    = txData.items || [];

  const sep = () => '<div style="border-top:1px dashed #333;margin:4px 0"></div>';

  let html = `<div class="thermal-receipt" style="width:${spec.widthPx};margin:0 auto;font-family:'Courier New',Consolas,monospace;color:#000;background:#fff;padding:2px 4px">`;

  // 1. Logo (Center aligned, compact gap with header)
  html += `<div style="text-align:center;margin:0 auto 2px auto;line-height:1">
    <img src="${LOGO_THERMAL_BASE64}"
         class="thermal-logo"
         alt="Blue Mountain"
         width="65"
         height="65"
         style="width:${spec.logoWidth};height:auto;max-width:100%;object-fit:contain;display:block;margin:0 auto;-webkit-print-color-adjust:exact;print-color-adjust:exact">
  </div>`;

  // 2. Shop Header (ALL CAPS & BOLD with distinct bottom gap before address)
  const rawShopName = settings.shopName || 'Blue Mountain Refilling Station';
  html += `<div style="text-align:center;margin-bottom:6px">`;
  if (rawShopName.toLowerCase().includes('blue mountain') && rawShopName.toLowerCase().includes('refilling station')) {
    html += `<div style="font-weight:900;font-size:${sizeKey === '80mm' ? '15px' : '13px'};line-height:1.2;letter-spacing:0.5px">BLUE MOUNTAIN</div>`;
    html += `<div style="font-weight:800;font-size:${sizeKey === '80mm' ? '12px' : '11px'};line-height:1.2;letter-spacing:0.3px">REFILLING STATION</div>`;
  } else {
    const lines = rawShopName.toUpperCase().split('\n');
    lines.forEach(l => {
      html += `<div style="font-weight:900;font-size:${sizeKey === '80mm' ? '14px' : '12px'};line-height:1.2">${l.trim()}</div>`;
    });
  }
  html += `</div>`;

  if (settings.shopAddress) {
    html += `<div style="text-align:center;font-size:10px;line-height:1.35;word-break:normal;overflow-wrap:break-word;margin-bottom:2px">${settings.shopAddress}</div>`;
  }
  if (settings.shopPhone) {
    html += `<div style="text-align:center;font-size:10px;line-height:1.35">Telp: ${settings.shopPhone}</div>`;
  }
  
  html += sep();
  html += `<div style="font-size:10px;line-height:1.4">`;
  html += `<div>No&nbsp;&nbsp;&nbsp;: <b>${txData.invoiceNo || '-'}</b></div>`;
  html += `<div>Tgl&nbsp;&nbsp;: ${formatDateTime(new Date(txData.date || Date.now()))}</div>`;
  if (txData.customerName) html += `<div>Cust&nbsp;: ${txData.customerName}</div>`;
  if (txData.cashier)      html += `<div>Kasir: ${txData.cashier}</div>`;
  html += `</div>`;
  html += sep();

  // Item List
  for (const item of items) {
    if (!item?.product) continue;
    const pName = item.product.name;
    const pQty = item.qty;
    const pPrice = item.product.price;
    const pSubtotal = pPrice * pQty;

    html += `<div style="font-weight:700;font-size:${spec.fontSize};line-height:1.3">${pName}</div>`;
    html += `<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.3;margin-bottom:3px">
      <span>&nbsp;&nbsp;${pQty} x ${formatRupiah(pPrice)}</span>
      <span style="font-weight:600">${formatRupiah(pSubtotal)}</span>
    </div>`;
  }

  html += sep();

  // Totals & Discounts
  if (txData.discount > 0) {
    html += `<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Subtotal</span><span>${formatRupiah(txData.subtotal || txData.total + txData.discount)}</span>
    </div>`;
    html += `<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Diskon</span><span>-${formatRupiah(txData.discount)}</span>
    </div>`;
  }
  if (txData.tax > 0) {
    html += `<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Pajak</span><span>${formatRupiah(txData.tax)}</span>
    </div>`;
  }

  // Grand Total
  html += `<div style="display:flex;justify-content:space-between;font-size:${sizeKey === '80mm' ? '14px' : '13px'};font-weight:900;margin:3px 0;letter-spacing:0.5px">
    <span>TOTAL</span><span>${formatRupiah(txData.total)}</span>
  </div>`;

  // Payment Breakdown
  if (txData.paymentMethod === 'cash') {
    html += `<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Bayar Tunai</span><span>${formatRupiah(txData.paid || txData.total)}</span>
    </div>`;
    html += `<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:800;line-height:1.35">
      <span>Kembali</span><span>${formatRupiah(txData.change || 0)}</span>
    </div>`;
  } else if (txData.paymentMethod === 'transfer') {
    html += `<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>Transfer Bank</span><span>${formatRupiah(txData.total)}</span>
    </div>`;
    html += `<div style="text-align:center;font-size:9px;margin-top:2px">Status: ${txData.paymentStatus === 'transfer_confirmed' ? 'TERKONFIRMASI ✅' : 'MENUNGGU KONFIRMASI ⏳'}</div>`;
  } else if (txData.paymentMethod === 'debt') {
    html += `<div style="display:flex;justify-content:space-between;font-size:10px;line-height:1.35">
      <span>DP Dibayar</span><span>${formatRupiah(txData.paidAmount || 0)}</span>
    </div>`;
    html += `<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:800;line-height:1.35">
      <span>Sisa Hutang</span><span>${formatRupiah(txData.remainingDebt || 0)}</span>
    </div>`;
  }

  html += sep();
  html += `<div style="text-align:center;margin-top:4px">
    <div style="font-size:10px;font-weight:700;line-height:1.35">Terima kasih sudah berbelanja!</div>
    <div style="font-size:9px;font-weight:800;letter-spacing:0.5px;margin-top:2px">BLUE MOUNTAIN REFILLING STATION</div>
  </div>`;
  html += `<div style="height:4px"></div>`;
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

  // Use a properly dimensioned off-screen frame so browser rendering engine performs complete layout & bitmap paint
  const printFrame = document.createElement('iframe');
  printFrame.style.position = 'fixed';
  printFrame.style.top      = '-9999px';
  printFrame.style.left     = '-9999px';
  printFrame.style.width    = '400px';
  printFrame.style.height   = '800px';
  printFrame.style.border   = 'none';
  printFrame.style.opacity  = '0';
  printFrame.style.pointerEvents = 'none';
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
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    @media print {
      html, body {
        width: ${spec.width};
        margin: 0 !important;
        padding: 1mm 2mm !important;
        background: #fff !important;
        color: #000 !important;
      }
      .thermal-receipt {
        width: 100% !important;
        padding: 0 !important;
      }
      img, .thermal-logo {
        max-width: ${spec.logoWidth} !important;
        width: ${spec.logoWidth} !important;
        height: auto !important;
        display: block !important;
        margin: 0 auto 6px auto !important;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
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

  const triggerPrint = () => {
    try {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
    } catch (e) {
      console.warn('[print-frame] Direct iframe print fallback to popup', e);
      const win = window.open('', '_blank', 'width=350,height=600');
      if (win) {
        win.document.write(doc.documentElement.outerHTML);
        win.document.close();
        win.focus();
        setTimeout(() => { win.print(); setTimeout(() => win.close(), 1000); }, 300);
      }
    } finally {
      setTimeout(() => printFrame.remove(), 3000);
    }
  };

  // Immediate or onload synchronization
  const img = doc.querySelector('img');
  if (img && !img.complete) {
    img.onload = () => setTimeout(triggerPrint, 120);
    img.onerror = () => setTimeout(triggerPrint, 120);
    setTimeout(triggerPrint, 800);
  } else {
    setTimeout(triggerPrint, 200);
  }
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

  const wrapText = (str, width = colWidth) => {
    if (!str) return [];
    const words = str.split(' ');
    const lines = [];
    let current = '';
    for (const w of words) {
      if (!current) {
        current = w;
      } else if ((current + ' ' + w).length <= width) {
        current += ' ' + w;
      } else {
        lines.push(current);
        current = w;
      }
    }
    if (current) lines.push(current);
    return lines;
  };

  let buffer = [];
  const pushCmd = (arr) => buffer.push(...arr);
  const pushBytes = (arr) => {
    for (const b of arr) buffer.push(b);
  };
  const pushText = (txt) => {
    const encoded = encoder.encode(txt + '\n');
    for (const b of encoded) buffer.push(b);
  };

  // 1. Init Printer
  pushCmd([0x1B, 0x40]); // ESC @

  // 2. Prepend ESC/POS 1-bit Monochrome Raster Logo (160x160 px, exact 3211 bytes)
  pushBytes(LOGO_ESCPOS_RASTER);

  // 3. Shop Header (Center, ALL CAPS, Bold)
  pushCmd([0x1B, 0x61, 0x01]); // Align Center
  const rawShopName = settings.shopName || 'Blue Mountain Refilling Station';
  if (rawShopName.toLowerCase().includes('blue mountain') && rawShopName.toLowerCase().includes('refilling station')) {
    pushCmd([0x1B, 0x45, 0x01]); // Bold ON
    pushCmd([0x1B, 0x21, 0x10]); // Double Height
    pushText('BLUE MOUNTAIN');
    pushCmd([0x1B, 0x21, 0x00]); // Normal
    pushCmd([0x1B, 0x45, 0x01]); // Bold ON
    pushText('REFILLING STATION');
    pushCmd([0x1B, 0x45, 0x00]); // Bold OFF
  } else {
    pushCmd([0x1B, 0x45, 0x01]); // Bold ON
    pushCmd([0x1B, 0x21, 0x10]); // Double Height
    const lines = rawShopName.toUpperCase().split('\n');
    lines.forEach(l => pushText(l.trim()));
    pushCmd([0x1B, 0x21, 0x00]); // Normal
    pushCmd([0x1B, 0x45, 0x00]); // Bold OFF
  }

  // Distinct gap before address
  pushCmd([0x1B, 0x4A, 14]); // ESC J 14: Feed 14 dots (~1.75mm clean gap)

  // Address wrapped cleanly at word boundaries
  if (settings.shopAddress) {
    const addrLines = wrapText(settings.shopAddress, colWidth);
    addrLines.forEach(l => pushText(l));
  }
  if (settings.shopPhone) pushText(`Telp: ${settings.shopPhone}`);
  
  // 4. Divider
  pushCmd([0x1B, 0x61, 0x00]); // Align Left
  pushText('-'.repeat(colWidth));

  // 5. Invoice Meta (Aligned colons)
  pushText(`No   : ${txData.invoiceNo || '-'}`);
  pushText(`Tgl  : ${formatDateTime(new Date(txData.date || Date.now()))}`);
  if (txData.customerName) pushText(`Cust : ${txData.customerName}`);
  if (txData.cashier)      pushText(`Kasir: ${txData.cashier}`);
  pushText('-'.repeat(colWidth));

  // 6. Items
  for (const item of (txData.items || [])) {
    if (!item?.product) continue;
    pushCmd([0x1B, 0x45, 0x01]); // Bold
    pushText(item.product.name);
    pushCmd([0x1B, 0x45, 0x00]); // Normal
    pushText(padLR(`  ${item.qty} x ${formatRupiah(item.product.price)}`, formatRupiah(item.product.price * item.qty)));
  }
  pushText('-'.repeat(colWidth));

  // 7. Totals
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
  } else if (txData.paymentMethod === 'transfer') {
    pushText(padLR('Transfer Bank', formatRupiah(txData.total)));
    pushText(padLR('Status', txData.paymentStatus === 'transfer_confirmed' ? 'TERKONFIRMASI' : 'MENUNGGU'));
  } else if (txData.paymentMethod === 'debt') {
    pushText(padLR('DP Dibayar', formatRupiah(txData.paidAmount || 0)));
    pushCmd([0x1B, 0x45, 0x01]);
    pushText(padLR('Sisa Hutang', formatRupiah(txData.remainingDebt || 0)));
    pushCmd([0x1B, 0x45, 0x00]);
  }

  // 8. Footer
  pushText('-'.repeat(colWidth));
  pushCmd([0x1B, 0x61, 0x01]); // Align Center
  pushCmd([0x1B, 0x45, 0x01]); // Bold ON
  pushText('Terima kasih sudah berbelanja!');
  pushText('BLUE MOUNTAIN REFILLING STATION');
  pushCmd([0x1B, 0x45, 0x00]); // Bold OFF
  
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
