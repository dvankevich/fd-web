import type { ReactNode } from 'react';
import { cn } from '@shared/lib';
import styles from './FormError.module.css';

interface FormErrorProps {
  children?: ReactNode;
  variant?: 'default' | 'compact';
  as?: 'p' | 'span';
  id?: string;
}

export function FormError({
  children,
  variant = 'default',
  as: ErrorText = 'p',
  id,
}: FormErrorProps) {
  if (!children) {
    return null;
  }

  return (
    <ErrorText id={id} className={cn(styles.error, styles[variant])} role="alert">
      {children}
    </ErrorText>
  );
}
