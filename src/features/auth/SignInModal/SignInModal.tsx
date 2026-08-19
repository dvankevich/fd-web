import { MODAL_NAME } from '@shared/lib';
import type { ModalContentProps } from '@shared/ui';
import { AuthModalShell } from '../AuthModalShell';
import { SignInForm } from '../SignInForm';

export function SignInModal({ onClose }: ModalContentProps) {
  return (
    <AuthModalShell
      title="Sign In"
      question="Don't have an account?"
      actionLabel="Create an account"
      switchTo={MODAL_NAME.signUp}
    >
      <SignInForm onSuccess={onClose} />
    </AuthModalShell>
  );
}
