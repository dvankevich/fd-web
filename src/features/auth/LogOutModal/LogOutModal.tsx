import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/ui/Button';
import { logout } from '@features/auth/operations';
import { persistor, type AppDispatch } from '@app/store';
import styles from './LogOutModal.module.css';

interface LogOutModalProps {
  onClose: () => void;
}

export function LogOutModal({ onClose }: LogOutModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    await persistor.purge(); // повністю чистимо persisted auth у localStorage
    onClose();
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Are you logging out?</h3>
      <p className={styles.text}>You can always log back in at any time.</p>

      <div className={styles.actions}>
        <Button fullWidth onClick={handleLogout}>
          Log out
        </Button>
        <Button fullWidth variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
