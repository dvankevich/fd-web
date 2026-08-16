import { apiClient, setAuthHeader } from '@shared/api/client';
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  Tokens,
} from '@shared/types';

export async function registerUser(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
  setAuthHeader(data.accessToken);
  return data;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
  setAuthHeader(data.accessToken);
  return data;
}

export async function refreshTokens(refreshToken: string): Promise<Tokens> {
  const { data } = await apiClient.post<Tokens>('/auth/refresh', { refreshToken });
  setAuthHeader(data.accessToken);
  return data;
}

export async function logoutUser(refreshToken?: string): Promise<void> {
  try {
    await apiClient.post('/auth/logout', { refreshToken });
  } finally {
    setAuthHeader(null);
  }
}
