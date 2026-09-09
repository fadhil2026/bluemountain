/**
 * views/login.js — Dedicated Login & Operator Authentication View
 * Full-screen portal for POS Operators with Salted SHA-256 PIN Verification.
 * Supports both on-screen numpad and physical keyboard inputs.
 */
import { getAllUsers, seedDefaultUsers } from '../db.js';
import { esc } from '../utils/sanitize.js';
import store from '../store.js';
import { authenticateWithServer, syncAuthoritativeRosterToCache, syncInitialData } from '../supabase.js';

let _activeUsers = [];
let _selectedUserId = null;
let _enteredPin = '';
let _isVerifying = false;
let _keyboardBound = false;
let _showManualInput = false;

export const ROLE_BADGES = {
  owner: { label: '👑 Owner', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)' },
  supervisor: { label: '⭐ Supervisor', color: '#2563eb', bg: 'rgba(37, 99, 235, 0.12)' },
  cashier: { label: '👤 Kasir', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
};

/**
 * Initialize Login View
 */
export const initLogin = async () => {
  _enteredPin = '';
  _isVerifying = false;
  await renderLogin();
  bindGlobalKeyboard();

  // Re-render automatically when users are synchronized from cloud
  store.on('users:change', () => {
    const loginView = document.getElementById('view-login');
    if (loginView && loginView.classList.contains('active')) {
      renderLogin();
    }
  });
};

/**
 * Render Login Screen
 */
export const renderLogin = async () => {
  const container = document.getElementById('view-login');
  if (!container) return;

  // Server-Authoritative: refresh local cache from cloud when online
  if (navigator.onLine) {
    try {
      await syncAuthoritativeRosterToCache();
    } catch (_) {}
  }

  let allUsers = await getAllUsers();
  _activeUsers = allUsers.filter(u => u.isActive !== false);

  if (_activeUsers.length === 0) {
    // Fail-safe auto-heal: seed master owner if completely empty
    await seedDefaultUsers();
    allUsers = await getAllUsers();
    _activeUsers = allUsers.filter(u => u.isActive !== false);
  }

  if (_activeUsers.length === 0 || _showManualInput) {
    // Elegant fallback manual login form (Username + PIN)
    container.innerHTML = `
      <div class="login-portal-wrapper">
        <div class="login-portal-card" style="text-align: center; max-width: 420px; width: 100%;">
          <div class="login-brand-header">
            <img src="assets/logo.png" alt="Blue Mountain Logo" class="login-brand-logo">
            <h1 class="login-brand-title">BLUE MOUNTAIN</h1>
            <p class="login-brand-subtitle">Portal Masuk Operator Kasir</p>
          </div>
          <div style="background: rgba(37, 99, 235, 0.08); border-radius: 12px; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; color: var(--text-secondary, #475569); border: 1px solid rgba(37, 99, 235, 0.2);">
            <span>🔑</span> Masuk menggunakan <strong>Username & PIN</strong> server
          </div>
          <form id="form-manual-login" style="display: flex; flex-direction: column; gap: 12px; text-align: left;">
            <div>
              <label style="font-size: 12px; font-weight: 700; color: var(--text-muted, #64748b); text-transform: uppercase;">Username Operator</label>
              <input type="text" id="manual-login-username" class="form-control" placeholder="Contoh: admin atau test" required style="width: 100%; padding: 12px 14px; border-radius: 10px; border: 1.5px solid var(--border, #cbd5e1); font-size: 15px; margin-top: 4px; box-sizing: border-box;">
            </div>
            <div>
              <label style="font-size: 12px; font-weight: 700; color: var(--text-muted, #64748b); text-transform: uppercase;">PIN (4–6 Digit)</label>
              <input type="password" id="manual-login-pin" class="form-control" placeholder="Masukkan 4-6 angka" maxlength="6" inputmode="numeric" required style="width: 100%; padding: 12px 14px; border-radius: 10px; border: 1.5px solid var(--border, #cbd5e1); font-size: 15px; margin-top: 4px; box-sizing: border-box;">
            </div>
            <div id="manual-login-error" style="color: #ef4444; font-size: 13px; font-weight: 600; display: none;"></div>
            <button type="submit" id="btn-submit-manual-login" class="btn btn-primary" style="padding: 12px; border-radius: 10px; font-weight: 700; width: 100%; margin-top: 6px; cursor: pointer;">
              Masuk Sekarang ➔
            </button>
            ${_activeUsers.length > 0 ? `
              <button type="button" id="btn-back-to-list" class="btn btn-secondary" style="padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer;">
                ⬅ Kembali ke Pilihan Operator
              </button>
            ` : `
              <button type="button" class="btn btn-secondary" onclick="location.reload()" style="padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer;">
                🔄 Sinkronkan Cloud Server
              </button>
            `}
          </form>
        </div>
      </div>
    `;

    const form = document.getElementById('form-manual-login');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const uVal = document.getElementById('manual-login-username').value.trim();
      const pVal = document.getElementById('manual-login-pin').value.trim();
      const errEl = document.getElementById('manual-login-error');
      const submitBtn = document.getElementById('btn-submit-manual-login');
      if (errEl) errEl.style.display = 'none';

      if (!uVal || !pVal) return;
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Memverifikasi...'; }

      const authResult = await authenticateWithServer(uVal, pVal);
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Masuk Sekarang ➔'; }

      if (authResult.success) {
        store.login(authResult.user, authResult.token);
        const tag = authResult.isServerValidated ? ' (Terverifikasi Server)' : ' (Mode Offline)';
        window.showToast?.(`Berhasil masuk sebagai ${authResult.user.name} (${authResult.user.role})${tag}`, 'success');
        if (navigator.onLine) {
          syncInitialData().catch(() => {});
        }
        if (typeof window.appNavigateTo === 'function') {
          window.appNavigateTo('pos');
        } else {
          document.getElementById('dock-pos')?.click();
        }
      } else {
        if (errEl) {
          errEl.textContent = authResult.error || 'Username atau PIN salah.';
          errEl.style.display = 'block';
        }
      }
    });

    document.getElementById('btn-back-to-list')?.addEventListener('click', () => {
      _showManualInput = false;
      renderLogin();
    });

    return;
  }

  // Preserve selected user or default to first
  if (!_selectedUserId || !_activeUsers.some(u => String(u.id) === String(_selectedUserId))) {
    _selectedUserId = _activeUsers[0].id;
  }

  const selectedUser = _activeUsers.find(u => String(u.id) === String(_selectedUserId)) || _activeUsers[0];
  const roleMeta = ROLE_BADGES[selectedUser.role] || ROLE_BADGES.cashier;

  container.innerHTML = `
    <div class="login-portal-wrapper">
      <div class="login-portal-card">
        
        <!-- Brand Header -->
        <div class="login-brand-header">
          <img src="assets/logo.png" alt="Blue Mountain Logo" class="login-brand-logo">
          <h1 class="login-brand-title">BLUE MOUNTAIN</h1>
          <p class="login-brand-subtitle">Portal Masuk Operator Kasir</p>
        </div>

        <!-- Operator Selector -->
        <div class="login-op-section">
          <label class="login-op-label">PILIH AKUN OPERATOR</label>
          <div class="login-operator-list" id="login-operator-list">
            ${_activeUsers.map(u => {
              const isSelected = String(u.id) === String(_selectedUserId);
              const r = ROLE_BADGES[u.role] || ROLE_BADGES.cashier;
              return `
                <button type="button" class="btn-login-op ${isSelected ? 'selected' : ''}" data-id="${u.id}">
                  <div class="login-op-avatar" style="background: ${r.color};">
                    ${(u.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div style="text-align: left;">
                    <div class="login-op-name">${esc(u.name)}</div>
                    <div class="login-op-role" style="color: ${r.color};">${r.label}</div>
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Selected User Prompt -->
        <div>
          <div class="login-prompt-box">
            <span>🔑</span> Masukkan <strong>4–6 digit PIN</strong> untuk <strong>${esc(selectedUser.name)}</strong>
          </div>
        </div>

        <!-- PIN Dots Display -->
        <div class="login-pin-box" id="login-pin-box">
          <div class="login-pin-dots" id="login-pin-dots">
            ${[0, 1, 2, 3, 4, 5].map(i => `
              <span class="pin-dot ${i < _enteredPin.length ? 'filled' : ''}"></span>
            `).join('')}
          </div>
          <div class="login-error-msg" id="login-error-msg"></div>
        </div>

        <!-- Numpad Keypad -->
        <div class="login-numpad-grid">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `
            <button type="button" class="btn-numpad-key" data-val="${n}">${n}</button>
          `).join('')}
          <button type="button" class="btn-numpad-key btn-clear" data-val="clear">C</button>
          <button type="button" class="btn-numpad-key" data-val="0">0</button>
          <button type="button" class="btn-numpad-key btn-submit" data-val="submit">✓</button>
        </div>

        <!-- Manual Username Input Option -->
        <div style="text-align: center; margin-top: 14px;">
          <button type="button" id="btn-toggle-manual" style="background: none; border: none; color: var(--primary, #2563eb); font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: underline;">
            Masuk dengan Username Lain
          </button>
        </div>

      </div>
    </div>
  `;

  attachLoginEvents();
};

/**
 * Update Dots Display
 */
const updateDotsUI = () => {
  const dots = document.querySelectorAll('#login-pin-dots .pin-dot');
  dots.forEach((dot, idx) => {
    const isFilled = idx < _enteredPin.length;
    dot.style.background = isFilled ? 'var(--primary, #2563eb)' : 'transparent';
    dot.style.transform = isFilled ? 'scale(1.18)' : 'scale(1)';
  });
};

/**
 * Trigger PIN Verification
 */
const processPinVerification = async (isManual = false) => {
  if (_isVerifying) return;
  const targetUser = _activeUsers.find(u => String(u.id) === String(_selectedUserId));
  if (!targetUser) return;

  const errEl = document.getElementById('login-error-msg');
  if (errEl) errEl.textContent = '';

  // Only verify if length is at least 4 digits
  if (_enteredPin.length >= 4) {
    _isVerifying = true;
    const authResult = await authenticateWithServer(targetUser.username, _enteredPin);
    _isVerifying = false;

    if (authResult.success) {
      // SUCCESS!
      store.login(authResult.user, authResult.token);
      const tag = authResult.isServerValidated ? ' (Terverifikasi Server)' : ' (Mode Offline)';
      window.showToast?.(`Berhasil masuk sebagai ${authResult.user.name} (${authResult.user.role})${tag}`, 'success');
      _enteredPin = '';
      
      // Pull fresh data from Supabase master cloud to Dexie cache
      if (navigator.onLine) {
        syncInitialData().catch(() => {});
      }

      // Navigate to POS
      if (typeof window.appNavigateTo === 'function') {
        window.appNavigateTo('pos');
      } else {
        const posDock = document.getElementById('dock-pos');
        if (posDock) posDock.click();
      }
      return;
    } else {
      if (isManual || _enteredPin.length >= 6) {
        if (errEl) {
          errEl.textContent = authResult.error || 'PIN salah! Silakan periksa kembali.';
        }
        shakePinBox();
        _enteredPin = '';
        updateDotsUI();
        return;
      }
    }
  }

  // If manual submission with under 4 digits:
  if (isManual && _enteredPin.length < 4) {
    if (errEl) {
      errEl.textContent = 'Masukkan minimal 4 digit PIN';
    }
    shakePinBox();
    _enteredPin = '';
    updateDotsUI();
  }
};

/**
 * Shake Animation on Error
 */
const shakePinBox = () => {
  const box = document.getElementById('login-pin-box');
  if (!box) return;
  box.style.animation = 'none';
  void box.offsetWidth;
  box.style.animation = 'shake 0.4s ease-in-out';
};

/**
 * Attach UI Event Handlers
 */
const attachLoginEvents = () => {
  // Operator selector clicks
  document.querySelectorAll('.btn-login-op').forEach(btn => {
    btn.addEventListener('click', () => {
      _selectedUserId = btn.getAttribute('data-id');
      _enteredPin = '';
      renderLogin();
    });
  });

  // Numpad key clicks
  document.querySelectorAll('.btn-numpad-key').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-val');
      handleInput(val);
    });
  });

  // Toggle manual username login
  document.getElementById('btn-toggle-manual')?.addEventListener('click', () => {
    _showManualInput = true;
    renderLogin();
  });
};

/**
 * Handle Unified Input (Numpad or Keyboard)
 */
const handleInput = (val) => {
  const errEl = document.getElementById('login-error-msg');
  if (errEl) errEl.textContent = '';

  if (val === 'clear') {
    _enteredPin = '';
    updateDotsUI();
  } else if (val === 'backspace') {
    if (_enteredPin.length > 0) {
      _enteredPin = _enteredPin.slice(0, -1);
      updateDotsUI();
    }
  } else if (val === 'submit') {
    processPinVerification(true);
  } else if (/^[0-9]$/.test(val)) {
    if (_enteredPin.length < 6) {
      _enteredPin += val;
      updateDotsUI();
      processPinVerification(false);
    }
  }
};

/**
 * Physical Keyboard Handler
 */
const bindGlobalKeyboard = () => {
  if (_keyboardBound) return;
  _keyboardBound = true;

  window.addEventListener('keydown', (e) => {
    const loginView = document.getElementById('view-login');
    if (!loginView || !loginView.classList.contains('active')) return;

    // Ignore if typing inside any input
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      handleInput(e.key);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      handleInput('backspace');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleInput('submit');
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleInput('clear');
    }
  });
};
