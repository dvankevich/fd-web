import type { ReactNode } from 'react';
import { cn } from '@shared/lib';
import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return <h2 className={cn(styles.title, className)}>{children}</h2>;
}
