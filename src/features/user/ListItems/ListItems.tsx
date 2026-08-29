import { ListLoader } from '@shared/ui/ListLoader';
import type { RecipeListItem } from '@shared/types';
import { RecipePreview } from '../RecipePreview';
import { UserCard } from '../UserCard';
import type { UserCardData } from '../types';
import styles from './ListItems.module.css';

interface ListItemsProps {
  kind: 'recipes' | 'users';
  loading: boolean;
  error: string | null;
  emptyText: string;
  // recipes branch
  recipes: RecipeListItem[];
  deletable: boolean;
  deletingId: string | null;
  onDelete: (id: string) => void;
  // users branch
  users: UserCardData[];
  togglingId: string | null;
  onToggleFollow: (id: string) => void;
}

export const ListItems = ({
  kind,
  loading,
  error,
  emptyText,
  recipes,
  deletable,
  deletingId,
  onDelete,
  users,
  togglingId,
  onToggleFollow,
}: ListItemsProps) => {
  if (loading) return <ListLoader />;
  if (error) return <p className={styles.message}>{error}</p>;

  if (kind === 'users') {
    if (users.length === 0) return <p className={styles.message}>{emptyText}</p>;
    return (
      <ul className={`${styles.list} ${styles.userList}`}>
        {users.map((user) => (
          <li key={user.id}>
            <UserCard
              data={user}
              busy={togglingId === user.id}
              showRecipes
              onToggleFollow={onToggleFollow}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (recipes.length === 0) return <p className={styles.message}>{emptyText}</p>;
  return (
    <ul className={`${styles.list} ${styles.recipeList}`}>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipePreview
            recipe={recipe}
            deletable={deletable}
            deleting={deletingId === recipe.id}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
};
