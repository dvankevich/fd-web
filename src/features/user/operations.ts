import { isAxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@app/store/store';
import { avatarUpdated, selectUser } from '@features/auth';
import {
  followUser,
  getCurrentUser,
  getFollowing,
  getPublicUser,
  unfollowUser,
  updateAvatar,
} from './api';
import { normalizeProfile } from './lib';
import type { UserProfile } from './types';
import { avatarChanged, followingAdded, followingRemoved, profileFollowersChanged } from './slice';

const msg = (error: unknown, fallback: string): string => {
  if (!isAxiosError<{ error?: unknown }>(error)) return fallback;
  return typeof error.response?.data.error === 'string' ? error.response.data.error : fallback;
};

interface LoadProfilePayload {
  profile: UserProfile;
  isOwner: boolean;
}

export const loadProfile = createAsyncThunk<
  LoadProfilePayload,
  string,
  { rejectValue: string; state: RootState }
>('user/loadProfile', async (id, { getState, rejectWithValue, signal }) => {
  try {
    const me = selectUser(getState());
    const isOwner = !!me && me.id === id;
    const raw = isOwner ? await getCurrentUser(signal) : await getPublicUser(id, signal);
    return { profile: normalizeProfile(raw), isOwner };
  } catch (error) {
    return rejectWithValue(msg(error, 'Unable to load profile.'));
  }
});

export const loadMyFollowing = createAsyncThunk<string[], void, { rejectValue: string }>(
  'user/loadMyFollowing',
  async (_, { rejectWithValue, signal }) => {
    try {
      return (await getFollowing(signal)).map((u) => u.id);
    } catch (error) {
      return rejectWithValue(msg(error, 'Unable to load following.'));
    }
  },
);

export const toggleProfileFollow = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>('user/toggleProfileFollow', async (_, { getState, dispatch }) => {
  const { profile, myFollowingIds } = getState().user;
  if (!profile) return;
  const isFollowing = myFollowingIds.includes(profile.id);
  try {
    if (isFollowing) {
      await unfollowUser(profile.id);
      dispatch(followingRemoved(profile.id));
      dispatch(profileFollowersChanged(-1));
    } else {
      await followUser(profile.id);
      dispatch(followingAdded(profile.id));
      dispatch(profileFollowersChanged(1));
    }
  } catch (error) {
    throw new Error(msg(error, 'Unable to update follow.'), { cause: error });
  }
});

export const uploadAvatar = createAsyncThunk<void, File, { dispatch: AppDispatch }>(
  'user/uploadAvatar',
  async (file, { dispatch }) => {
    try {
      const { avatar } = await updateAvatar(file);
      dispatch(avatarChanged(avatar));
      dispatch(avatarUpdated(avatar));
    } catch (error) {
      throw new Error(msg(error, 'Unable to update avatar.'), { cause: error });
    }
  },
);
