import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthResponse, LoginPayload, RegisterPayload, Tokens } from '@shared/types';
import * as authApi from './api';
import type { RootState } from '@app/store';

export const register = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    return await authApi.registerUser(payload);
  } catch (error: unknown) {
    const message =
      (error as { response?: { data?: { error?: string } } })?.response?.data
        ?.error ?? 'Register failed';
    return rejectWithValue(message);
  }
});

export const login = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    return await authApi.loginUser(payload);
  } catch (error: unknown) {
    const message =
      (error as { response?: { data?: { error?: string } } })?.response?.data
        ?.error ?? 'Login failed';
    return rejectWithValue(message);
  }
});

export const refresh = createAsyncThunk<
  Tokens,
  void,
  { rejectValue: string; state: RootState }
>('auth/refresh', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.refreshToken;

  if (!token) {
    return rejectWithValue('No refresh token');
  }

  try {
    return await authApi.refreshTokens(token);
  } catch {
    return rejectWithValue('Refresh failed');
  }
});

export const logout = createAsyncThunk<void, void, { state: RootState }>(
  'auth/logout',
  async (_, { getState }) => {
    const token = getState().auth.refreshToken;
    try {
      await authApi.logoutUser(token ?? undefined);
    } catch {
      // ігноруємо помилку бекенду — клієнт все одно виходимо
    }
  },
);

