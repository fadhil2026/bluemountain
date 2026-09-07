/**
 * views/login.js — Dedicated Login & Operator Authentication View
 * Full-screen portal for POS Operators with Salted SHA-256 PIN Verification.
 * Supports both on-screen numpad and physical keyboard inputs.
 */
import { getAllUsers, updateUser } from '../db.js';
import { generateSalt, hashPin, verifyPin } from '../utils/crypto.js';
import { esc } from '../utils/sanitize.js';
import store from '../store.js';

let _activeUsers = [];
let _selectedUserId = null;
let _enteredPin = '';
let _isVerifying = false;
let _keyboardBound = false;

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
};

/**
 * Render Login Screen
 */
export const renderLogin = async () => {
  const container = document.getElementById('view-login');
  if (!container) return;

  const allUsers = await getAllUsers();
  _activeUsers = allUsers.filter(u => u.isActive !== false);

  if (_activeUsers.length === 0) {
    // If no users, show error/fallback
    container.innerHTML = `
      <div style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
        <div style="background: var(--bg-card, #ffffff); border-radius: 20px; padding: 36px; text-align: center; max-width: 420px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
          <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
          <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 8px;">Tidak Ada Operator</h2>
          <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">Database operator kosong. Muat ulang halaman untuk inisialisasi akun bawaan.</p>
          <button class="btn btn-primary" onclick="location.reload()">🔄 Muat Ulang</button>
        </div>
      </div>
    `;
    return;
  }

  // Preserve selected user or default to first
  if (!_selectedUserId || !_activeUsers.some(u => String(u.id) === String(_selectedUserId))) {
    _selectedUserId = _activeUsers[0].id;
  }

  const selectedUser = _activeUsers.find(u => String(u.id) === String(_selectedUserId)) || _activeUsers[0];
  const roleMeta = ROLE_BADGES[selectedUser.role] || ROLE_BADGES.cashier;

  container.innerHTML = `
    <div style="min-height: calc(100vh - 100px); display: flex; align-items: center; justify-content: center; padding: 24px 16px;">
      <div style="background: var(--bg-card, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 24px; max-width: 460px; width: 100%; padding: 36px 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.06); text-align: center; position: relative;">
        
        <!-- Brand Header -->
        <div style="margin-bottom: 24px;">
          <img src="assets/logo.png" alt="Blue Mountain Logo" style="width: 72px; height: 72px; object-fit: contain; margin-bottom: 12px; filter: drop-shadow(0 4px 12px rgba(37,99,235,0.15));">
          <h1 style="font-size: 1.35rem; font-weight: 900; letter-spacing: -0.02em; color: var(--text-primary, #1e293b); margin: 0;">
            BLUE MOUNTAIN
          </h1>
          <p style="font-size: 12px; font-weight: 700; color: #2563eb; letter-spacing: 0.08em; text-transform: uppercase; margin: 4px 0 0 0;">
            Portal Masuk Operator Kasir
          </p>
        </div>

        <!-- Operator Selector -->
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-muted, #64748b); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">
            Pilih Akun Operator
          </label>
          <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;" id="login-operator-list">
            ${_activeUsers.map(u => {
              const isSelected = String(u.id) === String(_selectedUserId);
              const r = ROLE_BADGES[u.role] || ROLE_BADGES.cashier;
              return `
                <button type="button" class="btn-login-op" data-id="${u.id}" style="
                  padding: 8px 14px;
                  border-radius: 14px;
                  border: 2px solid ${isSelected ? 'var(--primary, #2563eb)' : 'var(--border, #e2e8f0)'};
                  background: ${isSelected ? 'rgba(37, 99, 235, 0.08)' : 'var(--bg-card, #ffffff)'};
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  transition: all 0.2s;
                  box-shadow: ${isSelected ? '0 4px 12px rgba(37,99,235,0.12)' : 'none'};
                ">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: ${r.color}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px;">
                    ${(u.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div style="text-align: left;">
                    <div style="font-weight: 700; font-size: 13px; color: var(--text-primary, #1e293b);">${esc(u.name)}</div>
                    <div style="font-size: 11px; color: ${r.color}; font-weight: 600;">${r.label}</div>
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Selected User Prompt -->
        <div style="background: var(--bg-muted, #f8fafc); border-radius: 12px; padding: 10px 14px; margin-bottom: 20px; display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-secondary, #475569);">
          <span>🔑</span> Masukkan <strong>4 hingga 6 digit PIN</strong> untuk <strong>${esc(selectedUser.name)}</strong>
        </div>

        <!-- PIN Dots Display -->
        <div id="login-pin-box" style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: center; gap: 14px; margin-bottom: 8px;" id="login-pin-dots">
            ${[0, 1, 2, 3, 4, 5].map(i => `
              <span class="pin-dot" style="
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 2px solid var(--primary, #2563eb);
                background: ${i < _enteredPin.length ? 'var(--primary, #2563eb)' : 'transparent'};
                display: inline-block;
                transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
                transform: ${i < _enteredPin.length ? 'scale(1.15)' : 'scale(1)'};
              "></span>
            `).join('')}
          </div>
          <div id="login-error-msg" style="min-height: 20px; font-size: 13px; font-weight: 600; color: #dc2626;"></div>
        </div>

        <!-- Numpad Keypad -->
        <div style="max-width: 280px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `
            <button type="button" class="btn-numpad-key" data-val="${n}" style="
              height: 54px;
              font-size: 22px;
              font-weight: 700;
              border-radius: 14px;
              border: 1px solid var(--border, #cbd5e1);
              background: var(--bg-card, #ffffff);
              color: var(--text-primary, #1e293b);
              cursor: pointer;
              transition: transform 0.1s, background 0.15s;
              box-shadow: 0 2px 6px rgba(0,0,0,0.03);
            ">${n}</button>
          `).join('')}
          <button type="button" class="btn-numpad-key" data-val="clear" style="
            height: 54px;
            font-size: 16px;
            font-weight: 700;
            border-radius: 14px;
            border: 1px solid #fecaca;
            background: #fff1f2;
            color: #dc2626;
            cursor: pointer;
            transition: transform 0.1s;
          ">C</button>
          <button type="button" class="btn-numpad-key" data-val="0" style="
            height: 54px;
            font-size: 22px;
            font-weight: 700;
            border-radius: 14px;
            border: 1px solid var(--border, #cbd5e1);
            background: var(--bg-card, #ffffff);
            color: var(--text-primary, #1e293b);
            cursor: pointer;
            transition: transform 0.1s;
          ">0</button>
          <button type="button" class="btn-numpad-key" data-val="submit" style="
            height: 54px;
            font-size: 20px;
            font-weight: 800;
            border-radius: 14px;
            border: none;
            background: var(--primary, #2563eb);
            color: white;
            cursor: pointer;
            transition: transform 0.1s;
            box-shadow: 0 4px 14px rgba(37,99,235,0.3);
          ">✓</button>
        </div>

        <!-- Emergency Owner Reset (Foolproof Rescue) -->
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px dashed var(--border, #e2e8f0);">
          <button type="button" id="btn-reset-owner-pin" style="
            background: none;
            border: none;
            color: var(--text-muted, #64748b);
            font-size: 12px;
            cursor: pointer;
            text-decoration: underline;
          ">
            🔄 Lupa PIN? Reset PIN Owner ke default "1234"
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
    const isValid = await verifyPin(_enteredPin, targetUser.pinSalt, targetUser.pinHash);
    _isVerifying = false;

    if (isValid) {
      // SUCCESS!
      store.login(targetUser);
      window.showToast?.(`Berhasil masuk sebagai ${targetUser.name} (${targetUser.role})`, 'success');
      _enteredPin = '';
      
      // Navigate to POS
      if (typeof window.appNavigateTo === 'function') {
        window.appNavigateTo('pos');
      } else {
        const posDock = document.getElementById('dock-pos');
        if (posDock) posDock.click();
      }
      return;
    }
  }

  // If failed:
  if (isManual || _enteredPin.length >= 6) {
    if (errEl) {
      errEl.textContent = _enteredPin.length < 4 ? 'Masukkan minimal 4 digit PIN' : 'PIN salah! Silakan periksa kembali.';
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

  // Reset Owner PIN button
  document.getElementById('btn-reset-owner-pin')?.addEventListener('click', async () => {
    const ownerUser = _activeUsers.find(u => u.role === 'owner');
    if (!ownerUser) {
      window.showToast?.('Akun Owner tidak ditemukan.', 'error');
      return;
    }

    if (confirm(`Atur ulang PIN akun Owner "${ownerUser.name}" kembali ke PIN standar "1234"?`)) {
      try {
        const salt = generateSalt();
        const pinHash = await hashPin('1234', salt);
        const updated = {
          ...ownerUser,
          pinHash,
          pinSalt: salt,
          updatedAt: new Date().toISOString()
        };
        await updateUser(updated);
        _activeUsers = (await getAllUsers()).filter(u => u.isActive !== false);
        _selectedUserId = ownerUser.id;
        _enteredPin = '';
        renderLogin();
        window.showToast?.('PIN Owner berhasil direset ke "1234". Silakan login.', 'success');
      } catch (err) {
        window.showToast?.('Gagal mereset PIN: ' + err.message, 'error');
      }
    }
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
