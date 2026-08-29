import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import type { AppDispatch } from '@app/store/store';
import {
  ListItems,
  ListPagination,
  TabsList,
  UserInfo,
  loadMyFollowing,
  loadProfile,
  selectIsOwner,
  selectMyFollowingIds,
  selectProfile,
  selectProfileError,
  selectProfileStatus,
  toggleProfileFollow,
  useProfileList,
  visibleTabs,
  PROFILE_SUBTITLE,
} from '@features/user';
import type { TabKey } from '@features/user';
import { MODAL_NAME, modalObserver, notify } from '@shared/lib';
import { Button, Loader, MainTitle, PathInfo, Subtitle } from '@shared/ui';
import styles from './UserPage.module.css';

const EMPTY_TEXT: Record<TabKey, string> = {
  recipes: 'Nothing has been added to your recipes list yet.',
  favorites: 'Nothing has been added to your favorite recipes list yet.',
  followers: 'There are currently no followers on your account.',
  following: 'Your account currently has no subscriptions to other users.',
};

export default function UserPage() {
  const { id = '' } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const profile = useSelector(selectProfile);
  const isOwner = useSelector(selectIsOwner);
  const status = useSelector(selectProfileStatus);
  const error = useSelector(selectProfileError);
  const followingIds = useSelector(selectMyFollowingIds);
  const isFollowing = profile ? followingIds.includes(profile.id) : false;

  const validKeys = visibleTabs(isOwner).map((tab) => tab.key);
  const requestedTab = (searchParams.get('tab') as TabKey) ?? 'recipes';
  const activeTab: TabKey = validKeys.includes(requestedTab) ? requestedTab : 'recipes';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (id) void dispatch(loadProfile(id));
    void dispatch(loadMyFollowing());
  }, [dispatch, id]);

  useEffect(() => {
    if (profile && requestedTab !== activeTab) {
      setSearchParams({ tab: activeTab, page: '1' }, { replace: true });
    }
  }, [profile, requestedTab, activeTab, setSearchParams]);

  const onEmptyPage = useCallback(() => {
    setSearchParams({ tab: activeTab, page: String(Math.max(1, page - 1)) });
  }, [activeTab, page, setSearchParams]);

  const list = useProfileList({
    profileId: id,
    tab: activeTab,
    page,
    enabled: Boolean(profile),
    onEmptyPage,
  });

  const onTabChange = (tab: TabKey) => setSearchParams({ tab, page: '1' });
  const onPageChange = (next: number) => setSearchParams({ tab: activeTab, page: String(next) });

  const onToggleFollow = async () => {
    try {
      await dispatch(toggleProfileFollow()).unwrap();
    } catch (err) {
      notify.error(err instanceof Error ? err.message : 'Unable to update follow.');
    }
  };

  const deletable = isOwner && (activeTab === 'recipes' || activeTab === 'favorites');

  return (
    <div className="container">
      <PathInfo pageName="Profile" className={styles.path} />
      <MainTitle text="Profile" className={styles.title} />
      <Subtitle text={PROFILE_SUBTITLE} className={styles.subtitle} />

      {!profile && status === 'loading' && <Loader />}
      {status === 'failed' && <p className={styles.error}>{error}</p>}

      {profile && (
        <div className={styles.layout}>
          <div className={styles.side}>
            <UserInfo />
            {isOwner ? (
              <Button
                type="button"
                fullWidth
                className={styles.profileAction}
                onClick={() => modalObserver.open(MODAL_NAME.logOut)}
              >
                Log out
              </Button>
            ) : (
              <Button
                type="button"
                fullWidth
                className={styles.profileAction}
                onClick={onToggleFollow}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </div>

          <div className={styles.main}>
            <TabsList active={activeTab} onChange={onTabChange} />
            <ListItems
              kind={list.kind}
              loading={list.loading}
              error={list.error}
              emptyText={EMPTY_TEXT[activeTab]}
              recipes={list.recipes}
              deletable={deletable}
              deletingId={list.deletingId}
              onDelete={list.removeRecipe}
              users={list.users}
              togglingId={list.togglingId}
              onToggleFollow={list.toggleFollow}
            />
            <div className={styles.pagination}>
              <ListPagination
                page={page}
                total={list.total}
                limit={list.limit}
                onChange={onPageChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
