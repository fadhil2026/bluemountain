/**
 * views/reports.js — Detailed Sales & Receivables Financial Reports with Chart.js
 * Ultra-detailed KPIs, Cash vs Debt breakdown, Product analytics, and PDF Export
 */
import { getAllTransactions } from '../db.js';
import { formatRupiah }       from '../utils/currency.js';
import { todayKey, monthKey, formatDateTime } from '../utils/date.js';
import { esc }                from '../utils/sanitize.js';
import { exportToCSV }        from '../utils/export.js';
import store                  from '../store.js';

let _unsubscribe   = null;
let _barChart      = null;
let _donutChart    = null;
let _tableFilter   = 'semua';

export const initReports = async () => {
  if (_unsubscribe) _unsubscribe();
  _unsubscribe = store.on('transactions:change', (txs) => {
    renderReportsUI(txs);
  });

  await renderReports();
};

export const renderReports = async () => {
  const txs = await getAllTransactions();
  store.setTransactions(txs);
  renderReportsUI(txs);
};

const renderReportsUI = (txs) => {
  const view = document.getElementById('view-reports');
  if (!view) return;

  const today = todayKey();
  const month = monthKey();

  // ── Financial KPI Calculations ──
  const todayTxs   = txs.filter(t => t.dateKey === today);
  const todayTotal = todayTxs.reduce((s, t) => s + t.total, 0);

  // Calculate COGS / HPP and Gross Profit
  let totalHPP = 0;
  txs.forEach(t => {
    (t.items || []).forEach(item => {
      const unitCost = Number(item.product?.cost) || 0;
      totalHPP += unitCost * (Number(item.qty) || 1);
    });
  });
  const allTotalForProfit = txs.reduce((s, t) => s + t.total, 0);
  const grossProfit = Math.max(0, allTotalForProfit - totalHPP);
  const grossMargin = allTotalForProfit > 0 ? ((grossProfit / allTotalForProfit) * 100).toFixed(1) : 0;
  const todayCount = todayTxs.length;

  const monthTxs   = txs.filter(t => t.dateKey?.startsWith(month));
  const monthTotal = monthTxs.reduce((s, t) => s + t.total, 0);
  const allTotal   = txs.reduce((s, t) => s + t.total, 0);

  // Breakdown today's methods
  const cashToday  = todayTxs.filter(t => t.paymentMethod === 'cash').reduce((s, t) => s + t.total, 0);
  const tfToday    = todayTxs.filter(t => t.paymentMethod === 'transfer' && t.paymentStatus === 'transfer_confirmed').reduce((s, t) => s + t.total, 0);
  const tfPending  = todayTxs.filter(t => t.paymentMethod === 'transfer' && t.paymentStatus === 'transfer_pending').reduce((s, t) => s + t.total, 0);
  const debtToday  = todayTxs.filter(t => t.paymentMethod === 'debt').reduce((s, t) => s + t.total, 0);

  // Debt installments collected today across all transactions
  const cicilanToday = txs.reduce((sum, t) => {
    for (const p of (t.debtPayments || [])) {
      if (p.date && p.date.split('T')[0] === today) {
        sum += (p.amount || 0);
      }
    }
    return sum;
  }, 0);

  // Real cash collected today
  const kasRealToday = cashToday + tfToday + cicilanToday;

  // Total outstanding receivables across all time
  const totalPiutangBelumLunas = txs.reduce((sum, t) => sum + (t.remainingDebt || 0), 0);
  const totalTfPendingAll      = txs.filter(t => t.paymentStatus === 'transfer_pending').reduce((sum, t) => sum + t.total, 0);

  const topProducts = getTopProducts(todayTxs);
  const last7       = buildLast7Days(txs);

  // Destroy previous chart instances to prevent canvas reuse error
  if (_barChart)   { _barChart.destroy();   _barChart   = null; }
  if (_donutChart) { _donutChart.destroy(); _donutChart = null; }

  // Pagination for Report Table (10/page)
  let filtered = [...txs];
  if (_tableFilter === 'cash')     filtered = filtered.filter(t => t.paymentMethod === 'cash');
  if (_tableFilter === 'transfer') filtered = filtered.filter(t => t.paymentMethod === 'transfer');
  if (_tableFilter === 'debt')     filtered = filtered.filter(t => t.paymentMethod === 'debt');
  const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalPages = Math.max(1, Math.ceil(sorted.length / 10));
  if (typeof _reportPage === 'undefined') window._reportPage = 1;
  if (window._reportPage > totalPages) window._reportPage = totalPages;
  if (window._reportPage < 1) window._reportPage = 1;
  const pageItems = sorted.slice((window._reportPage - 1) * 10, window._reportPage * 10);

  view.innerHTML = `
    <div class="section-header">
      <div>
        <h2 class="section-title">📊 Laporan Penjualan &amp; Keuangan Real</h2>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">
          Analisis mendalam omzet, kas masuk, piutang, cicilan, &amp; performa produk
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn--secondary btn--sm" id="btn-refresh-reports">🔄 Refresh</button>
        <button class="btn btn--secondary btn--sm" id="btn-export-pdf-report">📄 Export PDF</button>
        <button class="btn btn--primary btn--sm" id="btn-export-csv-report" style="font-weight:700">📊 Export Excel / CSV</button>
      </div>
    </div>

    <!-- Stats Grid: Financial KPIs -->
    <div class="stats-grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      <div class="stat-card" style="border-left:4px solid var(--blue-600)">
        <span class="stat-card__icon">📊</span>
        <div class="stat-card__value" style="color:var(--blue-700)">${formatRupiah(todayTotal)}</div>
        <div class="stat-card__label">Omzet Gross Hari Ini</div>
        <div class="stat-card__trend trend-up">↑ ${todayCount} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #16a34a">
        <span class="stat-card__icon">💵</span>
        <div class="stat-card__value" style="color:#16a34a">${formatRupiah(kasRealToday)}</div>
        <div class="stat-card__label">Kas Masuk Real Hari Ini</div>
        <div class="stat-card__trend" style="color:#16a34a;font-size:10px;font-weight:700">Tunai + Transfer + Cicilan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #8b5cf6">
        <span class="stat-card__icon">💰</span>
        <div class="stat-card__value" style="color:#8b5cf6">${formatRupiah(cicilanToday)}</div>
        <div class="stat-card__label">Cicilan Piutang Terkumpul</div>
        <div class="stat-card__trend" style="color:var(--text-muted);font-size:10px">Pelunasan masuk hari ini</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #dc2626">
        <span class="stat-card__icon">🔴</span>
        <div class="stat-card__value" style="color:#dc2626">${formatRupiah(totalPiutangBelumLunas)}</div>
        <div class="stat-card__label">Total Piutang Belum Lunas</div>
        <div class="stat-card__trend" style="color:#dc2626;font-size:10px">Semua pelanggan</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #d97706">
        <span class="stat-card__icon">📅</span>
        <div class="stat-card__value">${formatRupiah(monthTotal)}</div>
        <div class="stat-card__label">Omzet Bulan Ini</div>
        <div class="stat-card__trend">${monthTxs.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid var(--text-secondary)">
        <span class="stat-card__icon">🏛️</span>
        <div class="stat-card__value">${formatRupiah(allTotal)}</div>
        <div class="stat-card__label">Total Omzet All-Time</div>
        <div class="stat-card__trend">${txs.length} transaksi</div>
      </div>

      <div class="stat-card" style="border-left:4px solid #059669">
        <span class="stat-card__icon">📈</span>
        <div class="stat-card__value" style="color:#059669">${formatRupiah(grossProfit)}</div>
        <div class="stat-card__label">Estimasi Laba Kotor (Gross Profit)</div>
        <div class="stat-card__trend" style="color:#059669;font-weight:700">Margin: ${grossMargin}% (HPP: ${formatRupiah(totalHPP)})</div>
      </div>
    </div>

    <!-- Chart: Last 7 Days -->
    <div class="chart-container">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div class="chart-title" style="margin-bottom:0">📈 Tren Omzet (7 Hari Terakhir)</div>
        <div style="font-size:11px;color:var(--text-muted)">Grafik Penjualan Harian</div>
      </div>
      <div style="position:relative;height:200px">
        <canvas id="chart-bar"></canvas>
      </div>
    </div>

    <!-- Payment breakdown + Top products -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:16px">

      <!-- Payment Breakdown & Real Cash -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          💳 Komposisi Penerimaan Hari Ini
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#10b981;display:inline-block"></span>
              💵 Tunai
            </span>
            <strong style="color:var(--color-success)">${formatRupiah(cashToday)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#3b82f6;display:inline-block"></span>
              📲 Transfer Confirmed
            </span>
            <strong style="color:#2563eb">${formatRupiah(tfToday)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#8b5cf6;display:inline-block"></span>
              💰 Cicilan Piutang Masuk
            </span>
            <strong style="color:#7c3aed">${formatRupiah(cicilanToday)}</strong>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block"></span>
              📋 Piutang Baru Ditambah
            </span>
            <strong style="color:#dc2626">${formatRupiah(debtToday)}</strong>
          </div>

          ${tfPending > 0 ? `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:#fef9c3;border-radius:8px">
            <span style="font-size:12px;color:#92400e;font-weight:600">⏳ Transfer Pending</span>
            <strong style="color:#92400e;font-size:12px">${formatRupiah(tfPending)}</strong>
          </div>` : ''}
        </div>

        <!-- Donut Chart -->
        <div style="margin-top:16px;display:flex;align-items:center;justify-content:center;height:140px">
          ${(cashToday + tfToday + debtToday + cicilanToday) > 0
            ? `<canvas id="chart-donut" width="140" height="140"></canvas>`
            : `<div style="color:var(--text-muted);font-size:12px;text-align:center">Belum ada transaksi hari ini</div>`
          }
        </div>
      </div>

      <!-- Top Products -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          🏆 Produk Terlaris Hari Ini
        </div>
        ${topProducts.length
          ? topProducts.slice(0, 7).map((p, i) => `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <span style="width:24px;height:24px;border-radius:50%;background:var(--grad-brand);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white">${i + 1}</span>
              <span style="flex:1;font-size:13px;font-weight:600;color:var(--text-primary)">${esc(p.name)}</span>
              <span class="badge badge--blue" style="font-weight:800">${p.qty}x</span>
            </div>
          `).join('')
          : '<div style="color:var(--text-muted);font-size:13px;text-align:center;padding:30px">Belum ada penjualan hari ini</div>'
        }
      </div>
    </div>

    <!-- Detailed Ledger & Transaction Analysis Table -->
    <div class="card card--elevated" style="overflow:hidden;padding:0">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding:14px 16px;border-bottom:1.5px solid var(--border-subtle)">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:800;text-transform:uppercase;letter-spacing:.05em">
          📋 Analisis Detail Penjualan &amp; Status Pelunasan (${sorted.length} data)
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="cat-pill ${_tableFilter === 'semua' ? 'active' : ''}" data-rpt-filter="semua">Semua</button>
          <button class="cat-pill ${_tableFilter === 'cash' ? 'active' : ''}" data-rpt-filter="cash">💵 Tunai</button>
          <button class="cat-pill ${_tableFilter === 'transfer' ? 'active' : ''}" data-rpt-filter="transfer">📲 Transfer</button>
          <button class="cat-pill ${_tableFilter === 'debt' ? 'active' : ''}" data-rpt-filter="debt">📋 Hutang / Piutang</button>
        </div>
      </div>

      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
        <table class="data-table" id="report-tx-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Tanggal &amp; Waktu</th>
              <th>Pelanggan</th>
              <th>Item Pembelian</th>
              <th>Total Tagihan</th>
              <th>Kas Terkumpul</th>
              <th>Sisa Piutang</th>
              <th>Skema &amp; Status</th>
            </tr>
          </thead>
          <tbody>
            ${renderReportTableRows(pageItems)}
          </tbody>
        </table>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:white;border-top:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px">
        <div style="font-size:12px;color:var(--text-muted)">Hal ${window._reportPage} dari ${totalPages}</div>
        <div style="display:flex;gap:6px">
          <button class="btn btn--secondary btn--sm" id="rpt-prev" ${window._reportPage <= 1 ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>◀ Sebelumnya</button>
          <button class="btn btn--secondary btn--sm" id="rpt-next" ${window._reportPage >= totalPages ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>Berikutnya ▶</button>
        </div>
      </div>
    </div>
  `;

  // Bind events
  document.getElementById('btn-refresh-reports')?.addEventListener('click', renderReports);
  document.getElementById('btn-export-pdf-report')?.addEventListener('click', () => exportReportPDF(txs, today, month));
  document.getElementById('btn-export-csv-report')?.addEventListener('click', () => {
    const headers = ['Tanggal', 'No. Invoice', 'Kasir', 'Pelanggan', 'Metode Pembayaran', 'Status Pembayaran', 'Subtotal', 'Diskon', 'Pajak', 'Grand Total', 'Sisa Piutang'];
    const rows = sorted.map(t => [
      formatDateTime(new Date(t.date)),
      t.invoiceNo || '',
      t.cashier || 'Admin',
      t.customerName || '-',
      t.paymentMethod || 'cash',
      t.paymentStatus || 'paid',
      t.subtotal || 0,
      t.discount || 0,
      t.tax || 0,
      t.total || 0,
      t.remainingDebt || 0,
    ]);
    const dateTag = todayKey();
    exportToCSV(`Laporan-Penjualan-${dateTag}.csv`, headers, rows);
    window.showToast?.('✅ Laporan penjualan berhasil diekspor ke Excel/CSV!', 'success');
  });

  document.getElementById('rpt-prev')?.addEventListener('click', () => {
    if (window._reportPage > 1) { window._reportPage--; renderReportsUI(txs); }
  });
  document.getElementById('rpt-next')?.addEventListener('click', () => {
    window._reportPage++; renderReportsUI(txs);
  });

  // Table filter clicks
  document.querySelectorAll('[data-rpt-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      _tableFilter = btn.dataset.rptFilter;
      window._reportPage = 1;
      renderReportsUI(txs);
    });
  });

  // Render charts after DOM is ready
  requestAnimationFrame(() => renderCharts(last7, cashToday, tfToday, debtToday, cicilanToday));
};

