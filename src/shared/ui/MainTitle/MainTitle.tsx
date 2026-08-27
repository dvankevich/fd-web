import { cn } from '@shared/lib';
import styles from './MainTitle.module.css';

interface MainTitleProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2';
  variant?: 'default' | 'large';
}

export function MainTitle({
  text,
  className,
  as: Title = 'h2',
  variant = 'default',
}: MainTitleProps) {
  return <Title className={cn(styles.title, styles[variant], className)}>{text}</Title>;
}
