import {Command, CommandResult} from '../../command';
import {Entry, EntryType} from '../../../idb/entry/entry';
import {EntryRepository} from '../../../idb/entry/entry-repository';
import {CommandEvaluator} from '../../command-evaluator';

export class MoneyPay extends CommandEvaluator {

  protected async action(cmd: Command): Promise<CommandResult> {
    const amount = parseFloat(cmd.subCommand || '');
    const deductFrom = cmd.namedArgs.filter(arg => arg.name === '-f')[0];
    const category = cmd.namedArgs.filter(arg => arg.name === '-c')[0];

    if (!deductFrom) {
      throw new Error('Missing required account to deduct from. Use -f parameter.');
    }

    if (!category) {
      throw new Error('Missing required category for expense. Use -c parameter.');
    }

    const entry = new Entry({
      datePosted: new Date(),
      amount,
      type: EntryType.out,
      deductFrom: deductFrom.value,
      category: category.value
    });

    const entryRepository = EntryRepository.get();
    const savedEntry = await entryRepository.save(entry);

    return new CommandResult(savedEntry, savedEntry.toString(), [`✅ Paid ${amount} from ${deductFrom} for ${category}`]);
  }

  public getCommand(): string {
    return 'pay';
  }

  public getDescription(): string {
    return 'Pays for an expense deducted to an account.';
  }
}
