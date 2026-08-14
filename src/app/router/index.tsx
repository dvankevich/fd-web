import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('@pages/HomePage'));
const RecipePage = lazy(() => import('@pages/RecipePage'));
const AddRecipePage = lazy(() => import('@pages/AddRecipePage'));
const UserPage = lazy(() => import('@pages/UserPage'));

export function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/recipe/add" element={<AddRecipePage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}
