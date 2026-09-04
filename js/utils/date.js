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

export const todayKey = (d = new Date()) => {
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return new Date().toISOString().split('T')[0];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const toLocalDateKey = (d) => todayKey(d);

export const monthKey = (d = new Date()) => {
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return new Date().toISOString().slice(0, 7);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export const getTimeNow = () => formatTime(new Date());
