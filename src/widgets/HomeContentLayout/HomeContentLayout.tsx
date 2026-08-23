import { Outlet } from 'react-router-dom';
import { Hero } from '@features/home/Hero';
import { Testimonials } from '@features/testimonials';

export function HomeContentLayout() {
  return (
    <>
      <Hero />

      <div className="container">
        <Outlet />
      </div>

      <Testimonials />
    </>
  );
}
