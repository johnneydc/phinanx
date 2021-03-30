import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'phx-cli-input',
  template: `
    <input #inputEl class="cli-main-input" type="text" placeholder="Type '?' for more information.">
  `
})
export class CliInputComponent implements AfterViewInit {

  @Output()
  public readonly cliInput: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public readonly cliClear: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('inputEl')
  private readonly inputEl!: ElementRef<HTMLInputElement>;

  private readonly inputHistory: string[] = [];

  private inputHistoryCursor = 0;

  public ngAfterViewInit(): void {
    this.bindKeys();
  }

  public focus(): void {
    this.inputEl.nativeElement.focus();
  }

  public get currentValue(): string {
    return this.inputEl.nativeElement.value.slice();
  }

  private bindKeys(): void {
    this.inputEl.nativeElement.onkeydown = ev => {
      if (ev.code === 'Enter') {
        this.emitInput();
        this.clearInput();
      }

      if (ev.code === 'KeyL' && ev.ctrlKey) {
        ev.preventDefault();
        this.emitClear();
      }

      if (ev.code === 'ArrowUp') {
        ev.preventDefault();
        this.setPreviousInputAsCurrent();
      }

      if (ev.code === 'ArrowDown') {
        ev.preventDefault();
        this.setNextInputAsCurrent();
      }
    };
  }

  private emitInput(): void {
    if (this.currentValue.trim() === '') {
      return;
    }

    this.cliInput.emit(this.currentValue.slice());
    this.inputHistory.push(this.currentValue.slice());
    this.inputHistoryCursor = this.inputHistory.length;
  }

  private clearInput(): void {
    this.inputEl.nativeElement.value = '';
  }

  private emitClear(): void {
    this.cliClear.emit();
  }

  private setInputValue(text: string | undefined): void {
    this.inputEl.nativeElement.value = text || '';
    this.inputEl.nativeElement.selectionStart = this.inputEl.nativeElement.selectionEnd = 10000;
  }

  private setPreviousInputAsCurrent(): void {
    this.inputHistoryCursor--;
    this.inputHistoryCursor = this.inputHistoryCursor < 0 ? 0 : this.inputHistoryCursor;

    this.setInputValue(this.inputHistory[this.inputHistoryCursor]);
  }

  private setNextInputAsCurrent(): void {
    this.inputHistoryCursor++;
    this.inputHistoryCursor = this.inputHistoryCursor > this.inputHistory.length ? this.inputHistory.length : this.inputHistoryCursor;

    this.setInputValue(this.inputHistory[this.inputHistoryCursor]);
  }
}
