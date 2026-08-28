import AddRecipeForm from '@features/recipes/AddRecipeForm/AddRecipeForm';
import { MainTitle, PathInfo, Subtitle } from '@shared/ui';
import css from './AddRecipePage.module.css';

export default function AddRecipePage() {
  return (
    <main className={`container ${css.page}`}>
      <PathInfo pageName="ADD RECIPE" variant="compact" />

      <MainTitle as="h1" text="ADD RECIPE" variant="large" />

      <Subtitle
        text="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us."
        variant="plain"
      />

      <AddRecipeForm />
    </main>
  );
}
