/**
 * views/settings.js — Enterprise POS Settings & Multi-Device Sync Engine
 * Blue Mountain Refilling Station POS
 */
import {
	clearAllData,
	exportFullBackup,
	getAllCustomers,
	getAllExpenses,
	getAllProducts,
	getAllTransactions,
	getSetting,
	importFullBackup,
	setSetting,
} from "../db.js";
import { printTestReceipt } from "../printer.js";
import store from "../store.js";
import {
	getMasterStoreId,
	pushSettingToCloud,
	setMasterStoreId,
	setupRealtimeSubscription,
	syncInitialData,
} from "../supabase.js";
import { formatRupiah } from "../utils/currency.js";
import { esc } from "../utils/sanitize.js";
import { closeModal, openModal } from "./modals.js";

export const initSettings = async () => {
	await loadSettings();
	await renderSettings();
};

const SETTING_KEYS = [
	"shopName",
	"shopAddress",
	"shopPhone",
	"cashierName",
	"receiptFooter",
	"modalAwal",
	"taxRate",
	"bankName",
	"bankNumber",
	"bankHolder",
	"qrisNumber",
	"printerPaper",
];

const loadSettings = async () => {
	const s = {};
	for (const k of SETTING_KEYS) {
		const v = await getSetting(k);
		if (v !== null) s[k] = v;
	}
	store.updateSettings(s);
};

