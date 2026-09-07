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
