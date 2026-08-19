export const MODAL_NAME = {
  signIn: 'sign-in',
  signUp: 'sign-up',
  logOut: 'log-out',
} as const;

export type ModalName = (typeof MODAL_NAME)[keyof typeof MODAL_NAME];
