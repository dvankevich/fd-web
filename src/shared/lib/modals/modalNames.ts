import type { ValueOf } from '@shared/types';

export const MODAL_NAME = {
  signIn: 'sign-in',
  signUp: 'sign-up',
  logOut: 'log-out',
} as const;

export type ModalName = ValueOf<typeof MODAL_NAME>;
