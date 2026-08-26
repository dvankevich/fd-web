import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@app/store/store';
import { buildPath, ROUTE } from '@shared/lib';
import recipePlaceholder from '@/assets/recipe-placeholder.svg';
import userPlaceholder from '@/assets/user-placeholder.svg';
import { selectIsFollowing } from '../selectors';
import type { UserCardData } from '../types';
import styles from './UserCard.module.css';
import sprite from '@/assets/icons.svg';

interface UserCardProps {
  data: UserCardData;
  busy?: boolean;
  showRecipes: boolean;
  onToggleFollow: (id: string) => void;
}

export const UserCard = ({ data, busy, showRecipes, onToggleFollow }: UserCardProps) => {
  const isFollowing = useSelector((state: RootState) => selectIsFollowing(state, data.id));
  const profilePath = buildPath(ROUTE.user, { id: data.id });

  return (
    <article className={styles.card}>
      <Link to={profilePath} className={styles.avatarLink}>
        <img
          className={styles.avatar}
          src={data.avatar ?? userPlaceholder}
          alt={data.name}
          width="80"
          height="80"
        />
      </Link>

      <div className={styles.info}>
        <p className={styles.name}>{data.name}</p>
        <p className={styles.count}>Own recipes: {data.ownRecipesCount}</p>
        <button
          className={styles.followBtn}
          type="button"
          disabled={busy}
          onClick={() => onToggleFollow(data.id)}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>

      {showRecipes && (
        <ul className={styles.recipes}>
          {data.recipes.slice(0, 4).map((recipe) => (
            <li key={recipe.id}>
              <Link to={buildPath(ROUTE.recipe, { id: recipe.id })}>
                <img
                  className={styles.recipeThumb}
                  src={recipe.preview ?? recipe.thumb ?? recipePlaceholder}
                  alt={recipe.title}
                  width="100"
                  height="100"
                  loading="lazy"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link to={profilePath} className={styles.arrow} aria-label={`Open ${data.name}`}>
        <svg width="18" height="18" aria-hidden="true">
          <use href={`${sprite}#icon-arrow-up-right`} />
        </svg>
      </Link>
    </article>
  );
};
