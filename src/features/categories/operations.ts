import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Category } from './types';
import * as categoriesApi from './api';

export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await categoriesApi.getCategories();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        'Unable to load categories.';

      return rejectWithValue(message);
    }
  },
);
