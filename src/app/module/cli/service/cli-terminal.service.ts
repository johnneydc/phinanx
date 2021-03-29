import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CliTerminalService {

  private lines: string[] = [];
  private readonly lines$ = new Subject<string[]>();
  private scrollPointer = 0;
  private linesDisplayed = 27;

  public println(text: string): void {
    this.lines.push(text);
    this.scrollPointer = this.lines.length - 1;
    this.lines$.next(this.lines);
  }

  public getLines(): Observable<string[]> {
    return this.lines$.asObservable()
      .pipe(
        map(lines => lines.slice(this.linesDisplayed * -1))
      );
  }

  public clear(): void {
    this.lines = [];
    this.scrollPointer = 0;
    this.lines$.next(this.lines);
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
