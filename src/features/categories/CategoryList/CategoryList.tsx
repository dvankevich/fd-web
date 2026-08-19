import type { Category } from '../types';
import styles from './CategoryList.module.css';

interface CategoryListProps {
  categories: Category[];
  isLoading?: boolean;
  error?: string | null;
  onSelectCategory?: (category: Category | null) => void;
}

export function CategoryList({
  categories,
  isLoading = false,
  error = null,
  onSelectCategory,
}: CategoryListProps) {
  if (isLoading) {
    return (
      <div className={styles.status} role="status">
        Loading categories…
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.status} role="alert">
        {error}
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {categories.map((category) => (
        <li className={styles.item} key={category.id}>
          <button
            className={styles.card}
            type="button"
            onClick={() => onSelectCategory?.(category)}
            aria-label={`View ${category.name} recipes`}
          >
            <img className={styles.image} src={category.image} alt="" loading="lazy" />
            <span className={styles.overlay} aria-hidden="true" />
            <span className={styles.meta}>
              <span className={styles.label}>
                {category.name === 'Dessert' ? 'Desserts' : category.name}
              </span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </span>
          </button>
        </li>
      ))}
      <li className={`${styles.item} ${styles.allItem}`}>
        <button
          className={`${styles.card} ${styles.allCard}`}
          type="button"
          onClick={() => onSelectCategory?.(null)}
        >
          <span className={styles.allLabel}>All categories</span>
        </button>
      </li>
    </ul>
  );
}
