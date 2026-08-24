import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@app/store/store';
import { selectUser } from '@features/auth';
import { toggleFavorite } from '@features/recipes';
import { apiClient } from '@shared/api/client';
import type { RecipeListItem } from '@shared/types';
import {
  followUser,
  getFavorites,
  getFollowers,
  getFollowing,
  getPublicUser,
  getUserRecipes,
  unfollowUser,
} from './api';
import { paginateClient, RECIPES_LIMIT, USERS_PAGE_SIZE } from './lib';
import { selectMyFollowingIds } from './selectors';
import { favoriteRemoved, followingAdded, followingRemoved, recipeRemoved } from './slice';
import type { FollowUser, TabKey, UserCardData } from './types';

type ListKind = 'recipes' | 'users';

const kindOf = (tab: TabKey): ListKind =>
  tab === 'followers' || tab === 'following' ? 'users' : 'recipes';

const PREVIEW_LIMIT = 4;

const enrichUser = async (user: FollowUser, signal?: AbortSignal): Promise<UserCardData> => {
  try {
    const [profile, recipes] = await Promise.all([
      getPublicUser(user.id, signal),
      getUserRecipes(user.id, 1, PREVIEW_LIMIT, signal),
    ]);
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      ownRecipesCount: profile.createdRecipesCount,
      recipes: recipes.data.map(({ id, title, thumb, preview }) => ({ id, title, thumb, preview })),
    };
  } catch {
    return { id: user.id, name: user.name, avatar: user.avatar, ownRecipesCount: 0, recipes: [] };
  }
};

interface UseProfileListArgs {
  profileId: string;
  tab: TabKey;
  page: number;
  enabled: boolean;
  onEmptyPage: () => void;
}

interface UseProfileListResult {
  kind: ListKind;
  recipes: RecipeListItem[];
  users: UserCardData[];
  total: number;
  limit: number;
  loading: boolean;
  error: string | null;
  deletingId: string | null;
  togglingId: string | null;
  removeRecipe: (id: string) => Promise<void>;
  toggleFollow: (id: string) => Promise<void>;
}

export const useProfileList = ({
  profileId,
  tab,
  page,
  enabled,
  onEmptyPage,
}: UseProfileListArgs): UseProfileListResult => {
  const dispatch = useDispatch<AppDispatch>();
  const me = useSelector(selectUser);
  const myFollowingIds = useSelector(selectMyFollowingIds);
  const kind = kindOf(tab);

  // Ключ поточного запиту. Поки завантажені дані (readyKey) не збігаються з ним —
  // показуємо Loader, щоб уникнути застарілих даних чи передчасного порожнього стану.
  const currentKey = `${kind}|${tab}|${page}|${profileId}`;

  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [recipeTotal, setRecipeTotal] = useState(0);
  const [userTotal, setUserTotal] = useState(0);
  const [users, setUsers] = useState<UserCardData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [readyKey, setReadyKey] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Recipe tabs — серверна пагінація.
  useEffect(() => {
    if (!enabled || kind !== 'recipes') return;

    const controller = new AbortController();
    const run = async () => {
      setError(null);
      try {
        const data =
          tab === 'favorites'
            ? await getFavorites(page, RECIPES_LIMIT, controller.signal)
            : await getUserRecipes(profileId, page, RECIPES_LIMIT, controller.signal);
        if (controller.signal.aborted) return;
        setRecipes(data.data);
        setRecipeTotal(data.total);
      } catch {
        if (!controller.signal.aborted) setError('Unable to load recipes.');
      } finally {
        if (!controller.signal.aborted) setReadyKey(currentKey);
      }
    };

    void run();
    return () => controller.abort();
  }, [enabled, kind, profileId, tab, page, currentKey]);

  // User tabs — повний список + довантаження видимої сторінки (клієнтська пагінація).
  useEffect(() => {
    if (!enabled || kind !== 'users') return;

    const controller = new AbortController();
    const run = async () => {
      setError(null);
      try {
        const list =
          tab === 'following'
            ? await getFollowing(controller.signal)
            : await getFollowers(profileId, controller.signal);
        const { items, total } = paginateClient(list, page, USERS_PAGE_SIZE);
        const enriched = await Promise.all(
          items.map((user) => enrichUser(user, controller.signal)),
        );
        if (controller.signal.aborted) return;
        setUserTotal(total);
        setUsers(enriched);
      } catch {
        if (!controller.signal.aborted) setError('Unable to load users.');
      } finally {
        if (!controller.signal.aborted) setReadyKey(currentKey);
      }
    };

    void run();
    return () => controller.abort();
  }, [enabled, kind, profileId, tab, page, currentKey]);

  const removeRecipe = useCallback(
    async (id: string) => {
      setDeletingId(id);
      try {
        if (tab === 'favorites') {
          if (me) await dispatch(toggleFavorite({ id, userId: me.id })).unwrap();
          dispatch(favoriteRemoved());
        } else {
          await apiClient.delete(`/recipes/${encodeURIComponent(id)}`);
          dispatch(recipeRemoved());
        }
        setRecipes((prev) => {
          const next = prev.filter((recipe) => recipe.id !== id);
          if (next.length === 0 && page > 1) onEmptyPage();
          return next;
        });
        setRecipeTotal((value) => Math.max(0, value - 1));
      } catch {
        setError('Unable to delete this recipe.');
      } finally {
        setDeletingId(null);
      }
    },
    [dispatch, me, onEmptyPage, page, tab],
  );

  const toggleFollow = useCallback(
    async (id: string) => {
      const isFollowing = myFollowingIds.includes(id);
      setTogglingId(id);
      try {
        if (isFollowing) {
          await unfollowUser(id);
          dispatch(followingRemoved(id));
          // На вкладці Following після відписки картка зникає зі списку.
          if (tab === 'following') {
            setUsers((prev) => {
              const next = prev.filter((user) => user.id !== id);
              if (next.length === 0 && page > 1) onEmptyPage();
              return next;
            });
            setUserTotal((value) => Math.max(0, value - 1));
          }
        } else {
          await followUser(id);
          dispatch(followingAdded(id));
        }
      } catch {
        setError('Unable to update follow.');
      } finally {
        setTogglingId(null);
      }
    },
    [dispatch, myFollowingIds, onEmptyPage, page, tab],
  );

  return {
    kind,
    recipes,
    users,
    total: kind === 'users' ? userTotal : recipeTotal,
    limit: kind === 'users' ? USERS_PAGE_SIZE : RECIPES_LIMIT,
    loading: readyKey !== currentKey,
    error,
    deletingId,
    togglingId,
    removeRecipe,
    toggleFollow,
  };
};
