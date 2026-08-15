import styles from './Loader.module.css';

export function Loader() {
  return (
    <div className={styles.overlay} role="status" aria-label="Loading">
      <div className={styles.spinner} />
    </div>
  );
}
