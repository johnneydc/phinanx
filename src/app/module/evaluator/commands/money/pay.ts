import {Command, CommandResult} from '../../command';
import {parse} from '../../parse';
import {Entry, EntryType} from '../../../idb/entry/entry';
import {EntryRepository} from '../../../idb/entry/entry-repository';
import {CommandEvaluator} from '../../command-evaluator';

export class MoneyPay extends CommandEvaluator {

  protected async action(cmd: Command): Promise<CommandResult> {
    const reParsedCmd = parse(cmd.args.join(' '));
    const amount = parseFloat(reParsedCmd.subCommand || '');
    const deductFrom = reParsedCmd.namedArgs.filter(arg => arg.name === '-f')[0].value;

    const entry = new Entry({
      datePosted: new Date(),
      amount,
      type: EntryType.out,
      deductFrom
    });

    const entryRepository = EntryRepository.get();
    const savedEntry = await entryRepository.save(entry);

    return new CommandResult(savedEntry, savedEntry.toString(), [`✅ Paid ${amount} from ${deductFrom}`]);
  }

  public getCommand(): string {
    return 'pay';
  }

  public getDescription(): string {
    return 'Pays for an expense deducted to an account.';
  }
}
