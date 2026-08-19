import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MODAL_NAME, modalObserver } from '@shared/lib';
import type { ModalContentProps } from '@shared/ui';
import type { AppDispatch } from '@app/store';
import { SignInForm } from '../SignInForm';
import { clearError } from '../slice';
import styles from './SignInModal.module.css';

export function SignInModal({ onClose }: ModalContentProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const switchToSignUp = () => {
    dispatch(clearError());
    modalObserver.open(MODAL_NAME.signUp);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Sign In</h3>

      <SignInForm onSuccess={onClose} />

      <p className={styles.footer}>
        Don&apos;t have an account?{' '}
        <button type="button" className={styles.link} onClick={switchToSignUp}>
          Create an account
        </button>
      </p>
    </div>
  );
}
