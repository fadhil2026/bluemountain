/**
 * export.js — Universal Spreadsheet CSV / Excel Exporter (RFC 4180 Compliant)
 * Generates UTF-8 BOM CSV files that automatically open cleanly in Microsoft Excel, Google Sheets, and LibreOffice.
 */

/**
 * Escape field according to CSV RFC 4180 rules
 */
const escapeCSVField = (field) => {
  if (field === null || field === undefined) return '""';
  const str = String(field);
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
};

/**
 * Export table data to CSV and trigger browser download
 * @param {string} filename - Output filename (e.g. 'laporan-penjualan.csv')
 * @param {Array<string>} headers - Column header array
 * @param {Array<Array<any>>} rows - 2D array of rows
 */
export const exportToCSV = (filename, headers, rows) => {
  const headerLine = headers.map(escapeCSVField).join(',');
  const rowLines = rows.map(row => row.map(escapeCSVField).join(','));
  
  // Prepend UTF-8 BOM (\uFEFF) so Excel respects UTF-8 encoding
  const csvContent = '\uFEFF' + [headerLine, ...rowLines].join('\r\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
