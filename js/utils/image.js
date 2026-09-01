/**
 * utils/image.js — Client-side Image Compression & SKU Helper
 */

/**
 * Compress an image file to max width/height using HTML Canvas.
 * Generates lightweight base64 data URL (WebP/JPEG, ~3-6KB) for Dexie & Supabase sync.
 */
export const compressImage = (file, maxDim = 128, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('File harus berupa gambar (PNG/JPEG/WebP)'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Gagal memuat gambar'));
      img.onload = () => {
        let { width, height } = img;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Try webp first, fallback to jpeg
        let dataUrl = '';
        try {
          dataUrl = canvas.toDataURL('image/webp', quality);
        } catch (_) {}
        if (!dataUrl || !dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Generate a unique sequential SKU (e.g. BM-001, BM-002) based on existing products.
 */
export const generateSKU = (products = []) => {
  let maxNum = 0;
  for (const p of products) {
    if (p.sku && typeof p.sku === 'string') {
      const match = p.sku.match(/^BM-(\d+)$/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    }
  }
  const nextNum = maxNum ? maxNum + 1 : (products.length + 1);
  return `BM-${String(nextNum).padStart(3, '0')}`;
};
