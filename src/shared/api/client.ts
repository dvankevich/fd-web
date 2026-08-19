import axios from 'axios';
import type { Nullable } from '@shared/types';

const REQUEST_TIMEOUT_MS = 15000;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: REQUEST_TIMEOUT_MS,
});

export function setAuthHeader(accessToken: Nullable<string>): void {
  if (accessToken) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
}