/* ── Render Report Table Rows ── */
const renderReportTableRows = (pageItems) => {
  if (!pageItems.length) {
    return `<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)">Tidak ada transaksi untuk filter ini</td></tr>`;
  }

  return pageItems.map(t => {
    const totalAmt = t.total || 0;
    let paidAmt    = 0;
    let remAmt     = 0;

    if (t.paymentMethod === 'cash') {
      paidAmt = totalAmt;
    } else if (t.paymentMethod === 'transfer') {
      if (t.paymentStatus === 'transfer_confirmed') paidAmt = totalAmt;
      else remAmt = totalAmt;
    } else if (t.paymentMethod === 'debt') {
      paidAmt = t.paidAmount || 0;
      remAmt  = t.remainingDebt || 0;
    }

    const itemsSummary = (t.items || [])
      .map(i => `${i.product?.name || 'Item'} (${i.qty}x)`)
      .join(', ');

    const statusBadgeHtml = t.paymentMethod === 'debt'
      ? (remAmt === 0
          ? '<span class="badge badge--green">✅ LUNAS</span>'
          : `<span class="badge" style="background:#fee2e2;color:#991b1b">🔴 Sisa ${formatRupiah(remAmt)}</span>`)
      : (t.paymentStatus === 'transfer_pending'
          ? '<span class="badge" style="background:#fef3c7;color:#92400e">⏳ Pending</span>'
          : '<span class="badge badge--green">✅ Lunas</span>');

    const methodLabel = t.paymentMethod === 'cash' ? '💵 Tunai' : t.paymentMethod === 'transfer' ? '📲 Transfer' : '📋 Hutang';

    return `
      <tr>
        <td style="font-family:monospace;font-size:11px;color:var(--blue-700);font-weight:700">${esc(t.invoiceNo)}</td>
        <td style="font-size:11px;white-space:nowrap">${formatDateTime(new Date(t.date))}</td>
        <td><strong style="color:var(--text-primary)">${esc(t.customerName || '—')}</strong></td>
        <td style="font-size:11px;color:var(--text-secondary);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${esc(itemsSummary)}">${esc(itemsSummary || '—')}</td>
        <td style="font-weight:800;color:var(--blue-700);white-space:nowrap">${formatRupiah(totalAmt)}</td>
        <td style="font-weight:800;color:#16a34a;white-space:nowrap">${formatRupiah(paidAmt)}</td>
        <td style="font-weight:800;color:#dc2626;white-space:nowrap">${remAmt > 0 ? formatRupiah(remAmt) : '—'}</td>
        <td style="white-space:nowrap"><span class="badge badge--blue" style="margin-right:4px">${methodLabel}</span> ${statusBadgeHtml}</td>
      </tr>
    `;
  }).join('');
};

