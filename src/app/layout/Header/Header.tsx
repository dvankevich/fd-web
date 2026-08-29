import { useState } from 'react';

import { matchPath, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Logo } from '@app/layout/Logo';

import { Nav } from '@app/layout/Nav';

import { AuthBar } from '@app/layout/AuthBar';

import { UserBar } from '@app/layout/UserBar';

import { selectIsLoggedIn } from '@features/auth/selectors';

import sprite from '@/assets/icons.svg';

import heroLarge1x from '@/assets/hero-large-1x.webp';
import heroSmall1x from '@/assets/hero-small-1x.webp';

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
      } ${!isLoggedIn ? styles.loggedOut : ''}`}
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
            >
              <svg width="28" height="28" aria-hidden="true">
                <use href={`${sprite}#icon-burger`} />
              </svg>
            </button>
          )}
        </div>
      </div>

      {isLoggedIn && (
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
          <div className={styles.mobileTop}>
            <Logo onClick={closeMenu} />

            <button
              type="button"
              className={styles.close}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href={`${sprite}#icon-close`} />
              </svg>
            </button>
          </div>

          <Nav className={styles.mobileNav} onNavigate={closeMenu} />

          <div className={styles.mobileImages}>
            <img
              className={styles.mobileImageSmall}
              src={heroSmall1x}
              width={77}
              height={70}
              alt=""
            />

            <img
              className={styles.mobileImageLarge}
              src={heroLarge1x}
              width={190}
              height={172}
              alt=""
            />
          </div>
        </div>
      )}
    </header>
  );
}
