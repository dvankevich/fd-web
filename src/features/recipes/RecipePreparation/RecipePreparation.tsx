import { cn } from '@shared/lib';
import { Button } from '@shared/ui';
import { useRecipeFavorite } from '../useRecipeFavorite';
import styles from './RecipePreparation.module.css';

interface RecipePreparationProps {
  recipeId: string;
  instructions: string;
}

export const RecipePreparation = ({ recipeId, instructions }: RecipePreparationProps) => {
  const { isFavorite, isDisabled, isPending, toggle } = useRecipeFavorite(recipeId);

  return (
    <section className={styles.section}>
      <div className={styles.copy}>
        <h2 className={styles.title}>Recipe preparation</h2>
        <p className={styles.instructions}>
          {instructions || 'Preparation instructions are not specified.'}
        </p>
      </div>
      <Button
        className={cn(styles.favoriteButton, isFavorite && styles.removeButton)}
        type="button"
        variant="secondary"
        onClick={toggle}
        disabled={isDisabled}
        aria-pressed={isFavorite}
      >
        {isPending ? 'Updating...' : isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </Button>
    </section>
  );
};
