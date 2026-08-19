import type { RootState } from '@app/store';

export const selectFavoriteIds = (state: RootState): string[] => state.recipes.favoriteIds;

export const selectIsFavorite = (state: RootState, recipeId: string): boolean =>
  state.recipes.favoriteIds.includes(recipeId);

export const selectIsFavoritePending = (state: RootState, recipeId: string): boolean =>
  state.recipes.pendingFavoriteIds.includes(recipeId);

export const selectAreFavoritesReady = (state: RootState, userId: string): boolean =>
  state.recipes.loadedForUserId === userId;
