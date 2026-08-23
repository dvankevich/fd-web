import { Link } from 'react-router-dom';
import { buildPath, cn, ROUTE } from '@shared/lib';
import type { RecipeListItem } from '@shared/types';
import recipePlaceholder from '@/assets/recipe-placeholder.svg';
import userPlaceholder from '@/assets/user-placeholder.svg';
import sprite from '@/assets/icons.svg';
import { useAuthorProfile } from '../useAuthorProfile';
import { useRecipeFavorite } from '../useRecipeFavorite';
import styles from './RecipeCard.module.css';

interface RecipeCardProps {
  recipe: RecipeListItem;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { isFavorite, isDisabled, toggle } = useRecipeFavorite(recipe.id);
  const openAuthorProfile = useAuthorProfile(recipe.owner.id);
  const recipePath = buildPath(ROUTE.recipe, { id: recipe.id });

  return (
    <article className={styles.card}>
      <Link className={styles.imageLink} to={recipePath}>
        <img
          className={styles.image}
          src={recipe.preview ?? recipe.thumb ?? recipePlaceholder}
          alt={recipe.title}
          loading="lazy"
        />
      </Link>

      <h3 className={styles.title}>
        <Link to={recipePath}>{recipe.title}</Link>
      </h3>

      <p className={styles.description}>
        {recipe.description && <Link to={recipePath}>{recipe.description}</Link>}
      </p>

      <div className={styles.footer}>
        <button className={styles.author} type="button" onClick={openAuthorProfile}>
          <img
            className={styles.avatar}
            src={recipe.owner.avatar ?? userPlaceholder}
            alt=""
            width="40"
            height="40"
          />
          <span>{recipe.owner.name}</span>
        </button>

        <div className={styles.actions}>
          <button
            className={cn(
              styles.actionButton,
              styles.favorite,
              isFavorite && styles.favoriteActive,
            )}
            type="button"
            onClick={toggle}
            disabled={isDisabled}
            aria-pressed={isFavorite}
          >
            <svg width="18" height="18" aria-hidden="true">
              <use href={`${sprite}#icon-heart`} />
            </svg>
            <span className="visually-hidden">
              {isFavorite
                ? `Remove ${recipe.title} from favorites`
                : `Add ${recipe.title} to favorites`}
            </span>
          </button>

          <Link className={styles.actionButton} to={recipePath}>
            <svg width="18" height="18" aria-hidden="true">
              <use href={`${sprite}#icon-arrow-up-right`} />
            </svg>
            <span className="visually-hidden">Open {recipe.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
