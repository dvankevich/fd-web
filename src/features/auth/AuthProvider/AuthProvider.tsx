import { useEffect, type ReactNode } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { apiClient } from '@shared/api/client';
import { Loader } from '@shared/ui';
import type { AppDispatch } from '@app/store/store';
import type { RootState } from '@app/store/store';
import { attachAuthInterceptor } from '../interceptor';
import { refresh } from '../operations';
import { selectIsSessionRestored } from '../selectors';
import { attachSessionSync } from '../sessionSync';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const store = useStore<RootState>();
  const isSessionRestored = useSelector(selectIsSessionRestored);

  useEffect(() => {
    const detachInterceptor = attachAuthInterceptor({
      client: apiClient,
      dispatch,
      getState: store.getState,
    });
    const detachSessionSync = attachSessionSync({ dispatch });

    dispatch(refresh());

    return () => {
      detachInterceptor();
      detachSessionSync();
    };
  }, [dispatch, store]);

  if (!isSessionRestored) {
    return <Loader />;
  }

  return children;
}
