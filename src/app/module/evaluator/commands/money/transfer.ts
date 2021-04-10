import {CommandEvaluator} from '../../command-evaluator';

export class MoneyTransfer extends CommandEvaluator {
  public getCommand(): string {
    return 'transfer';
  }

  public getDescription(): string {
    return 'Transfers amount from one account to another.';
  }

}
