import type { ReactNode } from 'react';
import styles from './FormError.module.css';

interface FormErrorProps {
  children?: ReactNode;
}

export function FormError({ children }: FormErrorProps) {
  if (!children) {
    return null;
  }

  return (
    <p className={styles.error} role="alert">
      {children}
    </p>
  );
}
