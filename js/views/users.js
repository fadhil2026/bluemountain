/**
 * views/users.js — Operator & Account Management (RBAC)
 * Full CRUD for POS Staff Accounts (Owner, Supervisor, Cashier)
 * Uses Web Crypto API Salted SHA-256 for Zero-Plaintext PIN Storage.
 */
import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from '../db.js';
import { generateSalt, hashPin } from '../utils/crypto.js';
import { esc } from '../utils/sanitize.js';
import { openModal, closeModal } from './modals.js';
import store from '../store.js';

let _unsubscribers = [];
let _searchQuery = '';

export const ROLE_LABELS = {
  owner: { label: '👑 Owner / Pemilik', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)' },
  supervisor: { label: '⭐ Supervisor', color: '#2563eb', bg: 'rgba(37, 99, 235, 0.12)' },
  cashier: { label: '👤 Kasir / Staff', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
};

/**
 * Initialize Users Management View
 */
export const initUsers = async () => {
  if (_unsubscribers.length) {
    _unsubscribers.forEach(u => typeof u === 'function' && u());
    _unsubscribers = [];
  }

  _unsubscribers.push(store.on('users:change', () => renderUsers()));
  _unsubscribers.push(store.on('auth:change', () => {
    const container = document.getElementById('view-users');
    if (container && container.classList.contains('active')) {
      renderUsers();
    }
  }));

  await renderUsers();
};

/**
 * Main Render Function
 */
export const renderUsers = async () => {
  const container = document.getElementById('view-users');
  if (!container) return;

  // RBAC Access Check
  const currentUser = store.state.currentUser;
  if (!currentUser || currentUser.role !== 'owner') {
    container.innerHTML = `
      <div class="view-header">
        <div>
          <h1 class="view-title">👥 Manajemen Akun & Hak Akses</h1>
          <p class="view-subtitle">Kontrol operator kasir, supervisor, dan hak akses toko</p>
        </div>
      </div>
      <div style="background: var(--bg-card, #ffffff); border-radius: 14px; padding: 40px 20px; text-align: center; border: 1px solid var(--border, #e2e8f0); margin-top: 20px;">
        <div style="font-size: 48px; margin-bottom: 16px;">🔒</div>
        <h3 style="margin-bottom: 8px; color: var(--text-primary, #1e293b);">Akses Terkunci (Khusus Owner)</h3>
        <p style="color: var(--text-muted, #64748b); max-width: 480px; margin: 0 auto 20px auto;">
          Modul manajemen staf dan pengaturan hak akses hanya dapat dibuka oleh akun bertingkat <strong>Owner</strong>. Silakan beralih operator untuk mengakses halaman ini.
        </p>
        <button class="btn btn-primary" id="btn-lock-switch-op" style="padding: 10px 20px;">
          🔑 Beralih Operator / Login Owner
        </button>
      </div>
    `;
    document.getElementById('btn-lock-switch-op')?.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('request-operator-switch'));
    });
    return;
  }

  const allUsers = await getAllUsers();
  const filteredUsers = allUsers.filter(u => {
    if (!_searchQuery) return true;
    const q = _searchQuery.toLowerCase();
    return (u.name || '').toLowerCase().includes(q) || (u.username || '').toLowerCase().includes(q);
  });

  container.innerHTML = `
    <div class="view-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
      <div>
        <h1 class="view-title" style="margin: 0; font-size: 1.6rem; font-weight: 800;">👥 Manajemen Akun & Hak Akses</h1>
        <p class="view-subtitle" style="margin: 4px 0 0 0; color: var(--text-muted, #64748b);">Kelola daftar staf kasir, supervisor, dan pemilik toko dengan enkripsi PIN aman.</p>
      </div>
      <div style="display: flex; gap: 12px; align-items: center;">
        <button class="btn btn-secondary" id="btn-users-logout" style="display: flex; align-items: center; gap: 6px; padding: 10px 16px; border-radius: 10px; font-weight: 700; background: #fff1f2; border: 1.5px solid #fca5a5; color: #e11d48; cursor: pointer;">
          <span>🚪</span> Log Out
        </button>
        <button class="btn btn-primary" id="btn-add-user" style="display: flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 10px; font-weight: 600;">
          <span>➕</span> Tambah Operator
        </button>
      </div>
    </div>

    <!-- Toolbar & Search -->
    <div style="background: var(--bg-card, #ffffff); border-radius: 12px; padding: 14px 18px; border: 1px solid var(--border, #e2e8f0); margin-bottom: 20px; display: flex; gap: 12px; align-items: center;">
      <span style="font-size: 18px;">🔍</span>
      <input type="text" id="user-search-input" value="${esc(_searchQuery)}" placeholder="Cari nama atau username operator..." style="border: none; outline: none; background: transparent; width: 100%; font-size: 14px;">
      ${_searchQuery ? `<button id="btn-clear-user-search" style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 14px;">✕</button>` : ''}
    </div>

    <!-- Users Table -->
    <div style="background: var(--bg-card, #ffffff); border-radius: 14px; border: 1px solid var(--border, #e2e8f0); overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background: var(--bg-muted, #f8fafc); border-bottom: 1px solid var(--border, #e2e8f0); font-size: 13px; color: var(--text-muted, #64748b);">
              <th style="padding: 14px 18px;">OPERATOR</th>
              <th style="padding: 14px 18px;">USERNAME</th>
              <th style="padding: 14px 18px;">HAK AKSES (ROLE)</th>
              <th style="padding: 14px 18px;">STATUS</th>
              <th style="padding: 14px 18px; text-align: right;">AKSI</th>
            </tr>
          </thead>
          <tbody>
            ${filteredUsers.length === 0 ? `
              <tr>
                <td colspan="5" style="padding: 40px 20px; text-align: center; color: var(--text-muted, #64748b);">
                  Tidak ada operator yang cocok dengan pencarian.
                </td>
              </tr>
            ` : filteredUsers.map(u => {
              const roleMeta = ROLE_LABELS[u.role] || ROLE_LABELS.cashier;
              const isSelf = currentUser && String(currentUser.id) === String(u.id);
              const isActive = u.isActive !== false;

              return `
                <tr style="border-bottom: 1px solid var(--border, #f1f5f9); font-size: 14px;">
                  <td style="padding: 14px 18px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 36px; height: 36px; border-radius: 50%; background: ${roleMeta.bg}; color: ${roleMeta.color}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">
                        ${(u.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style="font-weight: 600; color: var(--text-primary, #1e293b);">${esc(u.name)} ${isSelf ? '<span style="font-size: 11px; padding: 2px 6px; border-radius: 6px; background: #e0e7ff; color: #3730a3; margin-left: 4px;">Anda</span>' : ''}</div>
                        <div style="font-size: 12px; color: var(--text-muted, #64748b);">Dibuat: ${new Date(u.createdAt || Date.now()).toLocaleDateString('id-ID')}</div>
                      </div>
                    </div>
                  </td>
                  <td style="padding: 14px 18px; font-family: monospace; font-size: 13px; color: var(--text-secondary, #475569);">
                    @${esc(u.username)}
                  </td>
                  <td style="padding: 14px 18px;">
                    <span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; color: ${roleMeta.color}; background: ${roleMeta.bg};">
                      ${roleMeta.label}
                    </span>
                  </td>
                  <td style="padding: 14px 18px;">
                    <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; color: ${isActive ? '#10b981' : '#ef4444'};">
                      <span style="width: 8px; height: 8px; border-radius: 50%; background: ${isActive ? '#10b981' : '#ef4444'};"></span>
                      ${isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td style="padding: 14px 18px; text-align: right;">
                    <div style="display: inline-flex; gap: 8px;">
                      <button class="btn-edit-user" data-id="${u.id}" title="Edit Operator" style="padding: 6px 12px; border-radius: 8px; border: 1px solid var(--border, #cbd5e1); background: transparent; cursor: pointer;">
                        ✏️ Edit
                      </button>
                      ${!isSelf ? `
                        <button class="btn-delete-user" data-id="${u.id}" data-name="${esc(u.name)}" title="Hapus Operator" style="padding: 6px 12px; border-radius: 8px; border: 1px solid #fecaca; background: #fff1f2; color: #e11d48; cursor: pointer;">
                          🗑️ Hapus
                        </button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Attach Event Handlers
  document.getElementById('btn-users-logout')?.addEventListener('click', () => {
    if (confirm('Keluar dari sesi operator kasir?')) {
      window.dispatchEvent(new CustomEvent('request-logout'));
    }
  });
  document.getElementById('btn-add-user')?.addEventListener('click', () => openUserFormModal());
  document.getElementById('user-search-input')?.addEventListener('input', (e) => {
    _searchQuery = e.target.value;
    renderUsers();
  });
  document.getElementById('btn-clear-user-search')?.addEventListener('click', () => {
    _searchQuery = '';
    renderUsers();
  });

  container.querySelectorAll('.btn-edit-user').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const user = await getUserById(isNaN(Number(id)) ? id : Number(id));
      if (user) openUserFormModal(user);
    });
  });

  container.querySelectorAll('.btn-delete-user').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      if (confirm(`Yakin ingin menghapus operator "${name}"? Tindakan ini tidak dapat dibatalkan.`)) {
        await deleteUser(isNaN(Number(id)) ? id : Number(id));
        const updated = await getAllUsers();
        store.setUsers(updated);
        renderUsers();
      }
    });
  });
};

