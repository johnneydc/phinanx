import {Component} from '@angular/core';
import {CliTerminalService} from '../service/cli-terminal.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'phx-cli-main',
  template: `
    <div class="cli-main-container" (click)="inputEl.focus()">
      <div class="cli-main-content">
        <div *ngFor="let line of lines$ | async">
          {{ line }}
        </div>
      </div>
      <div>
        <input autofocus class="cli-main-input" #inputEl type="text" (keydown.enter)="sendLines(inputEl.value.slice()); inputEl.value = ''">
      </div>
    </div>
  `,
  styles: [
    `
      .cli-main-container {
        display: flex;
        flex-direction: column;
        height: 500px;
        width: 500px;
        background: #3b3b3b;
        font-family: monospace;
      }

      .cli-main-content {
        white-space: pre-wrap;
        padding: 5px;
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        color: whitesmoke;
      }

      .cli-main-input {
        background: none;
        border: none;
        padding: 6px 12px;
        border-top: 1px solid #bbb;
        height: 30px;
        width: 100%;
        box-sizing: border-box;
        font-family: monospace;
        color: whitesmoke;
      }
    `
  ]
})
export class CliMainComponent {

  public lines$: Observable<string[]>;

  constructor(
    private readonly cliTerminalService: CliTerminalService
  ) {
    this.lines$ = this.cliTerminalService.getLines()
      // .pipe(
      //   map(lines => lines.reverse())
      // );
  }

  public sendLines(text: string): void {
    this.cliTerminalService.println(text);
  }
}
