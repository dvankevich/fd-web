import { useEffect, type ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { fetchAreas, selectAreas } from '@features/areas';
import { fetchCategories, selectCategories } from '@features/categories';
import { fetchIngredients, selectIngredients } from '@features/ingredients';

const hasValidItems = (items: Array<{ id: string }>): boolean =>
  items.length > 0 && items.every(({ id }) => Boolean(id));

export function InitialDataLoader({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const areas = useAppSelector(selectAreas);
  const ingredients = useAppSelector(selectIngredients);
  const hasCategories = hasValidItems(categories);
  const hasAreas = hasValidItems(areas);
  const hasIngredients = hasValidItems(ingredients);

  useEffect(() => {
    if (!hasCategories) void dispatch(fetchCategories());
    if (!hasAreas) void dispatch(fetchAreas());
    if (!hasIngredients) void dispatch(fetchIngredients());
  }, [dispatch, hasAreas, hasCategories, hasIngredients]);

  return children;
}