/**
 * Modal Form: Tambah / Edit User
 */
export const openUserFormModal = (user = null) => {
  const isEdit = !!user;
  const modalId = 'modal-user-form';

  const modalHtml = `
    <div id="${modalId}" class="modal-overlay" style="display: flex; align-items: center; justify-content: center;">
      <div class="modal-content" style="max-width: 480px; width: 90%; background: var(--bg-card, #ffffff); border-radius: 16px; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.15);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: var(--text-primary);">
            ${isEdit ? '✏️ Edit Akun Operator' : '➕ Tambah Akun Operator Baru'}
          </h3>
          <button class="modal-close" style="background: none; border: none; font-size: 20px; cursor: pointer; color: var(--text-muted);">&times;</button>
        </div>

        <form id="form-user-save" style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text-secondary);">Nama Lengkap</label>
            <input type="text" id="input-user-name" required value="${esc(user?.name || '')}" placeholder="Contoh: Budi Santoso" class="form-input" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border, #cbd5e1); border-radius: 8px;">
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text-secondary);">Username</label>
            <input type="text" id="input-user-username" required ${isEdit ? 'disabled' : ''} value="${esc(user?.username || '')}" placeholder="Contoh: kasir1 (huruf kecil, tanpa spasi)" class="form-input" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border, #cbd5e1); border-radius: 8px; ${isEdit ? 'background: var(--bg-muted, #f1f5f9);' : ''}">
            <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px; display: block;">Username unik untuk masuk ke sistem.</span>
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text-secondary);">Peran (Hak Akses)</label>
            <select id="input-user-role" class="form-input" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border, #cbd5e1); border-radius: 8px; background: white;">
              <option value="cashier" ${user?.role === 'cashier' ? 'selected' : ''}>👤 Kasir (Hanya Transaksi & CRM Pelanggan)</option>
              <option value="supervisor" ${user?.role === 'supervisor' ? 'selected' : ''}>⭐ Supervisor (Kasir + Produk + Laporan)</option>
              <option value="owner" ${user?.role === 'owner' ? 'selected' : ''}>👑 Owner (Akses Penuh Seluruh Modul Toko)</option>
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text-secondary);">
              ${isEdit ? 'PIN Baru (Kosongkan jika tidak diubah)' : 'PIN Masuk (4-6 Angka)'}
            </label>
            <input type="password" id="input-user-pin" ${isEdit ? '' : 'required'} maxlength="6" pattern="[0-9]*" inputmode="numeric" placeholder="${isEdit ? '•••• (biarkan kosong jika tetap)' : 'Contoh: 1234'}" class="form-input" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border, #cbd5e1); border-radius: 8px; letter-spacing: 4px; font-size: 16px;">
            <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px; display: block;">PIN dienkripsi dengan Salted SHA-256 (tidak pernah disimpan plaintext).</span>
          </div>

          ${isEdit ? `
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
              <input type="checkbox" id="input-user-active" ${user?.isActive !== false ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: #2563eb;">
              <label for="input-user-active" style="font-size: 14px; font-weight: 500; cursor: pointer;">Akun Aktif (Dapat Login)</label>
            </div>
          ` : ''}

          <div id="user-form-error" style="display: none; color: #dc2626; font-size: 13px; background: #fef2f2; padding: 10px; border-radius: 8px; border: 1px solid #fee2e2;"></div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 12px;">
            <button type="button" class="btn modal-cancel" style="padding: 10px 18px; border-radius: 8px; border: 1px solid var(--border); background: transparent; cursor: pointer;">Batal</button>
            <button type="submit" class="btn btn-primary" id="btn-submit-user" style="padding: 10px 22px; border-radius: 8px; font-weight: 600;">
              ${isEdit ? 'Simpan Perubahan' : 'Buat Operator'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Inject modal into DOM
  const existing = document.getElementById(modalId);
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modalEl = document.getElementById(modalId);
  const close = () => modalEl.remove();

  modalEl.querySelector('.modal-close')?.addEventListener('click', close);
  modalEl.querySelector('.modal-cancel')?.addEventListener('click', close);

  const form = document.getElementById('form-user-save');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errBox = document.getElementById('user-form-error');
    errBox.style.display = 'none';

    const name = document.getElementById('input-user-name').value.trim();
    const username = document.getElementById('input-user-username').value.trim().toLowerCase();
    const role = document.getElementById('input-user-role').value;
    const pin = document.getElementById('input-user-pin').value.trim();
    const isActive = isEdit ? document.getElementById('input-user-active').checked : true;

    if (!name || !username) {
      errBox.textContent = 'Nama dan username wajib diisi.';
      errBox.style.display = 'block';
      return;
    }

    if (!isEdit && (!pin || pin.length < 4)) {
      errBox.textContent = 'PIN minimal 4 angka numerik.';
      errBox.style.display = 'block';
      return;
    }

    if (pin && (pin.length < 4 || isNaN(Number(pin)))) {
      errBox.textContent = 'PIN harus berupa angka (4 hingga 6 digit).';
      errBox.style.display = 'block';
      return;
    }

    try {
      const allUsers = await getAllUsers();
      if (!isEdit && allUsers.some(u => (u.username || '').toLowerCase() === username)) {
        errBox.textContent = `Username "${username}" sudah digunakan oleh operator lain.`;
        errBox.style.display = 'block';
        return;
      }

      if (isEdit) {
        let pinHash = user.pinHash;
        let pinSalt = user.pinSalt;
        if (pin) {
          pinSalt = generateSalt();
          pinHash = await hashPin(pin, pinSalt);
        }

        const updated = {
          ...user,
          name,
          role,
          pinHash,
          pinSalt,
          isActive,
          updatedAt: new Date().toISOString(),
        };
        await updateUser(updated);
        // If current user updated their own name/role, update session
        if (store.state.currentUser && String(store.state.currentUser.id) === String(user.id)) {
          store.state.currentUser.name = name;
          store.state.currentUser.role = role;
          sessionStorage.setItem('bm_active_user', JSON.stringify(store.state.currentUser));
          store.emit('auth:change', store.state.currentUser);
        }
      } else {
        const pinSalt = generateSalt();
        const pinHash = await hashPin(pin, pinSalt);
        const newUser = {
          name,
          username,
          role,
          pinHash,
          pinSalt,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await addUser(newUser);
      }

      const freshUsers = await getAllUsers();
      store.setUsers(freshUsers);
      close();
      renderUsers();
    } catch (err) {
      errBox.textContent = 'Gagal menyimpan data: ' + err.message;
      errBox.style.display = 'block';
    }
  });
};
