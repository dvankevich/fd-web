import { createSlice } from '@reduxjs/toolkit';
import type { Ingredients } from './types';
import { fetchIngredients } from './operations';

export type IngredientsStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface IngredientsState {
  items: Ingredients[];
  status: IngredientsStatus;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  status: 'idle',
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unable to load ingredients.';
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;
