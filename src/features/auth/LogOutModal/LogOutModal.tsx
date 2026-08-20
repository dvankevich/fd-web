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

export function LogOutModal({ onClose }: ModalContentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    try {
      await dispatch(logout());
      await persistor.purge();
      navigate(ROUTE.home);
    } finally {
      setIsPending(false);
      onClose();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Are you logging out?</h3>
      <p className={styles.text}>You can always log back in at any time.</p>

      <div className={styles.actions}>
        <Button fullWidth onClick={handleLogout} disabled={isPending}>
          {isPending ? 'Logging out...' : 'Log out'}
        </Button>
        <Button fullWidth variant="secondary" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
