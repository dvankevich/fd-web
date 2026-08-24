import { apiClient } from '@shared/api/client';
import type { CurrentUser, Paginated, RecipeListItem } from '@shared/types';
import type { FollowersResponse, FollowUser, UserProfile } from './types';

const USERS = '/users';
const userPath = (id: string): string => `${USERS}/${encodeURIComponent(id)}`;

export const getCurrentUser = async (signal?: AbortSignal): Promise<CurrentUser> => {
  const { data } = await apiClient.get<CurrentUser>(`${USERS}/me`, { signal });
  return data;
};

export const getPublicUser = async (id: string, signal?: AbortSignal): Promise<UserProfile> => {
  const { data } = await apiClient.get<UserProfile>(userPath(id), { signal });
  return data;
};

export const updateAvatar = async (file: File): Promise<{ avatar: string }> => {
  const body = new FormData();
  body.append('avatar', file);
  const { data } = await apiClient.patch<{ avatar: string }>(`${USERS}/avatar`, body);
  return data;
};

export const getUserRecipes = async (
  id: string,
  page: number,
  limit: number,
  signal?: AbortSignal,
): Promise<Paginated<RecipeListItem>> => {
  const { data } = await apiClient.get<Paginated<RecipeListItem>>(`${userPath(id)}/recipes`, {
    params: { page, limit },
    signal,
  });
  return data;
};

export const getFavorites = async (
  page: number,
  limit: number,
  signal?: AbortSignal,
): Promise<Paginated<RecipeListItem>> => {
  const { data } = await apiClient.get<Paginated<RecipeListItem>>('/recipes/favorites', {
    params: { page, limit },
    signal,
  });
  return data;
};

export const getFollowers = async (id: string, signal?: AbortSignal): Promise<FollowUser[]> => {
  const { data } = await apiClient.get<FollowersResponse>(`${userPath(id)}/followers`, { signal });
  return data.users;
};

export const getFollowing = async (signal?: AbortSignal): Promise<FollowUser[]> => {
  const { data } = await apiClient.get<FollowersResponse>(`${USERS}/following`, { signal });
  return data.users;
};

export const followUser = async (id: string): Promise<void> => {
  await apiClient.post(`${userPath(id)}/follow`);
};

export const unfollowUser = async (id: string): Promise<void> => {
  await apiClient.delete(`${userPath(id)}/follow`);
};
