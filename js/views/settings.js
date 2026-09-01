/**
 * views/settings.js — App settings
 * FIX: version from __APP_VERSION__ (injected by Vite define)
 */
import { getSetting, setSetting, clearAllData, exportFullBackup, importFullBackup, getAllProducts, getAllTransactions, getAllExpenses } from '../db.js';
import store                      from '../store.js';
import { openModal, closeModal }  from './modals.js';
import { esc }                    from '../utils/sanitize.js';
import { printTestReceipt }       from '../printer.js';

export const initSettings = async () => {
  await loadSettings();
  await renderSettings();
};

const loadSettings = async () => {
  const keys = [
    'shopName', 'shopAddress', 'shopPhone', 'cashierName',
    'printerUrl', 'printEnabled', 'printerPaper', 'taxRate',
    'bankName', 'bankNumber', 'bankHolder',
    'qrisNumber',
  ];
  const s = {};
  for (const k of keys) {
    const v = await getSetting(k);
    if (v !== null) s[k] = v;
  }
  store.updateSettings(s);
};

export const renderSettings = async () => {
  const view = document.getElementById('view-settings');
  const s    = store.state.settings;

  // Real dynamic version & build metadata injected by Vite build engine
  const appVersion = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '3.0.0';
  const gitHash    = typeof __GIT_HASH__ !== 'undefined' && __GIT_HASH__ ? __GIT_HASH__ : '';
  const buildTime  = typeof __BUILD_TIMESTAMP__ !== 'undefined' ? __BUILD_TIMESTAMP__ : new Date().toISOString();

  const buildDateObj = new Date(buildTime);
  const formattedBuildDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(buildDateObj);
  const formattedBuildClock = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(buildDateObj);

  // Check if app is running in standalone mode (PWA installed)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  view.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">Pengaturan</h2>
      <button class="btn btn--primary" id="btn-save-settings">💾 Simpan Semua</button>
    </div>

    <!-- Toko -->
    <div class="settings-section">
      <div class="settings-section-header">🏪 Informasi Toko</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Toko</div>
          <div class="settings-row__desc">Tampil di struk &amp; header</div>
        </div>
        <input type="text" class="input" id="set-shopName" value="${esc(s.shopName || '')}" maxlength="80" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Alamat</div>
        </div>
        <input type="text" class="input" id="set-shopAddress" value="${esc(s.shopAddress || '')}" maxlength="120" style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">No. Telepon</div>
        </div>
        <input type="text" class="input" id="set-shopPhone" value="${esc(s.shopPhone || '')}" maxlength="20" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Kasir</div>
          <div class="settings-row__desc">Tampil di struk sebagai kasir</div>
        </div>
        <input type="text" class="input" id="set-cashierName" value="${esc(s.cashierName || 'Admin')}" maxlength="40" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Tarif Pajak (%)</div>
          <div class="settings-row__desc">0 = tidak ada pajak</div>
        </div>
        <input type="number" class="input" id="set-taxRate" value="${s.taxRate || 0}" min="0" max="100" step="0.5" style="max-width:100px">
      </div>
    </div>

    <!-- Bank Transfer -->
    <div class="settings-section">
      <div class="settings-section-header">🏦 Info Transfer Bank</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Bank</div>
        </div>
        <input type="text" class="input" id="set-bankName" value="${esc(s.bankName || 'BCA')}" maxlength="30" style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nomor Rekening</div>
        </div>
        <input type="text" class="input" id="set-bankNumber" value="${esc(s.bankNumber || '')}" maxlength="30" style="max-width:220px" placeholder="1234567890">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Atas Nama</div>
        </div>
        <input type="text" class="input" id="set-bankHolder" value="${esc(s.bankHolder || '')}" maxlength="60" style="max-width:240px">
      </div>
    </div>

    <!-- Printer -->
    <div class="settings-section">
      <div class="settings-section-header">🖨️ Thermal Printer &amp; Struk Kasir (58mm / 80mm)</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Ukuran Kertas Thermal</div>
          <div class="settings-row__desc">Pilih ukuran roll kertas printer thermal Anda</div>
        </div>
        <select class="input" id="set-printerPaper" style="max-width:220px">
          <option value="58mm" ${s.printerPaper !== '80mm' ? 'selected' : ''}>58mm (Standar Mini Bluetooth Kasir)</option>
          <option value="80mm" ${s.printerPaper === '80mm' ? 'selected' : ''}>80mm (Thermal Besar / Desktop)</option>
        </select>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Uji Coba Cetak (Test Print)</div>
          <div class="settings-row__desc">Cetak struk dummy untuk cek kerapian format 58mm di printer Anda</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-test-print" style="font-weight:700">🧪 Test Cetak Struk</button>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Panduan Setup Printer Bluetooth</div>
          <div class="settings-row__desc">Cara menghubungkan printer 58mm di HP Android, PC &amp; Laptop</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-printer-guide">📖 Lihat Panduan</button>
      </div>
    </div>

    <!-- PWA -->
    <div class="settings-section">
      <div class="settings-section-header">📱 Aplikasi PWA</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Install sebagai App</div>
          <div class="settings-row__desc">Tambahkan ke layar utama perangkat</div>
        </div>
        ${isStandalone
          ? `<span class="badge badge--green">✅ App Terinstall</span>`
          : `<button class="btn btn--primary btn--sm" id="btn-install-pwa">📲 Install</button>`
        }
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Versi Aplikasi</div>
          <div class="settings-row__desc">Otomatis &amp; Real-time via Git CI/CD Build Engine</div>
        </div>
        <div style="text-align:right">
          <span class="badge badge--blue" style="font-size:12px;padding:6px 12px;font-weight:800;letter-spacing:0.02em">
            v${esc(appVersion)}${gitHash ? ` (${esc(gitHash)})` : ''}
          </span>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px">
            Build: ${esc(formattedBuildDate)} • ${esc(formattedBuildClock)}
          </div>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Hapus Cache</div>
          <div class="settings-row__desc">Reset service worker cache &amp; reload</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-clear-cache">🗑️ Clear Cache</button>
      </div>
    </div>

    <!-- Backup & Restore Data (Sinkronisasi Antar Device) -->
    <div class="settings-section">
      <div class="settings-section-header">💾 Ekspor &amp; Impor Data (Sinkronisasi Antar Device)</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">📥 Ekspor Backup Lengkap (JSON)</div>
          <div class="settings-row__desc">Unduh seluruh produk, transaksi, cicilan, pengeluaran &amp; pengaturan ke file JSON. Kirim file ini ke device lain untuk sinkronisasi.</div>
        </div>
        <button class="btn btn--primary btn--sm" id="btn-export-backup" style="background:#2563eb;white-space:nowrap">
          📥 Unduh Backup JSON
        </button>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">📤 Impor / Pulihkan Data (JSON)</div>
          <div class="settings-row__desc">Pulihkan atau sinkronkan database dari file backup JSON perangkat lain.</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="file" id="input-import-backup" accept=".json,application/json" style="display:none">
          <button class="btn btn--secondary btn--sm" id="btn-trigger-import" style="white-space:nowrap">
            📤 Pilih File Backup
          </button>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="settings-section">
      <div class="settings-section-header" style="color:#fca5a5">⚠️ Zona Berbahaya</div>
      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Reset Semua Data</div>
          <div class="settings-row__desc" style="color:var(--color-danger)">Hapus semua transaksi, pengeluaran, dan produk. Tidak bisa dibatalkan!</div>
        </div>
        <button class="btn btn--danger btn--sm" id="btn-reset-all">🗑️ Reset</button>
      </div>
    </div>
  `;

  bindSettingsEvents();
};

const bindSettingsEvents = () => {
  // Export Full Backup JSON
  document.getElementById('btn-export-backup')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-export-backup');
    if (btn) { btn.textContent = '⏳ Menyiapkan...'; btn.disabled = true; }
    try {
      const backup = await exportFullBackup();
      const jsonStr = JSON.stringify(backup, null, 2);
      const blob    = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
      const nowStr  = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
      const cleanShop = (backup.shopName || 'KASIR').replace(/[^a-zA-Z0-9]/g, '_');
      const fname   = `Backup-KASIR-${cleanShop}-${nowStr}.json`;

      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href     = url;
      a.download = fname;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);

      window.showToast('✅ File backup berhasil diunduh!', 'success');
    } catch (err) {
      console.error('[export-backup]', err);
      window.showToast('Gagal ekspor backup: ' + (err.message || 'Error'), 'error');
    } finally {
      if (btn) { btn.textContent = '📥 Unduh Backup JSON'; btn.disabled = false; }
    }
  });

  // Import Backup JSON Trigger
  document.getElementById('btn-trigger-import')?.addEventListener('click', () => {
    document.getElementById('input-import-backup')?.click();
  });

  // Import Backup File Change
  document.getElementById('input-import-backup')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result;
        const parsed = JSON.parse(text);

        if (!parsed.data || (!parsed.data.products && !parsed.data.transactions)) {
          window.showToast('Format file backup tidak valid!', 'error');
          return;
        }

        const pCount = (parsed.data.products || []).length;
        const tCount = (parsed.data.transactions || []).length;
        const eCount = (parsed.data.expenses || []).length;
        const expDate = parsed.exportedAt ? new Date(parsed.exportedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Tidak diketahui';

        const modalHtml = `
          <div class="modal-header">
            <span class="modal-title">📤 Konfirmasi Impor Data</span>
            <button class="modal-close" id="imp-x">✕</button>
          </div>
          <div class="modal-body">
            <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:12px">
              ℹ️ <strong>File Backup Terdeteksi:</strong><br>
              Toko: <strong>${esc(parsed.shopName || 'Blue Mountain')}</strong><br>
              Waktu Ekspor: ${expDate}
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px;text-align:center">
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Produk</div>
                <div style="font-size:16px;font-weight:900;color:var(--blue-700)">${pCount}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Transaksi</div>
                <div style="font-size:16px;font-weight:900;color:#16a34a">${tCount}</div>
              </div>
              <div style="padding:8px;background:var(--bg-elevated);border-radius:8px;border:1px solid var(--border-subtle)">
                <div style="font-size:10px;color:var(--text-muted)">Pengeluaran</div>
                <div style="font-size:16px;font-weight:900;color:#dc2626">${eCount}</div>
              </div>
            </div>

            <div style="font-size:12px;font-weight:700;color:var(--text-primary);margin-bottom:8px">Pilih Mode Impor:</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <label style="display:flex;align-items:flex-start;gap:8px;padding:10px;background:var(--bg-elevated);border-radius:8px;border:1.5px solid var(--border-subtle);cursor:pointer">
                <input type="radio" name="import-mode" value="replace" checked style="margin-top:2px">
                <div style="font-size:12px">
                  <strong>🔄 Timpa / Restore Penuh (Rekomendasi untuk Pindah HP)</strong>
                  <div style="font-size:11px;color:var(--text-muted)">Ganti seluruh database di device ini sama persis dengan file backup.</div>
                </div>
              </label>
              <label style="display:flex;align-items:flex-start;gap:8px;padding:10px;background:var(--bg-elevated);border-radius:8px;border:1.5px solid var(--border-subtle);cursor:pointer">
                <input type="radio" name="import-mode" value="merge" style="margin-top:2px">
                <div style="font-size:12px">
                  <strong>➕ Gabung Data (Merge)</strong>
                  <div style="font-size:11px;color:var(--text-muted)">Tambahkan data dari file backup tanpa menghapus data lokal yang sudah ada.</div>
                </div>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn--secondary" id="imp-cancel">Batal</button>
            <button class="btn btn--success" id="imp-confirm">🚀 Pulihkan &amp; Sinkronkan</button>
          </div>
        `;

        openModal(modalHtml, 'import-confirm-modal');

        setTimeout(() => {
          document.getElementById('imp-x')?.addEventListener('click',      () => closeModal('import-confirm-modal'));
          document.getElementById('imp-cancel')?.addEventListener('click', () => closeModal('import-confirm-modal'));
          document.getElementById('imp-confirm')?.addEventListener('click', async () => {
            const mode = document.querySelector('input[name="import-mode"]:checked')?.value || 'replace';
            const btnConfirm = document.getElementById('imp-confirm');
            if (btnConfirm) { btnConfirm.textContent = '⏳ Memulihkan...'; btnConfirm.disabled = true; }

            try {
              await importFullBackup(parsed, mode);
              // Reload fresh data into store
              const [newProds, newTxs, newExps] = await Promise.all([
                getAllProducts(),
                getAllTransactions(),
                getAllExpenses(),
              ]);
              store.setProducts(newProds);
              store.setTransactions(newTxs);
              store.setExpenses(newExps);

              closeModal('import-confirm-modal');
              window.showToast('🎉 Data berhasil dipulihkan & sinkron!', 'success');
              setTimeout(() => renderSettings(), 600);
            } catch (err) {
              console.error('[import-backup]', err);
              window.showToast('Gagal memulihkan data: ' + err.message, 'error');
            }
          });
        }, 0);

      } catch (err) {
        console.error('[parse-backup]', err);
        window.showToast('File JSON rusak atau tidak terbaca!', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset
  });
  document.getElementById('btn-save-settings')?.addEventListener('click', async () => {
    const fields = [
      'shopName', 'shopAddress', 'shopPhone', 'cashierName', 'taxRate',
      'bankName', 'bankNumber', 'bankHolder', 'printerUrl', 'printerPaper', 'qrisNumber',
    ];
    const updates = {};
    for (const f of fields) {
      const el = document.getElementById(`set-${f}`);
      if (el) {
        updates[f] = f === 'taxRate' ? parseFloat(el.value) || 0 : el.value.trim();
        await setSetting(f, updates[f]);
      }
    }

    store.updateSettings(updates);
    window.showToast('Pengaturan berhasil disimpan', 'success');
  });

  document.getElementById('btn-test-print')?.addEventListener('click', () => {
    printTestReceipt();
  });

  document.getElementById('btn-printer-guide')?.addEventListener('click', () => {
    showPrinterGuide();
  });

  document.getElementById('btn-install-pwa')?.addEventListener('click', () => {
    if (window._pwaPrompt) {
      window._pwaPrompt.prompt();
    } else {
      window.showToast('Buka di Chrome / Edge untuk meng-install aplikasi ini', 'info');
    }
  });

  document.getElementById('btn-clear-cache')?.addEventListener('click', async () => {
    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          await reg.unregister();
        }
      }
      window.showToast('Cache dihapus. Memperbarui...', 'success');
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error('[cache]', err);
      window.showToast('Gagal hapus cache', 'error');
    }
  });

  document.getElementById('btn-reset-all')?.addEventListener('click', async () => {
    const confirmed = confirm('⚠️ HAPUS SEMUA DATA?\n\nSemua transaksi, pengeluaran, dan produk akan dihapus permanen.\nTindakan ini TIDAK dapat dibatalkan!');
    if (confirmed) {
      try {
        await clearAllData();
        window.showToast('Semua data berhasil dihapus. Reloading...', 'error');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        console.error('[reset]', err);
        window.showToast('Gagal menghapus data', 'error');
      }
    }
  });
};

const showPrinterGuide = () => {
  const html = `
    <div class="modal-header">
      <span class="modal-title">🖨️ Panduan Setup Printer Thermal 58mm</span>
      <button class="modal-close" id="pg-close">✕</button>
    </div>
    <div class="modal-body" style="font-size:13px;line-height:1.7;color:var(--text-secondary)">
      <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
        💡 <strong>Printer Thermal 58mm didukung 100% via 2 Cara:</strong>
      </div>

      <h4 style="color:var(--text-primary);margin-bottom:6px">Metode 1: Direct Web Print (Universal di Semua PC/Laptop/HP)</h4>
      <ol style="padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:12px">
        <li>Sambungkan printer thermal USB / Bluetooth ke PC/Laptop/HP Anda.</li>
        <li>Saat transaksi selesai, klik tombol hijau <strong>"🖨️ Cetak Struk (58mm)"</strong>.</li>
        <li>Pilih printer thermal Anda di jendela cetak browser $\rightarrow$ Klik <strong>Print</strong>. Struk akan tercetak rapi sesuai lebar roll 58mm.</li>
      </ol>

      <h4 style="color:var(--text-primary);margin-top:14px;margin-bottom:6px">Metode 2: Bluetooth Print App / RawBT (Khusus HP Android)</h4>
      <ol style="padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:12px">
        <li>Download <a href="https://play.google.com/store/apps/details?id=mate.bluetoothprint" target="_blank" rel="noopener noreferrer" style="color:var(--blue-300)">Bluetooth Print App</a> atau <strong>RawBT</strong> dari Play Store.</li>
        <li>Pair printer Bluetooth di menu Bluetooth HP Anda (PIN default: <code>0000</code> atau <code>1234</code>).</li>
        <li>Buka aplikasi printer tersebut $\rightarrow$ Pilih printer yang sudah di-pair.</li>
        <li>Di POS Kasir, klik tombol <strong>"📲 Bluetooth App"</strong> setelah transaksi selesai. Struk langsung tercetak otomatis tanpa popup dialog.</li>
      </ol>
    </div>
    <div class="modal-footer">
      <button class="btn btn--primary" id="pg-close2">Mengerti 👍</button>
    </div>
  `;
  openModal(html, 'printer-guide');
  setTimeout(() => {
    document.getElementById('pg-close')?.addEventListener('click',  () => closeModal('printer-guide'));
    document.getElementById('pg-close2')?.addEventListener('click', () => closeModal('printer-guide'));
  }, 0);
};
