import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAppDispatch } from '@app/store/hooks';
import { fetchCategories } from '@features/categories';
import { fetchAreas } from '@features/areas';
import { fetchIngredients } from '@/features/ingredients';

function InitialDataLoader({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchCategories());
    void dispatch(fetchAreas());
    void dispatch(fetchIngredients());
  }, [dispatch]);

  return children;
}

export default InitialDataLoader;
