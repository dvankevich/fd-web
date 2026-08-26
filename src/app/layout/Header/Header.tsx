import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Logo } from '@app/layout/Logo';
import { Nav } from '@app/layout/Nav';
import { AuthBar } from '@app/layout/AuthBar';
import { UserBar } from '@app/layout/UserBar';
import { selectIsLoggedIn } from '@features/auth/selectors';
import sprite from '@/assets/icons.svg';
import styles from './Header.module.css';

export function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Logo />

        {isLoggedIn && (
          <div className={styles.desktopNav}>
            <Nav />
          </div>
        )}

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

      {/* Mobile menu */}
      {isLoggedIn && (
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
          <div className={styles.mobileTop}>
            <Logo />
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
        </div>
      )}
    </header>
  );
}
