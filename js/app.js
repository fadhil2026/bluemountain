/**
 * app.js — Main application bootstrap
 * Blue Mountain Refilling Station POS v2.0
 */
import { openDB, seedDefaultProducts, getSetting } from './db.js';
import store                                         from './store.js';
import { formatDate, formatTime }                    from './utils/date.js';
import { initPOS, refreshPOS }                       from './views/pos.js';
import { initProducts, renderProducts }              from './views/products.js';
import { initTransactions, renderTransactions }      from './views/transactions.js';
import { initReports, renderReports }                from './views/reports.js';
import { initSettings, renderSettings }              from './views/settings.js';
import { initFinance, renderFinance }                from './views/finance.js';

/* ── PWA: Register Service Worker (handled by vite-plugin-pwa) ── */
// vite-plugin-pwa injects registration automatically via registerType: 'autoUpdate'

/* ── PWA: Capture install prompt ── */
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window._pwaPrompt = e;
});

/* ── Network Status ── */
const updateNetworkStatus = () => {
  const badge = document.getElementById('status-badge');
  if (!badge) return;
  if (navigator.onLine) {
    badge.textContent = 'Sistem Online';
    badge.classList.remove('status-badge--offline');
  } else {
    badge.textContent = 'Mode Offline';
    badge.classList.add('status-badge--offline');
  }
};
window.addEventListener('online',  updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);

