import { MODAL_NAME } from '@shared/lib';
import type { ModalContentProps } from '@shared/ui';
import { AuthModalShell } from '../AuthModalShell';
import { SignUpForm } from '../SignUpForm';

export function SignUpModal({ onClose }: ModalContentProps) {
  return (
    <AuthModalShell
      title="Sign Up"
      question="I already have an account?"
      actionLabel="Sign in"
      switchTo={MODAL_NAME.signIn}
    >
      <SignUpForm onSuccess={onClose} />
    </AuthModalShell>
  );
}
