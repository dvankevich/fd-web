import { isAxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';
import { addRecipeToFavorites, getFavoriteRecipeIds, removeRecipeFromFavorites } from './api';

interface FavoriteIdsPayload {
  userId: string;
  ids: string[];
}

interface ToggleFavoriteArgs {
  id: string;
  userId: string;
}

interface ToggleFavoritePayload {
  id: string;
  isFavorite: boolean;
  userId: string;
}

const errorMessage = (error: unknown, fallback: string): string => {
  if (!isAxiosError<{ error?: unknown }>(error)) return fallback;
  return typeof error.response?.data.error === 'string' ? error.response.data.error : fallback;
};

export const fetchFavoriteIds = createAsyncThunk<
  FavoriteIdsPayload,
  string,
  { rejectValue: string; state: RootState }
>(
  'recipes/fetchFavoriteIds',
  async (userId, { rejectWithValue, signal }) => {
    try {
      return { userId, ids: await getFavoriteRecipeIds(signal) };
    } catch (error) {
      return rejectWithValue(errorMessage(error, 'Unable to load favorites.'));
    }
  },
  {
    condition: (userId, { getState }) => {
      const favorites = getState().recipes;
      return favorites.loadedForUserId !== userId && favorites.requestedForUserId !== userId;
    },
  },
);

export const toggleFavorite = createAsyncThunk<
  ToggleFavoritePayload,
  ToggleFavoriteArgs,
  { rejectValue: string; state: RootState }
>(
  'recipes/toggleFavorite',
  async ({ id, userId }, { getState, rejectWithValue }) => {
    const isFavorite = getState().recipes.favoriteIds.includes(id);

    try {
      if (isFavorite) {
        await removeRecipeFromFavorites(id);
      } else {
        await addRecipeToFavorites(id);
      }
      return { id, isFavorite: !isFavorite, userId };
    } catch (error) {
      return rejectWithValue(errorMessage(error, 'Unable to update favorites.'));
    }
  },
  {
    condition: ({ id, userId }, { getState }) => {
      const favorites = getState().recipes;
      return favorites.loadedForUserId === userId && !favorites.pendingFavoriteIds.includes(id);
    },
  },
);
