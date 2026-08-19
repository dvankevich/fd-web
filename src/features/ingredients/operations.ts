import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Ingredients } from './types';
import * as ingredientsApi from './api';

export const fetchIngredients = createAsyncThunk<Ingredients[], void, { rejectValue: string }>(
  'ingredients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await ingredientsApi.getIngredients();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        'Unable to load ingredients.';

      return rejectWithValue(message);
    }
  },
);
