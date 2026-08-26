import { MODAL_NAME, modalObserver } from '@shared/lib';
import styles from './AuthBar.module.css';

export function AuthBar() {
  return (
    <div className={styles.bar}>
      <button
        type="button"
        className={styles.signIn}
        data-testid="auth-sign-in"
        onClick={() => modalObserver.open(MODAL_NAME.signIn)}
      >
        Sign in
      </button>
      <button
        type="button"
        className={styles.signUp}
        data-testid="auth-sign-up"
        onClick={() => modalObserver.open(MODAL_NAME.signUp)}
      >
        Sign up
      </button>
    </div>
  );
}
