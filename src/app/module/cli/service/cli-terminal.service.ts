import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CliTerminalService {

  private static MAX_LINES = 1000;
  private readonly lines: string[] = [];
  private readonly lines$ = new Subject<string[]>();

  public println(text: string): void {
    this.lines.push(text);
    this.lines$.next(this.lines);
  }

  public getLines(limit = 30): Observable<string[]> {
    return this.lines$.asObservable()
      .pipe(
        map(lines => lines.slice(limit * -1))
      );
  }

}
