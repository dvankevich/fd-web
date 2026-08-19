import { apiClient } from '@shared/api/client';
import type { Ingredients, IngredientsResponse } from './types';

export async function getIngredients(): Promise<Ingredients[]> {
  const { data } = await apiClient.get<IngredientsResponse[]>('/ingredients');

  return data.map(({ _id, name, description, img }) => ({
    id: _id,
    name,
    description,
    img,
  }));
}
