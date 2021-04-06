import {Injectable} from '@angular/core';
import {Command, NamedArg} from './command';
import {Calc} from './commands/calc';
import {CommandEvaluator} from './command-evaluator';
import {Copy} from './commands/copy';
import {EntryCommand} from './commands/entry/entryCommand';

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
      const cmd = this.parse(inputCmd);

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

    return resultFromLastCommand.lines;
  }

  private helpInfo(): string[] {
    const lines = ['Try these commands:', '&nbsp;'];

    for (const [command, evaluator] of this.commands.entries()) {
      lines.push(`%s.pnk ${command} \ns - ${evaluator.getDescription()}`);
    }

    return lines;
  }

  public parse(input: string, inputFromPrevCommand = false): Command {
    const inputParts = input.trim().split(' ');
    const namedArgs = this.parseNamedArgs(inputParts.slice(1));
    const subCommand = inputParts[1];

    return {
      command: inputParts[0],
      subCommand,
      args: [...inputParts.slice(1)],
      namedArgs,
      raw: input,
      inputFromPrevCommand,
      inputData: null,
      displayData: ''
    };
  }

  private parseNamedArgs(args: string[]): NamedArg[] {
    const namedArgs: NamedArg[] = [];

    args.forEach((arg, i) => {
      if (arg.includes('-')) {
        const val = args[i + 1];

        namedArgs.push({
          name: arg,
          value: val
        });
      }

    });

    return namedArgs;
  }

  private addCommand(cmdEvaluator: CommandEvaluator): void {
    this.commands.set(cmdEvaluator.getCommand(), cmdEvaluator);
  }
}
