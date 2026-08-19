import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ROUTE } from '@shared/lib';
import type { ValueOf } from '@shared/types';

const HomePage = lazy(() => import('@pages/HomePage'));
const RecipePage = lazy(() => import('@pages/RecipePage'));
const AddRecipePage = lazy(() => import('@pages/AddRecipePage'));
const UserPage = lazy(() => import('@pages/UserPage'));

export const ACCESS = {
  public: 'public',
  private: 'private',
} as const;

export type Access = ValueOf<typeof ACCESS>;

type AppRoute = RouteObject & { access: Access };

const APP_ROUTES: AppRoute[] = [
  { index: true, element: <HomePage />, access: ACCESS.public },
  { path: ROUTE.recipe, element: <RecipePage />, access: ACCESS.public },
  { path: ROUTE.notFound, element: <HomePage />, access: ACCESS.public },
  { path: ROUTE.addRecipe, element: <AddRecipePage />, access: ACCESS.private },
  { path: ROUTE.user, element: <UserPage />, access: ACCESS.private },
];

const withoutAccess = ({ access: _access, ...route }: AppRoute): RouteObject => route;

export const routesWithAccess = (access: Access): RouteObject[] =>
  APP_ROUTES.filter((route) => route.access === access).map(withoutAccess);
