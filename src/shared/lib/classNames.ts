import clsx, { type ClassValue } from 'clsx';

export type { ClassValue };

export const cn = (...values: ClassValue[]): string => {
  const unique = new Set(clsx(values).split(' ').filter(Boolean));
  return [...unique].join(' ');
};
