/**
 * currency.js — Format Rupiah
 */
export const formatRupiah = (amount) => {
  if (isNaN(amount)) return 'Rp 0';
  return 'Rp ' + Math.round(amount).toLocaleString('id-ID');
};

export const parseRupiah = (str) => {
  return parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
};
