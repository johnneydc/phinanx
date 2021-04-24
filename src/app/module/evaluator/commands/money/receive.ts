import { Entry, EntryType } from 'src/app/module/idb/entry/entry';
import { EntryRepository } from 'src/app/module/idb/entry/entry-repository';
import { Command, CommandResult } from '../../command';
import {CommandEvaluator} from '../../command-evaluator';

export class MoneyReceive extends CommandEvaluator {

  protected async action(cmd: Command): Promise<CommandResult> {
    const amount = parseFloat(cmd.subCommand || '');
    const accountTo = cmd.namedArgs.filter(arg => arg.name === '-t')[0];
    
    if (!accountTo) {
      throw new Error('Missing required account to receive the money. Use -t parameter.');
    }

    const entry = new Entry({
      datePosted: new Date(),
      amount,
      type: EntryType.in,
      accountTo: accountTo.value
    });

    const savedEntry = await EntryRepository.get().save(entry);

    return new CommandResult(savedEntry, savedEntry.toString(), [`✅ Received ${amount} in ${accountTo.value}`]);
  }

  public getCommand(): string {
    return 'receive';
  }

  public getDescription(): string {
    return 'Receive an amount and put it into an account.';
  }
}
