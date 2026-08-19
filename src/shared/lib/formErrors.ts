import type { Maybe } from '@shared/types';
import { isArrayOf, isRecord, isString } from './guards';

export type FieldErrors = Record<string, string[]>;

interface ApplyFieldErrorsArgs<Values extends object> {
  fields: Maybe<FieldErrors>;
  values: Values;
  setFieldError: (field: string, message: string) => void;
}

export const isFieldErrors = (value: unknown): value is FieldErrors =>
  isRecord(value) && Object.values(value).every((messages) => isArrayOf(messages, isString));

export const hasFieldErrors = (fields: Maybe<FieldErrors>): boolean =>
  Boolean(fields) && Object.keys(fields ?? {}).length > 0;

export const applyFieldErrors = <Values extends object>({
  fields,
  values,
  setFieldError,
}: ApplyFieldErrorsArgs<Values>): void => {
  if (!fields) {
    return;
  }
  const known = new Set(Object.keys(values));
  Object.entries(fields).forEach(([field, messages]) => {
    const [message] = messages;
    if (message && known.has(field)) {
      setFieldError(field, message);
    }
  });
};
