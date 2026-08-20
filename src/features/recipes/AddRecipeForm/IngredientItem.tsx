import type { RecipeIngredient } from '../../../types/recipe';
import css from '../../../pages/AddRecipePage/AddRecipePage.module.css';

type Props = {
  item: RecipeIngredient;
  onDelete: (id: string) => void;
};

export default function IngredientItem({ item, onDelete }: Props) {
  return (
    <li className={css.ingredientItem}>
      {item.image ? (
        <img src={item.image} alt={item.name} />
      ) : (
        <span className={css.imagePlaceholder}>?</span>
      )}

      <b>{item.name}</b>
      <span>{item.measure}</span>

      <button type="button" aria-label={`Delete ${item.name}`} onClick={() => onDelete(item.id)}>
        ×
      </button>
    </li>
  );
}
