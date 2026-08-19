import { lazy } from 'react';
import { MODAL_NAME, type ModalName } from '@shared/lib';
import type { ModalComponent } from '@shared/ui';

const SignInModal = lazy(() =>
  import('./SignInModal').then((module) => ({ default: module.SignInModal })),
);

const SignUpModal = lazy(() =>
  import('./SignUpModal').then((module) => ({ default: module.SignUpModal })),
);

const LogOutModal = lazy(() =>
  import('./LogOutModal').then((module) => ({ default: module.LogOutModal })),
);

export const AUTH_MODALS = {
  [MODAL_NAME.signIn]: SignInModal,
  [MODAL_NAME.signUp]: SignUpModal,
  [MODAL_NAME.logOut]: LogOutModal,
} satisfies Partial<Record<ModalName, ModalComponent>>;
