interface CloudinaryOptions {
  width: number;
  height: number;
  quality?: string | number;
  dpr?: number | string; // Додаємо DPR параметр
}

export function getScaledCloudinaryUrl(url: string, options: CloudinaryOptions): string {
  if (!url || !url.includes('/upload/')) {
    return url;
  }

  const { width, height, quality = 'auto:eco', dpr = 1 } = options;

  // c_fill,g_auto — точне кадрування за шириною та висотою
  // q_auto:eco — максимальна оптимізація розміру
  // dpr_X — вказуємо Cloudinary масштабувати розміри відповідно до DPR
  const transformation = `c_fill,g_auto,w_${width},h_${height},f_auto,q_${quality},dpr_${dpr}`;

  return url.replace('/upload/', `/upload/${transformation}/`);
}
