interface CloudinaryOptions {
  height?: number;
  width?: number;
  quality?: string | number;
}

export function getScaledCloudinaryUrl(
  url: string,
  options: CloudinaryOptions = {}
): string {
  if (!url || !url.includes('/upload/')) {
    return url;
  }

  const { height, width, quality = 75 } = options;

  const transformations: string[] = [
    'c_limit',
    'f_auto',
    `q_${quality}`,
  ];

  if (height) transformations.push(`h_${height}`);
  if (width) transformations.push(`w_${width}`);

  const transformationString = transformations.join(',');

  return url.replace('/upload/', `/upload/${transformationString}/`);
}
