/**
 * views/users.js — Operator & Account Management (RBAC)
 * Full CRUD for POS Staff Accounts (Owner, Supervisor, Cashier)
 * Adaptive Responsive Layout: Desktop Data Table + Mobile/Tablet Card Grid
 * Uses Web Crypto API Salted SHA-256 for Zero-Plaintext PIN Storage.
 */
import {
	addUser,
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from "../db.js";
import store from "../store.js";
import { syncAuthoritativeRosterToCache } from "../supabase.js";
import { generateSalt, hashPin } from "../utils/crypto.js";
import { esc } from "../utils/sanitize.js";

let _unsubscribers = [];
let _searchQuery = "";
let _selectedRoleFilter = "all"; // 'all' | 'owner' | 'supervisor' | 'cashier'
let _isSyncing = false;

export const ROLE_LABELS = {
	owner: {
		label: "👑 Owner / Pemilik",
		shortLabel: "Owner",
		color: "#7c3aed",
		bg: "rgba(124, 58, 237, 0.10)",
		border: "rgba(124, 58, 237, 0.25)",
	},
	supervisor: {
		label: "⭐ Supervisor",
		shortLabel: "Supervisor",
		color: "#2563eb",
		bg: "rgba(37, 99, 235, 0.10)",
		border: "rgba(37, 99, 235, 0.25)",
	},
	cashier: {
		label: "👤 Kasir / Staff",
		shortLabel: "Kasir",
		color: "#059669",
		bg: "rgba(5, 150, 105, 0.10)",
		border: "rgba(5, 150, 105, 0.25)",
	},
};

/**
 * Initialize Users Management View
 */
export const initUsers = async () => {
	if (_unsubscribers.length) {
		for (const u of _unsubscribers) {
			if (typeof u === "function") u();
		}
		_unsubscribers = [];
	}

	_unsubscribers.push(store.on("users:change", () => renderUsers()));
	_unsubscribers.push(
		store.on("auth:change", () => {
			const container = document.getElementById("view-users");
			if (container?.classList.contains("active")) {
				renderUsers();
			}
		}),
	);

	await renderUsers();
};

/**
 * Main Render Function
 */
export const renderUsers = async () => {
	const container = document.getElementById("view-users");
	if (!container) return;

	// RBAC Access Check (Strictly Owner Only)
	const currentUser = store.state.currentUser;
	if (currentUser?.role !== "owner") {
		container.innerHTML = `
      <div class="staff-view-container">
        <div class="staff-header">
          <div class="staff-header-info">
            <h1>👥 Manajemen Akun & Hak Akses</h1>
            <p>Kontrol hak akses operator kasir, supervisor, dan pemilik toko.</p>
          </div>
        </div>
        <div style="background: var(--bg-card, #ffffff); border-radius: 16px; padding: 48px 24px; text-align: center; border: 1px solid var(--border-default, #e2e8f0); margin-top: 10px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 54px; margin-bottom: 16px;">🔒</div>
          <h3 style="margin-bottom: 8px; font-size: 1.3rem; color: var(--text-primary, #1e293b);">Akses Terkunci (Khusus Owner)</h3>
          <p style="color: var(--text-muted, #64748b); max-width: 480px; margin: 0 auto 24px auto; font-size: 14px; line-height: 1.5;">
            Modul manajemen akun staf dan konfigurasi hak akses hanya dapat dibuka oleh akun bertingkat <strong>Owner / Pemilik</strong>. Silakan beralih operator untuk melanjutkan.
          </p>
          <button class="btn btn-primary" id="btn-lock-switch-op" style="padding: 11px 24px; border-radius: 10px; font-weight: 700;">
            🔑 Beralih Operator / Login Owner
          </button>
        </div>
      </div>
    `;
		document
			.getElementById("btn-lock-switch-op")
			?.addEventListener("click", () => {
				window.dispatchEvent(new CustomEvent("request-operator-switch"));
			});
		return;
	}

	const allUsers = await getAllUsers();

	// Calculate Role Metrics
	const totalUsers = allUsers.length;
	const ownerCount = allUsers.filter((u) => u.role === "owner").length;
	const supervisorCount = allUsers.filter(
		(u) => u.role === "supervisor",
	).length;
	const cashierCount = allUsers.filter((u) => u.role === "cashier").length;
	const activeCashierCount = allUsers.filter(
		(u) => u.role === "cashier" && u.isActive !== false,
	).length;

	// Filter by Search Query & Selected Role Tab
	const filteredUsers = allUsers.filter((u) => {
		if (_selectedRoleFilter !== "all" && u.role !== _selectedRoleFilter) {
			return false;
		}
		if (!_searchQuery) return true;
		const q = _searchQuery.toLowerCase();
		return (
			(u.name || "").toLowerCase().includes(q) ||
			(u.username || "").toLowerCase().includes(q)
		);
	});

	container.innerHTML = `
    <div class="staff-view-container">
      <!-- Header Section -->
      <div class="staff-header">
        <div class="staff-header-info">
          <h1>👥 Manajemen Akun & Hak Akses</h1>
          <p>Kontrol hak akses operator kasir, supervisor, dan owner toko dengan enkripsi PIN Salted SHA-256.</p>
        </div>
        <div class="staff-header-actions">
          <button class="btn-staff-action btn-staff-sync ${_isSyncing ? "is-syncing" : ""}" id="btn-sync-roster" title="Perbarui dan sinkronkan daftar operator dengan Supabase Cloud">
            <span class="sync-icon">🔄</span>
            <span class="sync-text">${_isSyncing ? "Menyinkronkan..." : "Sinkron Roster"}</span>
          </button>
          <button class="btn-staff-action btn-staff-add" id="btn-add-user" title="Buat akun operator baru">
            <span>➕</span> Tambah Operator
          </button>
        </div>
      </div>

      <!-- Executive Stats Cards (Responsive Grid) -->
      <div class="staff-stats-grid">
        <div class="staff-stat-card">
          <div class="staff-stat-icon" style="background: rgba(37, 99, 235, 0.10); color: #2563eb;">👥</div>
          <div>
            <div class="staff-stat-val">${totalUsers}</div>
            <div class="staff-stat-lbl">Total Operator Terdaftar</div>
          </div>
        </div>

        <div class="staff-stat-card">
          <div class="staff-stat-icon" style="background: rgba(124, 58, 237, 0.10); color: #7c3aed;">👑</div>
          <div>
            <div class="staff-stat-val">${ownerCount}</div>
            <div class="staff-stat-lbl">Owner / Pemilik</div>
          </div>
        </div>

        <div class="staff-stat-card">
          <div class="staff-stat-icon" style="background: rgba(37, 99, 235, 0.10); color: #2563eb;">⭐</div>
          <div>
            <div class="staff-stat-val">${supervisorCount}</div>
            <div class="staff-stat-lbl">Supervisor</div>
          </div>
        </div>

        <div class="staff-stat-card">
          <div class="staff-stat-icon" style="background: rgba(5, 150, 105, 0.10); color: #059669;">👤</div>
          <div>
            <div class="staff-stat-val">${activeCashierCount} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">/ ${cashierCount}</span></div>
            <div class="staff-stat-lbl">Kasir Aktif</div>
          </div>
        </div>
      </div>

      <!-- Security & Cloud Integrity Banner -->
      <div class="staff-security-bar">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>🛡️</span>
          <span><strong>Keamanan Terverifikasi:</strong> Zero-Plaintext PIN (Salted SHA-256) • Brute-Force Rate Limiter 60 Detik Aktif</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px; font-weight: 600;">
          <span style="width: 7px; height: 7px; border-radius: 50%; background: #10b981; box-shadow: 0 0 0 2px rgba(16,185,129,0.3);"></span>
          <span>Cloud Realtime Active</span>
        </div>
      </div>

      <!-- Toolbar: Search & Role Filter Tabs -->
      <div class="staff-toolbar">
        <div class="staff-search-box">
          <span style="font-size: 16px; opacity: 0.6;">🔍</span>
          <input type="text" id="user-search-input" class="staff-search-input" value="${esc(_searchQuery)}" placeholder="Cari nama atau username operator...">
          ${_searchQuery ? `<button id="btn-clear-user-search" style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 14px; padding: 2px 6px;">✕</button>` : ""}
        </div>

        <div class="staff-filter-pills">
          <button class="staff-filter-pill ${_selectedRoleFilter === "all" ? "active" : ""}" data-role="all">
            Semua (${totalUsers})
          </button>
          <button class="staff-filter-pill ${_selectedRoleFilter === "owner" ? "active" : ""}" data-role="owner">
            👑 Owner (${ownerCount})
          </button>
          <button class="staff-filter-pill ${_selectedRoleFilter === "supervisor" ? "active" : ""}" data-role="supervisor">
            ⭐ Supervisor (${supervisorCount})
          </button>
          <button class="staff-filter-pill ${_selectedRoleFilter === "cashier" ? "active" : ""}" data-role="cashier">
            👤 Kasir (${cashierCount})
          </button>
        </div>
      </div>

      <!-- Desktop View: Adaptive Data Table -->
      <div class="staff-table-wrapper">
        <table class="staff-table">
          <thead>
            <tr>
              <th>Operator</th>
              <th>Username</th>
              <th>Hak Akses (Role)</th>
              <th>Status</th>
              <th style="text-align: right;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${
							filteredUsers.length === 0
								? `
              <tr>
                <td colspan="5">
                  <div class="staff-empty-state">
                    <div class="staff-empty-state-icon">🔍</div>
                    <div style="font-weight: 600; font-size: 15px; color: var(--text-primary); margin-bottom: 4px;">Tidak Ada Operator Ditemukan</div>
                    <div>Tidak ada akun operator yang sesuai dengan kriteria pencarian atau filter peran.</div>
                  </div>
                </td>
              </tr>
            `
								: filteredUsers
										.map((u) => {
											const roleMeta =
												ROLE_LABELS[u.role] || ROLE_LABELS.cashier;
											const isSelf =
												currentUser && String(currentUser.id) === String(u.id);
											const isActive = u.isActive !== false;

											return `
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 38px; height: 38px; border-radius: 10px; background: ${roleMeta.bg}; color: ${roleMeta.color}; border: 1px solid ${roleMeta.border}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; flex-shrink: 0;">
                        ${(u.name || "U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style="font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                          ${esc(u.name)}
                          ${isSelf ? '<span style="font-size: 10.5px; padding: 2px 7px; border-radius: 6px; background: #e0e7ff; color: #3730a3; font-weight: 700;">Anda</span>' : ""}
                        </div>
                        <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 1px;">Dibuat: ${new Date(u.createdAt || Date.now()).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <code style="background: var(--bg-base, #f1f5f9); padding: 4px 8px; border-radius: 6px; font-size: 12.5px; color: var(--blue-700, #1d4ed8); font-weight: 600; border: 1px solid var(--border-subtle, #e2e8f0);">@${esc(u.username)}</code>
                  </td>
                  <td>
                    <span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; color: ${roleMeta.color}; background: ${roleMeta.bg}; border: 1px solid ${roleMeta.border};">
                      ${roleMeta.label}
                    </span>
                  </td>
                  <td>
                    <span class="staff-status-badge ${isActive ? "active" : "inactive"}">
                      <span class="staff-status-dot"></span>
                      ${isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td style="text-align: right;">
                    <div style="display: inline-flex; gap: 8px;">
                      <button class="btn-edit-user" data-id="${u.id}" title="Edit Akun" style="padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border-default, #cbd5e1); background: var(--bg-surface, #ffffff); cursor: pointer; font-size: 12.5px; font-weight: 600; color: var(--text-primary); transition: all 0.15s ease;">
                        ✏️ Edit
                      </button>
                      ${
												!isSelf
													? `
                        <button class="btn-delete-user" data-id="${u.id}" data-name="${esc(u.name)}" data-role="${u.role}" title="Hapus Operator" style="padding: 6px 14px; border-radius: 8px; border: 1px solid #fecaca; background: #fff1f2; color: #e11d48; cursor: pointer; font-size: 12.5px; font-weight: 600; transition: all 0.15s ease;">
                          🗑️ Hapus
                        </button>
                      `
													: ""
											}
                    </div>
                  </td>
                </tr>
              `;
										})
										.join("")
						}
          </tbody>
        </table>
      </div>

      <!-- Mobile / Tablet View: Adaptive Card Grid -->
      <div class="staff-card-grid">
        ${
					filteredUsers.length === 0
						? `
          <div class="staff-empty-state" style="grid-column: 1 / -1; background: var(--bg-card); border-radius: 14px; border: 1px solid var(--border-default);">
            <div class="staff-empty-state-icon">🔍</div>
            <div style="font-weight: 600; font-size: 15px; color: var(--text-primary); margin-bottom: 4px;">Tidak Ada Operator Ditemukan</div>
            <div>Tidak ada akun operator yang sesuai dengan pencarian atau filter.</div>
          </div>
        `
						: filteredUsers
								.map((u) => {
									const roleMeta = ROLE_LABELS[u.role] || ROLE_LABELS.cashier;
									const isSelf =
										currentUser && String(currentUser.id) === String(u.id);
									const isActive = u.isActive !== false;

									return `
            <div class="staff-card-item">
              <div class="staff-card-top">
                <div class="staff-card-user-info">
                  <div style="width: 42px; height: 42px; border-radius: 12px; background: ${roleMeta.bg}; color: ${roleMeta.color}; border: 1px solid ${roleMeta.border}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px;">
                    ${(u.name || "U").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-weight: 700; font-size: 14.5px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                      ${esc(u.name)}
                      ${isSelf ? '<span style="font-size: 10px; padding: 2px 6px; border-radius: 5px; background: #e0e7ff; color: #3730a3; font-weight: 700;">Anda</span>' : ""}
                    </div>
                    <code style="font-size: 12px; color: var(--blue-700); font-weight: 600;">@${esc(u.username)}</code>
                  </div>
                </div>
                <span class="staff-status-badge ${isActive ? "active" : "inactive"}">
                  <span class="staff-status-dot"></span>
                  ${isActive ? "Aktif" : "Nonaktif"}
                </span>
              </div>

              <div class="staff-card-details">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted); font-weight: 500;">Peran Akses:</span>
                  <span style="font-size: 11.5px; font-weight: 700; color: ${roleMeta.color}; background: ${roleMeta.bg}; padding: 2px 8px; border-radius: 12px; border: 1px solid ${roleMeta.border};">
                    ${roleMeta.label}
                  </span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted); font-weight: 500;">Dibuat:</span>
                  <span style="color: var(--text-secondary); font-weight: 600;">${new Date(u.createdAt || Date.now()).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              </div>

              <div class="staff-card-actions">
                <button class="btn-edit-user" data-id="${u.id}" style="border: 1px solid var(--border-default, #cbd5e1); background: var(--bg-surface, #ffffff); color: var(--text-primary);">
                  ✏️ Edit
                </button>
                ${
									!isSelf
										? `
                  <button class="btn-delete-user" data-id="${u.id}" data-name="${esc(u.name)}" data-role="${u.role}" style="border: 1px solid #fecaca; background: #fff1f2; color: #e11d48;">
                    🗑️ Hapus
                  </button>
                `
										: ""
								}
              </div>
            </div>
          `;
								})
								.join("")
				}
      </div>
    </div>
  `;

	// ── Event Handlers ──

	// Manual Cloud Roster Synchronization Button
	document
		.getElementById("btn-sync-roster")
		?.addEventListener("click", async () => {
			if (_isSyncing) return;
			_isSyncing = true;
			renderUsers();
			try {
				const synced = await syncAuthoritativeRosterToCache();
				window.showToast?.(
					`Sukses menyinkronkan ${synced?.length || 0} akun operator dari Cloud!`,
					"success",
				);
			} catch (err) {
				window.showToast?.(
					`Sinkronisasi gagal: ${err.message || "Koneksi terganggu"}`,
					"error",
				);
			} finally {
				_isSyncing = false;
				renderUsers();
			}
		});

	// Add User Button
	document
		.getElementById("btn-add-user")
		?.addEventListener("click", () => openUserFormModal());

	// Search Input
	document
		.getElementById("user-search-input")
		?.addEventListener("input", (e) => {
			_searchQuery = e.target.value;
			renderUsers();
		});

	// Clear Search
	document
		.getElementById("btn-clear-user-search")
		?.addEventListener("click", () => {
			_searchQuery = "";
			renderUsers();
		});

	// Role Filter Pills
	container.querySelectorAll(".staff-filter-pill").forEach((pill) => {
		pill.addEventListener("click", () => {
			_selectedRoleFilter = pill.getAttribute("data-role") || "all";
			renderUsers();
		});
	});

	// Edit User Buttons (Desktop Table & Mobile Cards)
	container.querySelectorAll(".btn-edit-user").forEach((btn) => {
		btn.addEventListener("click", async () => {
			const id = btn.getAttribute("data-id");
			const user = await getUserById(String(id));
			if (user) openUserFormModal(user);
		});
	});

	// Delete User Buttons (Desktop Table & Mobile Cards)
	container.querySelectorAll(".btn-delete-user").forEach((btn) => {
		btn.addEventListener("click", async () => {
			const id = btn.getAttribute("data-id");
			const name = btn.getAttribute("data-name");
			const role = btn.getAttribute("data-role");

			// Safeguard: Prevent deleting the last owner account
			if (role === "owner") {
				const currentUsers = await getAllUsers();
				const remainingOwners = currentUsers.filter(
					(u) => u.role === "owner" && u.isActive !== false,
				);
				if (remainingOwners.length <= 1) {
					alert(
						"Akses Ditolak: Toko wajib memiliki minimal satu akun Owner aktif. Anda tidak dapat menghapus akun Owner terakhir!",
					);
					return;
				}
			}

			if (
				confirm(
					`Yakin ingin menghapus operator "${name}"? Tindakan ini akan menghapus akun dari perangkat lokal dan Supabase Cloud.`,
				)
			) {
				try {
					await deleteUser(String(id));
					const updated = await getAllUsers();
					store.setUsers(updated);
					window.showToast?.(
						`Operator "${name}" berhasil dihapus dari sistem & Cloud.`,
						"success",
					);
					renderUsers();
				} catch (err) {
					alert(`Gagal menghapus operator: ${err.message}`);
				}
			}
		});
	});
};

/**
 * Modal Form: Tambah / Edit User
 */
export const openUserFormModal = (user = null) => {
	const isEdit = !!user;
	const modalId = "modal-user-form";

	const modalHtml = `
    <div id="${modalId}" class="modal-overlay" style="display: flex; align-items: center; justify-content: center; z-index: 10000; padding: 16px; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);">
      <div class="modal-content" style="max-width: 480px; width: 100%; background: var(--bg-card, #ffffff); border-radius: 18px; padding: 24px; box-shadow: 0 20px 45px rgba(0,0,0,0.2); border: 1px solid var(--border-default, #e2e8f0); max-height: 90vh; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--border-subtle, #f1f5f9);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 22px;">${isEdit ? "✏️" : "👤"}</span>
            <div>
              <h3 style="margin: 0; font-size: 17px; font-weight: 800; color: var(--text-primary);">
                ${isEdit ? "Edit Akun Operator" : "Tambah Operator Baru"}
              </h3>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">
                ${isEdit ? `Memodifikasi profil @${esc(user?.username)}` : "Daftarkan akun kasir, supervisor, atau owner baru"}
              </p>
            </div>
          </div>
          <button class="modal-close" style="background: none; border: none; font-size: 22px; cursor: pointer; color: var(--text-muted); line-height: 1;">&times;</button>
        </div>

        <form id="form-user-save" style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">Nama Lengkap Staf <span style="color: #ef4444;">*</span></label>
            <input type="text" id="input-user-name" required value="${esc(user?.name || "")}" placeholder="Contoh: Budi Santoso" class="form-input" style="width: 100%; padding: 11px 14px; border: 1px solid var(--border-default, #cbd5e1); border-radius: 10px; font-size: 14px; background: var(--bg-surface, #ffffff); color: var(--text-primary);">
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">Username Masuk <span style="color: #ef4444;">*</span></label>
            <input type="text" id="input-user-username" required ${isEdit ? "disabled" : ""} value="${esc(user?.username || "")}" placeholder="Contoh: kasir1 (huruf kecil, tanpa spasi)" class="form-input" style="width: 100%; padding: 11px 14px; border: 1px solid var(--border-default, #cbd5e1); border-radius: 10px; font-size: 14px; ${isEdit ? "background: var(--bg-base, #f1f5f9); color: var(--text-muted);" : "background: var(--bg-surface, #ffffff); color: var(--text-primary);"}">
            <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px; display: block;">Username bersifat permanen dan digunakan saat login.</span>
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">Peran (Tingkat Hak Akses) <span style="color: #ef4444;">*</span></label>
            <select id="input-user-role" class="form-input" style="width: 100%; padding: 11px 14px; border: 1px solid var(--border-default, #cbd5e1); border-radius: 10px; background: var(--bg-surface, #ffffff); font-size: 13.5px; color: var(--text-primary); cursor: pointer;">
              <option value="cashier" ${user?.role === "cashier" ? "selected" : ""}>👤 Kasir (Hanya POS Kasir & Data Pelanggan)</option>
              <option value="supervisor" ${user?.role === "supervisor" ? "selected" : ""}>⭐ Supervisor (Kasir + Manajemen Produk + Laporan Toko)</option>
              <option value="owner" ${user?.role === "owner" ? "selected" : ""}>👑 Owner / Pemilik (Akses Penuh Seluruh Modul Toko)</option>
            </select>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 13px; font-weight: 700; color: var(--text-primary);">
                ${isEdit ? "PIN Baru (Opsional)" : "PIN Masuk (4-6 Angka) <span style='color: #ef4444;'>*</span>"}
              </label>
              <button type="button" id="btn-toggle-pin-peek" style="background: none; border: none; font-size: 11.5px; color: var(--blue-600, #2563eb); font-weight: 600; cursor: pointer;">👁️ Lihat PIN</button>
            </div>
            <input type="password" id="input-user-pin" ${isEdit ? "" : "required"} maxlength="6" pattern="[0-9]*" inputmode="numeric" placeholder="${isEdit ? "•••• (biarkan kosong jika tidak diubah)" : "Contoh: 123456"}" class="form-input" style="width: 100%; padding: 11px 14px; border: 1px solid var(--border-default, #cbd5e1); border-radius: 10px; letter-spacing: 4px; font-size: 16px; background: var(--bg-surface, #ffffff); color: var(--text-primary);">
            <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px; display: block;">Keamanan Salted SHA-256: PIN tidak pernah disimpan dalam teks mentah.</span>
          </div>

          ${
						isEdit
							? `
            <div style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--bg-base, #f8fafc); border-radius: 10px; border: 1px solid var(--border-subtle, #e2e8f0);">
              <input type="checkbox" id="input-user-active" ${user?.isActive !== false ? "checked" : ""} style="width: 18px; height: 18px; accent-color: var(--blue-600, #2563eb); cursor: pointer;">
              <label for="input-user-active" style="font-size: 13.5px; font-weight: 600; cursor: pointer; color: var(--text-primary);">
                Akun Operator Aktif (Dapat Login)
              </label>
            </div>
          `
							: ""
					}

          <div id="user-form-error" style="display: none; color: #dc2626; font-size: 13px; background: #fef2f2; padding: 11px 14px; border-radius: 10px; border: 1px solid #fee2e2; font-weight: 500;"></div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px; padding-top: 14px; border-top: 1px solid var(--border-subtle, #f1f5f9);">
            <button type="button" class="btn modal-cancel" style="padding: 10px 18px; border-radius: 10px; border: 1px solid var(--border-default, #cbd5e1); background: var(--bg-surface, #ffffff); font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer;">
              Batal
            </button>
            <button type="submit" class="btn btn-primary" id="btn-submit-user" style="padding: 10px 22px; border-radius: 10px; font-weight: 700; font-size: 13.5px;">
              ${isEdit ? "Simpan Perubahan" : "Buat Operator"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

	// Inject modal into DOM
	const existing = document.getElementById(modalId);
	if (existing) existing.remove();
	document.body.insertAdjacentHTML("beforeend", modalHtml);

	const modalEl = document.getElementById(modalId);
	const close = () => modalEl.remove();

	modalEl.querySelector(".modal-close")?.addEventListener("click", close);
	modalEl.querySelector(".modal-cancel")?.addEventListener("click", close);

	// Toggle PIN Visibility
	const pinInput = document.getElementById("input-user-pin");
	const togglePinBtn = document.getElementById("btn-toggle-pin-peek");
	togglePinBtn?.addEventListener("click", () => {
		if (pinInput.type === "password") {
			pinInput.type = "text";
			togglePinBtn.textContent = "🙈 Sembunyikan";
		} else {
			pinInput.type = "password";
			togglePinBtn.textContent = "👁️ Lihat PIN";
		}
	});

	const form = document.getElementById("form-user-save");
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const errBox = document.getElementById("user-form-error");
		errBox.style.display = "none";

		const name = document.getElementById("input-user-name").value.trim();
		const username = document
			.getElementById("input-user-username")
			.value.trim()
			.toLowerCase();
		const role = document.getElementById("input-user-role").value;
		const pin = document.getElementById("input-user-pin").value.trim();
		const isActive = isEdit
			? document.getElementById("input-user-active").checked
			: true;

		if (!name || !username) {
			errBox.textContent = "Nama lengkap dan username wajib diisi.";
			errBox.style.display = "block";
			return;
		}

		if (!isEdit && (!pin || pin.length < 4)) {
			errBox.textContent = "PIN minimal 4 angka numerik.";
			errBox.style.display = "block";
			return;
		}

		if (pin && (pin.length < 4 || Number.isNaN(Number(pin)))) {
			errBox.textContent = "PIN harus berupa angka (4 hingga 6 digit).";
			errBox.style.display = "block";
			return;
		}

		try {
			const allUsers = await getAllUsers();

			// Safeguard: Check unique username on new user
			if (
				!isEdit &&
				allUsers.some((u) => (u.username || "").toLowerCase() === username)
			) {
				errBox.textContent = `Username "${username}" sudah digunakan oleh operator lain.`;
				errBox.style.display = "block";
				return;
			}

			// Safeguard: Prevent deactivating or demoting the last active owner
			if (isEdit && user.role === "owner" && (role !== "owner" || !isActive)) {
				const remainingActiveOwners = allUsers.filter(
					(u) =>
						u.role === "owner" &&
						u.isActive !== false &&
						String(u.id) !== String(user.id),
				);
				if (remainingActiveOwners.length === 0) {
					errBox.textContent =
						"Tidak dapat menonaktifkan atau mengubah peran Owner terakhir! Toko wajib memiliki minimal satu akun Owner aktif.";
					errBox.style.display = "block";
					return;
				}
			}

			const submitBtn = document.getElementById("btn-submit-user");
			submitBtn.disabled = true;
			submitBtn.textContent = "Menyimpan ke Cloud...";

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

				// Update active session if editing own profile
				if (
					store.state.currentUser &&
					String(store.state.currentUser.id) === String(user.id)
				) {
					store.state.currentUser.name = name;
					store.state.currentUser.role = role;
					sessionStorage.setItem(
						"bm_active_user",
						JSON.stringify(store.state.currentUser),
					);
					store.emit("auth:change", store.state.currentUser);
				}

				window.showToast?.(
					`Perubahan akun operator "${name}" berhasil disimpan!`,
					"success",
				);
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
				window.showToast?.(
					`Akun operator baru "${name}" berhasil dibuat!`,
					"success",
				);
			}

			const freshUsers = await getAllUsers();
			store.setUsers(freshUsers);
			close();
			renderUsers();
		} catch (err) {
			errBox.textContent = `Gagal menyimpan data: ${err.message}`;
			errBox.style.display = "block";
			const submitBtn = document.getElementById("btn-submit-user");
			if (submitBtn) {
				submitBtn.disabled = false;
				submitBtn.textContent = isEdit ? "Simpan Perubahan" : "Buat Operator";
			}
		}
	});
};
