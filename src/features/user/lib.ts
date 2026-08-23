import type { CurrentUser } from '@shared/types';
import type { UserProfile } from './types';

export const RECIPES_LIMIT = 9;
export const USERS_PAGE_SIZE = 4;
export const PROFILE_SUBTITLE =
  'Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.';

export const paginateClient = <T>(
  items: T[],
  page: number,
  pageSize: number,
): { items: T[]; total: number } => {
  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), total: items.length };
};

export const normalizeProfile = (raw: CurrentUser | UserProfile): UserProfile => ({
  id: raw.id,
  name: raw.name,
  email: raw.email,
  avatar: raw.avatar,
  createdRecipesCount: raw.createdRecipesCount,
  followersCount: raw.followersCount,
  favoritesCount: 'favoritesCount' in raw ? raw.favoritesCount : undefined,
  followingCount: 'followingCount' in raw ? raw.followingCount : undefined,
});
