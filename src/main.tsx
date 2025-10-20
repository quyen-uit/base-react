import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { store } from '@/app/store';
import { setAccessTokenGetter, setOnTokenRefreshed } from '@/services/axios';
import { updateTokens } from '@/app/authSlice';
import { initSentry } from './services/sentry';

// Initialize Sentry
initSentry({
  dsn: import.meta.env.VITE_SENTRY_DSN || '',
  environment: import.meta.env.VITE_ENV || 'development',
  enabled: import.meta.env.VITE_SENTRY_ENABLED === 'true',
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Wire axios token access/refresh with Redux
setAccessTokenGetter(() => store.getState().auth.token);
setOnTokenRefreshed((token) => store.dispatch(updateTokens({ token })));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
