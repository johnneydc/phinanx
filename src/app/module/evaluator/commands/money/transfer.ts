import { Entry, EntryType } from 'src/app/module/idb/entry/entry';
import { EntryRepository } from 'src/app/module/idb/entry/entry-repository';
import { Command, CommandResult } from '../../command';
import {CommandEvaluator} from '../../command-evaluator';

export class MoneyTransfer extends CommandEvaluator {

  protected async action(cmd: Command): Promise<CommandResult> {
    const amount = parseFloat(cmd.subCommand || '');
    const accountTo = cmd.namedArgs.filter(arg => arg.name === '-t')[0];
    const deductFrom = cmd.namedArgs.filter(arg => arg.name === '-f')[0];

    if (!accountTo) {
      throw new Error('Missing required account to receive the money. Use -t parameter.');
    }

    if (!deductFrom) {
      throw new Error('Missing required account to deduct from. Use -f parameter.');
    }

    const entry = new Entry({
      datePosted: new Date(),
      amount,
      type: EntryType.transfer,
      accountTo: accountTo.value,
      deductFrom: deductFrom.value
    });

    const savedEntry = await EntryRepository.get().save(entry);

    return new CommandResult(savedEntry, savedEntry.toString(), [`✅ Transferred ${amount} from ${deductFrom.value} to ${accountTo.value}.`]);
  }

  public getCommand(): string {
    return 'transfer';
  }

  public getDescription(): string {
    return 'Transfers amount from one account to another.';
  }

}
