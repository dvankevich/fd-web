import { isAxiosError } from 'axios';
import { isArrayOf, isRecord, isString } from '@shared/lib';
import type { Optional } from '@shared/types';
import { AUTH_STATUS } from './constants';

interface ApiErrorBody {
  error?: string;
  details?: Record<string, string[]>;
}

type ErrorDetails = ApiErrorBody['details'];

interface ApiErrorMessageArgs {
  error: unknown;
  fallback: string;
}

const isStringArray = (value: unknown): value is string[] => isArrayOf(value, isString);

const isApiErrorBody = (value: unknown): value is ApiErrorBody => {
  if (!isRecord(value)) {
    return false;
  }
  const messageIsValid = value.error === undefined || isString(value.error);
  const detailsAreValid =
    value.details === undefined ||
    (isRecord(value.details) && Object.values(value.details).every(isStringArray));
  return messageIsValid && detailsAreValid;
};

const detailMessages = (details: ErrorDetails): string =>
  Object.values(details ?? {})
    .flat()
    .join('. ');

export const responseStatus = (error: unknown): Optional<number> =>
  isAxiosError(error) ? error.response?.status : undefined;

export const isUnauthorized = (error: unknown): boolean =>
  responseStatus(error) === AUTH_STATUS.unauthorized;

export function apiErrorMessage({ error, fallback }: ApiErrorMessageArgs): string {
  const status = responseStatus(error);
  if (status === undefined || status >= AUTH_STATUS.serverError) {
    return fallback;
  }
  const data: unknown = isAxiosError(error) ? error.response?.data : undefined;
  if (!isApiErrorBody(data)) {
    return fallback;
  }
  return detailMessages(data.details) || data.error || fallback;
}
