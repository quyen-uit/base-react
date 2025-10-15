import { RouterProvider } from 'react-router-dom';
import { MantineProvider, ColorSchemeScript, localStorageColorSchemeManager } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { Provider } from 'react-redux';
import { store } from './app/store';
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
