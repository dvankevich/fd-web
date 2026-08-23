import { useSelector } from 'react-redux';
import { MainTitle, Subtitle } from '@shared/ui';
import { selectCategories, selectCategoriesError, selectCategoriesStatus } from '../selectors';
import { CategoryList } from '../CategoryList';
import styles from './Categories.module.css';

export function Categories() {
  const categories = useSelector(selectCategories);
  const status = useSelector(selectCategoriesStatus);
  const error = useSelector(selectCategoriesError);

  return (
    <section className={styles.section} aria-labelledby="categories-title">
      <MainTitle text="Categories" className={styles.title} />
      <div id="categories-title" className="visually-hidden">
        Recipe categories
      </div>
      <Subtitle text="Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen." />
      <CategoryList categories={categories} isLoading={status === 'loading'} error={error} />
    </section>
  );
}
