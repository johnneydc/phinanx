import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {CliTerminalService} from '../service/cli-terminal.service';
import {Observable} from 'rxjs';
import {CliInputComponent} from './cli-input.component';

@Component({
  selector: 'phx-cli-main',
  template: `
    <div #containerEl class="cli-main-container">
      <div class="cli-main-content">
        <div class="cli-main-content-line" *ngFor="let line of lines$ | async">
          {{ line }}
        </div>
      </div>
      <div>
        <phx-cli-input #cliInputCmp ></phx-cli-input>
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
        border-radius: 3px;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.2);
        overflow: hidden;
      }

      .cli-main-content {
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        color: whitesmoke;
        overflow: hidden;
      }

      .cli-main-content-line {
        width: 100%;
        box-sizing: border-box;
        padding: 0 12px 3px;
        word-break: break-word;
      }
    `
  ]
})
export class CliMainComponent implements AfterViewInit {

  public lines$: Observable<string[]>;

  @ViewChild('containerEl')
  private readonly containerEl!: ElementRef<HTMLDivElement>;

  @ViewChild('cliInputCmp')
  private readonly cliInputCmp!: CliInputComponent;

  constructor(
    private readonly cliTerminalService: CliTerminalService
  ) {
    this.lines$ = this.cliTerminalService.getLines();
  }

  public ngAfterViewInit(): void {
    this.focusCli();
    this.bindKeysForContainer();
    this.bindScrollForContainer();
    this.listenForInputEvents();
  }

  public sendLines(text: string): void {
    this.cliTerminalService.println(text);
  }

  private focusCli(): void {
    this.cliInputCmp.focus();
  }

  private bindKeysForContainer(): void {
    this.containerEl.nativeElement.onclick = ev => {
      this.cliInputCmp.focus();
    };
  }

  private listenForInputEvents(): void {
    this.cliInputCmp.cliInput.subscribe(input => {
      this.cliTerminalService.println(input.trim());
    });

    this.cliInputCmp.cliClear.subscribe(() => {
      this.cliTerminalService.clear();
    });
  }

  private bindScrollForContainer(): void {
    this.containerEl.nativeElement.onwheel = ev => {
      if (ev.deltaY < 0) {
        this.cliTerminalService.scrollUp();
      } else if (ev.deltaY > 0) {
        this.cliTerminalService.scrollDown();
      }
    };
  }
}
