import { Link } from 'react-router-dom';
import { buildPath, cn, ROUTE } from '@shared/lib';
import type { RecipeListItem } from '@shared/types';
import recipePlaceholder from '@/assets/recipe-placeholder.svg';
import sprite from '@/assets/icons.svg';
import styles from './RecipePreview.module.css';

interface RecipePreviewProps {
  recipe: RecipeListItem;
  deletable: boolean;
  deleting?: boolean;
  onDelete?: (id: string) => void;
}

export const RecipePreview = ({ recipe, deletable, deleting, onDelete }: RecipePreviewProps) => {
  const path = buildPath(ROUTE.recipe, { id: recipe.id });

  return (
    <article className={styles.card}>
      <Link to={path} className={styles.imageLink}>
        <img
          className={styles.image}
          src={recipe.preview ?? recipe.thumb ?? recipePlaceholder}
          alt={recipe.title}
          width="100"
          height="100"
          loading="lazy"
        />
      </Link>

      <div className={styles.body}>
        <h3 className={styles.title}>{recipe.title}</h3>
        {recipe.description && <p className={styles.description}>{recipe.description}</p>}
      </div>

      <div className={cn(styles.actions, !deletable && styles.singleAction)}>
        <Link className={styles.iconBtn} to={path} aria-label={`Open ${recipe.title}`}>
          <svg width="18" height="18" aria-hidden="true">
            <use href={`${sprite}#icon-arrow-up-right`} />
          </svg>
        </Link>
        {deletable && (
          <button
            className={styles.iconBtn}
            type="button"
            disabled={deleting}
            onClick={() => onDelete?.(recipe.id)}
            aria-label={`Delete ${recipe.title}`}
          >
            <svg width="18" height="18" aria-hidden="true">
              <use href={`${sprite}#icon-trash`} />
            </svg>
          </button>
        )}
      </div>
    </article>
  );
};
