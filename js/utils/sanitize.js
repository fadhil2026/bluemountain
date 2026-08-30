/**
 * utils/sanitize.js — XSS protection & input helpers
 */

/**
 * Escape HTML special characters to prevent XSS
 * Use on ALL user-provided strings before inserting into innerHTML.
 */
export const esc = (str) => {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Truncate string to maxLength
 */
export const trunc = (str, max = 60) => {
  const s = String(str ?? '');
  return s.length > max ? s.slice(0, max) + '…' : s;
};
