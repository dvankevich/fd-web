import { apiClient } from '@shared/api/client';
import type { Areas, AreasResponse } from './types';

export async function getAreas(): Promise<Areas[]> {
  const { data } = await apiClient.get<AreasResponse[]>('/areas');

  return data.map(({ id, name }) => ({
    id,
    name,
  }));
}
