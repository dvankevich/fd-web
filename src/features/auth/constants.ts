const SLICE_NAME = 'auth';
const PERSIST_PREFIX = 'persist:';

export const AUTH_SLICE = {
  name: SLICE_NAME,
  register: `${SLICE_NAME}/register`,
  login: `${SLICE_NAME}/login`,
  refresh: `${SLICE_NAME}/refresh`,
  logout: `${SLICE_NAME}/logout`,
} as const;

export const AUTH_ENDPOINT = {
  register: '/auth/register',
  login: '/auth/login',
  refresh: '/auth/refresh',
  logout: '/auth/logout',
} as const;

export const AUTH_MESSAGE = {
  requestFailed: 'Request failed',
  registerFailed: 'Registration failed',
  loginFailed: 'Login failed',
  logoutFailed: 'Logout failed',
  sessionExpired: 'Session expired, please sign in again',
  noSession: 'No stored session',
} as const;

export const AUTH_PERSIST = {
  key: SLICE_NAME,
  storageKey: `${PERSIST_PREFIX}${SLICE_NAME}`,
  lockName: 'foodies-session-refresh',
} as const;

export const AUTH_FIELD_LIMIT = {
  nameMaxChars: 100,
  emailMaxChars: 254,
  passwordMinChars: 8,
  passwordMaxBytes: 72,
} as const;
