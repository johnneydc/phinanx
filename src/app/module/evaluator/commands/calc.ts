import {CommandEvaluator} from '../command-evaluator';
import {Command, CommandResult} from '../command';
import * as math from 'mathjs';

export class Calc extends CommandEvaluator {

  public getCommand(): string {
    return 'calc';
  }

  public async evaluate(cmd: Command): Promise<CommandResult> {
    const mathExpr = cmd.raw.replace('calc ', '');
    const absValue = math.evaluate(mathExpr).toString();

    return { absValue,
      lines: [`%b.grn ${absValue}`]
    };
  }

  public getDescription(): string {
    return 'Calculates math expressions.';
  }
}