/* ── Chart.js rendering ── */
const renderCharts = async (last7, cashToday, tfToday, debtToday, cicilanToday) => {
  const { Chart, registerables } = await import('chart.js');
  Chart.register(...registerables);

  // Bar Chart
  const barCtx = document.getElementById('chart-bar');
  if (barCtx) {
    _barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: last7.map(d => d.label),
        datasets: [{
          label: 'Omzet Harian (Rp)',
          data: last7.map(d => d.total),
          backgroundColor: last7.map((_, i) => i === 6 ? 'rgba(37,99,235,0.85)' : 'rgba(37,99,235,0.35)'),
          borderRadius: 6,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ' ' + formatRupiah(ctx.raw),
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (v) => formatRupiah(v),
              font: { size: 10 },
              maxTicksLimit: 5,
            },
            grid: { color: 'rgba(37,99,235,0.06)' },
          },
          x: {
            ticks: { font: { size: 11 } },
            grid: { display: false },
          },
        },
      },
    });
  }

  // Donut Chart
  const donutCtx = document.getElementById('chart-donut');
  const totalVal = cashToday + tfToday + debtToday + cicilanToday;
  if (donutCtx && totalVal > 0) {
    _donutChart = new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Tunai', 'Transfer', 'Piutang Baru', 'Cicilan Masuk'],
        datasets: [{
          data: [cashToday, tfToday, debtToday, cicilanToday],
          backgroundColor: ['#10b981', '#3b82f6', '#ef4444', '#8b5cf6'],
          borderWidth: 2,
          borderColor: '#fff',
          hoverOffset: 4,
        }],
      },
      options: {
        responsive: false,
        cutout: '65%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${formatRupiah(ctx.raw)}`,
            },
          },
        },
      },
    });
  }
};

