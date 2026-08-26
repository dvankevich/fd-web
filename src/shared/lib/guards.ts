export const isString = (value: unknown): value is string => typeof value === 'string';

export const isNonEmptyString = (value: unknown): value is string =>
  isString(value) && value.trim().length > 0;

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export const isArrayOf = <T>(value: unknown, guard: (item: unknown) => item is T): value is T[] =>
  isArray(value) && value.every(guard);

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isValueOf = <T extends Record<string, string | number>>(
  source: T,
  value: unknown,
): value is T[keyof T] => Object.values(source).some((item) => item === value);
