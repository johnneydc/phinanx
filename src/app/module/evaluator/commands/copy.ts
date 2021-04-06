import {CommandEvaluator} from '../command-evaluator';
import {Command, CommandResult} from '../command';
import * as math from 'mathjs';

export class Copy extends CommandEvaluator {

  public getCommand(): string {
    return 'copy';
  }

  public async evaluate(cmd: Command): Promise<CommandResult> {
    const absValue = cmd.subCommand || '';
    await navigator.clipboard.writeText(cmd.subCommand || '');

    return { absValue,
      lines: [`%b.grn ${absValue}\ns copied to clipboard.`]
    };
  }

  public getDescription(): string {
    return 'Copies text to clipboard.';
  }
}
