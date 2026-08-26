import styles from './CategoriesSkeleton.module.css';

export function CategoriesSkeleton() {
  return (
    <section className={styles.section} aria-hidden>
      <div className={styles.title} />
      <div className={styles.text} />
      <div className={styles.grid}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={styles.card} />
        ))}
      </div>
    </section>
  );
}
