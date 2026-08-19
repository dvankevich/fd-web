import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthHeader } from '@shared/api/client';
import type { AuthResponse, LoginPayload, RegisterPayload, Tokens } from '@shared/types';
import type { RootState } from '@app/store';
import * as authApi from './api';
import { AUTH_MESSAGE } from './constants';
import { apiErrorMessage, isUnauthorized } from './errors';
import { sessionRefresher } from './sessionRefresher';

export const register = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: string }>(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.registerUser(payload);
    } catch (error) {
      return rejectWithValue(apiErrorMessage({ error, fallback: AUTH_MESSAGE.registerFailed }));
    }
  },
);

export const login = createAsyncThunk<AuthResponse, LoginPayload, { rejectValue: string }>(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.loginUser(payload);
    } catch (error) {
      return rejectWithValue(apiErrorMessage({ error, fallback: AUTH_MESSAGE.loginFailed }));
    }
  },
);

export const refresh = createAsyncThunk<Tokens, void, { rejectValue: string; state: RootState }>(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const { accessToken, refreshToken } = getState().auth;

    if (!refreshToken) {
      setAuthHeader(null);
      return rejectWithValue(AUTH_MESSAGE.noSession);
    }

    setAuthHeader(accessToken);

    try {
      const tokens = await sessionRefresher.run(() => getState().auth.refreshToken);
      if (!tokens) {
        setAuthHeader(null);
        return rejectWithValue(AUTH_MESSAGE.noSession);
      }
      return tokens;
    } catch (error) {
      setAuthHeader(null);
      return rejectWithValue(apiErrorMessage({ error, fallback: AUTH_MESSAGE.sessionExpired }));
    }
  },
);

export const logout = createAsyncThunk<void, void, { rejectValue: string; state: RootState }>(
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
        return rejectWithValue(apiErrorMessage({ error, fallback: AUTH_MESSAGE.logoutFailed }));
      }
      const rotated = await dispatch(refresh());
      if (!refresh.fulfilled.match(rotated)) {
        return rejectWithValue(AUTH_MESSAGE.logoutFailed);
      }
      try {
        await authApi.logoutUser(rotated.payload.refreshToken);
      } catch (retryError) {
        return rejectWithValue(
          apiErrorMessage({ error: retryError, fallback: AUTH_MESSAGE.logoutFailed }),
        );
      }
    } finally {
      sessionRefresher.forget();
      setAuthHeader(null);
    }
  },
);
