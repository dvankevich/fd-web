import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from '@app/store';
import { APP_MODALS } from '@app/modals';
import { AuthProvider } from '@features/auth';
import { Loader, ModalRoot } from '@shared/ui';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <BrowserRouter>
          <AuthProvider>{children}</AuthProvider>
          <ModalRoot modals={APP_MODALS} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
