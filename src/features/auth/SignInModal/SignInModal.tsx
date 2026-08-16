import { SignInForm } from '@features/auth/SignInForm';
import styles from './SignInModal.module.css';

interface SignInModalProps {
  onClose: () => void;
  onSwitchToSignUp?: () => void;
}

export function SignInModal({ onClose, onSwitchToSignUp }: SignInModalProps) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Sign In</h3>

      <SignInForm onSuccess={onClose} />

      <p className={styles.footer}>
        Don&apos;t have an account?{' '}
        <button type="button" className={styles.link} onClick={onSwitchToSignUp}>
          Create an account
        </button>
      </p>
    </div>
  );
}
