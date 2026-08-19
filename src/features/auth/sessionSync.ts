import { setAuthHeader } from '@shared/api/client';
import { isNonEmptyString, isRecord, isString } from '@shared/lib';
import type { Tokens } from '@shared/types';
import type { AppDispatch } from '@app/store';
import { AUTH_PERSIST } from './constants';
import { sessionRefresher } from './sessionRefresher';
import { sessionSynced } from './slice';

interface SessionSyncOptions {
  dispatch: AppDispatch;
}

const parsePersistedField = (value: unknown): string | null => {
  if (!isString(value)) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(value);
    return isNonEmptyString(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const parsePersistedTokens = (raw: string | null): Tokens | null => {
  if (!isNonEmptyString(raw)) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return null;
    }
    const accessToken = parsePersistedField(parsed.accessToken);
    const refreshToken = parsePersistedField(parsed.refreshToken);
    return accessToken && refreshToken ? { accessToken, refreshToken } : null;
  } catch {
    return null;
  }
};

export function attachSessionSync({ dispatch }: SessionSyncOptions): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== AUTH_PERSIST.storageKey) {
      return;
    }
    const tokens = parsePersistedTokens(event.newValue);
    sessionRefresher.forget();
    setAuthHeader(tokens?.accessToken ?? null);
    dispatch(sessionSynced(tokens));
  };

  window.addEventListener('storage', handleStorage);

  return () => window.removeEventListener('storage', handleStorage);
}
