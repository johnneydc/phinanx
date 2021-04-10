import {CommandEvaluator} from '../../command-evaluator';

export class MoneyReceive extends CommandEvaluator {
  public getCommand(): string {
    return 'receive';
  }

  public getDescription(): string {
    return 'Receive an amount and put it into an account.';
  }
}
