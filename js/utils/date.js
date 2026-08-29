/**
 * date.js — Date & time formatting (Indonesian locale)
 */
export const formatDate = (date = new Date()) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }).format(date instanceof Date ? date : new Date(date));
};

export const formatDateShort = (date = new Date()) => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(date instanceof Date ? date : new Date(date));
};

export const formatTime = (date = new Date()) => {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(date instanceof Date ? date : new Date(date));
};

export const formatDateTime = (date = new Date()) => {
  return `${formatDateShort(date)} ${formatTime(date)}`;
};

export const todayKey = () => new Date().toISOString().split('T')[0];

export const monthKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

export const getTimeNow = () => formatTime(new Date());
