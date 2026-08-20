import type { Recipe } from '@shared/types';
import { RecipeIngredients } from '../RecipeIngredients';
import { RecipeMainInfo } from '../RecipeMainInfo';
import { RecipePreparation } from '../RecipePreparation';

interface RecipeInfoProps {
  recipe: Recipe;
}

export const RecipeInfo = ({ recipe }: RecipeInfoProps) => {
  return (
    <RecipeMainInfo recipe={recipe}>
      <RecipeIngredients ingredients={recipe.ingredients} />
      <RecipePreparation recipeId={recipe.id} instructions={recipe.instructions} />
    </RecipeMainInfo>
  );
};
