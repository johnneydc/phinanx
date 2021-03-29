import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {CliTerminalService} from '../service/cli-terminal.service';
import {Observable} from 'rxjs';
import {CliInputComponent} from './cli-input.component';
import {DomSanitizer} from '@angular/platform-browser';
import {map} from 'rxjs/operators';
import {ArrayUtil} from '../../shared/array.util';

@Component({
  selector: 'phx-cli-main',
  template: `
    <div #containerEl class="cli-main-container">
      <div class="cli-main-content">
        <ng-container *ngFor="let line of lines$ | async">
          <div *ngIf="line !== ''; else emptyLine" class="cli-main-content-line" [innerHTML]="line">
          </div>
        </ng-container>
      </div>
      <div>
        <phx-cli-input #cliInputCmp></phx-cli-input>
      </div>
    </div>

    <ng-template #emptyLine>
      &nbsp;
    </ng-template>
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
        /*word-break: break-word;*/
        white-space: nowrap;
      }
    `
  ]
})
export class CliMainComponent implements AfterViewInit {

  public lines$: Observable<string[]>;

  @Output()
  public cmd: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('containerEl')
  private readonly containerEl!: ElementRef<HTMLDivElement>;

  @ViewChild('cliInputCmp')
  private readonly cliInputCmp!: CliInputComponent;

  private maxLineChar = 67;

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

  public printLn(text: string): void {
    const chars = text.split('');
    const chunks = ArrayUtil.chunks(chars, this.maxLineChar);

    for (const chunk of chunks) {
      this.cliTerminalService.println(chunk.join(''));
    }
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
      let sanitizedInput = input.trim().replace('>', '&gt;');
      sanitizedInput = sanitizedInput.replace('<', '&lt;');

      this.printLn('> ' + sanitizedInput);
      this.cmd.emit(sanitizedInput);
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
