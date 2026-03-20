import * as Sentry from '@sentry/astro';

const dsn = import.meta.env.SENTRY_DSN || '';

if (dsn) {
  Sentry.init({
    dsn,
    environment: import.meta.env.PROD ? 'production' : 'development',

    // Sample 10% of transactions for performance monitoring
    tracesSampleRate: 0.1,
  });
}
