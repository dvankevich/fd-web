import { cn } from '@shared/lib';
import styles from './Subtitle.module.css';

interface SubtitleProps {
  text: string;
  className?: string;
  variant?: 'default' | 'plain';
}

export function Subtitle({ text, className, variant = 'default' }: SubtitleProps) {
  return <p className={cn(styles.subtitle, styles[variant], className)}>{text}</p>;
}
