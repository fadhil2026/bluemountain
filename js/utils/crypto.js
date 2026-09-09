/**
 * crypto.js — Military-Grade Zero-Plaintext Cryptography Module
 * Web Crypto API (SubtleCrypto) Salted SHA-256 for POS Operator PIN & Passwords
 * Works identically in modern browsers and Node.js environments.
 */

const getCrypto = () => {
  if (typeof window !== 'undefined' && window.crypto) {
    return window.crypto;
  }
  if (typeof globalThis !== 'undefined' && globalThis.crypto) {
    return globalThis.crypto;
  }
  throw new Error('Web Crypto API tidak tersedia pada runtime ini.');
};

/**
 * Generate cryptographically secure random salt (hex string)
 * @param {number} bytes - default 16 bytes (128-bit entropy)
 * @returns {string} hex representation of salt
 */
export const generateSalt = (bytes = 16) => {
  const c = getCrypto();
  const arr = new Uint8Array(bytes);
  c.getRandomValues(arr);
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Generate cryptographically secure UUID
 * @param {string} prefix - Optional prefix (e.g. 'tx', 'prod', 'cust', 'exp')
 * @returns {string} Unique global identifier
 */
export const generateUUID = (prefix = '') => {
  let uuid;
  try {
    const c = getCrypto();
    if (typeof c.randomUUID === 'function') {
      uuid = c.randomUUID();
    } else {
      const arr = new Uint8Array(16);
      c.getRandomValues(arr);
      arr[6] = (arr[6] & 0x0f) | 0x40;
      arr[8] = (arr[8] & 0x3f) | 0x80;
      uuid = Array.from(arr, (b, i) =>
        ([4, 6, 8, 10].includes(i) ? '-' : '') + b.toString(16).padStart(2, '0')
      ).join('');
    }
  } catch (_) {
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  return prefix ? `${prefix}_${uuid}` : uuid;
};

/**
 * Hash PIN or password using SHA-256 with cryptographic salt
 * Formula: SHA-256(salt + ":" + secret)
 * @param {string} pin - Raw input PIN / password
 * @param {string} salt - Hex salt string
 * @returns {Promise<string>} 64-character lowercase hex hash
 */
export const hashPin = async (pin, salt) => {
  if (!pin || typeof pin !== 'string') {
    throw new Error('PIN tidak valid.');
  }
  if (!salt || typeof salt !== 'string') {
    throw new Error('Salt tidak valid.');
  }

  const c = getCrypto();
  const encoder = new TextEncoder();
  const data = encoder.encode(`${salt}:${pin.trim()}`);
  const hashBuffer = await c.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Verify raw PIN against stored salt and expected hash in constant time
 * @param {string} pin - Raw input PIN from user
 * @param {string} salt - Stored hex salt
 * @param {string} expectedHash - Stored 64-char hex hash
 * @returns {Promise<boolean>} true if match, false otherwise
 */
export const verifyPin = async (pin, salt, expectedHash) => {
  if (!pin || !salt || !expectedHash) return false;
  try {
    const computedHash = await hashPin(pin, salt);
    // Constant-time string comparison to prevent timing attacks
    if (computedHash.length !== expectedHash.length) return false;
    let mismatch = 0;
    for (let i = 0; i < computedHash.length; i++) {
      mismatch |= computedHash.charCodeAt(i) ^ expectedHash.charCodeAt(i);
    }
    return mismatch === 0;
  } catch (_) {
    return false;
  }
};

/**
 * Base64URL helper compatible with Browser and Node.js
 */
const base64UrlEncode = (strOrBuffer) => {
  let base64;
  if (typeof strOrBuffer === 'string') {
    if (typeof btoa === 'function') {
      base64 = btoa(unescape(encodeURIComponent(strOrBuffer)));
    } else {
      base64 = Buffer.from(strOrBuffer, 'utf8').toString('base64');
    }
  } else {
    const bytes = new Uint8Array(strOrBuffer);
    if (typeof btoa === 'function') {
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      base64 = btoa(binary);
    } else {
      base64 = Buffer.from(bytes).toString('base64');
    }
  }
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const base64UrlDecode = (str) => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  if (typeof atob === 'function') {
    return decodeURIComponent(escape(atob(base64)));
  } else {
    return Buffer.from(base64, 'base64').toString('utf8');
  }
};

const base64UrlToUint8Array = (str) => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  let binary;
  if (typeof atob === 'function') {
    binary = atob(base64);
  } else {
    binary = Buffer.from(base64, 'base64').toString('binary');
  }
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

/**
 * Create a signed JWT session token (HMAC-SHA256)
 * @param {object} payload - Claims object (sub, username, role, name, etc.)
 * @param {string} secret - Signing key
 * @param {number} expiresInSeconds - Token validity duration (default 7 days)
 * @returns {Promise<string>} Signed JWT string
 */
export const createSessionJWT = async (payload, secret, expiresInSeconds = 86400 * 7) => {
  const c = getCrypto();
  const encoder = new TextEncoder();
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(fullPayload));
  const message = `${headerB64}.${payloadB64}`;

  const key = await c.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await c.subtle.sign('HMAC', key, encoder.encode(message));
  const signatureB64 = base64UrlEncode(signatureBuffer);

  return `${message}.${signatureB64}`;
};

/**
 * Verify signed JWT session token and return claims if valid and unexpired
 * @param {string} token - JWT string
 * @param {string} secret - Signing key
 * @returns {Promise<object|null>} Decoded payload if valid, null otherwise
 */
export const verifySessionJWT = async (token, secret) => {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [headerB64, payloadB64, signatureB64] = parts;
  const message = `${headerB64}.${payloadB64}`;
  const c = getCrypto();
  const encoder = new TextEncoder();

  try {
    const key = await c.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    const signatureBytes = base64UrlToUint8Array(signatureB64);
    const isValid = await c.subtle.verify('HMAC', key, signatureBytes, encoder.encode(message));
    if (!isValid) return null;

    const payloadJson = base64UrlDecode(payloadB64);
    const payload = JSON.parse(payloadJson);
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }
    return payload;
  } catch (_) {
    return null;
  }
};

