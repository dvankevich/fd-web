import type { RootState } from '@app/store/store';

export const selectAreas = (state: RootState) => state.areas.items;
export const selectAreasStatus = (state: RootState) => state.areas.status;
export const selectAreasError = (state: RootState) => state.areas.error;
