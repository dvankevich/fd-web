import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Hero } from '@features/home/Hero';
import { Testimonials } from '@features/testimonials';
import { CategoriesSkeleton } from '@features/categories/CategoriesSkeleton';

export function HomeContentLayout() {
  return (
    <>
      <Hero />
      <div className="container">
        <Suspense fallback={<CategoriesSkeleton />}>
          <Outlet />
        </Suspense>
      </div>
      <Testimonials />
    </>
  );
}
