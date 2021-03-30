import {CommandEvaluator} from '../command-evaluator';
import {Command, CommandResult} from '../command';

export class ToMoney extends CommandEvaluator {

  public getCommand(): string {
    return 'toMoney';
  }

  public async evaluate(cmd: Command): Promise<CommandResult> {
    if (cmd.subCommand === undefined) {
      throw new Error('Syntax error.');
    }

    const amount = parseFloat(cmd.subCommand);
    const absValue = amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

    return {absValue,
      lines: [`%b.grn ${absValue}`]
    };
  }

  public getDescription(): string {
    return 'Formats number to money display.';
  }
}
