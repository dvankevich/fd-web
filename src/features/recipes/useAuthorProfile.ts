import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '@features/auth';
import { buildPath, MODAL_NAME, modalObserver, ROUTE } from '@shared/lib';

export const useAuthorProfile = (authorId: string): (() => void) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return useCallback(() => {
    if (!isLoggedIn) {
      modalObserver.open(MODAL_NAME.signIn);
      return;
    }

    if (authorId) navigate(buildPath(ROUTE.user, { id: authorId }));
  }, [authorId, isLoggedIn, navigate]);
};
