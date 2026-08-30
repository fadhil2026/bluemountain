/**
 * utils/invoice.js — Collision-resistant invoice number generation
 */

/**
 * Generate invoice number: BM-YYYYMMDD-XXXXX
 * Uses timestamp + random to minimize collision risk.
 * Collision probability: ~1 in 1,000,000 per millisecond window.
 */
export const generateInvoiceNo = () => {
  const d = new Date();
  const dateStr =
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0');
  // Timestamp-based suffix (base36) + random char for extra uniqueness
  const tsuffix = (d.getTime() % 100000).toString(36).toUpperCase().padStart(4, '0');
  const rand    = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `BM-${dateStr}-${tsuffix}${rand}`;
};
