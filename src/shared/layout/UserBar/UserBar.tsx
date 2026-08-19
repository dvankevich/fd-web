import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MODAL_NAME, ROUTE, buildPath, cn, modalObserver } from '@shared/lib';
import { selectUser } from '@features/auth';
import styles from './UserBar.module.css';

const defaultAvatar =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="#e0e0e0"/><circle cx="25" cy="20" r="8" fill="#9e9e9e"/><ellipse cx="25" cy="40" rx="14" ry="10" fill="#9e9e9e"/></svg>`,
  );

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
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!user) return null;

  return (
    <div className={styles.wrap} ref={ref}>
      <button type="button" className={styles.trigger} onClick={() => setOpen((v) => !v)}>
        <img
          src={user.avatar || defaultAvatar}
          alt={user.name}
          className={styles.avatar}
          width={32}
          height={32}
        />
        <span className={styles.name}>{user.name}</span>
        <span className={cn(styles.arrow, open && styles.arrowOpen)}>▾</span>
      </button>

      {open && (
        <div className={styles.dropdown}>
          <Link
            to={buildPath(ROUTE.user, { id: user.id })}
            className={styles.item}
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <button
            type="button"
            className={styles.item}
            onClick={() => {
              setOpen(false);
              modalObserver.open(MODAL_NAME.logOut);
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
