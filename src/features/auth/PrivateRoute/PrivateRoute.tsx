import { useEffect, type ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { MODAL_NAME, modalObserver } from '@shared/lib';
import { Loader } from '@shared/ui';
import { selectIsLoggedIn, selectIsSessionRestored } from '../selectors';

interface PrivateRouteProps {
  children: ReactElement;
  redirectTo?: string;
}

export function PrivateRoute({ children, redirectTo = '/' }: PrivateRouteProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isSessionRestored = useSelector(selectIsSessionRestored);
  const isGuest = isSessionRestored && !isLoggedIn;

  useEffect(() => {
    if (isGuest) {
      modalObserver.open(MODAL_NAME.signIn);
    }
  }, [isGuest]);

  if (!isSessionRestored) {
    return <Loader />;
  }

  if (isGuest) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
