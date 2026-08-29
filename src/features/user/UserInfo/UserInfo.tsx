import { useSelector } from 'react-redux';
import { cn } from '@shared/lib';
import { AvatarUploader } from '../AvatarUploader';
import { selectIsOwner, selectProfile } from '../selectors';
import styles from './UserInfo.module.css';

export const UserInfo = () => {
  const profile = useSelector(selectProfile);
  const isOwner = useSelector(selectIsOwner);

  if (!profile) return null;

  return (
    <div className={cn(styles.card, !isOwner && styles.publicCard)}>
      <AvatarUploader avatar={profile.avatar} name={profile.name} editable={isOwner} />
      <p className={styles.name}>{profile.name}</p>
      <ul className={styles.stats}>
        <li className={styles.row}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{profile.email}</span>
        </li>
        <li className={styles.row}>
          <span className={styles.label}>Added recipes:</span>
          <span className={styles.value}>{profile.createdRecipesCount}</span>
        </li>
        {isOwner && profile.favoritesCount != null && (
          <li className={styles.row}>
            <span className={styles.label}>Favorites:</span>
            <span className={styles.value}>{profile.favoritesCount}</span>
          </li>
        )}
        <li className={styles.row}>
          <span className={styles.label}>Followers:</span>
          <span className={styles.value}>{profile.followersCount}</span>
        </li>
        {isOwner && profile.followingCount != null && (
          <li className={styles.row}>
            <span className={styles.label}>Following:</span>
            <span className={styles.value}>{profile.followingCount}</span>
          </li>
        )}
      </ul>
    </div>
  );
};
