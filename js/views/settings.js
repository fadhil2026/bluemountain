/**
 * views/settings.js — App settings
 */
import { getSetting, setSetting } from '../db.js';
import store from '../store.js';
import { openModal, closeModal } from './modals.js';

export const initSettings = async () => {
  await loadSettings();
  await renderSettings();
};

const loadSettings = async () => {
  const keys = ['shopName','shopAddress','shopPhone','cashierName','printerUrl','printEnabled','taxRate','bankName','bankNumber','bankHolder'];
  const s = {};
  for (const k of keys) {
    const v = await getSetting(k);
    if (v !== null) s[k] = v;
  }
  store.updateSettings(s);
};

export const renderSettings = async () => {
  const view = document.getElementById('view-settings');
  const s = store.state.settings;

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
          <div class="settings-row__desc">Tampil di struk & header</div>
        </div>
        <input type="text" class="input" id="set-shopName" value="${s.shopName || ''}"
          style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Alamat</div>
        </div>
        <input type="text" class="input" id="set-shopAddress" value="${s.shopAddress || ''}"
          style="max-width:260px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">No. Telepon</div>
        </div>
        <input type="text" class="input" id="set-shopPhone" value="${s.shopPhone || ''}"
          style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Kasir</div>
          <div class="settings-row__desc">Tampil di struk sebagai kasir</div>
        </div>
        <input type="text" class="input" id="set-cashierName" value="${s.cashierName || 'Admin'}"
          style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Tarif Pajak (%)</div>
          <div class="settings-row__desc">0 = tidak ada pajak</div>
        </div>
        <input type="number" class="input" id="set-taxRate" value="${s.taxRate || 0}"
          min="0" max="100" style="max-width:100px">
      </div>
    </div>

    <!-- Bank Transfer -->
    <div class="settings-section">
      <div class="settings-section-header">🏦 Info Transfer Bank</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nama Bank</div>
        </div>
        <input type="text" class="input" id="set-bankName" value="${s.bankName || 'BCA'}"
          style="max-width:200px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Nomor Rekening</div>
        </div>
        <input type="text" class="input" id="set-bankNumber" value="${s.bankNumber || ''}"
          style="max-width:220px" placeholder="1234567890">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Atas Nama</div>
        </div>
        <input type="text" class="input" id="set-bankHolder" value="${s.bankHolder || ''}"
          style="max-width:240px">
      </div>
    </div>

    <!-- Printer -->
    <div class="settings-section">
      <div class="settings-section-header">🖨️ Bluetooth Thermal Printer</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Aktifkan Print</div>
          <div class="settings-row__desc">Cetak struk via Bluetooth Print App (Android)</div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" id="set-printEnabled" ${s.printEnabled ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">URL Printer (Opsional)</div>
          <div class="settings-row__desc">Untuk testing via localhost PHP server.<br>
            Contoh: <code style="font-size:11px;color:var(--blue-300)">http://192.168.1.x/receipt.php</code>
          </div>
        </div>
        <input type="url" class="input" id="set-printerUrl" value="${s.printerUrl || ''}"
          placeholder="http://..." style="max-width:280px">
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Panduan Setup Printer</div>
          <div class="settings-row__desc">Cara menghubungkan printer Bluetooth</div>
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
        <button class="btn btn--primary btn--sm" id="btn-install-pwa">📲 Install</button>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Versi Aplikasi</div>
        </div>
        <span class="badge badge--blue">v1.0.0</span>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Hapus Cache</div>
          <div class="settings-row__desc">Reset service worker cache</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-clear-cache">🗑️ Clear Cache</button>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="settings-section">
      <div class="settings-section-header" style="color:#fca5a5">⚠️ Zona Berbahaya</div>
      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Reset Semua Data</div>
          <div class="settings-row__desc" style="color:var(--color-danger)">Hapus semua transaksi dan produk. Tidak bisa dibatalkan!</div>
        </div>
        <button class="btn btn--danger btn--sm" id="btn-reset-all">🗑️ Reset</button>
      </div>
    </div>
  `;

  bindSettingsEvents();
};

const bindSettingsEvents = () => {
  // Save settings
  document.getElementById('btn-save-settings')?.addEventListener('click', async () => {
    const fields = [
      'shopName','shopAddress','shopPhone','cashierName','taxRate',
      'bankName','bankNumber','bankHolder','printerUrl'
    ];
    const updates = {};
    for (const f of fields) {
      const el = document.getElementById(`set-${f}`);
      if (el) {
        updates[f] = f === 'taxRate' ? parseFloat(el.value) || 0 : el.value.trim();
        await setSetting(f, updates[f]);
      }
    }

    const printEl = document.getElementById('set-printEnabled');
    if (printEl) {
      updates.printEnabled = printEl.checked;
      await setSetting('printEnabled', printEl.checked);
    }

    store.updateSettings(updates);
    window.showToast('Pengaturan berhasil disimpan', 'success');
  });

  // Printer guide
  document.getElementById('btn-printer-guide')?.addEventListener('click', () => {
    showPrinterGuide();
  });

  // Install PWA
  document.getElementById('btn-install-pwa')?.addEventListener('click', () => {
    if (window._pwaPrompt) {
      window._pwaPrompt.prompt();
    } else {
      window.showToast('Buka di Chrome Android untuk install', 'info');
    }
  });

  // Clear cache
  document.getElementById('btn-clear-cache')?.addEventListener('click', async () => {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      window.showToast('Cache dihapus. Reload untuk memperbarui.', 'success');
    }
  });

  // Reset all
  document.getElementById('btn-reset-all')?.addEventListener('click', () => {
    const confirmed = confirm('⚠️ HAPUS SEMUA DATA?\n\nSemua transaksi dan produk akan dihapus permanen.\nTindakan ini TIDAK dapat dibatalkan!');
    if (confirmed) {
      indexedDB.deleteDatabase('BlueMountainPOS');
      window.showToast('Database dihapus. Reload halaman...', 'error');
      setTimeout(() => window.location.reload(), 2000);
    }
  });
};

const showPrinterGuide = () => {
  const html = `
    <div class="modal-header">
      <span class="modal-title">🖨️ Panduan Setup Printer</span>
      <button class="modal-close" id="pg-close">✕</button>
    </div>
    <div class="modal-body" style="font-size:13px;line-height:1.7;color:var(--text-secondary)">
      <h3 style="color:var(--text-primary);margin-bottom:8px">Langkah Setup:</h3>
      <ol style="padding-left:20px;display:flex;flex-direction:column;gap:10px">
        <li><strong style="color:var(--text-primary)">Install App:</strong><br>
          Download <a href="https://play.google.com/store/apps/details?id=mate.bluetoothprint" target="_blank"
            style="color:var(--blue-300)">Bluetooth Print App</a> dari Play Store</li>
        <li><strong style="color:var(--text-primary)">Enable Browser Print:</strong><br>
          Buka app → Settings → Browser/Website Print → Enable</li>
        <li><strong style="color:var(--text-primary)">Pair Printer:</strong><br>
          Pasangkan printer Bluetooth di Settings Android terlebih dahulu</li>
        <li><strong style="color:var(--text-primary)">Pilih Printer di App:</strong><br>
          Di Bluetooth Print App, pilih printer yang sudah dipasangkan</li>
        <li><strong style="color:var(--text-primary)">Buka POS di Chrome Android:</strong><br>
          Kunjungi URL GitHub Pages ini di browser Chrome Android</li>
        <li><strong style="color:var(--text-primary)">Klik Cetak Struk:</strong><br>
          Setelah transaksi, klik "Cetak Struk" → App akan otomatis terbuka dan mencetak</li>
      </ol>
      <div style="margin-top:16px;padding:12px;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);border-radius:10px;font-size:12px">
        💡 <strong style="color:var(--text-primary)">Tips:</strong> Aktifkan "Print+Close" di Bluetooth Print App agar app otomatis kembali ke browser setelah cetak.
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn--primary" id="pg-close2">Mengerti</button>
    </div>
  `;
  openModal(html, 'printer-guide');
  // setTimeout 0: ensure modal DOM is painted before querying elements
  setTimeout(() => {
    document.getElementById('pg-close')?.addEventListener('click', () => closeModal());
    document.getElementById('pg-close2')?.addEventListener('click', () => closeModal());
  }, 0);
};
