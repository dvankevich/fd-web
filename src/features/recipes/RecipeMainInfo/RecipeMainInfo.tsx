import type { ReactNode } from 'react';
import type { Recipe } from '@shared/types';
import recipePlaceholder from '@/assets/recipe-placeholder.svg';
import userPlaceholder from '@/assets/user-placeholder.svg';
import { useAuthorProfile } from '../useAuthorProfile';
import styles from './RecipeMainInfo.module.css';

interface RecipeMainInfoProps {
  recipe: Recipe;
  children?: ReactNode;
}

const cookingTime = (time: string | null): string => {
  if (!time) return 'Time not specified';
  return /min/i.test(time) ? time : `${time} min`;
};

export const RecipeMainInfo = ({ recipe, children }: RecipeMainInfoProps) => {
  const openAuthorProfile = useAuthorProfile(recipe.owner.id);
  const authorContent = (
    <>
      <img
        className={styles.avatar}
        src={recipe.owner.avatar ?? userPlaceholder}
        alt=""
        width="50"
        height="50"
      />
      <span>
        <span className={styles.createdBy}>Created by:</span>
        <strong className={styles.authorName}>{recipe.owner.name}</strong>
      </span>
    </>
  );

  return (
    <section className={styles.section}>
      <img
        className={styles.image}
        src={recipe.thumb ?? recipe.preview ?? recipePlaceholder}
        alt={recipe.title}
      />

      <div className={styles.details}>
        <div className={styles.content}>
          <h1 className={styles.title}>{recipe.title}</h1>

          <div className={styles.badges}>
            {recipe.category.name && <span className={styles.badge}>{recipe.category.name}</span>}
            <span className={styles.badge}>{cookingTime(recipe.time)}</span>
          </div>

          {recipe.description && <p className={styles.description}>{recipe.description}</p>}

          <button className={styles.author} type="button" onClick={openAuthorProfile}>
            {authorContent}
          </button>
        </div>

        {children}
      </div>
    </section>
  );
};
