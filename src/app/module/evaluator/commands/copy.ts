import {CommandEvaluator} from '../command-evaluator';
import {Command, CommandResult} from '../command';
import * as math from 'mathjs';

export class Copy extends CommandEvaluator {

  public getCommand(): string {
    return 'copy';
  }

  protected async action(cmd: Command): Promise<CommandResult> {
    switch (typeof cmd.inputData) {
      case 'boolean':
      case 'object':
      case 'string':
      case 'number':
        const absValue = cmd.inputData?.toString() || '';
        await navigator.clipboard.writeText(cmd.displayData);

        return new CommandResult(absValue, cmd.displayData, [`%b.grn ${absValue}\ns copied to clipboard.`]);
      default:
        throw new Error('Unable to copy result data.');
    }
  }

  public getDescription(): string {
    return 'Copies text to clipboard.';
  }
}
