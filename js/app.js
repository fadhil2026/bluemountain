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

/* ── Global Auto-Select on Focus for Number Inputs ── */
document.addEventListener('focusin', (e) => {
  if (e.target instanceof HTMLInputElement && (e.target.type === 'number' || e.target.inputMode === 'numeric' || e.target.classList.contains('discount-input'))) {
    setTimeout(() => {
      try { e.target.select(); } catch (_) {}
    }, 25);
  }
});

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

  // ── macOS Dock Engine (Ultra-Smooth FLIP Reorder + Gaussian Wave Magnification) ──
  const dockEl         = document.querySelector('.dock');
  const DOCK_ORDER_KEY = 'bm_dock_order_v3';

  // 1. Clean legacy separators & restore saved order from localStorage
  const restoreDockOrder = () => {
    try {
      dockEl?.querySelectorAll('.dock-separator').forEach(s => s.remove());

      const saved = localStorage.getItem(DOCK_ORDER_KEY);
      if (!saved) return;
      const order = JSON.parse(saved);
      if (!Array.isArray(order) || !order.length) return;

      const itemMap = new Map();
      dockEl?.querySelectorAll('.dock-item').forEach(item => {
        itemMap.set(item.dataset.view, item);
      });

      order.forEach(viewName => {
        const item = itemMap.get(viewName);
        if (item && dockEl) {
          dockEl.appendChild(item);
          itemMap.delete(viewName);
        }
      });
      itemMap.forEach(item => {
        if (dockEl) dockEl.appendChild(item);
      });
    } catch (_) {}
  };

  restoreDockOrder();

  let dockItems = dockEl ? [...dockEl.querySelectorAll('.dock-item')] : [];

  const isMobile = () => window.innerWidth < 600;
  const isTablet = () => window.innerWidth >= 600 && window.innerWidth <= 1024;

  const getMaxScale = () => (isMobile() ? 1.22 : isTablet() ? 1.36 : 1.50);
  const getMaxLift  = () => (isMobile() ? 8 : isTablet() ? 12 : 18);
  const getRadius   = () => (isMobile() ? 90 : 140);

  let current        = dockItems.map(() => 1);
  let target         = dockItems.map(() => 1);
  let rafId          = null;
  let isDragging     = false;

  const lerp  = (a, b, t) => a + (b - a) * t;
  const SPEED = 0.24;

  const animate = () => {
    if (isDragging) return;
    let dirty = false;
    const maxScale = getMaxScale();
    const maxLift  = getMaxLift();

    dockItems.forEach((item, i) => {
      current[i] = lerp(current[i] ?? 1, target[i] ?? 1, SPEED);
      if (Math.abs(current[i] - target[i]) > 0.0005) {
        dirty = true;
      } else {
        current[i] = target[i];
      }

      const s    = current[i];
      const lift = ((s - 1) / (maxScale - 1 || 1)) * maxLift;
      item.style.transform = `translate3d(0, ${-lift.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
      item.style.zIndex    = s > 1.02 ? Math.round(s * 20) : '';
    });

    rafId = dirty ? requestAnimationFrame(animate) : null;
  };

  const startAnim = () => {
    if (!isDragging && !rafId) rafId = requestAnimationFrame(animate);
  };

  const calculateWaveTargets = (pointerX) => {
    if (isDragging) return;
    const maxScale = getMaxScale();
    const radius   = getRadius();

    dockItems.forEach((item, i) => {
      const rect    = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dist    = Math.abs(pointerX - centerX);

      if (dist < radius) {
        const factor = Math.cos((dist / radius) * (Math.PI / 2));
        target[i] = 1 + (maxScale - 1) * factor * factor;
      } else {
        target[i] = 1;
      }
    });
  };

  const resetTargets = () => {
    dockItems.forEach((_, i) => { target[i] = 1; });
  };

  dockEl?.addEventListener('mousemove', (e) => {
    if (!isDragging) {
      calculateWaveTargets(e.clientX);
      startAnim();
    }
  }, { passive: true });

  dockEl?.addEventListener('mouseleave', () => {
    if (!isDragging) {
      resetTargets();
      startAnim();
    }
  });

  // ── Precision Slot-Based FLIP Drag Engine ──
  let activeDragItem   = null;
  let dragOriginIndex  = -1;
  let currentDropIndex = -1;
  let startX           = 0;
  let startY           = 0;
  let slotMetrics      = [];
  let hasDragTriggered = false;

  const getSlotMetrics = () => {
    return dockItems.map((el, idx) => {
      const r = el.getBoundingClientRect();
      return {
        idx,
        el,
        x: r.left,
        cx: r.left + r.width / 2,
        width: r.width,
      };
    });
  };

  dockItems.forEach((item) => {
    item.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      activeDragItem    = item;
      dragOriginIndex   = dockItems.indexOf(item);
      currentDropIndex  = dragOriginIndex;
      startX            = e.clientX;
      startY            = e.clientY;
      hasDragTriggered  = false;
      slotMetrics       = getSlotMetrics();

      try { item.setPointerCapture(e.pointerId); } catch (_) {}
    });

    item.addEventListener('pointermove', (e) => {
      if (!activeDragItem || activeDragItem !== item) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!hasDragTriggered && Math.hypot(dx, dy) > 5) {
        hasDragTriggered = true;
        isDragging       = true;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }

        dockEl?.classList.add('is-reordering');
        item.classList.add('is-dragging');
        dockItems.forEach((it) => {
          if (it !== item) it.style.zIndex = '';
        });
      }

      if (hasDragTriggered && isDragging) {
        item.style.transform = `translate3d(${dx}px, ${dy - 12}px, 0) scale(1.18)`;

        let targetSlot = dragOriginIndex;
        for (let i = 0; i < slotMetrics.length; i++) {
          if (i === 0 && e.clientX < slotMetrics[0].cx) {
            targetSlot = 0;
            break;
          } else if (i === slotMetrics.length - 1 && e.clientX >= slotMetrics[i].cx) {
            targetSlot = slotMetrics.length - 1;
            break;
          } else if (e.clientX >= slotMetrics[i].cx && e.clientX < slotMetrics[i + 1]?.cx) {
            const mid = (slotMetrics[i].cx + slotMetrics[i + 1].cx) / 2;
            targetSlot = e.clientX < mid ? i : i + 1;
            break;
          }
        }
        currentDropIndex = Math.max(0, Math.min(dockItems.length - 1, targetSlot));

        slotMetrics.forEach(({ el, idx, x }) => {
          if (el === item) return;
          let shift = 0;
          if (idx > dragOriginIndex && idx <= currentDropIndex) {
            const prevSlot = slotMetrics[idx - 1];
            shift = prevSlot ? prevSlot.x - x : -58;
          } else if (idx < dragOriginIndex && idx >= currentDropIndex) {
            const nextSlot = slotMetrics[idx + 1];
            shift = nextSlot ? nextSlot.x - x : 58;
          }
          el.style.transform = `translate3d(${shift}px, 0, 0)`;
        });
      }
    });

    const handlePointerEnd = (e) => {
      if (!activeDragItem || activeDragItem !== item) return;

      try { item.releasePointerCapture(e.pointerId); } catch (_) {}

      if (hasDragTriggered && isDragging) {
        dockEl?.classList.remove('is-reordering');
        item.classList.remove('is-dragging');
        dockItems.forEach((it) => { it.style.transform = ''; });

        if (currentDropIndex !== dragOriginIndex && currentDropIndex >= 0) {
          const remaining = dockItems.filter((it) => it !== item);
          if (currentDropIndex >= remaining.length) {
            dockEl?.appendChild(item);
          } else {
            dockEl?.insertBefore(item, remaining[currentDropIndex]);
          }

          dockItems = dockEl ? [...dockEl.querySelectorAll('.dock-item')] : [];
          const newOrder = dockItems.map((it) => it.dataset.view).filter(Boolean);
          try {
            localStorage.setItem(DOCK_ORDER_KEY, JSON.stringify(newOrder));
          } catch (_) {}
        }

        current    = dockItems.map(() => 1);
        target     = dockItems.map(() => 1);
        isDragging = false;
        resetTargets();
        startAnim();
      } else {
        isDragging = false;
        item.style.transform = '';
        const view = item.dataset.view;
        if (view) {
          item.classList.remove('bouncing');
          void item.offsetWidth;
          item.classList.add('bouncing');
          item.addEventListener('animationend', () => item.classList.remove('bouncing'), { once: true });
          addRipple(item.querySelector('.dock-icon'), e);
          navigateTo(view);
        }
      }

      activeDragItem   = null;
      dragOriginIndex  = -1;
      currentDropIndex = -1;
      hasDragTriggered = false;
    };

    item.addEventListener('pointerup',     handlePointerEnd);
    item.addEventListener('pointercancel', handlePointerEnd);
  });

  // Keyboard navigation & accessibility focus preview
  dockItems.forEach((item) => {
    item.addEventListener('focus', () => {
      const idx = dockItems.indexOf(item);
      dockItems.forEach((_, i) => {
        const d = Math.abs(i - idx);
        target[i] = d === 0 ? 1.35 : d === 1 ? 1.12 : 1;
      });
      startAnim();
    });

    item.addEventListener('blur', () => {
      resetTargets();
      startAnim();
    });

    item.addEventListener('keydown', (e) => {
      const curIdx = dockItems.indexOf(item);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = dockItems[curIdx + 1] || dockItems[0];
        next?.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = dockItems[curIdx - 1] || dockItems[dockItems.length - 1];
        prev?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        dockItems[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        dockItems[dockItems.length - 1]?.focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const view = item.dataset.view;
        if (view) navigateTo(view);
      }
    });
  });

  // Navigate to saved active view or fallback to 'pos' on start
  const savedView = sessionStorage.getItem('activeView') || 'pos';
  await navigateTo(savedView);
};

document.addEventListener('DOMContentLoaded', init);
