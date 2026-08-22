import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@app/store/store';
import type { Areas } from './types';
import * as areasApi from './api';

export const fetchAreas = createAsyncThunk<
  Areas[],
  void,
  { rejectValue: string; state: RootState }
>(
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
  {
    condition: (_, { getState }) => getState().areas.status !== 'loading',
  },
);
