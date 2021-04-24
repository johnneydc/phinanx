import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Sentry from '@sentry/angular';
import {Integrations} from '@sentry/tracing';

Sentry.init({
  dsn: 'https://c65422d8353849d78e50bed326ddf4c2@o578076.ingest.sentry.io/5734089',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://yourserver.io/api'],
      routingInstrumentation: Sentry.routingInstrumentation,
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
