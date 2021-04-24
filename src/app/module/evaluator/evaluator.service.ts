import {Injectable} from '@angular/core';
import {Calc} from './commands/calc';
import {CommandEvaluator} from './command-evaluator';
import {Copy} from './commands/copy';
import {parse} from './parse';
import {Money} from './commands/money/money';
import {Expenses} from './commands/expenses';

@Injectable()
export class EvaluatorService {

  private readonly commands: Map<string, CommandEvaluator> = new Map();

  constructor() {
    // this.addCommand(new Calc());
    this.addCommand(new Copy());
    this.addCommand(new Money());
    this.addCommand(new Expenses());
  }

  public async evaluate(input: string): Promise<string[]> {
    const inputCmds = input.split('|');
    let resultFromLastCommand = null;

    for (const inputCmd of inputCmds) {
      const cmd = parse(inputCmd);

      if (cmd.command === '?') {
        return this.helpInfo();
      }

      if (resultFromLastCommand) {
        cmd.inputData = resultFromLastCommand.data;
        cmd.displayData = resultFromLastCommand.displayData;
      }

      const evaluator = this.commands.get(cmd.command);
      if (!evaluator) {
        throw new Error(`'${cmd.command}' command not found.`);
      }

      resultFromLastCommand = await evaluator.process(cmd);
    }

    if (!resultFromLastCommand) {
      return ['No result.'];
    }

    return resultFromLastCommand.lines;
  }

  private helpInfo(): string[] {
    const lines = ['Try these commands:', '&nbsp;'];

    for (const [command, evaluator] of this.commands.entries()) {
      lines.push(`%s.pnk ${command} \ns - ${evaluator.getDescription()}`);
    }

    return lines;
  }

  private addCommand(cmdEvaluator: CommandEvaluator): void {
    this.commands.set(cmdEvaluator.getCommand(), cmdEvaluator);
  }
}
