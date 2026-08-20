import { setAuthHeader } from '@shared/api/client';
import { isNonEmptyString, isRecord, isString } from '@shared/lib';
import type { Nullable, User } from '@shared/types';
import type { AppDispatch } from '@app/store/store';
import { AUTH_PERSIST } from './constants';
import { sessionRefresher } from './sessionRefresher';
import { sessionSynced, type PersistedSession } from './slice';

interface SessionSyncOptions {
  dispatch: AppDispatch;
}

const parseField = (value: unknown): unknown => {
  if (!isString(value)) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const parseToken = (value: unknown): Nullable<string> => {
  const parsed = parseField(value);
  return isNonEmptyString(parsed) ? parsed : null;
};

const parseUser = (value: unknown): Nullable<User> => {
  const parsed = parseField(value);
  if (!isRecord(parsed)) {
    return null;
  }
  const { id, name, email, avatar } = parsed;
  if (!isNonEmptyString(id) || !isString(name) || !isString(email)) {
    return null;
  }
  return { id, name, email, avatar: isString(avatar) ? avatar : null };
};

const parsePersistedSession = (raw: Nullable<string>): Nullable<PersistedSession> => {
  if (!isNonEmptyString(raw)) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return null;
    }
    const accessToken = parseToken(parsed.accessToken);
    const refreshToken = parseToken(parsed.refreshToken);
    const user = parseUser(parsed.user);
    return accessToken && refreshToken && user ? { accessToken, refreshToken, user } : null;
  } catch {
    return null;
  }
};

export function attachSessionSync({ dispatch }: SessionSyncOptions): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== AUTH_PERSIST.storageKey) {
      return;
    }
    const session = parsePersistedSession(event.newValue);
    sessionRefresher.forget();
    setAuthHeader(session?.accessToken ?? null);
    dispatch(sessionSynced(session));
  };

  window.addEventListener('storage', handleStorage);

  return () => window.removeEventListener('storage', handleStorage);
}
