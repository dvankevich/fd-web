import type { RecipeIngredient } from '../../../types/recipe';
import sprite from '@/assets/icons.svg';
import css from './IngredientItem.module.css';

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
        <span className={css.imagePlaceholder}>
          <svg width="24" height="24" aria-hidden="true">
            <use href={`${sprite}#icon-image-placeholder`} />
          </svg>
        </span>
      )}

      <b>{item.name}</b>
      <span>{item.measure}</span>

      <button type="button" aria-label={`Delete ${item.name}`} onClick={() => onDelete(item.id)}>
        <svg width="20" height="20" aria-hidden="true">
          <use href={`${sprite}#icon-close`} />
        </svg>
      </button>
    </li>
  );
}
