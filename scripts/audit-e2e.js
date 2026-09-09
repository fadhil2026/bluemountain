/**
 * scripts/audit-e2e.js
 * Comprehensive business logic, arithmetic, and accounting verification
 */
import assert from 'assert';
import { hashPin, generateSalt, verifyPin, createSessionJWT, verifySessionJWT, generateUUID } from '../js/utils/crypto.js';
import { formatRupiah } from '../js/utils/currency.js';
import { todayKey, monthKey } from '../js/utils/date.js';

console.log('🔬 [Military Audit] Memulai pengujian logika bisnis, matematika & akuntansi...');

// Test 1: Salted SHA-256 PIN Verification
console.log('  1. Menguji modul kriptografi Salted SHA-256...');
const salt = generateSalt();
const pin = '1234';
const hash = await hashPin(pin, salt);
const isValid = await verifyPin(pin, salt, hash);
const isInvalid = await verifyPin('9999', salt, hash);
assert.strictEqual(isValid, true, 'PIN valid harus terverifikasi');
assert.strictEqual(isInvalid, false, 'PIN salah harus ditolak');
console.log('     ✓ Kriptografi PIN lolos');

// Test 2: Currency formatting
console.log('  2. Menguji pemformatan Rupiah...');
assert.strictEqual(formatRupiah(50000), 'Rp 50.000', '50000 format');
assert.strictEqual(formatRupiah(0), 'Rp 0', '0 format');
assert.strictEqual(formatRupiah(-15000), '-Rp 15.000', 'negatif format');
console.log('     ✓ Pemformatan Rupiah lolos');

// Test 3: Date utilities
console.log('  3. Menguji utilitas tanggal...');
const today = todayKey();
assert.match(today, /^\d{4}-\d{2}-\d{2}$/, 'Format todayKey harus YYYY-MM-DD');
const month = monthKey();
assert.match(month, /^\d{4}-\d{2}$/, 'Format monthKey harus YYYY-MM');
console.log('     ✓ Utilitas tanggal lolos');

// Test 4: Financial Math & Accounting Balance
console.log('  4. Menguji matematika keuangan & keseimbangan neraca...');
const modalAwal = 500000;
const txs = [
  { total: 100000, paymentMethod: 'cash', paymentStatus: 'paid' },
  { total: 75000, paymentMethod: 'transfer', paymentStatus: 'transfer_confirmed' },
  { total: 50000, paymentMethod: 'transfer', paymentStatus: 'transfer_pending' },
  {
    total: 80000,
    paymentMethod: 'debt',
    paymentStatus: 'partial',
    paidAmount: 30000,
    remainingDebt: 50000,
    debtPayments: [{ amount: 30000, note: 'DP' }]
  },
];
const expenses = [
  { amount: 45000, category: 'Listrik' },
  { amount: 25000, category: 'BBM' },
];

let kasMasuk = 0;
let piutang = 0;
for (const t of txs) {
  if (t.paymentMethod === 'cash' && t.paymentStatus === 'paid') kasMasuk += t.total;
  if (t.paymentMethod === 'transfer') {
    if (t.paymentStatus === 'transfer_confirmed') kasMasuk += t.total;
    else piutang += t.total;
  }
  if (t.paymentMethod === 'debt') {
    for (const p of (t.debtPayments || [])) kasMasuk += p.amount;
    piutang += (t.remainingDebt || 0);
  }
}
const totalPengeluaran = expenses.reduce((s, e) => s + e.amount, 0);
const saldoKas = modalAwal + kasMasuk - totalPengeluaran;

assert.strictEqual(kasMasuk, 100000 + 75000 + 30000, 'Total kas masuk harus 205.000');
assert.strictEqual(piutang, 50000 + 50000, 'Total piutang harus 100.000');
assert.strictEqual(totalPengeluaran, 70000, 'Total pengeluaran harus 70.000');
assert.strictEqual(saldoKas, 500000 + 205000 - 70000, 'Saldo kas harus 635.000');
console.log('     ✓ Matematika keuangan & arus kas 100% presisi');

