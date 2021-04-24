import {CommandEvaluator} from '../command-evaluator';
import {Command, CommandResult} from '../command';
// import {evaluate} from 'mathjs';

export class Calc extends CommandEvaluator {

  public getCommand(): string {
    return 'calc';
  }

  protected async action(cmd: Command): Promise<CommandResult> {
    // const mathExpr = cmd.raw.replace('calc ', '');
    // const value = evaluate(mathExpr);
    // const prntValue = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    //
    // return new CommandResult(value, prntValue, [`%b.grn ${prntValue}`]);
    return CommandResult.Empty();
  }

  public getDescription(): string {
    return 'Calculates math expressions.';
  }
}
