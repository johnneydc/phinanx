import {Injectable} from '@angular/core';
import {Command, NamedArg} from './command';
import {Calc} from './commands/calc';
import {CommandEvaluator} from './command-evaluator';
import {Copy} from './commands/copy';
import {EntryCommand} from './commands/entry/entryCommand';
import {parse} from './parse';

@Injectable()
export class EvaluatorService {

  private readonly commands: Map<string, CommandEvaluator> = new Map();

  constructor() {
    this.addCommand(new Calc());
    this.addCommand(new Copy());
    this.addCommand(new EntryCommand());
  }

  public async evaluate(input: string): Promise<string[]> {
    const inputCmds = input.split('|');
    let resultFromLastCommand = null;

    for (const inputCmd of inputCmds) {
      const cmd = parse(inputCmd);

      if (cmd.command === '?') {
        return this.helpInfo();
      }

      if (resultFromLastCommand) {
        cmd.inputData = resultFromLastCommand.data;
      }

      const evaluator = this.commands.get(cmd.command);
      if (!evaluator) {
        throw new Error(`'${cmd.command}' command not found.`);
      }

      resultFromLastCommand = await evaluator.evaluate(cmd);
    }

    if (!resultFromLastCommand) {
      return ['No result.'];
    }

    console.log(resultFromLastCommand);

    return resultFromLastCommand.lines;
  }

  private helpInfo(): string[] {
    const lines = ['Try these commands:', '&nbsp;'];

    for (const [command, evaluator] of this.commands.entries()) {
      lines.push(`%s.pnk ${command} \ns - ${evaluator.getDescription()}`);
    }

    return lines;
  }

  private addCommand(cmdEvaluator: CommandEvaluator): void {
    this.commands.set(cmdEvaluator.getCommand(), cmdEvaluator);
  }
}
