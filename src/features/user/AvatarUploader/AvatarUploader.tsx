import { useRef, useState, type ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@app/store/store';
import { notify } from '@shared/lib';
import userPlaceholder from '@/assets/user-placeholder.svg';
import { uploadAvatar } from '../operations';
import styles from './AvatarUploader.module.css';

interface AvatarUploaderProps {
  avatar: string | null;
  name: string;
  editable: boolean;
}

export const AvatarUploader = ({ avatar, name, editable }: AvatarUploaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const onFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setBusy(true);
    try {
      await dispatch(uploadAvatar(file)).unwrap();
      notify.success('Avatar updated.');
    } catch (error) {
      notify.error(error instanceof Error ? error.message : 'Unable to update avatar.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <img
        className={styles.avatar}
        src={avatar ?? userPlaceholder}
        alt={name}
        width="80"
        height="80"
      />
      {editable && (
        <>
          <button
            className={styles.plus}
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            aria-label="Upload avatar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <input
            ref={inputRef}
            className="visually-hidden"
            type="file"
            accept="image/*"
            onChange={onFile}
          />
        </>
      )}
    </div>
  );
};
