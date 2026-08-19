import { isAxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { bearer } from '@shared/api/client';
import { HTTP_STATUS, MODAL_NAME, modalObserver } from '@shared/lib';
import type { AppDispatch, RootState } from '@app/store';
import type { Nullable } from '@shared/types';
import { AUTH_ENDPOINT } from './constants';
import { refresh } from './operations';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    retriedAfterRefresh?: boolean;
  }
}

interface AuthInterceptorOptions {
  client: AxiosInstance;
  dispatch: AppDispatch;
  getState: () => RootState;
}

const NOT_RETRIED: string[] = [
  AUTH_ENDPOINT.register,
  AUTH_ENDPOINT.login,
  AUTH_ENDPOINT.refresh,
  AUTH_ENDPOINT.logout,
];

const ABSOLUTE_URL = /^([a-z][a-z\d+\-.]*:)?\/\//i;

const joinUrl = (baseURL: string, url: string): string =>
  `${baseURL.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;

const resolveUrl = (url: string, baseURL: string): Nullable<URL> => {
  try {
    return new URL(ABSOLUTE_URL.test(url) ? url : joinUrl(baseURL, url), window.location.origin);
  } catch {
    return null;
  }
};

const isRetriable = (request: InternalAxiosRequestConfig, client: AxiosInstance): boolean => {
  if (request.retriedAfterRefresh) {
    return false;
  }
  const baseURL = client.defaults.baseURL ?? '';
  const apiBase = resolveUrl('', baseURL);
  const target = resolveUrl(request.url ?? '', baseURL);
  if (!apiBase || !target || target.origin !== apiBase.origin) {
    return false;
  }
  const basePath = apiBase.pathname.replace(/\/+$/, '');
  return !NOT_RETRIED.some((endpoint) => target.pathname === `${basePath}${endpoint}`);
};

export function attachAuthInterceptor({
  client,
  dispatch,
  getState,
}: AuthInterceptorOptions): () => void {
  const interceptor = client.interceptors.response.use(undefined, async (error: unknown) => {
    if (!isAxiosError(error) || error.response?.status !== HTTP_STATUS.unauthorized) {
      throw error;
    }

    const request = error.config;
    if (!request || !isRetriable(request, client)) {
      throw error;
    }

    const hadSession = getState().auth.isLoggedIn;
    const result = await dispatch(refresh());

    if (!refresh.fulfilled.match(result)) {
      if (hadSession) {
        modalObserver.open(MODAL_NAME.signIn);
      }
      throw error;
    }

    request.retriedAfterRefresh = true;
    request.headers.Authorization = bearer(result.payload.accessToken);

    return client(request);
  });

  return () => client.interceptors.response.eject(interceptor);
}
