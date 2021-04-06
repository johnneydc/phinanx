import {CommandEvaluator} from '../../command-evaluator';
import {Command, CommandResult} from '../../command';
import {list} from './list';

export class EntryCommand extends CommandEvaluator {

  public getCommand(): string {
    return 'entry';
  }

  public async evaluate(cmd: Command): Promise<CommandResult> {
    switch (cmd.subCommand) {
      case 'list':
        return list(cmd);
      default:
        return CommandResult.Empty();
    }
  }

  public getDescription(): string {
    return 'List of all expenses entry.';
  }
}
