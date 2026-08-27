import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '@features/auth/selectors';
import styles from './Nav.module.css';

interface NavProps {
  onNavigate?: () => void;
  className?: string;
}

export function Nav({ onNavigate, className = '' }: NavProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav
      className={`${styles.nav} ${className} ${
        isLoggedIn ? styles.authenticated : ''
      }`}
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${styles.link} ${isActive && isLoggedIn ? styles.active : ''}`
        }
        onClick={onNavigate}
      >
        Home
      </NavLink>

      <NavLink
        to="/recipe/add"
        className={({ isActive }) =>
          `${styles.link} ${isActive && isLoggedIn ? styles.active : ''}`
        }
        onClick={onNavigate}
      >
        Add recipe
      </NavLink>
    </nav>
  );
}