import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {TerminalLine} from '../types/terminal-line';

@Injectable()
export class CliTerminalService {

  private lines: TerminalLine[] = [];
  private readonly lines$ = new Subject<TerminalLine[]>();
  private scrollPointer = 0;
  private linesDisplayed = 27;

  public printLn(line: TerminalLine): void {
    this.lines.push(line);
    this.scrollPointer = this.lines.length - 1;
    this.lines$.next(this.lines);
  }

  public getLines(): Observable<TerminalLine[]> {
    return this.lines$.asObservable()
      .pipe(
        map(lines => lines.slice(this.linesDisplayed * -1))
      );
  }

  public scrollDown(): void {
    if (this.lines.length === this.linesDisplayed) {
      return;
    }

    this.scrollPointer++;
    if (this.scrollPointer > this.lines.length - 1) {
      this.scrollPointer = this.lines.length - 1;
    }

    const start = this.scrollPointer - this.linesDisplayed;
    const end = this.scrollPointer + 1;

    this.lines$.next(
      this.lines.slice(start, end)
    );
  }

  public scrollUp(): void {
    this.scrollPointer--;
    if (this.scrollPointer < this.linesDisplayed) {
      this.scrollPointer = this.linesDisplayed - 1;
    }

    const start = this.scrollPointer - this.linesDisplayed;
    const end = this.scrollPointer + 1;

    this.lines$.next(
      this.lines.slice(start < 0 ? 0 : start, end)
    );
  }
}
