import { isAxiosError } from 'axios';

export const HTTP_STATUS = {
  unauthorized: 401,
  serverErrorMin: 500,
} as const;

export const networkErrorMessage = 'No connection. Check your internet or try again later.';

export const isNetworkError = (error: unknown): boolean => {
  if (!isAxiosError(error)) {
    return false;
  }

  // Немає HTTP-відповіді — клієнт не достукався до API
  if (error.response == null) {
    return true;
  }

  return error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED';
};
