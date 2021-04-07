import {CommandEvaluator} from '../../command-evaluator';
import {EntryList} from './list';
import {EntryPay} from './pay';

export class EntryCommand extends CommandEvaluator {

  constructor() {
    super();
    this.addSubCommand(new EntryList());
    this.addSubCommand(new EntryPay());
  }

  public getCommand(): string {
    return 'entry';
  }

  public getDescription(): string {
    return 'List of all expenses entry.';
  }
}
