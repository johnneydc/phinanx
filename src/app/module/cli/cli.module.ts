import {NgModule} from '@angular/core';
import {CliMainComponent} from './component/cli-main.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CliTerminalService} from './service/cli-terminal.service';
import {CliInputComponent} from './component/cli-input.component';

@NgModule({
  exports: [
    CliMainComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    CliMainComponent,
    CliInputComponent
  ],
  providers: [CliTerminalService]
})
export class CliModule {
}
