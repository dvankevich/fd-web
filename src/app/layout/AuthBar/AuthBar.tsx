import { useState } from 'react';

import { MODAL_NAME, modalObserver } from '@shared/lib';

import styles from './AuthBar.module.css';

export function AuthBar() {
  const [active, setActive] = useState<'signIn' | 'signUp'>('signUp');
  const [hovered, setHovered] = useState<'signIn' | 'signUp' | null>(null);

  const handleSignIn = () => {
    setActive('signIn');
    modalObserver.open(MODAL_NAME.signIn);
  };

  const handleSignUp = () => {
    setActive('signUp');
    modalObserver.open(MODAL_NAME.signUp);
  };

  return (
    <div className={styles.bar}>
      <button
        type="button"
        className={`${styles.signIn} ${
          active === 'signIn' ? styles.active : ''
        } ${hovered === 'signIn' ? styles.hovered : ''}`}
        onClick={handleSignIn}
        onMouseEnter={() => setHovered('signIn')}
        onMouseLeave={() => setHovered(null)}
      >
        Sign in
      </button>

      <button
        type="button"
        className={`${styles.signUp} ${
          active === 'signUp' ? styles.active : ''
        } ${hovered === 'signUp' ? styles.hovered : ''}`}
        onClick={handleSignUp}
        onMouseEnter={() => setHovered('signUp')}
        onMouseLeave={() => setHovered(null)}
      >
        Sign up
      </button>
    </div>
  );
}