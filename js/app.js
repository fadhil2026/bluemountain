/**
 * app.js — Main application bootstrap
 * Blue Mountain Refilling Station POS
 */
import { openDB, seedDefaultProducts } from './db.js';
import { getSetting }                   from './db.js';
import store                            from './store.js';
import { formatDate, formatTime }       from './utils/date.js';
import { initPOS, refreshPOS }          from './views/pos.js';
import { initProducts, renderProducts } from './views/products.js';
import { initTransactions, renderTransactions } from './views/transactions.js';
import { initReports, renderReports }   from './views/reports.js';
import { initSettings, renderSettings } from './views/settings.js';
import { initFinance, renderFinance }   from './views/finance.js';

/* ── PWA: Register Service Worker ── */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(console.error);
}

/* ── PWA: Capture install prompt ── */
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window._pwaPrompt = e;
});

/* ── Toast System ── */
window.showToast = (message, type = 'info', title = '') => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${icons[type] || 'ℹ️'}</span>
    <div class="toast__text">
      ${title ? `<div class="toast__title">${title}</div>` : ''}
      <div class="toast__msg">${message}</div>
    </div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3000);
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
  // Update dock active state
  document.querySelectorAll('.dock-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === viewName);
  });

  // Update view visibility
  document.querySelectorAll('.view').forEach(view => {
    view.classList.toggle('active', view.id === `view-${viewName}`);
  });

  // Init or refresh view
  const handler = VIEWS[viewName];
  if (!handler) return;

  if (!_initialized.has(viewName)) {
    await handler.init();
    _initialized.add(viewName);
  } else {
    await handler.refresh();
  }

  store.navigate(viewName);
};

/* ── Dock ripple animation ── */
const addRipple = (el, e) => {
  const rect  = el.getBoundingClientRect();
  const size  = Math.max(rect.width, rect.height);
  const ripple = document.createElement('span');
  ripple.className = 'ripple-effect';
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
  el.style.position = 'relative';
  el.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
};

/* ── Main Init ── */
const init = async () => {
  // Open DB and seed
  await openDB();
  await seedDefaultProducts();

  // Load settings from DB
  const settingKeys = ['shopName','shopAddress','shopPhone','cashierName','printEnabled','taxRate','printerUrl','bankName','bankNumber','bankHolder','modalAwal'];
  const settingsFromDB = {};
  for (const k of settingKeys) {
    const v = await getSetting(k);
    if (v !== null) settingsFromDB[k] = (k === 'modalAwal') ? parseFloat(v)||0 : v;
  }
  store.updateSettings(settingsFromDB);

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

  const current  = dockItems.map(() => 1);
  const target   = dockItems.map(() => 1);
  let   rafId    = null;

  const lerp = (a, b, t) => a + (b - a) * t;
  const SPEED = 0.22; // spring speed (0-1)

  const animate = () => {
    let dirty = false;
    dockItems.forEach((item, i) => {
      const prev = current[i];
      current[i] = lerp(current[i], target[i], SPEED);
      if (Math.abs(current[i] - target[i]) > 0.001) dirty = true;

      const s = current[i];
      const lift = ((s - 1) / (MAX_SCALE - 1)) * LIFT_MAX;
      item.style.transform = `translateY(${-lift}px) scale(${s.toFixed(4)})`;
      item.style.zIndex    = s > 1.01 ? Math.round(s * 10) : '';
    });
    if (dirty) rafId = requestAnimationFrame(animate);
    else rafId = null;
  };

  const startAnim = () => {
    if (!rafId) rafId = requestAnimationFrame(animate);
  };

  const setTargets = (hoveredIdx) => {
    dockItems.forEach((_, i) => {
      const dist = Math.abs(i - hoveredIdx);
      if (dist === 0)      target[i] = MAX_SCALE;
      else if (dist === 1) target[i] = MID_SCALE;
      else if (dist === 2) target[i] = FAR_SCALE;
      else                 target[i] = 1;
    });
  };

  const resetTargets = () => {
    dockItems.forEach((_, i) => target[i] = 1);
  };

  dockEl?.addEventListener('mousemove', (e) => {
    let closest = 0, minDist = Infinity;
    dockItems.forEach((item, i) => {
      const rect = item.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const d    = Math.abs(e.clientX - cx);
      if (d < minDist) { minDist = d; closest = i; }
    });
    setTargets(closest);
    startAnim();
  });

  dockEl?.addEventListener('mouseleave', () => {
    resetTargets();
    startAnim();
  });

  // Touch support: tap = max scale briefly
  dockItems.forEach((item, i) => {
    item.addEventListener('touchstart', () => {
      setTargets(i);
      startAnim();
    }, { passive: true });
    item.addEventListener('touchend', () => {
      setTimeout(() => { resetTargets(); startAnim(); }, 350);
    }, { passive: true });
  });

  // Dock click events
  document.querySelectorAll('.dock-item').forEach(item => {
    item.addEventListener('click', async (e) => {
      const view = item.dataset.view;
      if (!view) return;

      // Quick bounce via CSS class
      item.classList.add('bouncing');
      item.addEventListener('animationend', () => item.classList.remove('bouncing'), { once: true });

      addRipple(item.querySelector('.dock-icon'), e);
      await navigateTo(view);
    });
  });

  // Navigate to POS on start
  await navigateTo('pos');
};

document.addEventListener('DOMContentLoaded', init);
