import type { ReactNode } from 'react';
import { cn } from '@shared/lib';
import styles from './FieldLabel.module.css';

interface FieldLabelProps {
  children: ReactNode;
  className?: string;
  as?: 'p' | 'span';
}

export function FieldLabel({ children, className, as: Label = 'p' }: FieldLabelProps) {
  return <Label className={cn(styles.label, className)}>{children}</Label>;
}
