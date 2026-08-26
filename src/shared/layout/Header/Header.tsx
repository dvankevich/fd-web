import { useState } from 'react';

import { matchPath, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Logo } from '@shared/layout/Logo';

import { Nav } from '@shared/layout/Nav';

import { AuthBar } from '@shared/layout/AuthBar';

import { UserBar } from '@shared/layout/UserBar';

import { selectIsLoggedIn } from '@features/auth/selectors';

import styles from './Header.module.css';

export function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const isLightHeader =
    location.pathname === '/recipe/add' ||
    Boolean(matchPath('/recipe/:id', location.pathname)) ||
    Boolean(matchPath('/user/:id', location.pathname));

  return (
    <header
      className={`${styles.header} ${
        isLightHeader ? styles.light : ''
      }`}
    >
      <div className={styles.inner}>
        <Logo />

        <div className={styles.desktopNav}>
          <Nav />
        </div>

        <div className={styles.right}>
          {isLoggedIn ? <UserBar /> : <AuthBar />}

          {isLoggedIn && (
            <button
              type="button"
              className={styles.burger}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            />
          )}
        </div>
      </div>

      {isLoggedIn && (
        <div
          className={`${styles.mobileMenu} ${
            menuOpen ? styles.mobileOpen : ''
          }`}
        >
          <div className={styles.mobileTop}>
            <Logo />

            <button
              type="button"
              className={styles.close}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <Nav
            className={styles.mobileNav}
            onNavigate={closeMenu}
          />
        </div>
      )}
    </header>
  );
}