/* ── Toast System ── */
window.showToast = (message, type = 'info', title = '') => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span class="toast__icon">${icons[type] ?? 'ℹ️'}</span>
    <div class="toast__text">
      ${title ? `<div class="toast__title">${title}</div>` : ''}
      <div class="toast__msg">${message}</div>
    </div>
  `;
  container.appendChild(toast);

  const remove = () => {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };
  const timer = setTimeout(remove, 3500);
  toast.addEventListener('click', () => { clearTimeout(timer); remove(); });
};

/* ── Clock ── */
const updateClock = () => {
  const timeEl = document.getElementById('topbar-time');
  const dateEl = document.getElementById('topbar-date');
  if (timeEl) timeEl.textContent = formatTime();
  if (dateEl) dateEl.textContent = formatDate();
};

/* ── Navigation ── */
const VIEWS = {
  pos:          { init: initPOS,          refresh: refreshPOS },
  products:     { init: initProducts,     refresh: renderProducts },
  transactions: { init: initTransactions, refresh: renderTransactions },
  reports:      { init: initReports,      refresh: renderReports },
  settings:     { init: initSettings,     refresh: renderSettings },
  finance:      { init: initFinance,      refresh: renderFinance },
};

const _initialized = new Set();

const navigateTo = async (viewName) => {
  const handler = VIEWS[viewName];
  if (!handler) return;

  // Set active dock item
  document.querySelectorAll('.dock-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === viewName);
  });

  // Set active view container
  document.querySelectorAll('.view').forEach(view => {
    view.classList.toggle('active', view.id === `view-${viewName}`);
  });

  try {
    if (!_initialized.has(viewName)) {
      await handler.init();
      _initialized.add(viewName);
    } else {
      await handler.refresh();
    }
    sessionStorage.setItem('activeView', viewName);
  } catch (err) {
    console.error(`[Navigation] Error initializing view "${viewName}":`, err);
    const viewEl = document.getElementById(`view-${viewName}`);
    if (viewEl && !viewEl.children.length) {
      viewEl.innerHTML = `
        <div class="empty-state" style="padding:60px 20px">
          <div class="empty-state__icon">⚠️</div>
          <div class="empty-state__text">
            <strong style="font-size:16px;color:var(--text-primary)">Gagal Memuat Halaman</strong><br>
            <span style="font-size:12px;color:var(--text-muted)">${err.message || 'Terjadi kesalahan sistem'}</span>
          </div>
          <button class="btn btn--primary btn--sm" onclick="location.reload()" style="margin-top:16px">
            🔄 Reload Halaman
          </button>
        </div>
      `;
    }
  }

  store.navigate(viewName);
};

/* ── Dock ripple animation ── */
const addRipple = (el, e) => {
  if (!el) return;
  const rect   = el.getBoundingClientRect();
  const size   = Math.max(rect.width, rect.height);
  const ripple = document.createElement('span');
  ripple.className = 'ripple-effect';
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
  el.style.position = 'relative';
  el.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
};

/* ── Real-time Document Title Sync ── */
const updateHeaderBrand = (settings) => {
  const brandName = settings?.shopName || 'Blue Mountain Refilling Station';
  document.title  = `${brandName} — Kasir POS`;
};

store.on('settings:change', updateHeaderBrand);

/* ── Main Init ── */
const init = async () => {
  try {
    // Open DB and seed
    await openDB();
    await seedDefaultProducts();
  } catch (err) {
    console.error('[DB] Failed to open database:', err);
    window.showToast('Database gagal dibuka. Coba reload halaman.', 'error', 'Database Error');
    return;
  }

  // Load settings from DB
  const settingKeys = [
    'shopName', 'shopAddress', 'shopPhone', 'cashierName',
    'printEnabled', 'taxRate', 'printerUrl',
    'bankName', 'bankNumber', 'bankHolder',
    'qrisNumber', 'modalAwal',
  ];
  const settingsFromDB = {};
  for (const k of settingKeys) {
    const v = await getSetting(k);
    if (v !== null) {
      if (k === 'modalAwal') settingsFromDB[k] = parseFloat(v) || 0;
      else if (k === 'taxRate') settingsFromDB[k] = parseFloat(v) || 0;
      else settingsFromDB[k] = v;
    }
  }
  store.updateSettings(settingsFromDB);
  updateHeaderBrand(store.state.settings);

  // Network status
  updateNetworkStatus();

  // Start clock
  updateClock();
  setInterval(updateClock, 1000);

  // ── macOS Dock Magnification ──
  const dockEl    = document.querySelector('.dock');
  const dockItems = [...document.querySelectorAll('.dock-item')];
  const MAX_SCALE = 1.55;
  const MID_SCALE = 1.28;
  const FAR_SCALE = 1.10;
  const LIFT_MAX  = 16;

  const current = dockItems.map(() => 1);
  const target  = dockItems.map(() => 1);
  let   rafId   = null;

  const lerp  = (a, b, t) => a + (b - a) * t;
  const SPEED = 0.22;

  const animate = () => {
    let dirty = false;
    dockItems.forEach((item, i) => {
      current[i] = lerp(current[i], target[i], SPEED);
      if (Math.abs(current[i] - target[i]) > 0.001) dirty = true;

      const s    = current[i];
      const lift = ((s - 1) / (MAX_SCALE - 1)) * LIFT_MAX;
      item.style.transform = `translateY(${-lift}px) scale(${s.toFixed(4)})`;
      item.style.zIndex    = s > 1.01 ? Math.round(s * 10) : '';
    });
    rafId = dirty ? requestAnimationFrame(animate) : null;
  };

  const startAnim = () => { if (!rafId) rafId = requestAnimationFrame(animate); };

  const setTargets = (idx) => {
    dockItems.forEach((_, i) => {
      const dist = Math.abs(i - idx);
      target[i]  = dist === 0 ? MAX_SCALE : dist === 1 ? MID_SCALE : dist === 2 ? FAR_SCALE : 1;
    });
  };

  const resetTargets = () => dockItems.forEach((_, i) => (target[i] = 1));

  dockEl?.addEventListener('mousemove', (e) => {
    let closest = 0, minDist = Infinity;
    dockItems.forEach((item, i) => {
      const rect = item.getBoundingClientRect();
      const d    = Math.abs(e.clientX - (rect.left + rect.width / 2));
      if (d < minDist) { minDist = d; closest = i; }
    });
    setTargets(closest);
    startAnim();
  });

  dockEl?.addEventListener('mouseleave', () => { resetTargets(); startAnim(); });

  dockItems.forEach((item, i) => {
    item.addEventListener('touchstart', () => { setTargets(i); startAnim(); }, { passive: true });
    item.addEventListener('touchend',   () => { setTimeout(() => { resetTargets(); startAnim(); }, 350); }, { passive: true });
  });

  // Dock click
  document.querySelectorAll('.dock-item').forEach(item => {
    item.addEventListener('click', async (e) => {
      const view = item.dataset.view;
      if (!view) return;
      item.classList.add('bouncing');
      item.addEventListener('animationend', () => item.classList.remove('bouncing'), { once: true });
      addRipple(item.querySelector('.dock-icon'), e);
      await navigateTo(view);
    });
  });

  // Navigate to saved active view or fallback to 'pos' on start
  const savedView = sessionStorage.getItem('activeView') || 'pos';
  await navigateTo(savedView);
};

document.addEventListener('DOMContentLoaded', init);
