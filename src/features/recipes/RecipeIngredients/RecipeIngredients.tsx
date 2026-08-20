import type { RecipeIngredient } from '@shared/types';
import ingredientPlaceholder from '@/assets/recipe-placeholder.svg';
import styles from './RecipeIngredients.module.css';

interface RecipeIngredientsProps {
  ingredients: RecipeIngredient[];
}

export const RecipeIngredients = ({ ingredients }: RecipeIngredientsProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Ingredients</h2>

      {ingredients.length ? (
        <ul className={styles.list}>
          {ingredients.map((ingredient) => (
            <li className={styles.item} key={ingredient.id}>
              <img
                className={styles.image}
                src={ingredient.img ?? ingredientPlaceholder}
                alt=""
                loading="lazy"
              />
              <div className={styles.meta}>
                <h3 className={styles.name}>{ingredient.name}</h3>
                <p className={styles.measure}>{ingredient.measure || 'To taste'}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Ingredients are not specified.</p>
      )}
    </section>
  );
};
