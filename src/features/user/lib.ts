import type { CurrentUser } from '@shared/types';
import type { TabKey, UserProfile } from './types';

export const RECIPES_LIMIT = 9;
export const USERS_PAGE_SIZE = 5;

const OWNER_TABS: { key: TabKey; label: string }[] = [
  { key: 'recipes', label: 'My recipes' },
  { key: 'favorites', label: 'My favorites' },
  { key: 'followers', label: 'Followers' },
  { key: 'following', label: 'Following' },
];

const PUBLIC_TABS: { key: TabKey; label: string }[] = [
  { key: 'recipes', label: 'Recipes' },
  { key: 'followers', label: 'Followers' },
];

export const visibleTabs = (isOwner: boolean): { key: TabKey; label: string }[] =>
  isOwner ? OWNER_TABS : PUBLIC_TABS;
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
