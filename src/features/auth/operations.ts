import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthHeader } from '@shared/api/client';
import type { AuthResponse, LoginPayload, RegisterPayload, Tokens } from '@shared/types';
import type { RootState } from '@app/store';
import * as authApi from './api';
import { AUTH_MESSAGE } from './constants';
import { isUnauthorized, toApiError, type ApiError } from './errors';
import { sessionRefresher } from './sessionRefresher';

export const register = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: ApiError }>(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.registerUser(payload);
    } catch (error) {
      return rejectWithValue(toApiError({ error, fallback: AUTH_MESSAGE.registerFailed }));
    }
  },
);

export const login = createAsyncThunk<AuthResponse, LoginPayload, { rejectValue: ApiError }>(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.loginUser(payload);
    } catch (error) {
      return rejectWithValue(toApiError({ error, fallback: AUTH_MESSAGE.loginFailed }));
    }
  },
);

export const refresh = createAsyncThunk<Tokens, void, { rejectValue: ApiError; state: RootState }>(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const { accessToken, refreshToken } = getState().auth;

    if (!refreshToken) {
      setAuthHeader(null);
      return rejectWithValue({ message: AUTH_MESSAGE.noSession, fields: {} });
    }

    setAuthHeader(accessToken);

    try {
      const tokens = await sessionRefresher.run(() => getState().auth.refreshToken);
      if (!tokens) {
        setAuthHeader(null);
        return rejectWithValue({ message: AUTH_MESSAGE.noSession, fields: {} });
      }
      return tokens;
    } catch (error) {
      setAuthHeader(null);
      return rejectWithValue(toApiError({ error, fallback: AUTH_MESSAGE.sessionExpired }));
    }
  },
);

export const logout = createAsyncThunk<void, void, { rejectValue: ApiError; state: RootState }>(
  'auth/logout',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { refreshToken } = getState().auth;

    try {
      if (!refreshToken) {
        return;
      }
      await authApi.logoutUser(refreshToken);
    } catch (error) {
      if (!isUnauthorized(error)) {
        return rejectWithValue(toApiError({ error, fallback: AUTH_MESSAGE.logoutFailed }));
      }
      const rotated = await dispatch(refresh());
      if (!refresh.fulfilled.match(rotated)) {
        return rejectWithValue({ message: AUTH_MESSAGE.logoutFailed, fields: {} });
      }
      try {
        await authApi.logoutUser(rotated.payload.refreshToken);
      } catch (retryError) {
        return rejectWithValue(
          toApiError({ error: retryError, fallback: AUTH_MESSAGE.logoutFailed }),
        );
      }
    } finally {
      sessionRefresher.forget();
      setAuthHeader(null);
    }
  },
);
