import { useState } from 'react';
// import { Button } from '@shared/ui/Button';
import { Modal } from '@shared/ui/Modal';
import { SignInModal } from '@features/auth/SignInModal';
import { SignUpModal } from '@features/auth/SignUpModal';
import styles from './AuthBar.module.css';

type ModalType = 'signin' | 'signup' | null;

export function AuthBar() {
  const [modal, setModal] = useState<ModalType>(null);

  const close = () => setModal(null);

  return (
    <div className={styles.bar}>
      <button
        type="button"
        className={styles.signIn}
        onClick={() => setModal('signin')}
      >
        Sign in
      </button>
      <button
        type="button"
        className={styles.signUp}
        onClick={() => setModal('signup')}
      >
        Sign up
      </button>

      <Modal isOpen={modal === 'signin'} onClose={close}>
        <SignInModal
          onClose={close}
          onSwitchToSignUp={() => setModal('signup')}
        />
      </Modal>

      <Modal isOpen={modal === 'signup'} onClose={close}>
        <SignUpModal
          onClose={close}
          onSwitchToSignIn={() => setModal('signin')}
        />
      </Modal>
    </div>
  );
}
