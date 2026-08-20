import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Logo } from '@shared/layout/Logo';
import { Nav } from '@shared/layout/Nav';
import { AuthBar } from '@shared/layout/AuthBar';
import { UserBar } from '@shared/layout/UserBar';
import { selectIsLoggedIn } from '@features/auth/selectors';
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
              ☰
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
              ✕
            </button>
          </div>
          <Nav className={styles.mobileNav} onNavigate={closeMenu} />
        </div>
      )}
    </header>
  );
}
