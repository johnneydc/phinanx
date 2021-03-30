import {CommandEvaluator} from '../command-evaluator';
import {Command} from '../command';
import * as math from 'mathjs';

export class Calc extends CommandEvaluator {

  public getCommand(): string {
    return 'calc';
  }

  public async evaluate(cmd: Command): Promise<string[]> {
    const mathExpr = cmd.raw.replace('calc ', '');
    return [math.evaluate(mathExpr).toString()];
  }

  public getDescription(): string {
    return 'Calculates math expressions.';
  }
}
