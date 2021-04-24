import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {CliModule} from './module/cli/cli.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {EvaluatorModule} from './module/evaluator/evaluator.module';
import {dbInit} from './module/idb/config';

import {createErrorHandler, TraceService} from '@sentry/angular';
import {Router} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CliModule,
    DragDropModule,
    EvaluatorModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [TraceService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    dbInit();
  }
}
