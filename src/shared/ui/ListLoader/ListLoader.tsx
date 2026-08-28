import styles from './ListLoader.module.css';

interface ListLoaderProps {
  label?: string;
}

export function ListLoader({ label = 'Loading' }: ListLoaderProps) {
  return (
    <div className={styles.wrap} role="status" aria-label={label}>
      <div className={styles.spinner} />
    </div>
  );
}
