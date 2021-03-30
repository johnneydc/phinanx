import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {CliTerminalService} from '../service/cli-terminal.service';
import {Observable} from 'rxjs';
import {CliInputComponent} from './cli-input.component';
import {DomSanitizer} from '@angular/platform-browser';
import {map} from 'rxjs/operators';
import {ArrayUtil} from '../../shared/array.util';
import {TerminalLine} from '../types/terminal-line';

@Component({
  selector: 'phx-cli-main',
  template: `
    <div class="solarized">
      <div #containerEl class="cli-main-container">
        <div class="cli-main-content">
          <ng-container *ngFor="let line of lines$ | async">
            <div class="cli-main-content-line" [innerHTML]="line.html">
            </div>
          </ng-container>
        </div>
        <div>
          <phx-cli-input #cliInputCmp></phx-cli-input>
        </div>
      </div>
    </div>
  `
})
export class CliMainComponent implements AfterViewInit {

  public lines$: Observable<TerminalLine[]>;

  @Output()
  public cmd: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('containerEl')
  private readonly containerEl!: ElementRef<HTMLDivElement>;

  @ViewChild('cliInputCmp')
  private readonly cliInputCmp!: CliInputComponent;

  private maxLineChar = 67;
  private linesDisplayed = 27;

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

  public printLn(text?: string): void {
    if (text === undefined) {
      this.cliTerminalService.printLn(TerminalLine.new(''));
      return;
    }

    const line = TerminalLine.new(text);

    if (line.lineLen > this.maxLineChar) {
      throw new Error('Text to display is outside the maximum supported length.');
    }

    this.cliTerminalService.printLn(line);

    // // const chars = text.split('');
    // // const chunks = ArrayUtil.chunks(chars, this.maxLineChar);
    // //
    // const chunks = TerminalLine.chunkify(67);
    //
    // for (const chunk of chunks) {
    //   this.cliTerminalService.printLn(chunk);
    // }
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

      this.printLn('<span class="cyn">&gt;</span> ' + sanitizedInput);
      this.cmd.emit(sanitizedInput);
    });

    this.cliInputCmp.cliClear.subscribe(() => {
      this.clearTerminal();
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

  private clearTerminal(): void {
    const fillerCount = Math.round(this.linesDisplayed);
    const fillers = new Array(fillerCount).fill('&nbsp;');
    fillers.forEach(filler => {
      this.printLn(filler);
    });
  }
}
