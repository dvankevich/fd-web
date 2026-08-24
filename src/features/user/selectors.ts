import type { RootState } from '@app/store/store';
import type { UserProfile } from './types';

export const selectProfile = (state: RootState): UserProfile | null => state.user.profile;
export const selectIsOwner = (state: RootState): boolean => state.user.isOwner;
export const selectProfileStatus = (state: RootState) => state.user.status;
export const selectProfileError = (state: RootState) => state.user.error;
export const selectMyFollowingIds = (state: RootState): string[] => state.user.myFollowingIds;
export const selectIsFollowing = (state: RootState, id: string): boolean =>
  state.user.myFollowingIds.includes(id);
