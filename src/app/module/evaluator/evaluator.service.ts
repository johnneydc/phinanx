import {Injectable} from '@angular/core';
import {Command, NamedArg} from './command';
import {Calc} from './commands/calc';
import {CommandEvaluator} from './command-evaluator';
import {ToMoney} from './commands/toMoney';

@Injectable()
export class EvaluatorService {

  private readonly commands: Map<string, CommandEvaluator> = new Map();

  constructor() {
    this.setCommand(new Calc());
    this.setCommand(new ToMoney());
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
        cmd.subCommand = resultFromLastCommand[0];
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

    return resultFromLastCommand;
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
      inputFromPrevCommand
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

  private setCommand(cmdEvaluator: CommandEvaluator): void {
    this.commands.set(cmdEvaluator.getCommand(), cmdEvaluator);
  }
}
