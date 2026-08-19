import { useEffect, type ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { modalObserver, type ModalName } from '@shared/lib';
import type { AppDispatch } from '@app/store/store';
import { clearError } from '../slice';
import styles from './AuthModalShell.module.css';

interface AuthModalShellProps {
  title: string;
  question: string;
  actionLabel: string;
  switchTo: ModalName;
  children: ReactNode;
}

export function AuthModalShell({
  title,
  question,
  actionLabel,
  switchTo,
  children,
}: AuthModalShellProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSwitch = () => {
    dispatch(clearError());
    modalObserver.open(switchTo);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>

      {children}

      <p className={styles.footer}>
        {question}{' '}
        <button type="button" className={styles.link} onClick={handleSwitch}>
          {actionLabel}
        </button>
      </p>
    </div>
  );
}
