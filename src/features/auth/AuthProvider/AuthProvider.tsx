import { useEffect, type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '@shared/api/client';
import { Loader } from '@shared/ui';
import type { AppDispatch } from '@app/store';
import { attachAuthInterceptor } from '../interceptor';
import { refresh } from '../operations';
import { selectIsSessionRestored } from '../selectors';
import { attachSessionSync } from '../sessionSync';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isSessionRestored = useSelector(selectIsSessionRestored);

  useEffect(() => {
    const detachInterceptor = attachAuthInterceptor({ client: apiClient, dispatch });
    const detachSessionSync = attachSessionSync({ dispatch });

    dispatch(refresh());

    return () => {
      detachInterceptor();
      detachSessionSync();
    };
  }, [dispatch]);

  if (!isSessionRestored) {
    return <Loader />;
  }

  return children;
}