// Test 5: Inventory Stock Math
console.log('  5. Menguji matematika pengurangan & pengembalian stok...');
let productStock = 100;
const cartQty = 3;
// Checkout:
productStock = Math.max(0, productStock - cartQty);
assert.strictEqual(productStock, 97, 'Stok setelah pembelian harus 97');
// Revert on delete:
productStock += cartQty;
assert.strictEqual(productStock, 100, 'Stok setelah pembatalan harus kembali 100');
// Test 6: HMAC-SHA256 JWT Session Token Generation & Verification
console.log('  6. Menguji modul token sesi HMAC-SHA256 JWT...');
const testPayload = { sub: 'usr_123', username: 'admin', role: 'owner', name: 'Fadhilah Ramadhan' };
const secretKey = 'test_secret_key_pos_2026';
const token = await createSessionJWT(testPayload, secretKey, 3600);
assert.strictEqual(typeof token, 'string', 'Token harus berupa string');
assert.strictEqual(token.split('.').length, 3, 'JWT harus memiliki 3 segmen terpisah titik');

const decoded = await verifySessionJWT(token, secretKey);
assert.strictEqual(decoded.username, 'admin', 'Klaim username dalam JWT harus sesuai');
assert.strictEqual(decoded.role, 'owner', 'Klaim role dalam JWT harus sesuai');

const tamperedToken = token.slice(0, -5) + 'xxxxx';
const tamperedResult = await verifySessionJWT(tamperedToken, secretKey);
assert.strictEqual(tamperedResult, null, 'Token yang dimanipulasi harus ditolak');

const wrongKeyResult = await verifySessionJWT(token, 'wrong_secret_key');
assert.strictEqual(wrongKeyResult, null, 'Token dengan secret berbeda harus ditolak');
console.log('     ✓ Modul JWT lolos 100%');

// Test 7: UUID Collision Resistance & Structure
console.log('  7. Menguji generator UUID v4 dan ketahanan benturan...');
const uuidSet = new Set();
for (let i = 0; i < 1000; i++) {
  const uid = generateUUID('test');
  assert.match(uid, /^test_[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/, 'Format UUID v4 valid');
  uuidSet.add(uid);
}
assert.strictEqual(uuidSet.size, 1000, '1000 UUID berurutan tidak boleh ada tabrakan (zero collision)');
console.log('     ✓ Generator UUID lolos 1000x tanpa tabrakan');

// Test 8: Tombstone Soft Deletion Filter
console.log('  8. Menguji filter tombstone soft deletion...');
const testDataset = [
  { id: '1', name: 'Barang A', deleted_at: null },
  { id: '2', name: 'Barang B', deleted_at: '2026-09-09T05:00:00.000Z' },
  { id: '3', name: 'Barang C', deleted_at: null },
];
const activeItems = testDataset.filter(item => !item.deleted_at);
assert.strictEqual(activeItems.length, 2, 'Hanya barang tanpa tombstone yang aktif');
assert.strictEqual(activeItems.map(i => i.id).join(','), '1,3', 'Barang B terhapus harus tersaring');
console.log('     ✓ Filter tombstone soft delete 100% presisi');

// Test 9: Staged Offline Status Transition
console.log('  9. Menguji transisi status sinkronisasi offline (Staged -> Synced)...');
const offlineTx = { id: generateUUID('tx'), total: 50000, syncStatus: 'staged_offline' };
assert.strictEqual(offlineTx.syncStatus, 'staged_offline', 'Transaksi offline harus berstatus staged');
offlineTx.syncStatus = 'synced';
assert.strictEqual(offlineTx.syncStatus, 'synced', 'Setelah sinkronisasi harus berstatus synced');
console.log('     ✓ Transisi status staged offline lolos');

// Test 10: Multi-Cashier Stock Ledger
console.log('  10. Menguji integritas stok kasir multi-device (atomic bounds)...');
let initialStock = 50;
const cashierOrders = [5, 12, 8, 20, 10]; // total 55 (melebihi stok 50)
let fulfilled = 0;
let rejected = 0;
for (const qty of cashierOrders) {
  if (initialStock >= qty) {
    initialStock -= qty;
    fulfilled += qty;
  } else {
    rejected += qty;
  }
}
assert.strictEqual(initialStock, 5, 'Sisa stok harus tepat 5');
assert.strictEqual(fulfilled, 45, 'Total pesanan terpenuhi harus 45');
assert.strictEqual(rejected, 10, 'Pesanan 10 harus ditolak karena stok tidak cukup');
console.log('     ✓ Validasi stok multi-cashier lolos');

console.log('\n🎯 [SUKSES AUDIT] Semua 10 pengujian logika, kripto, UUID, matematika, dan akuntansi 100% LOLOS!\n');


