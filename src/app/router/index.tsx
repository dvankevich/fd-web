import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from '@shared/layout/SharedLayout';
import { Loader } from '@shared/ui/Loader';

const HomePage = lazy(() => import('@pages/HomePage'));
const RecipePage = lazy(() => import('@pages/RecipePage'));
const AddRecipePage = lazy(() => import('@pages/AddRecipePage'));
const UserPage = lazy(() => import('@pages/UserPage'));

export function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          <Route path="recipe/add" element={<AddRecipePage />} />
          <Route path="user/:id" element={<UserPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
