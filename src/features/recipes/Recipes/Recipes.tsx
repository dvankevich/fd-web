import { useEffect, useRef, useState } from 'react';
import { useNavigationType } from 'react-router-dom';
import { isAxiosError } from 'axios';
import type { Category } from '@features/categories';
import type { Paginated, RecipeListItem } from '@shared/types';
import { MainTitle, Subtitle } from '@shared/ui';
import sprite from '@/assets/icons.svg';
import { getRecipes } from '../api';
import { RecipeFilters } from '../RecipeFilters';
import { RecipeList } from '../RecipeList';
import { RecipePagination } from '../RecipePagination';
import { useInitializeFavoriteIds } from '../useRecipeFavorite';
import styles from './Recipes.module.css';

interface RecipesProps {
  category: Category | null;
  onBack: () => void;
}

const MOBILE_PAGE_LIMIT = 8;
const TABLET_PAGE_LIMIT = 12;
const TABLET_MEDIA_QUERY = '(min-width: 768px)';

const emptyPage = (limit: number): Paginated<RecipeListItem> => ({
  data: [],
  total: 0,
  page: 1,
  limit,
});

const usePageLimit = (): number => {
  const [limit, setLimit] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(TABLET_MEDIA_QUERY).matches
      ? TABLET_PAGE_LIMIT
      : MOBILE_PAGE_LIMIT,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(TABLET_MEDIA_QUERY);
    const updateLimit = () => {
      setLimit(mediaQuery.matches ? TABLET_PAGE_LIMIT : MOBILE_PAGE_LIMIT);
    };

    mediaQuery.addEventListener('change', updateLimit);
    return () => mediaQuery.removeEventListener('change', updateLimit);
  }, []);

  return limit;
};

const categoryTitle = (category: Category | null): string => {
  if (!category) return 'All categories';
  return category.name === 'Dessert' ? 'Desserts' : category.name;
};

const getRecipesErrorMessage = (error: unknown): string => {
  if (isAxiosError<{ error?: unknown }>(error) && typeof error.response?.data.error === 'string') {
    return error.response.data.error;
  }

  return 'Unable to load recipes.';
};

export function Recipes({ category, onBack }: RecipesProps) {
  const navType = useNavigationType();
  const sectionRef = useRef<HTMLElement>(null);
  const shouldScrollAfterLoadRef = useRef(false);
  const limit = usePageLimit();
  const [page, setPage] = useState(1);
  const [area, setArea] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState<Paginated<RecipeListItem>>(() => emptyPage(limit));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useInitializeFavoriteIds();

  useEffect(() => {
    if ((navType === 'PUSH' || navType === 'REPLACE') && sectionRef.current) {
      const topPosition = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: topPosition, behavior: 'instant' });
    }
  }, [navType]);

  useEffect(() => {
    const controller = new AbortController();

    const loadRecipes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getRecipes({
          category: category?.name,
          area: area || undefined,
          ingredient: ingredient || undefined,
          page,
          limit,
          signal: controller.signal,
        });

        const pageCount = Math.max(1, Math.ceil(response.total / response.limit));
        if (response.page > pageCount) {
          setPage(pageCount);
          return;
        }

        setRecipes(response);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          const message = getRecipesErrorMessage(requestError);
          setError(message);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void loadRecipes();
    return () => controller.abort();
  }, [area, category?.name, ingredient, limit, page, retryKey]);

  useEffect(() => {
    if (!shouldScrollAfterLoadRef.current) return;

    shouldScrollAfterLoadRef.current = false;
    const animationFrame = window.requestAnimationFrame(() => {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth';
      sectionRef.current?.scrollIntoView({ behavior, block: 'start' });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [recipes]);

  const changeArea = (value: string) => {
    setArea(value);
    setPage(1);
  };

  const changeIngredient = (value: string) => {
    setIngredient(value);
    setPage(1);
  };

  const resetFilters = () => {
    setArea('');
    setIngredient('');
    setPage(1);
  };

  const changePage = (nextPage: number) => {
    shouldScrollAfterLoadRef.current = true;
    setPage(nextPage);
  };

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.heading}>
        <button className={styles.back} type="button" onClick={onBack}>
          <svg width="18" height="18" aria-hidden="true">
            <use href={`${sprite}#icon-arrow-left`} />
          </svg>
          Back
        </button>
        <MainTitle text={categoryTitle(category)} className={styles.title} />
        <Subtitle
          text={
            category?.description ??
            'Explore our collection of delicious recipes and find inspiration for your next meal.'
          }
          className={styles.description}
        />
      </div>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <RecipeFilters
            area={area}
            ingredient={ingredient}
            onAreaChange={changeArea}
            onIngredientChange={changeIngredient}
          />
        </aside>

        <div className={styles.results}>
          <RecipeList
            recipes={recipes.data}
            isLoading={isLoading}
            error={error}
            hasActiveFilters={Boolean(area || ingredient)}
            onRetry={() => setRetryKey((key) => key + 1)}
            onResetFilters={resetFilters}
          />
          {!error && (
            <RecipePagination
              page={recipes.page}
              total={recipes.total}
              limit={recipes.limit}
              onChange={changePage}
            />
          )}
        </div>
      </div>
    </section>
  );
}
