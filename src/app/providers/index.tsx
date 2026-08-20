import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from '@app/store/store';
import { APP_MODALS } from '@app/modals';
import { AuthProvider } from '@features/auth';
import { Loader, ModalRoot } from '@shared/ui';
import InitialDataLoader from '@shared/lib/InitialDataLoader';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <InitialDataLoader>
          <BrowserRouter>
            <AuthProvider>{children}</AuthProvider>
            <ModalRoot modals={APP_MODALS} />
          </BrowserRouter>
        </InitialDataLoader>
      </PersistGate>
    </Provider>
  );
}