export const renderSettings = async () => {
	const view = document.getElementById("view-settings");
	if (!view) return;
	const s = store.state.settings;

	// Dynamic version & build metadata injected by Vite build engine
	const appVersion =
		typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "1.1.0";
	const gitHash =
		typeof __GIT_HASH__ !== "undefined" && __GIT_HASH__ ? __GIT_HASH__ : "";
	const buildTime =
		typeof __BUILD_TIMESTAMP__ !== "undefined"
			? __BUILD_TIMESTAMP__
			: new Date().toISOString();

	const buildDateObj = new Date(buildTime);
	const formattedBuildDate = new Intl.DateTimeFormat("id-ID", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(buildDateObj);
	const formattedBuildClock = new Intl.DateTimeFormat("id-ID", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	}).format(buildDateObj);

	// Check if app is running in standalone mode (PWA installed)
	const isStandalone =
		window.matchMedia("(display-mode: standalone)").matches ||
		window.navigator.standalone === true;

	const currentUser = store.state.currentUser;
	const currentStoreId = getMasterStoreId();

	// QRIS string validation indicator
	const rawQris = (s.qrisNumber || "").trim();
	const isQrisValid = rawQris.length > 20 && rawQris.startsWith("000201");

	view.innerHTML = `
    <div class="section-header">
      <div>
        <h2 class="section-title">Pengaturan Sistem &amp; Toko</h2>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">
          Kelola profil toko, struk thermal, metode pembayaran, dan sinkronisasi database cloud
        </div>
      </div>
      <button class="btn btn--primary" id="btn-save-settings">
        💾 Simpan Semua Pengaturan
      </button>
    </div>

    <!-- 1. Operator & Sesi Kasir -->
    <div class="settings-section">
      <div class="settings-section-header">👤 Profil &amp; Sesi Kasir Aktif</div>
      
      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Operator Saat Ini</div>
          <div class="settings-row__desc">Akun yang memiliki wewenang operasional transaksi di perangkat ini</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <span style="font-weight:700;font-size:14px;color:var(--text-primary)">
            ${esc(currentUser?.name || "Belum Masuk")}
          </span>
          <span class="badge badge--blue" style="text-transform:uppercase;font-weight:700">
            ${esc(currentUser?.role || "-")}
          </span>
          <span class="badge badge--green" style="font-size:11px">
            ID: ${esc(currentUser?.username || "-")}
          </span>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Kontrol Sesi Operator</div>
          <div class="settings-row__desc">Beralih ke akun staf lain dengan PIN cepat atau keluar untuk mengunci kasir</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn btn--secondary btn--sm" id="btn-settings-switch-op" style="font-weight:700">
            🔄 Beralih Operator
          </button>
          <button type="button" class="btn btn--danger btn--sm" id="btn-settings-logout" style="font-weight:700">
            🚪 Keluar / Kunci Kasir
          </button>
        </div>
      </div>
    </div>

    <!-- 2. Informasi Toko & Struk -->
    <div class="settings-section">
      <div class="settings-section-header">🏪 Profil Usaha &amp; Pengaturan Struk</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Usaha / Toko <span style="color:var(--color-danger)">*</span></div>
          <div class="settings-row__desc">Nama resmi yang tercetak di header struk thermal &amp; kop invoice PDF</div>
        </div>
        <input type="text" class="input" id="set-shopName" value="${esc(s.shopName || "Blue Mountain Refilling Station")}" maxlength="80" placeholder="Blue Mountain Refilling Station" style="max-width:320px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Alamat Lengkap Usaha</div>
          <div class="settings-row__desc">Alamat fisik outlet yang dicetak pada bagian atas struk</div>
        </div>
        <input type="text" class="input" id="set-shopAddress" value="${esc(s.shopAddress || "")}" maxlength="140" placeholder="Jl. Garuda No. 42, RT 02/RW 05" style="max-width:320px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">No. Telepon / WhatsApp</div>
          <div class="settings-row__desc">Nomor narahubung pemesanan galon / customer care</div>
        </div>
        <input type="tel" class="input" id="set-shopPhone" value="${esc(s.shopPhone || "")}" maxlength="25" placeholder="0812-3456-7890" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Label Nama Kasir Default</div>
          <div class="settings-row__desc">Nama kasir fallback yang dicetak di struk bila nama staf tidak terbaca</div>
        </div>
        <input type="text" class="input" id="set-cashierName" value="${esc(s.cashierName || "Kasir")}" maxlength="40" placeholder="Kasir" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Pesan Penutup Struk (Footer)</div>
          <div class="settings-row__desc">Ucapan penutup atau slogan yang dicetak di bagian paling bawah struk thermal</div>
        </div>
        <input type="text" class="input" id="set-receiptFooter" value="${esc(s.receiptFooter || "Terima kasih sudah berbelanja!")}" maxlength="80" placeholder="Terima kasih sudah berbelanja!" style="max-width:320px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Saldo Modal Awal Kas Laci Harian (Rp)</div>
          <div class="settings-row__desc">Uang kembalian awal di laci kasir untuk menghitung keseimbangan neraca kas harian</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <input type="number" class="input" id="set-modalAwal" value="${s.modalAwal || 0}" min="0" step="5000" style="max-width:180px">
          <span style="font-size:12px;font-weight:700;color:var(--blue-700)">
            (${formatRupiah(s.modalAwal || 0)})
          </span>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Tarif Pajak Penjualan Toko (%)</div>
          <div class="settings-row__desc">Isi 0 jika toko tidak mengenakan PPN / pajak tambahan</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <input type="number" class="input" id="set-taxRate" value="${s.taxRate || 0}" min="0" max="100" step="0.5" style="max-width:100px">
          <span style="font-size:13px;font-weight:700">%</span>
        </div>
      </div>
    </div>

    <!-- 3. Pembayaran & Dynamic QRIS -->
    <div class="settings-section">
      <div class="settings-section-header">🏦 Saluran Pembayaran (Transfer Bank &amp; Dynamic QRIS)</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Bank Rekening Toko</div>
          <div class="settings-row__desc">Bank penerima transfer pembayaran kasir (misal: BCA, Mandiri, BRI, BSI)</div>
        </div>
        <input type="text" class="input" id="set-bankName" value="${esc(s.bankName || "BCA")}" maxlength="30" placeholder="BCA / Mandiri / BRI" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nomor Rekening</div>
          <div class="settings-row__desc">Nomor rekening tujuan transfer yang tampil di modal bayar &amp; struk</div>
        </div>
        <input type="text" class="input" id="set-bankNumber" value="${esc(s.bankNumber || "")}" maxlength="35" placeholder="Contoh: 123-456-7890" style="max-width:240px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Pemilik Rekening (Atas Nama)</div>
          <div class="settings-row__desc">Nama pemilik sah rekening untuk verifikasi pembeli</div>
        </div>
        <input type="text" class="input" id="set-bankHolder" value="${esc(s.bankHolder || "")}" maxlength="60" placeholder="Contoh: Fadhilah Ramadhan" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Kode String QRIS Toko (Statis)</div>
          <div class="settings-row__desc">
            String EMVCo QRIS resmi toko Anda. Sistem otomatis menginjeksi nominal belanja (Tag 54) secara dinamis dengan nol komisi pihak ketiga.
            ${
							rawQris
								? isQrisValid
									? `<span class="badge badge--green" style="margin-left:6px">✅ Format QRIS Valid</span>`
									: `<span class="badge badge--yellow" style="margin-left:6px">⚠️ Format belum standar EMVCo</span>`
								: ""
						}
          </div>
        </div>
        <textarea class="input" id="set-qrisNumber" rows="2" style="max-width:320px;font-size:11px;font-family:monospace;line-height:1.4" placeholder="0002010102122659...">${esc(s.qrisNumber || "")}</textarea>
      </div>
    </div>

    <!-- 4. Thermal Printer Universal -->
    <div class="settings-section">
      <div class="settings-section-header">🖨️ Hardware &amp; Printer Thermal (48mm / 58mm / 80mm)</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Ukuran Kertas Roll Thermal</div>
          <div class="settings-row__desc">Pilih ukuran roll kertas printer yang terhubung ke terminal kasir</div>
        </div>
        <select class="input" id="set-printerPaper" style="max-width:280px">
          <option value="48mm" ${s.printerPaper === "48mm" ? "selected" : ""}>48mm (EDC / Mini Portable Bluetooth)</option>
          <option value="58mm" ${!s.printerPaper || s.printerPaper === "58mm" ? "selected" : ""}>58mm (Standar Mini POS Bluetooth)</option>
          <option value="80mm" ${s.printerPaper === "80mm" ? "selected" : ""}>80mm (Thermal Besar / Desktop / Kasir Luas)</option>
        </select>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Uji Cetak Struk (Test Print)</div>
          <div class="settings-row__desc">Cetak struk sample untuk validasi margin 0mm, kejelasan font, dan logo thermal</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn btn--secondary btn--sm" id="btn-test-48" style="font-weight:700">🧪 Test 48mm</button>
          <button class="btn btn--secondary btn--sm" id="btn-test-58" style="font-weight:700">🧪 Test 58mm</button>
          <button class="btn btn--secondary btn--sm" id="btn-test-80" style="font-weight:700">🧪 Test 80mm</button>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Panduan Koneksi Hardware Printer</div>
          <div class="settings-row__desc">Petunjuk integrasi Web Bluetooth (BLE), Kabel USB (OTG), dan Background App Android</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-printer-guide" style="font-weight:700">📖 Panduan Hardware</button>
      </div>
    </div>

    <!-- 5. Cloud Database & Sinkronisasi -->
    <div class="settings-section">
      <div class="settings-section-header">☁️ Database Cloud &amp; Multi-Terminal Realtime</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Status Koneksi Supabase Cloud</div>
          <div class="settings-row__desc">Database utama PostgreSQL terenkripsi (Single Source of Truth)</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="badge badge--green" style="font-size:12px;padding:5px 10px;font-weight:700">
            🟢 Terhubung ke Cloud Realtime
          </span>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">ID Partisi Master Toko (Tenant ID)</div>
          <div class="settings-row__desc">Kunci keamanan partisi: memastikan data seluruh terminal toko Anda saling terhubung</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="badge badge--blue" style="font-size:12px;padding:5px 10px;font-weight:800;letter-spacing:0.02em">
            ${esc(currentStoreId)}
          </span>
          <button class="btn btn--secondary btn--sm" id="btn-copy-master-key" title="Salin Master ID">
            📋 Salin ID
          </button>
          <button class="btn btn--secondary btn--sm" id="btn-set-master-key" title="Ganti Master ID">
            🔑 Ubah ID
          </button>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Sinkronisasi Cloud Sekarang (Dual-Bridge)</div>
          <div class="settings-row__desc">Perbarui katalog produk, transaksi, saldo kas, dan akun operator secara realtime</div>
        </div>
        <button class="btn btn--primary btn--sm" id="btn-sync-cloud-now" style="font-weight:700;white-space:nowrap">
          ⚡ Sinkronkan Sekarang
        </button>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Versi Sistem &amp; Arsitektur</div>
          <div class="settings-row__desc">Rilis terverifikasi, riwayat komit Git, dan status aplikasi PWA</div>
        </div>
        <div style="text-align:right">
          <span class="badge badge--blue" style="font-size:12px;padding:5px 10px;font-weight:800">
            v${esc(appVersion)}${gitHash ? ` (${esc(gitHash)})` : ""}
          </span>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px">
            Build: ${esc(formattedBuildDate)} • ${esc(formattedBuildClock)}
          </div>
        </div>
      </div>
    </div>

    <!-- 6. Pencadangan & Pemeliharaan Sistem -->
    <div class="settings-section">
      <div class="settings-section-header">💾 Pencadangan &amp; Pemeliharaan Data</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">📥 Unduh Cadangan Penuh (Backup JSON)</div>
          <div class="settings-row__desc">Unduh seluruh produk, transaksi, pelanggan, beban, dan pengaturan ke file arsip JSON mandiri</div>
        </div>
        <button class="btn btn--primary btn--sm" id="btn-export-backup" style="font-weight:700;white-space:nowrap">
          📥 Unduh Cadangan JSON
        </button>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">📤 Pulihkan dari Cadangan (Restore JSON)</div>
          <div class="settings-row__desc">Pulihkan database lokal dari file cadangan JSON yang diunduh sebelumnya</div>
        </div>
        <div>
          <input type="file" id="input-import-backup" accept=".json,application/json" style="display:none">
          <button class="btn btn--secondary btn--sm" id="btn-trigger-import" style="font-weight:700;white-space:nowrap">
            📤 Pilih File Cadangan
          </button>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Pemasangan Aplikasi (PWA)</div>
          <div class="settings-row__desc">Install aplikasi POS ke layar utama desktop atau smartphone Anda</div>
        </div>
        ${
					isStandalone
						? `<span class="badge badge--green">✅ Terinstall di Perangkat</span>`
						: `<button class="btn btn--secondary btn--sm" id="btn-install-pwa" style="font-weight:700">📲 Install Aplikasi</button>`
				}
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Bersihkan Cache Browser</div>
          <div class="settings-row__desc">Reset service worker dan unduh bundel versi terbaru dari server</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-clear-cache">🗑️ Clear Cache</button>
      </div>
    </div>

    <!-- 7. Zona Berbahaya -->
    <div class="settings-section">
      <div class="settings-section-header" style="color:#ef4444">⚠️ Zona Berbahaya</div>
      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label" style="color:#ef4444;font-weight:700">Reset Seluruh Cache Data Lokal</div>
          <div class="settings-row__desc" style="color:var(--color-danger)">
            Menghapus cache lokal di browser ini. Data cloud utama Supabase tetap aman dan dapat disinkronkan kembali.
          </div>
        </div>
        <button class="btn btn--danger btn--sm" id="btn-reset-all" style="font-weight:700">
          🗑️ Reset Cache Lokal
        </button>
      </div>
    </div>
  `;

	bindSettingsEvents();
};

