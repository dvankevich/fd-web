import { useState } from 'react';
import { Categories, type Category } from '@features/categories';
import { Hero } from '@features/home/Hero';
import { Testimonials } from '@features/testimonials';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>();

  const showRecipes = (category: Category | null) => {
    setSelectedCategory(category);
  };

  const showCategories = () => {
    setSelectedCategory(undefined);
  };

  return (
    <main>
      <Hero />

      <div className="container">
        {selectedCategory === undefined ? (
          <Categories onSelectCategory={showRecipes} />
        ) : (
          <section className={styles.recipes} aria-live="polite">
            <button className={styles.back} type="button" onClick={showCategories}>
              ← Back
            </button>
            <h2 className={styles.title}>{selectedCategory?.name ?? 'All categories'}</h2>
            <p className={styles.notice}>
              Recipes will appear here after the Recipes feature is connected.
            </p>
          </section>
        )}
      </div>

      <Testimonials />
    </main>
  );
}
