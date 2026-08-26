import { apiClient } from '@shared/api/client';
import { isRecord, isString } from '@shared/lib';

import type { Ingredient, Option } from '../types/recipe';

const toNameOptions = (items: unknown[]): Option[] =>
  items.flatMap((item) => {
    const name = isString(item) ? item : isRecord(item) && isString(item.name) ? item.name : null;
    return name ? [{ _id: name, name }] : [];
  });

const getItems = (data: unknown, key: string): unknown[] => {
  if (Array.isArray(data)) return data;
  if (!isRecord(data)) return [];
  const items = data[key];
  return Array.isArray(items) ? items : [];
};

export const getCategories = async (): Promise<Option[]> => {
  const { data } = await apiClient.get('/categories');

  return toNameOptions(getItems(data, 'categories'));
};

export const getAreas = async (): Promise<Option[]> => {
  const { data } = await apiClient.get('/areas');

  return toNameOptions(getItems(data, 'areas'));
};

export const getIngredients = async (): Promise<Ingredient[]> => {
  const { data } = await apiClient.get('/ingredients');
  const ingredients = getItems(data, 'ingredients');

  return ingredients.flatMap((ingredient) => {
    if (!isRecord(ingredient) || !isString(ingredient.name)) return [];
    const id = ingredient.id ?? ingredient._id;
    if (!isString(id) && typeof id !== 'number') return [];
    const image = isString(ingredient.img)
      ? ingredient.img
      : isString(ingredient.image)
        ? ingredient.image
        : '';

    return [{ _id: String(id), name: ingredient.name, img: image }];
  });
};

export const createRecipe = async (formData: FormData): Promise<{ id: string }> => {
  const { data } = await apiClient.post<unknown>('/recipes', formData);

  if (!isRecord(data) || (!isString(data.id) && typeof data.id !== 'number')) {
    throw new Error('Recipe ID was not returned by API');
  }

  return { id: String(data.id) };
};
