import { apiClient } from '@shared/api/client';
import type { Paginated, PopularRecipe, Recipe, RecipeListItem } from '@shared/types';

const RECIPES_ENDPOINT = '/recipes';
const FAVORITES_ENDPOINT = `${RECIPES_ENDPOINT}/favorites`;

interface PopularRecipesOptions {
  limit: number;
  signal?: AbortSignal;
}

const recipeEndpoint = (id: string): string => `${RECIPES_ENDPOINT}/${encodeURIComponent(id)}`;

const favoriteEndpoint = (id: string): string => `${recipeEndpoint(id)}/favorite`;

const getFavoritePage = async (
  page: number,
  limit?: number,
  signal?: AbortSignal,
): Promise<Paginated<RecipeListItem>> => {
  const { data } = await apiClient.get<Paginated<RecipeListItem>>(FAVORITES_ENDPOINT, {
    params: limit ? { page, limit } : { page },
    signal,
  });

  return data;
};

export const getRecipe = async (id: string, signal?: AbortSignal): Promise<Recipe> => {
  const { data } = await apiClient.get<Recipe>(recipeEndpoint(id), { signal });
  return data;
};

export const getPopularRecipes = async ({
  limit,
  signal,
}: PopularRecipesOptions): Promise<PopularRecipe[]> => {
  const { data } = await apiClient.get<Paginated<PopularRecipe>>(`${RECIPES_ENDPOINT}/popular`, {
    params: { page: 1, limit },
    signal,
  });

  return data.data;
};

export const getFavoriteRecipeIds = async (signal?: AbortSignal): Promise<string[]> => {
  const firstPage = await getFavoritePage(1, undefined, signal);
  const pageCount = Math.ceil(firstPage.total / firstPage.limit);
  const remainingPages = await Promise.all(
    Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) =>
      getFavoritePage(index + 2, firstPage.limit, signal),
    ),
  );

  return [
    ...new Set([firstPage, ...remainingPages].flatMap(({ data }) => data.map(({ id }) => id))),
  ];
};

export const addRecipeToFavorites = async (id: string): Promise<void> => {
  await apiClient.post(favoriteEndpoint(id));
};

export const removeRecipeFromFavorites = async (id: string): Promise<void> => {
  await apiClient.delete(favoriteEndpoint(id));
};
