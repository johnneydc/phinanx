import {Component, ViewChild} from '@angular/core';
import {CliMainComponent} from './module/cli/component/cli-main.component';
import {cmdParse} from './module/cmd-parser/cmd-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('cliMainCmp')
  private readonly cliMainCmp!: CliMainComponent;

  public parseCommand(command: string): void {
    const parsedCmd = cmdParse(command);
    this.cliMainCmp.printLn(JSON.stringify(parsedCmd));
    this.cliMainCmp.printLn('');
  }
}
