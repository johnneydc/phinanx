import {Command, CommandResult} from '../../command';
import {EntryRepository} from '../../../idb/entry/entry-repository';

function validateCommandIsRight(cmd: Command): void {
  if (cmd.command !== 'entry') {
    throw new Error('Invalid command.');
  }

  if (cmd.subCommand !== 'list') {
    throw new Error('Invalid command.');
  }
}

export async function list(cmd: Command): Promise<CommandResult> {
  validateCommandIsRight(cmd);
  const entries = await EntryRepository.get().findAll();

  if (entries.length === 0) {
    return new CommandResult(entries, '', ['No entries found.']);
  }

  const displayData = entries.map(entry => entry.toString());
  console.log(displayData);
  return new CommandResult(entries, entries.join(', '), ['%bEntries', ...displayData]);
}
