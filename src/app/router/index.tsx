import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { SharedLayout } from '@shared/layout/SharedLayout';
import { ROUTE } from '@shared/lib';
import { Loader } from '@shared/ui';
import { PrivateRoute } from '@features/auth';
import { ACCESS, routesWithAccess } from './routes';

export function AppRouter() {
  const element = useRoutes([
    {
      path: ROUTE.home,
      element: <SharedLayout />,
      children: [
        ...routesWithAccess(ACCESS.public),
        { element: <PrivateRoute />, children: routesWithAccess(ACCESS.private) },
      ],
    },
  ]);

  return <Suspense fallback={<Loader />}>{element}</Suspense>;
}
