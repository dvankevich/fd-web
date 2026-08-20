import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipe, PopularRecipes, RecipeInfo, useInitializeFavoriteIds } from '@features/recipes';
import type { Recipe } from '@shared/types';
import { Button, Loader, PathInfo } from '@shared/ui';
import styles from './RecipePage.module.css';

export default function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useInitializeFavoriteIds();

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      if (!id) {
        setError('Recipe id is missing.');
        setIsLoading(false);
        return;
      }

      setRecipe(null);
      setError(null);
      setIsLoading(true);
      try {
        setRecipe(await getRecipe(id, controller.signal));
      } catch {
        if (!controller.signal.aborted) setError('Unable to load this recipe.');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void load();
    return () => controller.abort();
  }, [attempt, id]);

  return (
    <div className="container">
      <PathInfo pageName={recipe?.title ?? 'Recipe'} />

      {isLoading && <Loader />}

      {!isLoading && error && (
        <section className={styles.error}>
          <h1>Recipe unavailable</h1>
          <p>{error}</p>
          {id && (
            <Button type="button" onClick={() => setAttempt((value) => value + 1)}>
              Try again
            </Button>
          )}
        </section>
      )}

      {!isLoading && recipe && (
        <>
          <RecipeInfo recipe={recipe} />
          <PopularRecipes excludeId={recipe.id} />
        </>
      )}
    </div>
  );
}
