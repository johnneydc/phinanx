import {CommandEvaluator} from '../command-evaluator';
import {Command} from '../command';

export class ToMoney extends CommandEvaluator {

  public getCommand(): string {
    return 'toMoney';
  }

  public async evaluate(cmd: Command): Promise<string[]> {
    if (cmd.subCommand === undefined) {
      throw new Error('Syntax error.');
    }

    const amount = parseFloat(cmd.subCommand);

    return [amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')];
  }

  public getDescription(): string {
    return 'Formats number to money display.';
  }
}
