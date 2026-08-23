import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ROUTE } from '@shared/lib';
import { HomeContentLayout } from '@/widgets/HomeContentLayout';
import type { ValueOf } from '@shared/types';
const HomePage = lazy(() => import('@pages/HomePage'));
const RecipePage = lazy(() => import('@pages/RecipePage'));
const AddRecipePage = lazy(() => import('@pages/AddRecipePage'));
const UserPage = lazy(() => import('@pages/UserPage'));
const RecipesPage = lazy(() => import('@pages/RecipesPage'));

export const ACCESS = {
  public: 'public',
  private: 'private',
} as const;

export type Access = ValueOf<typeof ACCESS>;

type AppRoute = RouteObject & { access: Access };

const APP_ROUTES: AppRoute[] = [
  {
    element: <HomeContentLayout />,
    access: ACCESS.public,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTE.recipes, element: <RecipesPage /> },
      { path: ROUTE.notFound, element: <HomePage /> },
    ],
  },
  { path: ROUTE.recipe, element: <RecipePage />, access: ACCESS.public },
  { path: ROUTE.addRecipe, element: <AddRecipePage />, access: ACCESS.private },
  { path: ROUTE.user, element: <UserPage />, access: ACCESS.private },
];
const withoutAccess = ({ access: _access, ...route }: AppRoute): RouteObject => route;

export const routesWithAccess = (access: Access): RouteObject[] =>
  APP_ROUTES.filter((route) => route.access === access).map(withoutAccess);