/* ── PDF Export ── */
const exportReportPDF = async (txs, today, month) => {
  try {
    const btn = document.getElementById('btn-export-pdf-report');
    if (btn) { btn.textContent = '⏳ Memproses PDF...'; btn.disabled = true; }

    const { jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');

    const doc    = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const s      = store.state.settings;
    const pageW  = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(s.shopName || 'Blue Mountain Refilling Station', pageW / 2, 16, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('LAPORAN PENJUALAN & ANALISIS KEUANGAN LENGKAP', pageW / 2, 22, { align: 'center' });
    doc.text(`Dicetak: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`, pageW / 2, 27, { align: 'center' });

    // Summary KPIs Table
    const todayTxs    = txs.filter(t => t.dateKey === today);
    const todayTotal  = todayTxs.reduce((s, t) => s + t.total, 0);
    const monthTotal  = txs.filter(t => t.dateKey?.startsWith(month)).reduce((s, t) => s + t.total, 0);
    const allTotal    = txs.reduce((s, t) => s + t.total, 0);
    const cashToday   = todayTxs.filter(t => t.paymentMethod === 'cash').reduce((s, t) => s + t.total, 0);
    const tfToday     = todayTxs.filter(t => t.paymentMethod === 'transfer' && t.paymentStatus === 'transfer_confirmed').reduce((s, t) => s + t.total, 0);
    const cicilanToday = txs.reduce((sum, t) => {
      for (const p of (t.debtPayments || [])) {
        if (p.date && p.date.split('T')[0] === today) sum += (p.amount || 0);
      }
      return sum;
    }, 0);
    const kasRealToday = cashToday + tfToday + cicilanToday;
    const totalPiutangBelumLunas = txs.reduce((sum, t) => sum + (t.remainingDebt || 0), 0);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Ringkasan Kinerja Keuangan', 14, 35);

    const summaryRows = [
      ['Omzet Gross Hari Ini', formatRupiah(todayTotal)],
      ['Kas Masuk Real Hari Ini (Tunai+TF+Cicilan)', formatRupiah(kasRealToday)],
      ['Cicilan Piutang Terkumpul Hari Ini', formatRupiah(cicilanToday)],
      ['Total Piutang Belum Lunas (Semua Pelanggan)', formatRupiah(totalPiutangBelumLunas)],
      ['Omzet Bulan Ini', formatRupiah(monthTotal)],
      ['Total Omzet All-Time', formatRupiah(allTotal)],
      ['Jumlah Transaksi Hari Ini', `${todayTxs.length} transaksi`],
    ];

    autoTable(doc, {
      startY: 38,
      head: [['Indikator Keuangan', 'Nilai (Rp)']],
      body: summaryRows,
      theme: 'grid',
      headStyles: { fillColor: [30, 58, 138], textColor: 255, fontStyle: 'bold' },
      columnStyles: { 1: { halign: 'right', fontStyle: 'bold' } },
      margin: { left: 14, right: 14 },
    });

    // Transaction table
    const startY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('2. Rincian Riwayat Transaksi & Pelunasan', 14, startY);

    const sorted = [...txs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 80);
    autoTable(doc, {
      startY: startY + 4,
      head: [['Invoice', 'Tanggal', 'Pelanggan', 'Metode', 'Total Tagihan', 'Terbayar', 'Sisa Piutang', 'Status']],
      body: sorted.map(tx => {
        let paidAmt = tx.paymentMethod === 'cash' ? tx.total : tx.paymentMethod === 'transfer' ? (tx.paymentStatus === 'transfer_confirmed' ? tx.total : 0) : (tx.paidAmount || 0);
        let remAmt  = tx.paymentMethod === 'debt' ? (tx.remainingDebt || 0) : tx.paymentStatus === 'transfer_pending' ? tx.total : 0;
        return [
          tx.invoiceNo || '-',
          new Date(tx.date).toLocaleDateString('id-ID'),
          tx.customerName || '—',
          tx.paymentMethod === 'cash' ? 'Tunai' : tx.paymentMethod === 'transfer' ? 'Transfer' : 'Hutang',
          formatRupiah(tx.total),
          formatRupiah(paidAmt),
          remAmt > 0 ? formatRupiah(remAmt) : '—',
          tx.paymentMethod === 'debt' ? (remAmt === 0 ? 'Lunas' : 'Cicilan') : tx.paymentStatus === 'transfer_pending' ? 'Pending' : 'Lunas',
        ];
      }),
      theme: 'striped',
      headStyles: { fillColor: [30, 58, 138], textColor: 255, fontStyle: 'bold', fontSize: 8 },
      bodyStyles: { fontSize: 8 },
      columnStyles: { 4: { halign: 'right' }, 5: { halign: 'right' }, 6: { halign: 'right' } },
      margin: { left: 14, right: 14 },
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Hal ${i} dari ${pageCount} — ${s.shopName || 'Blue Mountain POS'}`, pageW / 2, doc.internal.pageSize.getHeight() - 8, { align: 'center' });
    }

    doc.save(`Laporan-Keuangan-${today}.pdf`);
    window.showToast('Laporan PDF berhasil diekspor!', 'success');
  } catch (err) {
    console.error('[pdf-report]', err);
    window.showToast('Gagal export PDF', 'error');
  } finally {
    const btn = document.getElementById('btn-export-pdf-report');
    if (btn) { btn.textContent = '📄 Export PDF Laporan'; btn.disabled = false; }
  }
};

/* ── Helpers ── */
const buildLast7Days = (txs) => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d     = new Date();
    d.setDate(d.getDate() - i);
    const key   = todayKey(d);
    const total = txs.filter(t => t.dateKey === key).reduce((s, t) => s + t.total, 0);
    const label = new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(d);
    days.push({ key, label, total });
  }
  return days;
};

const getTopProducts = (txs) => {
  const map = {};
  for (const tx of txs) {
    for (const item of (tx.items || [])) {
      if (!item?.product?.name) continue;
      const key = item.product.name;
      map[key]  = (map[key] || 0) + item.qty;
    }
  }
  return Object.entries(map)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty);
};
