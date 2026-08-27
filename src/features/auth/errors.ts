import { isAxiosError } from 'axios';
import {
  HTTP_STATUS,
  isFieldErrors,
  isNetworkError,
  isRecord,
  isString,
  networkErrorMessage,
  type FieldErrors,
} from '@shared/lib';
import type { Optional } from '@shared/types';

export interface ApiError {
  message: string;
  fields: FieldErrors;
  status: Optional<number>;
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

export const apiError = (message: string): ApiError => ({
  message,
  fields: NO_FIELDS,
  status: undefined,
});

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
  responseStatus(error) === HTTP_STATUS.unauthorized;

export function toApiError({ error, fallback }: ApiErrorArgs): ApiError {
  if (isNetworkError(error)) {
    return {
      message: networkErrorMessage,
      fields: NO_FIELDS,
      status: undefined,
    };
  }

  const status = responseStatus(error);
  const data: unknown = isAxiosError(error) ? error.response?.data : undefined;

  if (status === undefined || status >= HTTP_STATUS.serverErrorMin || !isApiErrorBody(data)) {
    return { message: fallback, fields: NO_FIELDS, status };
  }

  return {
    message: data.error ?? fallback,
    fields: data.details ?? NO_FIELDS,
    status,
  };
}
