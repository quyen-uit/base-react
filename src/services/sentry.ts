import * as Sentry from '@sentry/react';

interface SentryConfig {
  dsn: string;
  environment?: string;
  enabled?: boolean;
  tracesSampleRate?: number;
  replaysSessionSampleRate?: number;
  replaysOnErrorSampleRate?: number;
}

export const initSentry = (config: SentryConfig) => {
  if (!config.enabled || !config.dsn) {
    console.log('Sentry is disabled');
    return;
  }

  Sentry.init({
    dsn: config.dsn,
    environment: config.environment || 'development',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: config.tracesSampleRate || 1.0,
    // Session Replay
    replaysSessionSampleRate: config.replaysSessionSampleRate || 0.1,
    replaysOnErrorSampleRate: config.replaysOnErrorSampleRate || 1.0,
    // Breadcrumbs
    beforeBreadcrumb(breadcrumb) {
      // Filter out sensitive information
      if (breadcrumb.category === 'console') {
        return null;
      }
      return breadcrumb;
    },
    // Before sending events
    beforeSend(event, hint) {
      // Filter out errors in development
      if (config.environment === 'development') {
        console.error('Sentry Event:', event, hint);
      }
      return event;
    },
  });
};

// Helper functions for manual error tracking
export const captureException = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    extra: context,
  });
};

export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
  Sentry.captureMessage(message, level);
};

export const setUser = (user: { id: string; email?: string; username?: string } | null) => {
  if (user) {
    Sentry.setUser(user);
  } else {
    Sentry.setUser(null);
  }
};

export const addBreadcrumb = (message: string, data?: Record<string, any>) => {
  Sentry.addBreadcrumb({
    message,
    data,
    level: 'info',
  });
};
