import { Button } from '@shared/ui/Button';
import styles from './SignInModal.module.css';

interface SignInModalProps {
  onClose: () => void;
  onSwitchToSignUp?: () => void;
}

export function SignInModal({ onClose, onSwitchToSignUp }: SignInModalProps) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Sign In</h3>

      {/* Тимчасова заглушка форми */}
      <p className={styles.note}>Тут буде SignInForm (Formik + Yup)</p>

      <Button fullWidth onClick={onClose}>
        Sign in
      </Button>

      <p className={styles.footer}>
        Don&apos;t have an account?{' '}
        <button type="button" className={styles.link} onClick={onSwitchToSignUp}>
          Create an account
        </button>
      </p>
    </div>
  );
}
