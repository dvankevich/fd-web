import { Link } from 'react-router-dom';
import { ROUTE } from '@shared/lib';
import { getScaledCloudinaryUrl } from '@shared/lib/cloudinary';
import type { Category } from '../types';
import styles from './CategoryList.module.css';

interface CategoryListProps {
  categories: Category[];
  isLoading?: boolean;
  error?: string | null;
}

export function CategoryList({ categories, isLoading = false, error = null }: CategoryListProps) {
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
          <Link
            className={styles.card}
            to={`${ROUTE.recipes}?category=${encodeURIComponent(category.name)}`}
            aria-label={`View ${category.name} recipes`}
          >
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={getScaledCloudinaryUrl(category.image, { height: 250, quality: 75 })}
              />
              <img
                className={styles.image}
                src={getScaledCloudinaryUrl(category.image, { height: 369, quality: 75 })}
                alt=""
                loading="lazy"
              />
            </picture>

            <span className={styles.overlay} aria-hidden="true" />
            <span className={styles.meta}>
              <span className={styles.label}>
                {category.name === 'Dessert' ? 'Desserts' : category.name}
              </span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </span>
          </Link>
        </li>
      ))}
      <li className={`${styles.item} ${styles.allItem}`}>
        <Link className={`${styles.card} ${styles.allCard}`} to={ROUTE.recipes}>
          <span className={styles.allLabel}>All categories</span>
        </Link>
      </li>
    </ul>
  );
}
