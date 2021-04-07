import {Command, CommandResult} from '../../command';
import {EntryRepository} from '../../../idb/entry/entry-repository';
import {CommandEvaluator} from '../../command-evaluator';

export class EntryList extends CommandEvaluator {
  public async action(cmd: Command): Promise<CommandResult> {
    const entries = await EntryRepository.get().findAll();

    if (entries.length === 0) {
      return new CommandResult(entries, '', ['No entries found.']);
    }

    const displayData = entries.map(entry => entry.toString());
    return new CommandResult(entries, entries.join(', '), ['%bEntries', ...displayData]);
  }

  public getCommand(): string {
    return 'list';
  }

  public getDescription(): string {
    return 'Lists entries filtered by date. Defaults to showing all.';
  }
}
