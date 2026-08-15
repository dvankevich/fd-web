import { Button } from '@shared/ui/Button';
import styles from './SignUpModal.module.css';

interface SignUpModalProps {
  onClose: () => void;
  onSwitchToSignIn?: () => void;
}

export function SignUpModal({ onClose, onSwitchToSignIn }: SignUpModalProps) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Sign Up</h3>

      {/* Тимчасова заглушка форми */}
      <p className={styles.note}>Тут буде SignUpForm (Formik + Yup)</p>

      <Button fullWidth onClick={onClose}>
        Create
      </Button>

      <p className={styles.footer}>
        I already have an account?{' '}
        <button type="button" className={styles.link} onClick={onSwitchToSignIn}>
          Sign in
        </button>
      </p>
    </div>
  );
}
