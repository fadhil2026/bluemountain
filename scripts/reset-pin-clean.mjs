/**
 * reset-pin-clean.mjs
 * Resets cloud roster with clean consistent fields + PIN 123456 for all users
 */
import { createClient } from '@supabase/supabase-js';
import { webcrypto } from 'node:crypto';

const SUPABASE_URL = 'https://wiapnhpdgjbtkblowfig.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_BBEJNs18ooZ-IHRPxJtDUA_KiKLcQ-g';
const STORE_ID = 'STORE-BM-856CFAC8';
const NEW_PIN = '123456';

const generateSalt = () => {
  const arr = new Uint8Array(16);
  webcrypto.getRandomValues(arr);
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
};

const hashPin = async (pin, salt) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${salt}:${pin.trim()}`);
  const hashBuffer = await webcrypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
  console.log(`🔐 Resetting PINs to: ${NEW_PIN} (6 digit)`);

  // Fetch current roster
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('key', `users_roster_${STORE_ID}`)
    .single();

  if (error || !data) {
    console.error('❌ Gagal ambil roster:', error);
    process.exit(1);
  }

  const roster = JSON.parse(data.value);
  console.log('📋 Roster lama (users):', roster.map(u => u.username));

  // Rebuild roster with CLEAN, consistent fields only
  const now = new Date().toISOString();
  const cleanRoster = [];

  for (const user of roster) {
    const salt = generateSalt();
    const hash = await hashPin(NEW_PIN, salt);

    // Build clean user object - camelCase ONLY, no snake_case duplicates
    const cleanUser = {
      id: user.id || `usr_${user.username}`,
      store_id: STORE_ID,
      username: user.username,
      name: user.name,
      role: user.role,
      pinSalt: salt,
      pinHash: hash,
      isActive: true,
      updatedAt: now,
    };

    console.log(`  ✅ User: ${user.username} | Role: ${user.role} | New PIN: ${NEW_PIN}`);
    console.log(`     Salt: ${salt}`);
    console.log(`     Hash: ${hash}`);
    cleanRoster.push(cleanUser);
  }

  // Push clean roster to Supabase
  const { error: updateError } = await supabase
    .from('settings')
    .update({
      value: JSON.stringify(cleanRoster),
      updated_at: now,
    })
    .eq('key', `users_roster_${STORE_ID}`);

  if (updateError) {
    console.error('❌ Gagal update roster:', updateError);
    process.exit(1);
  }

  console.log('\n✅ SELESAI! Roster berhasil di-reset dengan field bersih.');
  console.log('📌 PIN semua user sekarang: 123456');
  console.log('📌 Field duplikat (pin_hash/pin_salt) telah dihapus.');

  // Verify
  const { data: verify } = await supabase
    .from('settings')
    .select('value')
    .eq('key', `users_roster_${STORE_ID}`)
    .single();

  const verifyRoster = JSON.parse(verify.value);
  console.log('\n🔍 Verifikasi roster baru:');
  verifyRoster.forEach(u => {
    const keys = Object.keys(u);
    const hasDuplicate = keys.includes('pin_hash') || keys.includes('pin_salt');
    console.log(`  - ${u.username} | keys: [${keys.join(', ')}] | duplikat: ${hasDuplicate ? '⚠️ YA' : '✅ Tidak'}`);
  });
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
