import { useState } from 'react';
import { Categories, type Category } from '@features/categories';
import { Hero } from '@features/home/Hero';
import { Recipes } from '@features/recipes';
import { Testimonials } from '@features/testimonials';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null | undefined>(undefined);

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
          <Recipes category={selectedCategory} onBack={showCategories} />
        )}
      </div>

      <Testimonials />
    </main>
  );
}
