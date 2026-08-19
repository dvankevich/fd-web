import { createSlice } from '@reduxjs/toolkit';
import { fetchFavoriteIds, toggleFavorite } from './operations';

export type FavoritesStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface RecipesState {
  favoriteIds: string[];
  pendingFavoriteIds: string[];
  loadedForUserId: string | null;
  requestedForUserId: string | null;
  status: FavoritesStatus;
  error: string | null;
}

const initialState: RecipesState = {
  favoriteIds: [],
  pendingFavoriteIds: [],
  loadedForUserId: null,
  requestedForUserId: null,
  status: 'idle',
  error: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    clearFavorites: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteIds.pending, (state, { meta }) => {
        if (state.loadedForUserId !== meta.arg) {
          state.favoriteIds = [];
          state.pendingFavoriteIds = [];
          state.loadedForUserId = null;
        }
        state.status = 'loading';
        state.requestedForUserId = meta.arg;
        state.error = null;
      })
      .addCase(fetchFavoriteIds.fulfilled, (state, { payload }) => {
        if (state.requestedForUserId !== payload.userId) return;
        state.favoriteIds = payload.ids;
        state.loadedForUserId = payload.userId;
        state.requestedForUserId = null;
        state.status = 'succeeded';
      })
      .addCase(fetchFavoriteIds.rejected, (state, { meta, payload }) => {
        if (state.requestedForUserId !== meta.arg) return;
        state.requestedForUserId = null;
        state.status = 'failed';
        state.error = payload ?? 'Unable to load favorites.';
      })
      .addCase(toggleFavorite.pending, (state, { meta }) => {
        state.pendingFavoriteIds.push(meta.arg.id);
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, { payload }) => {
        if (state.loadedForUserId !== payload.userId) return;
        state.pendingFavoriteIds = state.pendingFavoriteIds.filter((id) => id !== payload.id);
        if (payload.isFavorite && !state.favoriteIds.includes(payload.id)) {
          state.favoriteIds.push(payload.id);
        }
        if (!payload.isFavorite) {
          state.favoriteIds = state.favoriteIds.filter((id) => id !== payload.id);
        }
      })
      .addCase(toggleFavorite.rejected, (state, { meta, payload }) => {
        if (state.loadedForUserId !== meta.arg.userId) return;
        state.pendingFavoriteIds = state.pendingFavoriteIds.filter((id) => id !== meta.arg.id);
        state.error = payload ?? 'Unable to update favorites.';
      });
  },
});

export const { clearFavorites } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
