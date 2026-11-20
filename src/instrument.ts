import React from 'react';
import * as Sentry from '@sentry/react';
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN?.trim();

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.VITE_SENTRY_ENVIRONMENT?.trim() || import.meta.env.MODE,
    release: import.meta.env.VITE_SENTRY_RELEASE?.trim() || __APP_RELEASE__,
    integrations: [
      Sentry.reactRouterV7BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
      Sentry.replayIntegration(),
      Sentry.feedbackIntegration({
        colorScheme: 'system',
      }),
    ],
    // 100% locally for verification; 20% in production to control trace volume
    tracesSampleRate: import.meta.env.DEV ? 1.0 : 0.2,
    tracePropagationTargets: [/^\//, /^https?:\/\/localhost/],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}
