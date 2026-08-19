import PathInfo from '../../components/PathInfo/PathInfo';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import AddRecipeForm from '../../features/recipes/AddRecipeForm/AddRecipeForm';
import css from './AddRecipePage.module.css';

export default function AddRecipePage() {
  return (
    <main className={css.page}>
      <PathInfo pageName="ADD RECIPE" />

      <MainTitle>ADD RECIPE</MainTitle>

      <Subtitle>
        Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
        with us.
      </Subtitle>

      <AddRecipeForm />
    </main>
  );
}
