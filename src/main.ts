import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {init as SentryInit, instrumentAngularRouting} from '@sentry/angular';
import {Integrations} from '@sentry/tracing';

SentryInit({
  dsn: 'https://c65422d8353849d78e50bed326ddf4c2@o578076.ingest.sentry.io/5734089',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://phinanx.johnneydc.com/'],
      routingInstrumentation: instrumentAngularRouting,
    }),
  ],
  tracesSampleRate: 1.0,
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
