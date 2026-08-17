import { Outlet } from 'react-router-dom';
import { Header } from '@shared/layout/Header';
import { Footer } from '@shared/layout/Footer';
import styles from './SharedLayout.module.css';

export function SharedLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
