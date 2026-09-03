/**
 * qris.js — EMVCo Dynamic QRIS Generator (Bank Indonesia Standard)
 * Converts a static QRIS code into a dynamic one with transaction amount and valid CRC16-CCITT checksum.
 */

/**
 * Calculate CRC16-CCITT Checksum (Polynomial: 0x1021, Initial Value: 0xFFFF)
 */
export const crc16CCITT = (str) => {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
};

/**
 * Format string into Tag-Length-Value (TLV)
 */
export const formatTLV = (tag, value) => {
  const strVal = String(value);
  const len = String(strVal.length).padStart(2, '0');
  return `${tag}${len}${strVal}`;
};

/**
 * Generate Dynamic QRIS string with embedded nominal
 * @param {string} staticQRIS - Base static QRIS string from Merchant
 * @param {number} amount - Exact transaction amount in Rupiah (integer)
 * @returns {string} Dynamic QRIS string
 */
export const generateDynamicQRIS = (staticQRIS = '', amount = 0) => {
  let raw = (staticQRIS || '').trim();

  // Fallback default merchant payload if merchant hasn't entered their QRIS in Settings
  if (!raw || raw.length < 20) {
    raw = '00020101021126590014ID.LINKAJA.WWW011893600911002234477302090022344775204541153033605802ID5920BLUE MOUNTAIN STATION6006BEKASI610517510';
  }

  // 1. Remove existing CRC Tag (Tag 63) from the end
  const crcIndex = raw.lastIndexOf('6304');
  if (crcIndex !== -1) {
    raw = raw.substring(0, crcIndex);
  }

  // 2. Change Point of Initiation Method: Static (11) -> Dynamic (12)
  if (raw.includes('010211')) {
    raw = raw.replace('010211', '010212');
  } else if (!raw.includes('010212')) {
    // Inject dynamic initiation tag if not present
    raw = raw.replace('000201', '000201010212');
  }

  // 3. Inject Tag 54 (Transaction Amount)
  const intAmount = Math.max(0, Math.round(Number(amount) || 0));
  const tag54Regex = /54\d{2}\d+/;
  const tag54Payload = formatTLV('54', intAmount);

  if (tag54Regex.test(raw)) {
    raw = raw.replace(tag54Regex, tag54Payload);
  } else {
    // Insert before Tag 58 (Country Code)
    const tag58Index = raw.indexOf('5802ID');
    if (tag58Index !== -1) {
      raw = raw.slice(0, tag58Index) + tag54Payload + raw.slice(tag58Index);
    } else {
      raw += tag54Payload + '5802ID';
    }
  }

  // 4. Append Tag 63 (Checksum header) and calculate final CRC16-CCITT
  raw += '6304';
  const checksum = crc16CCITT(raw);

  return raw + checksum;
};
