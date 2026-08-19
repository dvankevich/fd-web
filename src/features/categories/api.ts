import { apiClient } from '@shared/api/client';
import type { Category, CategoryResponse } from './types';

export async function getCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<CategoryResponse[]>('/categories');

  return data.map(({ _id, name, image, description }) => ({
    id: _id,
    name,
    image,
    description,
  }));
}
