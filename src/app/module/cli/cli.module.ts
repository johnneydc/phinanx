import {NgModule} from '@angular/core';
import {CliMainComponent} from './component/cli-main.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CliTerminalService} from './service/cli-terminal.service';

@NgModule({
  exports: [
    CliMainComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [CliMainComponent],
  providers: [CliTerminalService]
})
export class CliModule {
}
