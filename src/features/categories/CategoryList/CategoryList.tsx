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
              {/* Desktop: від 1440px -> 590x369 */}
              <source
                media="(min-width: 1440px)"
                srcSet={getScaledCloudinaryUrl(category.image, { width: 590, height: 369 })}
              />
              {/* Tablet: від 768px до 1439px -> 704x369 */}
              <source
                media="(min-width: 768px)"
                srcSet={getScaledCloudinaryUrl(category.image, { width: 704, height: 369 })}
              />
              {/* Mobile (за замовчуванням): до 767px -> 343x250 */}
              <img
                className={styles.image}
                src={getScaledCloudinaryUrl(category.image, { width: 343, height: 250 })}
                alt=""
                loading="lazy"
                width={343}
                height={250}
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