const bindSettingsEvents = () => {
	// Save All Settings
	document
		.getElementById("btn-save-settings")
		?.addEventListener("click", async () => {
			const shopName = document.getElementById("set-shopName")?.value.trim();
			if (!shopName) {
				window.showToast?.("Nama toko tidak boleh kosong!", "warning");
				document.getElementById("set-shopName")?.focus();
				return;
			}

			const shopAddress = document
				.getElementById("set-shopAddress")
				?.value.trim();
			const shopPhone = document.getElementById("set-shopPhone")?.value.trim();
			const cashierName = document
				.getElementById("set-cashierName")
				?.value.trim();
			const receiptFooter = document
				.getElementById("set-receiptFooter")
				?.value.trim();

			const modalAwalInput = document.getElementById("set-modalAwal")?.value;
			const modalAwal = Math.max(0, parseInt(modalAwalInput, 10) || 0);

			const taxRateInput = document.getElementById("set-taxRate")?.value;
			let taxRate = parseFloat(taxRateInput) || 0;
			if (taxRate < 0) taxRate = 0;
			if (taxRate > 100) taxRate = 100;

			const bankName = document.getElementById("set-bankName")?.value.trim();
			const bankNumber = document
				.getElementById("set-bankNumber")
				?.value.trim();
			const bankHolder = document
				.getElementById("set-bankHolder")
				?.value.trim();
			const qrisNumber = document
				.getElementById("set-qrisNumber")
				?.value.trim();
			const printerPaper =
				document.getElementById("set-printerPaper")?.value || "58mm";

			const updates = {
				shopName,
				shopAddress,
				shopPhone,
				cashierName,
				receiptFooter,
				modalAwal,
				taxRate,
				bankName,
				bankNumber,
				bankHolder,
				qrisNumber,
				printerPaper,
			};

			const saveBtn = document.getElementById("btn-save-settings");
			if (saveBtn) {
				saveBtn.textContent = "⏳ Menyimpan...";
				saveBtn.disabled = true;
			}

			try {
				// 1. Save to local Dexie database & push to Supabase Cloud
				for (const [key, val] of Object.entries(updates)) {
					await setSetting(key, val);
					pushSettingToCloud(key, val).catch(() => {});
				}

				// 2. Update reactive application state
				store.updateSettings(updates);

				window.showToast?.(
					"✅ Pengaturan toko berhasil disimpan & disinkronkan ke cloud!",
					"success",
				);
				setTimeout(() => renderSettings(), 500);
			} catch (err) {
				console.error("[settings-save]", err);
				window.showToast?.(
					`Gagal menyimpan pengaturan: ${err.message || "Error"}`,
					"error",
				);
			} finally {
				if (saveBtn) {
					saveBtn.textContent = "💾 Simpan Semua Pengaturan";
					saveBtn.disabled = false;
				}
			}
		});

	// Switch Operator
	document
		.getElementById("btn-settings-switch-op")
		?.addEventListener("click", () => {
			window.dispatchEvent(new CustomEvent("request-operator-switch"));
		});

	// Logout
	document
		.getElementById("btn-settings-logout")
		?.addEventListener("click", () => {
			if (confirm("Kunci kasir dan keluar dari sesi operator saat ini?")) {
				window.dispatchEvent(new CustomEvent("request-logout"));
			}
		});

	// Test Thermal Prints
	document.getElementById("btn-test-48")?.addEventListener("click", () => {
		printTestReceipt("48mm");
	});
	document.getElementById("btn-test-58")?.addEventListener("click", () => {
		printTestReceipt("58mm");
	});
	document.getElementById("btn-test-80")?.addEventListener("click", () => {
		printTestReceipt("80mm");
	});

	// Hardware Guide Modal
	document
		.getElementById("btn-printer-guide")
		?.addEventListener("click", () => {
			showPrinterGuide();
		});

	// Copy Master Store ID
	document
		.getElementById("btn-copy-master-key")
		?.addEventListener("click", () => {
			const key = getMasterStoreId();
			navigator.clipboard?.writeText(key).then(() => {
				window.showToast?.(
					`✅ Master Store ID (${key}) berhasil disalin!`,
					"success",
				);
			});
		});

	// Set / Change Master Store ID
	document
		.getElementById("btn-set-master-key")
		?.addEventListener("click", async () => {
			const current = getMasterStoreId();
			const input = prompt(
				"Masukkan Master Store ID Partisi Toko Anda:",
				current,
			);
			if (input?.trim() && input.trim() !== current) {
				setMasterStoreId(input.trim());
				setupRealtimeSubscription();
				await syncInitialData();
				window.showToast?.(
					`✅ Terminal dihubungkan ke Store ID: ${input.trim()}`,
					"success",
				);
				renderSettings();
			}
		});

	// Manual Supabase Cloud Sync
	document
		.getElementById("btn-sync-cloud-now")
		?.addEventListener("click", async () => {
			const btn = document.getElementById("btn-sync-cloud-now");
			if (btn) {
				btn.textContent = "🔄 Menyinkronkan...";
				btn.disabled = true;
			}
			try {
				await syncInitialData();
				window.showToast?.(
					"✅ Semua data, transaksi & akun berhasil disinkronkan!",
					"success",
				);
				setTimeout(() => renderSettings(), 600);
			} catch (err) {
				window.showToast?.(
					`Gagal sinkron cloud: ${err.message || "Error"}`,
					"error",
				);
			} finally {
				if (btn) {
					btn.textContent = "⚡ Sinkronkan Sekarang";
					btn.disabled = false;
				}
			}
		});

	// Export Full Backup JSON
	document
		.getElementById("btn-export-backup")
		?.addEventListener("click", async () => {
			const btn = document.getElementById("btn-export-backup");
			if (btn) {
				btn.textContent = "⏳ Menyiapkan...";
				btn.disabled = true;
			}
			try {
				const backup = await exportFullBackup();
				const jsonStr = JSON.stringify(backup, null, 2);
				const blob = new Blob([jsonStr], {
					type: "application/json;charset=utf-8",
				});
				const nowStr = new Date()
					.toISOString()
					.replace(/[-:T]/g, "")
					.slice(0, 14);
				const cleanShop = (backup.shopName || "KASIR").replace(
					/[^a-zA-Z0-9]/g,
					"_",
				);
				const fname = `Backup-KASIR-${cleanShop}-${nowStr}.json`;

				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = fname;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				setTimeout(() => URL.revokeObjectURL(url), 5000);

				window.showToast?.("✅ File cadangan berhasil diunduh!", "success");
			} catch (err) {
				console.error("[export-backup]", err);
				window.showToast?.(
					`Gagal ekspor cadangan: ${err.message || "Error"}`,
					"error",
				);
			} finally {
				if (btn) {
					btn.textContent = "📥 Unduh Cadangan JSON";
					btn.disabled = false;
				}
			}
		});

	// Trigger Import Backup
	document
		.getElementById("btn-trigger-import")
		?.addEventListener("click", () => {
			document.getElementById("input-import-backup")?.click();
		});

	// Process Imported Backup File
	document
		.getElementById("input-import-backup")
		?.addEventListener("change", (e) => {
			const file = e.target.files?.[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onload = async (event) => {
				try {
					const text = event.target?.result;
					const parsed = JSON.parse(text);

					if (
						!parsed.data ||
						(!parsed.data.products && !parsed.data.transactions)
					) {
						window.showToast?.("Format file cadangan tidak dikenali!", "error");
						return;
					}

					const pCount = (parsed.data.products || []).length;
					const cCount = (parsed.data.customers || []).length;
					const tCount = (parsed.data.transactions || []).length;
					const eCount = (parsed.data.expenses || []).length;
					const expDate = parsed.exportedAt
						? new Date(parsed.exportedAt).toLocaleDateString("id-ID", {
								day: "2-digit",
								month: "short",
								year: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})
						: "Tidak diketahui";

					const modalHtml = `
          <div class="modal-header">
            <span class="modal-title">📤 Konfirmasi Pemulihan Cadangan Data</span>
            <button class="modal-close" id="imp-x">✕</button>
          </div>
          <div class="modal-body">
            <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:12px">
              ℹ️ <strong>Arsip Cadangan Terverifikasi:</strong><br>
              Toko: <strong>${esc(parsed.shopName || "Blue Mountain")}</strong><br>
              Waktu Ekspor: ${expDate}
            </div>

            <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:6px;margin-bottom:14px;text-align:center">
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Produk</div>
                <div style="font-size:15px;font-weight:900;color:var(--blue-700)">${pCount}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Pelanggan</div>
                <div style="font-size:15px;font-weight:900;color:#8b5cf6">${cCount}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Transaksi</div>
                <div style="font-size:15px;font-weight:900;color:#16a34a">${tCount}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Beban</div>
                <div style="font-size:15px;font-weight:900;color:#dc2626">${eCount}</div>
              </div>
            </div>

            <div style="font-size:12px;font-weight:700;color:var(--text-primary);margin-bottom:8px">Pilih Mode Impor:</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <label style="display:flex;align-items:flex-start;gap:8px;padding:10px;background:var(--bg-elevated);border-radius:8px;border:1.5px solid var(--border-subtle);cursor:pointer">
                <input type="radio" name="import-mode" value="replace" checked style="margin-top:2px">
                <div style="font-size:12px">
                  <strong>🔄 Timpa / Pemulihan Penuh (Rekomendasi)</strong>
                  <div style="font-size:11px;color:var(--text-muted)">Ganti seluruh database di perangkat ini sama persis dengan file cadangan.</div>
                </div>
              </label>
              <label style="display:flex;align-items:flex-start;gap:8px;padding:10px;background:var(--bg-elevated);border-radius:8px;border:1.5px solid var(--border-subtle);cursor:pointer">
                <input type="radio" name="import-mode" value="merge" style="margin-top:2px">
                <div style="font-size:12px">
                  <strong>➕ Gabung Data (Merge)</strong>
                  <div style="font-size:11px;color:var(--text-muted)">Tambahkan data baru tanpa menghapus data lokal yang sudah ada.</div>
                </div>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn--secondary" id="imp-cancel">Batal</button>
            <button class="btn btn--success" id="imp-confirm">🚀 Pulihkan Data</button>
          </div>
        `;

					openModal(modalHtml, "import-confirm-modal");

					setTimeout(() => {
						document
							.getElementById("imp-x")
							?.addEventListener("click", () =>
								closeModal("import-confirm-modal"),
							);
						document
							.getElementById("imp-cancel")
							?.addEventListener("click", () =>
								closeModal("import-confirm-modal"),
							);
						document
							.getElementById("imp-confirm")
							?.addEventListener("click", async () => {
								const mode =
									document.querySelector('input[name="import-mode"]:checked')
										?.value || "replace";
								const btnConfirm = document.getElementById("imp-confirm");
								if (btnConfirm) {
									btnConfirm.textContent = "⏳ Memulihkan...";
									btnConfirm.disabled = true;
								}

								try {
									await importFullBackup(parsed, mode);
									const [newProds, newCusts, newTxs, newExps] =
										await Promise.all([
											getAllProducts(),
											getAllCustomers(),
											getAllTransactions(),
											getAllExpenses(),
										]);
									store.setProducts?.(newProds);
									store.setCustomers?.(newCusts);
									store.setTransactions?.(newTxs);
									store.setExpenses?.(newExps);

									closeModal("import-confirm-modal");
									window.showToast?.("🎉 Data berhasil dipulihkan!", "success");
									setTimeout(() => renderSettings(), 600);
								} catch (err) {
									console.error("[import-backup]", err);
									window.showToast?.(
										`Gagal memulihkan data: ${err.message}`,
										"error",
									);
								}
							});
					}, 0);
				} catch (err) {
					console.error("[parse-backup]", err);
					window.showToast?.(
						"File JSON cadangan rusak atau tidak terbaca!",
						"error",
					);
				}
			};
			reader.readAsText(file);
			e.target.value = "";
		});

	// Install PWA
	document.getElementById("btn-install-pwa")?.addEventListener("click", () => {
		if (window._pwaPrompt) {
			window._pwaPrompt.prompt();
		} else {
			window.showToast?.(
				"Buka di Chrome / Edge untuk meng-install aplikasi ini",
				"info",
			);
		}
	});

	// Clear Cache
	document
		.getElementById("btn-clear-cache")
		?.addEventListener("click", async () => {
			try {
				if ("caches" in window) {
					const keys = await caches.keys();
					await Promise.all(keys.map((k) => caches.delete(k)));
				}
				if ("serviceWorker" in navigator) {
					const registrations =
						await navigator.serviceWorker.getRegistrations();
					for (const reg of registrations) {
						await reg.unregister();
					}
				}
				window.showToast?.(
					"Cache browser dibersihkan. Memperbarui...",
					"success",
				);
				setTimeout(() => window.location.reload(), 1000);
			} catch (err) {
				console.error("[cache]", err);
				window.showToast?.("Gagal membersihkan cache", "error");
			}
		});

	// Reset Local Cache Only (Danger Zone)
	document
		.getElementById("btn-reset-all")
		?.addEventListener("click", async () => {
			const keyword = prompt(
				'⚠️ PERINGATAN: PEMBERSIHAN CACHE DATA LOKAL\n\nTindakan ini mengosongkan salinan data offline di browser ini (produk, transaksi, pelanggan, beban).\n\nKetik kata "HAPUS" dengan huruf besar untuk melanjutkan:',
			);
			if (keyword === "HAPUS") {
				try {
					await clearAllData();
					window.showToast?.(
						"Data lokal dibersihkan. Memuat ulang dari cloud...",
						"info",
					);
					setTimeout(() => window.location.reload(), 1500);
				} catch (err) {
					console.error("[reset]", err);
					window.showToast?.("Gagal mengosongkan data lokal", "error");
				}
			} else if (keyword !== null) {
				window.showToast?.(
					"Tindakan dibatalkan (konfirmasi tidak sesuai)",
					"info",
				);
			}
		});
};

const showPrinterGuide = () => {
	const html = `
    <div class="modal-header">
      <span class="modal-title">🖨️ Panduan Lengkap Koneksi Printer Thermal (48 / 58 / 80mm)</span>
      <button class="modal-close" id="pg-close">✕</button>
    </div>
    <div class="modal-body" style="font-size:13px;line-height:1.7;color:var(--text-secondary)">
      <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
        💡 <strong>Sistem POS Mendukung 4 Jalur Koneksi Hardware Sekaligus:</strong>
      </div>

      <h4 style="color:var(--text-primary);margin-bottom:4px">1. 🖨️ Universal Direct Print (Driver OS / USB / Dialog Print)</h4>
      <p style="font-size:12px;margin-bottom:8px">Metode paling universal untuk Windows, macOS, Android &amp; iOS. Otomatis memotong margin 0mm dan menyesuaikan lebar roll (48mm/58mm/80mm).</p>

      <h4 style="color:var(--text-primary);margin-top:10px;margin-bottom:4px">2. 📲 Web Bluetooth (BLE Direct ESC/POS Tanpa Aplikasi)</h4>
      <p style="font-size:12px;margin-bottom:8px">Langsung mengirim binary ESC/POS ke printer Bluetooth dari browser Chrome / Edge di Android &amp; Laptop tanpa instal software perantara.</p>

      <h4 style="color:var(--text-primary);margin-top:10px;margin-bottom:4px">3. 🔌 WebUSB (Kabel USB OTG Direct)</h4>
      <p style="font-size:12px;margin-bottom:8px">Hubungkan kabel printer USB ke laptop atau HP via konverter OTG untuk cetak instan berkecepatan tinggi tanpa popup dialog printer.</p>

      <h4 style="color:var(--text-primary);margin-top:10px;margin-bottom:4px">4. 🌐 Background Intent Android (RawBT &amp; Bluetooth Print App)</h4>
      <p style="font-size:12px;margin-bottom:8px">Khusus Android, struk dapat dilempar otomatis ke aplikasi background <strong>RawBT</strong> atau <strong>Bluetooth Print App</strong> untuk auto-cut kertas dan cetak senyap.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn--primary" id="pg-close2">Mengerti 👍</button>
    </div>
  `;
	openModal(html, "printer-guide");
	setTimeout(() => {
		document
			.getElementById("pg-close")
			?.addEventListener("click", () => closeModal("printer-guide"));
		document
			.getElementById("pg-close2")
			?.addEventListener("click", () => closeModal("printer-guide"));
	}, 0);
};
