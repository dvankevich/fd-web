import { Link } from 'react-router-dom';
import { cn } from '@shared/lib';
import styles from './PathInfo.module.css';

interface PathInfoProps {
  pageName: string;
  variant?: 'default' | 'compact';
}

export function PathInfo({ pageName, variant = 'default' }: PathInfoProps) {
  return (
    <div className={cn(styles.path, styles[variant])}>
      <Link to="/" className={`${styles.text} ${styles.grey}`}>
        Home
      </Link>
      <span className={`${styles.text} ${styles.grey}`}>/</span>
      <span className={cn(styles.text, styles.dark, styles.current)}>{pageName}</span>
    </div>
  );
}
