import {CommandEvaluator} from '../command-evaluator';
import {Command, CommandResult} from '../command';
import * as math from 'mathjs';

export class Calc extends CommandEvaluator {

  public getCommand(): string {
    return 'calc';
  }

  protected async action(cmd: Command): Promise<CommandResult> {
    const mathExpr = cmd.raw.replace('calc ', '');
    const value = math.evaluate(mathExpr);
    const prntValue = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

    return new CommandResult(value, prntValue, [`%b.grn ${prntValue}`]);
  }

  public getDescription(): string {
    return 'Calculates math expressions.';
  }
}
