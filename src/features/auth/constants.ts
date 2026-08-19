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

export const AUTH_STATUS = {
  unauthorized: 401,
  serverError: 500,
} as const;

export const AUTH_PERSIST = {
  key: 'auth',
  storageKey: 'persist:auth',
  lockName: 'foodies-session-refresh',
} as const;

export const AUTH_FIELD_LIMIT = {
  nameMax: 100,
  emailMax: 254,
  passwordMin: 8,
  passwordMaxBytes: 72,
} as const;
