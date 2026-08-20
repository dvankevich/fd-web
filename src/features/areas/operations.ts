import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Areas } from './types';
import * as areasApi from './api';

export const fetchAreas = createAsyncThunk<Areas[], void, { rejectValue: string }>(
  'areas/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await areasApi.getAreas();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        'Unable to load areas.';

      return rejectWithValue(message);
    }
  },
);
