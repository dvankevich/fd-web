import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthResponse, Nullable, Optional, Tokens, User } from '@shared/types';
import { AUTH_MESSAGE } from './constants';
import { login, logout, refresh, register } from './operations';

interface AuthState {
  user: Nullable<User>;
  accessToken: Nullable<string>;
  refreshToken: Nullable<string>;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isRestored: boolean;
  isLoading: boolean;
  error: Nullable<string>;
}

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

const failRequest = (state: AuthState, { payload }: PayloadAction<Optional<string>>) => {
  state.isLoading = false;
  state.error = payload ?? AUTH_MESSAGE.requestFailed;
};

const storeTokens = (state: AuthState, tokens: Tokens) => {
  state.accessToken = tokens.accessToken;
  state.refreshToken = tokens.refreshToken;
  state.isLoggedIn = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    sessionSynced(state, { payload }: PayloadAction<Nullable<Tokens>>) {
      if (payload) {
        storeTokens(state, payload);
        return;
      }
      clearSession(state);
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
      .addCase(refresh.rejected, (state) => {
        clearSession(state);
        state.isRefreshing = false;
        state.isRestored = true;
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
