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

  public ngAfterViewInit(): void {
    this.bindKeys();
  }

  public focus(): void {
    this.inputEl.nativeElement.focus();
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
    };
  }

  private emitInput(): void {
    if (this.inputEl.nativeElement.value.trim() === '') {
      return;
    }

    this.cliInput.emit(this.inputEl.nativeElement.value.slice());
  }

  private clearInput(): void {
    this.inputEl.nativeElement.value = '';
  }

  private emitClear(): void {
    this.cliClear.emit();
  }
}
