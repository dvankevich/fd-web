import type { Nullable } from '@shared/types';

export const TAB_KEYS = ['recipes', 'favorites', 'followers', 'following'] as const;
export type TabKey = (typeof TAB_KEYS)[number];

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: Nullable<string>;
  createdRecipesCount: number;
  favoritesCount?: number;
  followersCount: number;
  followingCount?: number;
}

export interface UserPreviewRecipe {
  id: string;
  title: string;
  thumb: Nullable<string>;
  preview: Nullable<string>;
}

export interface UserCardData {
  id: string;
  name: string;
  avatar: Nullable<string>;
  ownRecipesCount: number;
  recipes: UserPreviewRecipe[];
}

export interface FollowUser {
  id: string;
  name: string;
  avatar: Nullable<string>;
}

export interface FollowersResponse {
  users: FollowUser[];
}

export type { RecipeListItem } from '@shared/types';
