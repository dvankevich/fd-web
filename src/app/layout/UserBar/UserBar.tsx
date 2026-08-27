import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MODAL_NAME, ROUTE, buildPath, cn, modalObserver } from '@shared/lib';
import { selectUser } from '@features/auth';
import sprite from '@/assets/icons.svg';
import userPlaceholder from '@/assets/user-placeholder.svg';
import styles from './UserBar.module.css';

export function UserBar() {
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  if (!user) return null;

  return (
    <div className={styles.wrap} ref={ref}>
<<<<<<< HEAD
      <button type="button" className={styles.trigger} data-testid="user-bar" onClick={() => setOpen((v) => !v)}>
=======
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
      >
>>>>>>> main
        <img
          src={user.avatar || userPlaceholder}
          alt={user.name}
          className={styles.avatar}
          width={50}
          height={50}
        />
        <span className={styles.name}>{user.name}</span>
        <svg className={cn(styles.arrow, open && styles.arrowOpen)} aria-hidden="true">
          <use href={`${sprite}#icon-chevron-down`} />
        </svg>
      </button>

      {open && (
        <div className={styles.dropdown}>
          <Link
            to={buildPath(ROUTE.user, { id: user.id })}
            className={`${styles.item} ${styles.profile}`}
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <button
            type="button"
<<<<<<< HEAD
            className={styles.item}
            data-testid="auth-log-out"
=======
            className={`${styles.item} ${styles.logout}`}
>>>>>>> main
            onClick={() => {
              setOpen(false);
              modalObserver.open(MODAL_NAME.logOut);
            }}
          >
            <span>Log out</span>

            <svg width="18" height="18" aria-hidden="true">
              <use href={`${sprite}#icon-arrow-up-right`} />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}