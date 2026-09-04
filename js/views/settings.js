/**
 * views/settings.js — App settings
 * FIX: version from __APP_VERSION__ (injected by Vite define)
 */
import { getSetting, setSetting, clearAllData, exportFullBackup, importFullBackup, getAllProducts, getAllCustomers, getAllTransactions, getAllExpenses } from '../db.js';
import store                      from '../store.js';
import { openModal, closeModal }  from './modals.js';
import { esc }                    from '../utils/sanitize.js';
import { printTestReceipt }       from '../printer.js';
import { syncInitialData }        from '../supabase.js';

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

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Kode String QRIS Toko (Statis)</div>
          <div class="settings-row__desc">Salin string QRIS dari BCA/Mandiri/Shopee/GoPay untuk diubah jadi Dynamic QRIS otomatis ber-nominal</div>
        </div>
        <textarea class="input" id="set-qrisNumber" rows="2" style="max-width:280px;font-size:11px" placeholder="0002010102112659...">${esc(s.qrisNumber || '')}</textarea>
      </div>
    </div>

    <!-- Printer -->
    <div class="settings-section">
      <div class="settings-section-header">🖨️ Thermal Printer Universal (48mm / 58mm / 80mm)</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Ukuran Kertas Roll Thermal</div>
          <div class="settings-row__desc">Pilih ukuran roll kertas sesuai hardware printer kasir Anda</div>
        </div>
        <select class="input" id="set-printerPaper" style="max-width:260px">
          <option value="48mm" ${s.printerPaper === '48mm' ? 'selected' : ''}>48mm (EDC / Mini Portable Bluetooth)</option>
          <option value="58mm" ${!s.printerPaper || s.printerPaper === '58mm' ? 'selected' : ''}>58mm (Standar Mini POS Bluetooth)</option>
          <option value="80mm" ${s.printerPaper === '80mm' ? 'selected' : ''}>80mm (Thermal Besar / Kasir Desktop / Resto)</option>
        </select>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Uji Coba Cetak (Test Print Sesuai Ukuran)</div>
          <div class="settings-row__desc">Cetak struk sample untuk validasi kerapian format dan font margin</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn btn--secondary btn--sm" id="btn-test-48" style="font-weight:700">🧪 Test 48mm</button>
          <button class="btn btn--secondary btn--sm" id="btn-test-58" style="font-weight:700">🧪 Test 58mm</button>
          <button class="btn btn--secondary btn--sm" id="btn-test-80" style="font-weight:700">🧪 Test 80mm</button>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Panduan Koneksi Hardware</div>
          <div class="settings-row__desc">Petunjuk setup Bluetooth (BLE), Kabel USB (OTG), dan WiFi/LAN</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-printer-guide">📖 Lihat Panduan Hardware</button>
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
          <div class="settings-row__label">Standar Versi Aplikasi (SemVer 3-Digit)</div>
          <div class="settings-row__desc">Format: <strong>Major</strong> (Arsitektur) . <strong>Minor</strong> (Fitur Sedang) . <strong>Patch</strong> (Revisi Ringan)</div>
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

    <!-- Supabase Cloud Multi-Device Sync -->
    <div class="settings-section">
      <div class="settings-section-header">☁️ Sinkronisasi Realtime Cloud (Supabase)</div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Status Cloud Multi-Perangkat</div>
          <div class="settings-row__desc">Project: wiapnhpdgjbtkblowfig (Oceania Sydney)</div>
        </div>
        <div style="text-align:right">
          <span class="badge badge--green" style="font-size:12px;padding:6px 12px;font-weight:700">🟢 Terhubung ke Cloud</span>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px">Otomatis sinkron ke semua HP/Laptop</div>
        </div>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Skema Database Cloud (SQL)</div>
          <div class="settings-row__desc">Salin skema SQL lengkap tabel pelanggan &amp; sinkronisasi Realtime untuk Supabase SQL Editor</div>
        </div>
        <button class="btn btn--secondary btn--sm" id="btn-show-cloud-sql" style="white-space:nowrap">
          📋 Salin Skema SQL Cloud
        </button>
      </div>

      <div class="settings-row">
        <div class="settings-row__info">
          <div class="settings-row__label">Sinkronkan Data Sekarang</div>
          <div class="settings-row__desc">Tarik dan dorong data transaksi, pelanggan &amp; produk terbaru secara manual</div>
        </div>
        <button class="btn btn--primary btn--sm" id="btn-sync-cloud-now" style="white-space:nowrap">
          ⚡ Sinkronkan Sekarang
        </button>
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
  // Show Supabase SQL Schema Modal
  document.getElementById('btn-show-cloud-sql')?.addEventListener('click', () => {
    const sqlCode = `-- Jalankan kode ini di Supabase SQL Editor (https://supabase.com/dashboard/project/wiapnhpdgjbtkblowfig/sql):
CREATE TABLE IF NOT EXISTS public.customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    category TEXT DEFAULT 'Rumah Tangga',
    total_orders NUMERIC DEFAULT 0,
    total_spent NUMERIC DEFAULT 0,
    total_debt NUMERIC DEFAULT 0,
    credit_limit NUMERIC DEFAULT 0,
    galon_loaned NUMERIC DEFAULT 0,
    notes TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow anon all on customers" ON public.customers;
CREATE POLICY "Allow anon all on customers" ON public.customers FOR ALL USING (true) WITH CHECK (true);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'customers'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.customers;
    END IF;
END $$;`;

    const html = `
      <div class="modal-header">
        <h3 class="modal-title">☁️ Skema SQL Supabase (Tabel Pelanggan)</h3>
        <button class="modal-close" id="sql-modal-close" type="button">✕</button>
      </div>
      <div class="modal-body">
        <p style="font-size:12px;color:var(--text-secondary);margin:0 0 10px">
          Jalankan perintah SQL ini di menu <strong>SQL Editor</strong> dashboard Supabase Anda agar data pelanggan tersinkronisasi otomatis antar-perangkat (PC/HP/Tablet):
        </p>
        <textarea id="sql-code-area" readonly style="width:100%;height:180px;font-family:monospace;font-size:11px;padding:8px;border-radius:8px;border:1px solid var(--border-default);background:rgba(0,0,0,0.02);line-height:1.4">${sqlCode}</textarea>
      </div>
      <div class="modal-footer" style="display:flex;justify-content:space-between;gap:8px">
        <button class="btn btn--primary btn--sm" id="btn-copy-sql">📋 Salin Perintah SQL</button>
        <button class="btn btn--secondary btn--sm" id="btn-close-sql">Tutup</button>
      </div>
    `;
    openModal(html, 'modal-sql');
    document.getElementById('sql-modal-close')?.addEventListener('click', () => closeModal('modal-sql'));
    document.getElementById('btn-close-sql')?.addEventListener('click', () => closeModal('modal-sql'));
    document.getElementById('btn-copy-sql')?.addEventListener('click', () => {
      navigator.clipboard?.writeText(sqlCode).then(() => {
        window.showToast?.('✅ Perintah SQL berhasil disalin ke clipboard!', 'success');
      });
    });
  });

  // Manual Supabase Cloud Sync
  document.getElementById('btn-sync-cloud-now')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-sync-cloud-now');
    if (btn) { btn.textContent = '🔄 Menyinkronkan...'; btn.disabled = true; }
    try {
      await syncInitialData();
      window.showToast('✅ Data cloud berhasil disinkronkan!', 'success');
      setTimeout(() => renderSettings(), 600);
    } catch (err) {
      window.showToast('Gagal sinkron cloud: ' + (err.message || 'Error'), 'error');
    } finally {
      if (btn) { btn.textContent = '⚡ Sinkronkan Sekarang'; btn.disabled = false; }
    }
  });

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
        const cCount = (parsed.data.customers || []).length;
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
              const [newProds, newCusts, newTxs, newExps] = await Promise.all([
                getAllProducts(),
                getAllCustomers(),
                getAllTransactions(),
                getAllExpenses(),
              ]);
              store.setProducts(newProds);
              store.setCustomers(newCusts);
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

  document.getElementById('btn-test-48')?.addEventListener('click', () => {
    printTestReceipt('48mm');
  });

  document.getElementById('btn-test-58')?.addEventListener('click', () => {
    printTestReceipt('58mm');
  });

  document.getElementById('btn-test-80')?.addEventListener('click', () => {
    printTestReceipt('80mm');
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
      <span class="modal-title">🖨️ Panduan Lengkap Koneksi Printer Thermal (48/58/80mm)</span>
      <button class="modal-close" id="pg-close">✕</button>
    </div>
    <div class="modal-body" style="font-size:13px;line-height:1.7;color:var(--text-secondary)">
      <div style="padding:12px;background:#dbeafe;border-radius:10px;font-size:12px;color:#1e40af;margin-bottom:14px">
        💡 <strong>Sistem Mendukung 4 Jalur Koneksi Hardware Sekaligus:</strong>
      </div>

      <h4 style="color:var(--text-primary);margin-bottom:6px">1. 🖨️ Universal Direct Print (Driver OS / Kabel USB / Spooler / AirPrint)</h4>
      <p style="font-size:12px;margin-bottom:6px">Metode paling universal untuk Windows, macOS, Android &amp; iOS. Otomatis menyesuaikan margin 0mm dan lebar roll (48mm/58mm/80mm).</p>

      <h4 style="color:var(--text-primary);margin-top:12px;margin-bottom:6px">2. 📲 Web Bluetooth (BLE Direct ESC/POS Tanpa Aplikasi)</h4>
      <p style="font-size:12px;margin-bottom:6px">Langsung mengirim binary ESC/POS ke printer Bluetooth dari browser Chrome / Edge di Android &amp; Laptop.</p>

      <h4 style="color:var(--text-primary);margin-top:12px;margin-bottom:6px">3. 🔌 WebUSB (Kabel USB OTG Direct)</h4>
      <p style="font-size:12px;margin-bottom:6px">Hubungkan kabel printer USB ke laptop atau HP via konverter OTG untuk cetak super cepat tanpa dialog spooler.</p>

      <h4 style="color:var(--text-primary);margin-top:12px;margin-bottom:6px">4. 🌐 Background Intent (RawBT &amp; Bluetooth Print App)</h4>
      <p style="font-size:12px;margin-bottom:6px">Khusus Android, struk dapat dilempar otomatis ke aplikasi background <strong>RawBT</strong> atau <strong>Bluetooth Print App</strong> untuk auto-cut dan cetak senyap.</p>
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
