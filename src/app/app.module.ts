import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {CliModule} from './module/cli/cli.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {EvaluatorModule} from './module/evaluator/evaluator.module';
import {dbInit} from './module/idb/config';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    dbInit();
  }
}
