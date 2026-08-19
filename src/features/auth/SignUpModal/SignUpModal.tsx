import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MODAL_NAME, modalObserver } from '@shared/lib';
import type { ModalContentProps } from '@shared/ui';
import type { AppDispatch } from '@app/store';
import { SignUpForm } from '../SignUpForm';
import { clearError } from '../slice';
import styles from './SignUpModal.module.css';

export function SignUpModal({ onClose }: ModalContentProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const switchToSignIn = () => {
    dispatch(clearError());
    modalObserver.open(MODAL_NAME.signIn);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Sign Up</h3>

      <SignUpForm onSuccess={onClose} />

      <p className={styles.footer}>
        I already have an account?{' '}
        <button type="button" className={styles.link} onClick={switchToSignIn}>
          Sign in
        </button>
      </p>
    </div>
  );
}
