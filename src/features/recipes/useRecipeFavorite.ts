import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@app/store';
import { selectIsLoggedIn, selectUser } from '@features/auth';
import { MODAL_NAME, modalObserver } from '@shared/lib';
import { fetchFavoriteIds, toggleFavorite as toggleRecipeFavorite } from './operations';
import { selectAreFavoritesReady, selectIsFavorite, selectIsFavoritePending } from './selectors';
import { clearFavorites } from './slice';

interface RecipeFavoriteState {
  isFavorite: boolean;
  isDisabled: boolean;
  isPending: boolean;
  toggle: () => void;
}

export const useInitializeFavoriteIds = (): void => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const userId = user?.id;

  useEffect(() => {
    if (!isLoggedIn || !userId) {
      dispatch(clearFavorites());
      return;
    }

    void dispatch(fetchFavoriteIds(userId));
  }, [dispatch, isLoggedIn, userId]);
};

export const useRecipeFavorite = (recipeId: string): RecipeFavoriteState => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isFavorite = useSelector((state: RootState) => selectIsFavorite(state, recipeId));
  const isPending = useSelector((state: RootState) => selectIsFavoritePending(state, recipeId));
  const isReady = useSelector((state: RootState) =>
    user ? selectAreFavoritesReady(state, user.id) : false,
  );
  const isDisabled = isLoggedIn && (!user || !isReady || isPending);

  const toggle = useCallback(() => {
    if (!isLoggedIn) {
      modalObserver.open(MODAL_NAME.signIn);
      return;
    }

    if (!user || !isReady) return;

    void dispatch(toggleRecipeFavorite({ id: recipeId, userId: user.id }));
  }, [dispatch, isLoggedIn, isReady, recipeId, user]);

  return { isFavorite, isDisabled, isPending, toggle };
};
