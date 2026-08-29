import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@shared/lib';
import { Button } from '@shared/ui';
import type { ModalContentProps } from '@shared/ui';
import type { AppDispatch } from '@app/store/store';
import { persistor } from '@app/store/store';
import { logout } from '../operations';
import styles from './LogOutModal.module.css';
import { notify } from '@shared/lib';

export function LogOutModal({ onClose }: ModalContentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    try {
      navigate(ROUTE.home, { replace: true });
      await dispatch(logout());
      await persistor.purge();
      notify.success('You have been logged out');
    } catch {
      notify.info('Session cleared on this device');
      navigate(ROUTE.home, { replace: true });
    } finally {
      setIsPending(false);
      onClose();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.intro}>
        <h3 className={styles.title}>
          <span className={styles.mobileTitle}>Log out</span>
          <span className={styles.desktopTitle}>Are you logging out?</span>
        </h3>
        <p className={styles.text}>You can always log back in at any time.</p>
      </div>

      <div className={styles.actions}>
        <Button
          fullWidth
          className={styles.action}
          data-testid="log-out-confirm"
          onClick={handleLogout}
          disabled={isPending}
        >
          {isPending ? 'Logging out...' : 'Log out'}
        </Button>
        <Button
          fullWidth
          variant="secondary"
          className={`${styles.action} ${styles.cancel}`}
          onClick={onClose}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
