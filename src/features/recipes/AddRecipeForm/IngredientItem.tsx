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
        <span className={css.wrapIMG}>
          {' '}
          <img src={item.image} alt={item.name} />
        </span>
      ) : (
        <span className={css.imagePlaceholder}>
          <svg width="24" height="24" aria-hidden="true">
            <use href={`${sprite}#icon-image-placeholder`} />
          </svg>
        </span>
      )}
      <div className={css.wrapIngregient}>
        <b className={css.name}>{item.name}</b>
        <span className={css.qwt}>{item.measure}</span>
      </div>

      <button type="button" aria-label={`Delete ${item.name}`} onClick={() => onDelete(item.id)}>
        <svg width="16" height="16" aria-hidden="true">
          <use href={`${sprite}#icon-close`} />
        </svg>
      </button>
    </li>
  );
}
