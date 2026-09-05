/**
 * scripts/supabase-admin.js
 * Automated Supabase Cloud Management CLI (Service Role / Secret Key)
 * 
 * Usage:
 *   node scripts/supabase-admin.js status
 *   node scripts/supabase-admin.js backup
 *   node scripts/supabase-admin.js query <table_name> [limit]
 *   node scripts/supabase-admin.js test
 */
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load .env variables without external dependencies
const loadEnv = () => {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        process.env[key] = val;
      }
    }
  }
};

loadEnv();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wiapnhpdgjbtkblowfig.supabase.co';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_SECRET_KEY) {
  console.error('❌ SUPABASE_SECRET_KEY tidak ditemukan di .env. Pastikan file .env lokal terkonfigurasi.');
  process.exit(1);
}

const adminClient = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false }
});

const TABLES = ['products', 'transactions', 'expenses', 'customers'];

const getStatus = async () => {
  console.log(`📡 [Supabase Cloud Status] (${SUPABASE_URL})`);
  for (const table of TABLES) {
    const { count, error } = await adminClient.from(table).select('*', { count: 'exact', head: true });
    if (error) {
      console.log(`  ❌ ${table.padEnd(15)}: Error (${error.message})`);
    } else {
      console.log(`  ✓  ${table.padEnd(15)}: ${count} baris`);
    }
  }
};

const backup = async () => {
  console.log('💾 [Supabase Backup] Memulai pencadangan penuh database...');
  const backupDir = path.resolve(process.cwd(), 'backups');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupData = {
    timestamp: new Date().toISOString(),
    source: SUPABASE_URL,
    tables: {}
  };

  for (const table of TABLES) {
    const { data, error } = await adminClient.from(table).select('*');
    if (error) {
      console.error(`  ❌ Gagal backup ${table}:`, error.message);
      backupData.tables[table] = { error: error.message };
    } else {
      backupData.tables[table] = data;
      console.log(`  ✓  ${table.padEnd(15)}: ${data.length} baris dicadangkan`);
    }
  }

  const filePath = path.join(backupDir, `supabase_backup_${timestamp}.json`);
  fs.writeFileSync(filePath, JSON.stringify(backupData, null, 2), 'utf8');
  console.log(`✅ [Sukses] Backup tersimpan di: ${filePath}`);
};

const queryTable = async (table, limit = 10) => {
  console.log(`🔍 [Supabase Query] SELECT * FROM ${table} LIMIT ${limit}`);
  const { data, error } = await adminClient.from(table).select('*').limit(Number(limit));
  if (error) {
    console.error(`❌ Error query ${table}:`, error.message);
  } else {
    console.table(data);
  }
};

const testKeys = async () => {
  console.log('🧪 [Key Verification Test]');
  // 1. Test Publishable Key
  const pubClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false } });
  const { error: pubErr } = await pubClient.from('products').select('*').limit(1);
  console.log(`  Publishable Key : ${pubErr ? '❌ Gagal: ' + pubErr.message : '✅ Berfungsi (Read Access OK)'}`);

  // 2. Test Secret Key (Admin Bypass)
  const { error: secErr } = await adminClient.from('products').select('*').limit(1);
  console.log(`  Secret Admin Key: ${secErr ? '❌ Gagal: ' + secErr.message : '✅ Berfungsi (Full Admin Bypass OK)'}`);
};

// CLI Dispatcher
const [,, command, ...args] = process.argv;

switch (command) {
  case 'status':
    getStatus();
    break;
  case 'backup':
    backup();
    break;
  case 'query':
    if (!args[0]) {
      console.error('Harap masukkan nama tabel. Contoh: node scripts/supabase-admin.js query products 5');
    } else {
      queryTable(args[0], args[1] || 10);
    }
    break;
  case 'test':
  default:
    testKeys().then(() => getStatus());
    break;
}
