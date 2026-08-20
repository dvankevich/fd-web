import { createSlice } from '@reduxjs/toolkit';
import type { Areas } from './types';
import { fetchAreas } from './operations';

export type AreasStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AreasState {
  items: Areas[];
  status: AreasStatus;
  error: string | null;
}

const initialState: AreasState = {
  items: [],
  status: 'idle',
  error: null,
};

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unable to load areas.';
      });
  },
});

export const areasReducer = areasSlice.reducer;
