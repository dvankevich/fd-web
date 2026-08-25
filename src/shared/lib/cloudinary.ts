interface CloudinaryOptions {
  width: number;
  height: number;
  quality?: string | number;
}

export function getScaledCloudinaryUrl(
  url: string,
  options: CloudinaryOptions
): string {
  if (!url || !url.includes('/upload/')) {
    return url;
  }

  const { width, height, quality = 'auto:eco' } = options;

  // c_fill,g_auto — точне кадрування за шириною та висотою
  // q_auto:eco — максимальна оптимізація розміру для зеленої зони PageSpeed
  const transformation = `c_fill,g_auto,w_${width},h_${height},f_auto,q_${quality}`;

  return url.replace('/upload/', `/upload/${transformation}/`);
}
