import type { RecipeListItem } from '@shared/types';
import { Button } from '@shared/ui';
import { RecipeCard } from '../RecipeCard';
import styles from './RecipeList.module.css';

interface RecipeListProps {
  recipes: RecipeListItem[];
  isLoading: boolean;
  error: string | null;
  hasActiveFilters: boolean;
  onRetry: () => void;
  onResetFilters: () => void;
}

export function RecipeList({
  recipes,
  isLoading,
  error,
  hasActiveFilters,
  onRetry,
  onResetFilters,
}: RecipeListProps) {
  if (isLoading && recipes.length === 0) {
    return (
      <p className={styles.status} role="status">
        Loading recipes…
      </p>
    );
  }

  if (error && recipes.length === 0) {
    return (
      <div className={styles.status} role="alert">
        <p>{error}</p>
        <Button type="button" variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className={styles.status}>
        <p>
          {hasActiveFilters
            ? 'No recipes match the selected filters.'
            : 'No recipes in this category yet.'}
        </p>
        {hasActiveFilters && (
          <Button type="button" variant="secondary" onClick={onResetFilters}>
            Reset filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.wrapper} data-loading={isLoading || undefined} aria-busy={isLoading}>
      {error && (
        <p className={styles.updateError} role="alert">
          {error}
        </p>
      )}
      <ul className={styles.list}>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </div>
  );
}
