import { createSlice } from '@reduxjs/toolkit';
import type { Category } from './types';
import { fetchCategories } from './operations';

export type CategoriesStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface CategoriesState {
  items: Category[];
  status: CategoriesStatus;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  status: 'idle',
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unable to load categories.';
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
