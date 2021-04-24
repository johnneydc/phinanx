import {CommandEvaluator} from '../../command-evaluator';
import {MoneyPay} from './pay';
import {MoneyReceive} from './receive';
import {MoneyTransfer} from './transfer';

export class Money extends CommandEvaluator {

  constructor() {
    super();
    this.addSubCommand(new MoneyPay());
    this.addSubCommand(new MoneyTransfer());
    this.addSubCommand(new MoneyReceive());
  }

  public getCommand(): string {
    return 'money';
  }

  public getDescription(): string {
    return 'Record the movement of your money.';
  }
}
