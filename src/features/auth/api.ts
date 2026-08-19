import { apiClient, setAuthHeader } from '@shared/api/client';
import type { AuthResponse, LoginPayload, RegisterPayload, Tokens } from '@shared/types';
import { AUTH_ENDPOINT } from './constants';

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(AUTH_ENDPOINT.register, payload);
  setAuthHeader(data.accessToken);
  return data;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(AUTH_ENDPOINT.login, payload);
  setAuthHeader(data.accessToken);
  return data;
}

export async function refreshTokens(refreshToken: string): Promise<Tokens> {
  const { data } = await apiClient.post<Tokens>(AUTH_ENDPOINT.refresh, { refreshToken });
  setAuthHeader(data.accessToken);
  return data;
}

export async function logoutUser(refreshToken: string): Promise<void> {
  await apiClient.post(AUTH_ENDPOINT.logout, { refreshToken });
}
