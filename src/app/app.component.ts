import {Component, ViewChild} from '@angular/core';
import {CliMainComponent} from './module/cli/component/cli-main.component';
import {EvaluatorService} from './module/evaluator/evaluator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('cliMainCmp')
  private readonly cliMainCmp!: CliMainComponent;

  constructor(
    private readonly evaluatorService: EvaluatorService
  ) { }

  public async parseCommand(command: string): Promise<void> {
    try {
      const results = await this.evaluatorService.evaluate(command);
      results.forEach(line => this.cliMainCmp.printLn(line));
    } catch (e) {
      this.cliMainCmp.printLn(e.message);
    } finally {
      this.cliMainCmp.printLn();
    }
  }
}
