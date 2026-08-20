import axios from 'axios';
import { TIME_MS } from '@shared/lib/time';
import type { Nullable } from '@shared/types';

const REQUEST_TIMEOUT = 15 * TIME_MS.second;
const AUTH_SCHEME = 'Bearer';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://foodies-api.fstk.run.place/api',
  timeout: REQUEST_TIMEOUT,
});

export const bearer = (accessToken: string): string => `${AUTH_SCHEME} ${accessToken}`;

export function setAuthHeader(accessToken: Nullable<string>): void {
  if (accessToken) {
    apiClient.defaults.headers.common.Authorization = bearer(accessToken);
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
}
