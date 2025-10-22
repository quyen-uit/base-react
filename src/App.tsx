import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { MantineProvider, ColorSchemeScript, localStorageColorSchemeManager } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { authApi } from '@/services';
import { setCredentials, setInitialized } from '@/app/authSlice';
import { router } from '@/routes';
import { theme } from '@/theme';
import { ErrorBoundary } from '@/components';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './locales/i18n';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'mantine-color-scheme',
});

function App() {
  useEffect(() => {
    // Bootstrap: attempt to hydrate session using refresh cookie
    const bootstrap = async () => {
      try {
        const me = await store.dispatch(
          authApi.endpoints.getCurrentUser.initiate()
        ).unwrap();
        const user = (me as any).user ?? me;
        store.dispatch(setCredentials({ user }));
      } catch (_e) {
        // not authenticated; leave as logged out
      } finally {
        store.dispatch(setInitialized(true));
      }
    };

    bootstrap();
  }, []);

  return (
    <>
      <ColorSchemeScript />
      <Provider store={store}>
        <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager} defaultColorScheme="light">
          <ModalsProvider>
            <Notifications position="top-right" />
            <ErrorBoundary>
              <RouterProvider router={router} />
            </ErrorBoundary>
          </ModalsProvider>
        </MantineProvider>
      </Provider>
    </>
  );
}

export default App;
