import { useEffect, useState } from 'react';
import type { PopularRecipe } from '@shared/types';
import { getPopularRecipes } from '../api';
import { RecipeCard } from '../RecipeCard';
import styles from './PopularRecipes.module.css';

interface PopularRecipesProps {
  excludeId?: string;
}

const VISIBLE_RECIPE_COUNT = 4;

export const PopularRecipes = ({ excludeId }: PopularRecipesProps) => {
  const [recipes, setRecipes] = useState<PopularRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        setRecipes(
          await getPopularRecipes({
            limit: VISIBLE_RECIPE_COUNT + Number(Boolean(excludeId)),
            signal: controller.signal,
          }),
        );
      } catch {
        if (!controller.signal.aborted) setError('Unable to load popular recipes.');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void load();
    return () => controller.abort();
  }, [excludeId]);

  const visibleRecipes = (
    excludeId ? recipes.filter((recipe) => recipe.id !== excludeId) : recipes
  ).slice(0, VISIBLE_RECIPE_COUNT);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Popular recipes</h2>

      {isLoading && <p className={styles.status}>Loading popular recipes...</p>}
      {!isLoading && error && <p className={styles.status}>{error}</p>}
      {!isLoading && !error && visibleRecipes.length === 0 && (
        <p className={styles.status}>No popular recipes yet.</p>
      )}
      {!isLoading && !error && visibleRecipes.length > 0 && (
        <ul className={styles.list}>
          {visibleRecipes.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
