/**
 * views/reports.js — Sales reports with bar chart
 */
import { getAllTransactions } from '../db.js';
import { formatRupiah }       from '../utils/currency.js';
import { todayKey, monthKey } from '../utils/date.js';
import store                  from '../store.js';

let _unsubscribe = null;


export const initReports = async () => {
  // Use store cache if available, else load
  if (store.state.transactions.length) {
    renderReportsUI(store.state.transactions);
  } else {
    await renderReports();
  }

  // Subscribe — realtime sync when transactions change from any view
  if (_unsubscribe) _unsubscribe();
  _unsubscribe = store.on('transactions:change', (txs) => {
    renderReportsUI(txs);
  });
};

export const renderReports = async () => {
  const txs = await getAllTransactions();
  store.setTransactions(txs);
};

const renderReportsUI = (txs) => {
  const view = document.getElementById('view-reports');
  if (!view) return;

  const today = todayKey();
  const month = monthKey();

  // Today stats
  const todayTxs   = txs.filter(t => t.dateKey === today);
  const todayTotal  = todayTxs.reduce((s, t) => s + t.total, 0);
  const todayCount  = todayTxs.length;

  // Month stats
  const monthTxs  = txs.filter(t => t.dateKey?.startsWith(month));
  const monthTotal = monthTxs.reduce((s, t) => s + t.total, 0);

  // All time
  const allTotal = txs.reduce((s, t) => s + t.total, 0);

  // Payment breakdown today
  const cashToday = todayTxs.filter(t => t.paymentMethod === 'cash').reduce((s,t) => s + t.total, 0);
  const tfToday   = todayTxs.filter(t => t.paymentMethod === 'transfer').reduce((s,t) => s + t.total, 0);

  // Last 7 days chart
  const last7 = buildLast7Days(txs);

  // Top products today
  const topProducts = getTopProducts(todayTxs);

  view.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">Laporan Penjualan</h2>
      <button class="btn btn--secondary btn--sm" id="btn-refresh-reports">🔄 Refresh</button>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-card__icon">📊</span>
        <div class="stat-card__value">${formatRupiah(todayTotal)}</div>
        <div class="stat-card__label">Omzet Hari Ini</div>
        <div class="stat-card__trend trend-up">↑ ${todayCount} transaksi</div>
      </div>
      <div class="stat-card">
        <span class="stat-card__icon">📅</span>
        <div class="stat-card__value">${formatRupiah(monthTotal)}</div>
        <div class="stat-card__label">Omzet Bulan Ini</div>
        <div class="stat-card__trend">${monthTxs.length} transaksi</div>
      </div>
      <div class="stat-card">
        <span class="stat-card__icon">💰</span>
        <div class="stat-card__value">${formatRupiah(allTotal)}</div>
        <div class="stat-card__label">Total Semua Waktu</div>
        <div class="stat-card__trend">${txs.length} transaksi</div>
      </div>
      <div class="stat-card">
        <span class="stat-card__icon">🧾</span>
        <div class="stat-card__value">${todayCount}</div>
        <div class="stat-card__label">Transaksi Hari Ini</div>
        <div class="stat-card__trend trend-up">
          💵 ${formatRupiah(cashToday)} tunai
        </div>
      </div>
    </div>

    <!-- Chart: Last 7 Days -->
    <div class="chart-container">
      <div class="chart-title">📈 7 Hari Terakhir</div>
      <div class="bar-chart" id="bar-chart">
        ${renderBarChart(last7)}
      </div>
    </div>

    <!-- Payment breakdown + Top products -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px">

      <!-- Payment Breakdown -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          💳 Metode Bayar Hari Ini
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px">
              <span style="width:10px;height:10px;border-radius:50%;background:#10b981;display:inline-block"></span>
              💵 Tunai
            </span>
            <strong style="color:var(--color-success)">${formatRupiah(cashToday)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="display:flex;align-items:center;gap:8px">
              <span style="width:10px;height:10px;border-radius:50%;background:var(--blue-400);display:inline-block"></span>
              📲 Transfer
            </span>
            <strong style="color:var(--text-accent)">${formatRupiah(tfToday)}</strong>
          </div>
        </div>

        <!-- Simple donut -->
        ${renderMiniDonut(cashToday, tfToday)}
      </div>

      <!-- Top Products -->
      <div class="card">
        <div style="font-size:12px;color:var(--text-secondary);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">
          🏆 Produk Terlaris Hari Ini
        </div>
        ${topProducts.length ? topProducts.slice(0, 5).map((p, i) => `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <span style="width:22px;height:22px;border-radius:50%;background:var(--grad-brand);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800">${i+1}</span>
            <span style="flex:1;font-size:13px">${p.name}</span>
            <span class="badge badge--blue">${p.qty}x</span>
          </div>
        `).join('') : '<div style="color:var(--text-muted);font-size:13px;text-align:center;padding:20px">Belum ada penjualan hari ini</div>'}
      </div>
    </div>
  `;

  // Animate bars
  setTimeout(() => {
    document.querySelectorAll('.bar').forEach(bar => {
      bar.style.height = bar.dataset.height + '%';
    });
  }, 100);

  document.getElementById('btn-refresh-reports')?.addEventListener('click', renderReports);
};

const buildLast7Days = (txs) => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const dayTxs = txs.filter(t => t.dateKey === key);
    const total  = dayTxs.reduce((s, t) => s + t.total, 0);
    const label  = new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(d);
    days.push({ key, label, total });
  }
  return days;
};

const renderBarChart = (days) => {
  const max = Math.max(...days.map(d => d.total), 1);
  return days.map(d => {
    const pct = Math.round((d.total / max) * 100);
    return `
      <div class="bar-col">
        <div class="bar" style="height:0%" data-height="${pct || 2}" data-value="${formatRupiah(d.total).replace('Rp ','Rp')}" title="${d.total}"></div>
        <div class="bar-label">${d.label}</div>
      </div>
    `;
  }).join('');
};

const renderMiniDonut = (cash, transfer) => {
  const total = cash + transfer;
  if (!total) return '';
  const cashPct = Math.round((cash / total) * 100);
  return `
    <div style="margin-top:16px;display:flex;align-items:center;gap:12px">
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="24" fill="none" stroke="var(--border-subtle)" stroke-width="10"/>
        <circle cx="30" cy="30" r="24" fill="none" stroke="#10b981" stroke-width="10"
          stroke-dasharray="${cashPct * 1.508} 150.8"
          stroke-dashoffset="37.7"
          transform="rotate(-90 30 30)"/>
        <circle cx="30" cy="30" r="24" fill="none" stroke="var(--blue-400)" stroke-width="10"
          stroke-dasharray="${(100-cashPct) * 1.508} 150.8"
          stroke-dashoffset="${37.7 - cashPct * 1.508}"
          transform="rotate(-90 30 30)"/>
      </svg>
      <div style="font-size:12px;color:var(--text-secondary)">
        <div>Tunai: <strong style="color:#10b981">${cashPct}%</strong></div>
        <div>Transfer: <strong style="color:var(--blue-400)">${100-cashPct}%</strong></div>
      </div>
    </div>
  `;
};

const getTopProducts = (txs) => {
  const map = {};
  for (const tx of txs) {
    for (const item of tx.items) {
      const key = item.product.name;
      map[key] = (map[key] || 0) + item.qty;
    }
  }
  return Object.entries(map)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty);
};
