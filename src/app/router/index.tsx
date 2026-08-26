import { Suspense } from 'react';
import { useRoutes, type RouteObject } from 'react-router-dom';
import { SharedLayout } from '@shared/layout/SharedLayout';
import { ROUTE } from '@shared/lib';
import { ErrorBoundary } from '@shared/ui';
import { PrivateRoute } from '@features/auth';
import { ACCESS, routesWithAccess } from './routes';

const ROUTE_TREE: RouteObject[] = [
  {
    path: ROUTE.home,
    element: <SharedLayout />,
    children: [
      ...routesWithAccess(ACCESS.public),
      { element: <PrivateRoute />, children: routesWithAccess(ACCESS.private) },
    ],
  },
];

export function AppRouter() {
  const element = useRoutes(ROUTE_TREE);

  return (
    <ErrorBoundary fallback={<p role="alert">This page did not load. Reload to try again.</p>}>
      <Suspense fallback={null}>{element}</Suspense>
    </ErrorBoundary>
  );
}

