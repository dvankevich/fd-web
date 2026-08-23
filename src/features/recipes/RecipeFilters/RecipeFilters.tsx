import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { components, type DropdownIndicatorProps, type GroupBase } from 'react-select';
import { selectAreas, selectAreasStatus } from '@features/areas';
import { selectIngredients, selectIngredientsStatus } from '@features/ingredients';
import { Select, type SelectOption } from '@shared/ui';
import sprite from '@/assets/icons.svg';
import styles from './RecipeFilters.module.css';

const DropdownIndicator = (
  props: DropdownIndicatorProps<SelectOption, false, GroupBase<SelectOption>>,
) => (
  <components.DropdownIndicator {...props}>
    <svg width="18" height="18" aria-hidden="true">
      <use href={`${sprite}#icon-chevron-down`} />
    </svg>
  </components.DropdownIndicator>
);

const SELECT_COMPONENTS = { DropdownIndicator };

interface RecipeFiltersProps {
  area: string;
  ingredient: string;
  onAreaChange: (area: string) => void;
  onIngredientChange: (ingredient: string) => void;
}

export function RecipeFilters({
  area,
  ingredient,
  onAreaChange,
  onIngredientChange,
}: RecipeFiltersProps) {
  const areas = useSelector(selectAreas);
  const areasStatus = useSelector(selectAreasStatus);
  const ingredients = useSelector(selectIngredients);
  const ingredientsStatus = useSelector(selectIngredientsStatus);

  const areaOptions = useMemo<SelectOption[]>(
    () => areas.map(({ name }) => ({ value: name, label: name })),
    [areas],
  );
  const ingredientOptions = useMemo<SelectOption[]>(
    () => ingredients.map(({ name }) => ({ value: name, label: name })),
    [ingredients],
  );

  const selectedArea = areaOptions.find(({ value }) => value === area) ?? null;
  const selectedIngredient = ingredientOptions.find(({ value }) => value === ingredient) ?? null;

  return (
    <div className={styles.filters}>
      <Select
        className={styles.select}
        options={ingredientOptions}
        value={selectedIngredient}
        placeholder="Ingredients"
        isLoading={ingredientsStatus === 'loading'}
        components={SELECT_COMPONENTS}
        onChange={(option) => onIngredientChange(option?.value ?? '')}
      />
      <Select
        className={styles.select}
        options={areaOptions}
        value={selectedArea}
        placeholder="Area"
        isLoading={areasStatus === 'loading'}
        components={SELECT_COMPONENTS}
        onChange={(option) => onAreaChange(option?.value ?? '')}
      />
    </div>
  );
}
