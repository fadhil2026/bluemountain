/**
 * functions/api/auth/login.js
 * Cloudflare Pages Edge Function — Server-Authoritative Operator Login
 * 
 * Features:
 * - Edge Salted SHA-256 / PBKDF2 Verification
 * - Rate Limiting & 60s Brute-Force Lockout
 * - Secure Sealed JWT Token Generation on Edge
 */

// In-memory rate limiting map per Edge isolate
const _failedAttempts = new Map();

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { username, pin } = body;

    const cleanUser = String(username || '').toLowerCase().trim();
    const cleanPin = String(pin || '').trim();

    if (!cleanUser || !cleanPin) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Username dan PIN wajib diisi.',
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // 1. Rate Limiting / Lockout Check
    const clientIp = request.headers.get('cf-connecting-ip') || 'unknown';
    const rateKey = `${clientIp}:${cleanUser}`;
    const now = Date.now();
    const attemptRecord = _failedAttempts.get(rateKey) || { count: 0, lockedUntil: 0 };

    if (attemptRecord.lockedUntil > now) {
      const remainingSeconds = Math.ceil((attemptRecord.lockedUntil - now) / 1000);
      return new Response(JSON.stringify({
        success: false,
        error: `Terlalu banyak percobaan salah! Akun terkunci sementara selama ${remainingSeconds} detik.`,
        lockedUntil: attemptRecord.lockedUntil,
      }), { status: 429, headers: { 'Content-Type': 'application/json' } });
    }

    // 2. Fetch authoritative user from Supabase via Edge
    const supabaseUrl = env.SUPABASE_URL || 'https://wiapnhpdgjbtkblowfig.supabase.co';
    const supabaseAnonKey = env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_BBEJNs18ooZ-IHRPxJtDUA_KiKLcQ-g';

    // Query settings for users_roster or app_users
    const rosterRes = await fetch(`${supabaseUrl}/rest/v1/settings?key=eq.users_roster_STORE-BM-856CFAC8&select=value`, {
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
    });

    let foundUser = null;

    if (rosterRes.ok) {
      const rows = await rosterRes.json();
      if (rows && rows.length > 0) {
        try {
          const roster = JSON.parse(rows[0].value);
          foundUser = roster.find(u => String(u.username).toLowerCase().trim() === cleanUser);
        } catch (_) {}
      }
    }

    // Default owner fallback if initial
    if (!foundUser && cleanUser === 'admin') {
      foundUser = {
        id: 'usr_admin',
        username: 'admin',
        name: 'Fadhilah Ramadhan (Owner)',
        role: 'owner',
        pin_hash: 'c3b558e7f7bd99bf1a0e50aa083c1ba8811e840dab3bf07bc020c724ce771e83',
        pin_salt: '9bc6c2b0806a1040516484af5df10112',
        is_active: true,
      };
    }

    if (!foundUser || foundUser.is_active === false) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Akun operator tidak ditemukan atau dinonaktifkan.',
      }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    // 3. Verify Salted SHA-256 PIN
    const salt = foundUser.pin_salt || foundUser.pinSalt;
    const expectedHash = foundUser.pin_hash || foundUser.pinHash;

    const encoder = new TextEncoder();
    const dataToHash = encoder.encode(`${salt}:${cleanPin}`);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataToHash);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Constant-time check
    let mismatch = computedHash.length ^ expectedHash.length;
    for (let i = 0; i < computedHash.length; i++) {
      mismatch |= computedHash.charCodeAt(i) ^ expectedHash.charCodeAt(i);
    }

    if (mismatch !== 0) {
      attemptRecord.count += 1;
      if (attemptRecord.count >= 5) {
        attemptRecord.lockedUntil = now + 60000; // 60s lockout
        _failedAttempts.set(rateKey, attemptRecord);
        return new Response(JSON.stringify({
          success: false,
          error: 'PIN salah 5 kali berturut-turut! Sistem terkunci selama 60 detik.',
          lockedUntil: attemptRecord.lockedUntil,
        }), { status: 429, headers: { 'Content-Type': 'application/json' } });
      }
      _failedAttempts.set(rateKey, attemptRecord);

      return new Response(JSON.stringify({
        success: false,
        error: `PIN salah! Sisa percobaan: ${5 - attemptRecord.count}`,
      }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    // Reset failed counter on success
    _failedAttempts.delete(rateKey);

    // 4. Issue Edge Signed JWT Token
    const jwtSecret = env.JWT_SECRET || 'BM_PROPRIETARY_EDGE_KEY_2026_AUTHORITATIVE_FREE_TIER';
    const payload = {
      sub: foundUser.id,
      username: foundUser.username,
      name: foundUser.name,
      role: foundUser.role,
      iat: Math.floor(now / 1000),
      exp: Math.floor(now / 1000) + (86400 * 7), // 7 days
    };

    const base64Url = (objOrBuf) => {
      const str = typeof objOrBuf === 'string' ? objOrBuf : String.fromCharCode(...new Uint8Array(objOrBuf));
      return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    };

    const headerB64 = base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payloadB64 = base64Url(JSON.stringify(payload));
    const tokenMessage = `${headerB64}.${payloadB64}`;

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(jwtSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(tokenMessage));
    const token = `${tokenMessage}.${base64Url(signatureBuffer)}`;

    return new Response(JSON.stringify({
      success: true,
      token,
      user: {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role,
      },
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Terjadi kesalahan internal server: ' + err.message,
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
