import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthResponse, Nullable, Optional, Tokens, User } from '@shared/types';
import { HTTP_STATUS } from '@shared/lib';
import { AUTH_MESSAGE, AUTH_SLICE } from './constants';
import type { ApiError } from './errors';
import { login, logout, refresh, register } from './operations';

export interface AuthState {
  user: Nullable<User>;
  accessToken: Nullable<string>;
  refreshToken: Nullable<string>;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isRestored: boolean;
  isLoading: boolean;
  error: Nullable<string>;
}

export interface PersistedSession extends Tokens {
  user: User;
}

export const AUTH_PERSISTED_KEYS = [
  'accessToken',
  'refreshToken',
  'user',
  'isLoggedIn',
] as const satisfies readonly (keyof AuthState)[];

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: true,
  isRestored: false,
  isLoading: false,
  error: null,
};

const clearSession = (state: AuthState) => {
  state.user = null;
  state.accessToken = null;
  state.refreshToken = null;
  state.isLoggedIn = false;
  state.isLoading = false;
};

const startRequest = (state: AuthState) => {
  state.isLoading = true;
  state.error = null;
};

const storeSession = (state: AuthState, { payload }: PayloadAction<AuthResponse>) => {
  state.user = payload.user;
  state.accessToken = payload.accessToken;
  state.refreshToken = payload.refreshToken;
  state.isLoggedIn = true;
  state.isLoading = false;
};

const failRequest = (state: AuthState, { payload }: PayloadAction<Optional<ApiError>>) => {
  state.isLoading = false;
  state.error = payload?.message ?? AUTH_MESSAGE.requestFailed;
};

const isSessionRejected = (error: Optional<ApiError>): boolean =>
  error?.status !== undefined && error.status < HTTP_STATUS.serverErrorMin;

const storeTokens = (state: AuthState, tokens: Tokens) => {
  state.accessToken = tokens.accessToken;
  state.refreshToken = tokens.refreshToken;
  state.isLoggedIn = true;
};

const authSlice = createSlice({
  name: AUTH_SLICE.name,
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    sessionSynced(state, { payload }: PayloadAction<Nullable<PersistedSession>>) {
      state.isRestored = true;
      if (!payload) {
        clearSession(state);
        return;
      }
      storeTokens(state, payload);
      state.user = payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, startRequest)
      .addCase(register.fulfilled, storeSession)
      .addCase(register.rejected, failRequest)

      .addCase(login.pending, startRequest)
      .addCase(login.fulfilled, storeSession)
      .addCase(login.rejected, failRequest)

      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        storeTokens(state, payload);
        state.isRefreshing = false;
        state.isRestored = true;
      })
      .addCase(refresh.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.isRestored = true;
        if (isSessionRejected(payload) || !state.refreshToken) {
          clearSession(state);
        }
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, clearSession)
      .addCase(logout.rejected, clearSession);
  },
});

export const { clearError, sessionSynced } = authSlice.actions;
export const authReducer = authSlice.reducer;
