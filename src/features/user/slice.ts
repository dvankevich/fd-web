import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from './types';
import { loadMyFollowing, loadProfile } from './operations';

export interface UserState {
  profile: UserProfile | null;
  isOwner: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  myFollowingIds: string[];
  myFollowingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  profile: null,
  isOwner: false,
  status: 'idle',
  error: null,
  myFollowingIds: [],
  myFollowingStatus: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: () => initialState,
    recipeRemoved(state) {
      if (state.profile) {
        state.profile.createdRecipesCount = Math.max(0, state.profile.createdRecipesCount - 1);
      }
    },
    favoriteRemoved(state) {
      if (state.profile?.favoritesCount != null) {
        state.profile.favoritesCount = Math.max(0, state.profile.favoritesCount - 1);
      }
    },
    followingAdded(state, { payload }: PayloadAction<string>) {
      if (!state.myFollowingIds.includes(payload)) state.myFollowingIds.push(payload);
      if (state.isOwner && state.profile?.followingCount != null) {
        state.profile.followingCount += 1;
      }
    },
    followingRemoved(state, { payload }: PayloadAction<string>) {
      state.myFollowingIds = state.myFollowingIds.filter((id) => id !== payload);
      if (state.isOwner && state.profile?.followingCount != null) {
        state.profile.followingCount = Math.max(0, state.profile.followingCount - 1);
      }
    },
    profileFollowersChanged(state, { payload }: PayloadAction<1 | -1>) {
      if (state.profile) {
        state.profile.followersCount = Math.max(0, state.profile.followersCount + payload);
      }
    },
    avatarChanged(state, { payload }: PayloadAction<string>) {
      if (state.profile) state.profile.avatar = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.profile = null;
      })
      .addCase(loadProfile.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.profile = payload.profile;
        state.isOwner = payload.isOwner;
      })
      .addCase(loadProfile.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload ?? 'Unable to load profile.';
      })
      .addCase(loadMyFollowing.pending, (state) => {
        state.myFollowingStatus = 'loading';
      })
      .addCase(loadMyFollowing.fulfilled, (state, { payload }) => {
        state.myFollowingStatus = 'succeeded';
        state.myFollowingIds = payload;
      })
      .addCase(loadMyFollowing.rejected, (state) => {
        state.myFollowingStatus = 'failed';
      });
  },
});

export const {
  resetUser,
  recipeRemoved,
  favoriteRemoved,
  followingAdded,
  followingRemoved,
  profileFollowersChanged,
  avatarChanged,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
