/**
 * currency.js — Format Rupiah
 */
export const formatRupiah = (amount) => {
  const num = Number(amount);
  if (isNaN(num)) return 'Rp 0';
  const rounded = Math.round(Math.abs(num)).toLocaleString('id-ID');
  return (num < 0 ? '-Rp ' : 'Rp ') + rounded;
};

export const parseRupiah = (str) => {
  return parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
};
