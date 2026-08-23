import sprite from '@/assets/icons.svg';
import styles from './RecipePagination.module.css';

interface RecipePaginationProps {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}

type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';

const getPaginationItems = (page: number, pageCount: number): PaginationItem[] => {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis-end', pageCount];
  }

  if (page >= pageCount - 3) {
    return [
      1,
      'ellipsis-start',
      pageCount - 4,
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ];
  }

  return [1, 'ellipsis-start', page - 1, page, page + 1, 'ellipsis-end', pageCount];
};

const isMobilePageVisible = (item: PaginationItem, page: number, pageCount: number): boolean => {
  if (typeof item !== 'number') return false;
  if (pageCount <= 3) return true;

  const firstVisiblePage = Math.min(Math.max(page - 1, 1), pageCount - 2);
  return item >= firstVisiblePage && item <= firstVisiblePage + 2;
};

export function RecipePagination({ page, total, limit, onChange }: RecipePaginationProps) {
  const pageCount = Math.ceil(total / limit);

  if (pageCount <= 1) return null;

  return (
    <nav className={styles.pagination}>
      <button
        className={styles.control}
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        <svg className={styles.previousIcon} width="18" height="18" aria-hidden="true">
          <use href={`${sprite}#icon-chevron-down`} />
        </svg>
        <span className="visually-hidden">Previous page</span>
      </button>

      {getPaginationItems(page, pageCount).map((item) =>
        typeof item === 'number' ? (
          <button
            className={
              isMobilePageVisible(item, page, pageCount)
                ? styles.page
                : `${styles.page} ${styles.mobileHidden}`
            }
            type="button"
            disabled={item === page}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onChange(item)}
            key={item}
          >
            {item}
          </button>
        ) : (
          <span
            className={`${styles.ellipsis} ${styles.mobileHidden}`}
            aria-hidden="true"
            key={item}
          >
            …
          </span>
        ),
      )}

      <button
        className={styles.control}
        type="button"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
      >
        <svg className={styles.nextIcon} width="18" height="18" aria-hidden="true">
          <use href={`${sprite}#icon-chevron-down`} />
        </svg>
        <span className="visually-hidden">Next page</span>
      </button>
    </nav>
  );
}
