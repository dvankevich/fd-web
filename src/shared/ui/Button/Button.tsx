import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@shared/lib';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'onDark';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[variant], fullWidth && styles.fullWidth, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
