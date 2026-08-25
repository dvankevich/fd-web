export function getScaledCloudinaryUrl(url: string, maxHeight = 369): string {
  if (!url || !url.includes('/upload/')) {
    return url;
  }

  const transformation = `c_limit,h_${maxHeight},f_auto,q_auto`;

  return url.replace('/upload/', `/upload/${transformation}/`);
}
