import { apiClient } from '@shared/api/client';

import type { Ingredient, Option } from '../types/recipe';

const toNameOptions = (items: unknown[]): Option[] =>
  items.map((item) => {
    const name = typeof item === 'string' ? item : String((item as Record<string, unknown>).name);

    return { _id: name, name };
  });

export const getCategories = async (): Promise<Option[]> => {
  const { data } = await apiClient.get('/categories');

  const categories = Array.isArray(data) ? data : (data.categories ?? []);

  return toNameOptions(categories);
};

export const getAreas = async (): Promise<Option[]> => {
  const { data } = await apiClient.get('/areas');

  const areas = Array.isArray(data) ? data : (data.areas ?? []);

  return toNameOptions(areas);
};
export const getIngredients = async (): Promise<Ingredient[]> => {
  const { data } = await apiClient.get('/ingredients');

  // console.log('INGREDIENTS RESPONSE:', data);

  const ingredients = Array.isArray(data) ? data : (data.ingredients ?? []);

  return ingredients.map((ingredient: any) => ({
    _id: String(ingredient.id ?? ingredient._id),
    name: ingredient.name,
    img: ingredient.img ?? ingredient.image ?? '',
  }));
};

export const createRecipe = async (formData: FormData): Promise<{ id: string }> => {
  try {
    // console.log('POST /recipes');

    const { data } = await apiClient.post('/recipes', formData);

    // console.log('CREATE RECIPE RESPONSE:', data);

    if (!data?.id) {
      throw new Error('Recipe ID was not returned by API');
    }

    return {
      id: String(data.id),
    };
  } catch (error: any) {
    console.error('CREATE RECIPE ERROR:', error?.response?.data ?? error);

    console.error('STATUS:', error?.response?.status);

    console.error('HEADERS:', error?.response?.headers);

    throw error;
  }
};
