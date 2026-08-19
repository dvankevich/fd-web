import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { MODAL_NAME, ROUTE, modalObserver, type Route } from '@shared/lib';
import { Loader } from '@shared/ui';
import { selectIsLoggedIn, selectIsSessionRestored } from '../selectors';

interface PrivateRouteProps {
  redirectTo?: Route;
}

export function PrivateRoute({ redirectTo = ROUTE.home }: PrivateRouteProps) {
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

  return <Outlet />;
}
