import { isAxiosError } from 'axios';
import { isFieldErrors, isRecord, isString, type FieldErrors } from '@shared/lib';
import type { Optional } from '@shared/types';
import { AUTH_STATUS } from './constants';

export interface ApiError {
  message: string;
  fields: FieldErrors;
}

interface ApiErrorArgs {
  error: unknown;
  fallback: string;
}

interface ApiErrorBody {
  error?: string;
  details?: FieldErrors;
}

const NO_FIELDS: FieldErrors = {};

const isApiErrorBody = (value: unknown): value is ApiErrorBody => {
  if (!isRecord(value)) {
    return false;
  }
  const messageIsValid = value.error === undefined || isString(value.error);
  const detailsAreValid = value.details === undefined || isFieldErrors(value.details);
  return messageIsValid && detailsAreValid;
};

export const responseStatus = (error: unknown): Optional<number> =>
  isAxiosError(error) ? error.response?.status : undefined;

export const isUnauthorized = (error: unknown): boolean =>
  responseStatus(error) === AUTH_STATUS.unauthorized;

export function toApiError({ error, fallback }: ApiErrorArgs): ApiError {
  const status = responseStatus(error);
  const data: unknown = isAxiosError(error) ? error.response?.data : undefined;

  if (status === undefined || status >= AUTH_STATUS.serverError || !isApiErrorBody(data)) {
    return { message: fallback, fields: NO_FIELDS };
  }

  return { message: data.error ?? fallback, fields: data.details ?? NO_FIELDS };
}
