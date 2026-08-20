import { fetchCategories, selectCategories } from '@features/categories';
import { fetchAreas, selectAreas } from '@features/areas';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { fetchIngredients } from '@/features/ingredients/operations';

function InitialDataLoader({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const areas = useAppSelector(selectAreas);
  const ingredients = useAppSelector((state) => state.ingredients.items);

  useEffect(() => {
    if (!categories.length) void dispatch(fetchCategories());
    if (!areas.length) void dispatch(fetchAreas());
    if (!ingredients.length) void dispatch(fetchIngredients());
  }, [dispatch, categories.length, areas.length, ingredients.length]);

  return children;
}

export default InitialDataLoader;
