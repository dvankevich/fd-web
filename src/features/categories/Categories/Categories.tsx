import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@app/store';
import { MainTitle, Subtitle } from '@shared/ui';
import type { Category } from '../types';
import { fetchCategories } from '../operations';
import { selectCategories, selectCategoriesError, selectCategoriesStatus } from '../selectors';
import { CategoryList } from '../CategoryList';
import styles from './Categories.module.css';

interface CategoriesProps {
  onSelectCategory?: (category: Category | null) => void;
}

export function Categories({ onSelectCategory }: CategoriesProps) {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);
  const status = useSelector(selectCategoriesStatus);
  const error = useSelector(selectCategoriesError);

  useEffect(() => {
    if (status === 'idle') void dispatch(fetchCategories());
  }, [dispatch, status]);

  return (
    <section className={styles.section} aria-labelledby="categories-title">
      <MainTitle text="Categories" className={styles.title} />
      <div id="categories-title" className="visually-hidden">
        Recipe categories
      </div>
      <Subtitle text="Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen." />
      <CategoryList
        categories={categories}
        isLoading={status === 'idle' || status === 'loading'}
        error={error}
        onSelectCategory={onSelectCategory}
      />
    </section>
  );
}
