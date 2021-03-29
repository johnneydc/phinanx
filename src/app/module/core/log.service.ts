import {Injectable} from '@angular/core';
import {CoreModule} from './core.module';

@Injectable({
  providedIn: CoreModule
})
export class LogService {

  public info(message: string): void {
    return console.log(`${new Date()} >> ${message}`);
  }

}
