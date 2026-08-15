import { Link } from 'react-router-dom';
import styles from './PathInfo.module.css';

interface PathInfoProps {
  pageName: string;
}

export function PathInfo({ pageName }: PathInfoProps) {
  return (
    <div className={styles.path}>
      <Link to="/" className={`${styles.text} ${styles.grey}`}>
        Home
      </Link>
      <span className={`${styles.text} ${styles.grey}`}>/</span>
      <span className={`${styles.text} ${styles.dark}`}>{pageName}</span>
    </div>
  );
}
