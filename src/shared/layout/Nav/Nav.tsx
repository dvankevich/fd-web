import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

interface NavProps {
  onNavigate?: () => void;
  className?: string;
}

export function Nav({ onNavigate, className = '' }: NavProps) {
  return (
    <nav className={`${styles.nav} ${className}`}>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
        onClick={onNavigate}
      >
        Home
      </NavLink>
      <NavLink
        to="/recipe/add"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
        onClick={onNavigate}
      >
        Add recipe
      </NavLink>
    </nav>
  );
}
