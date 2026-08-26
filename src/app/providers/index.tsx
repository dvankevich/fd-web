import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from '@app/store/store';
import { APP_MODALS } from '@app/modals';
import { AuthProvider } from '@features/auth';
import { ModalRoot } from '@shared/ui';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@shared/styles/toastify.css';
import { InitialDataLoader } from './InitialDataLoader';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InitialDataLoader>
          <BrowserRouter>
            <AuthProvider>{children}</AuthProvider>
            <ModalRoot modals={APP_MODALS} />
            <ToastContainer theme="light" newestOnTop />
          </BrowserRouter>
        </InitialDataLoader>
      </PersistGate>
    </Provider>
  );
}
