import {Command, CommandResult} from './command';
import {parse} from './parse';

export abstract class CommandEvaluator {
  public abstract getCommand(): string;
  public abstract getDescription(): string;

  protected readonly subCommands: Map<string, CommandEvaluator> = new Map<string, CommandEvaluator>();

  public async process(cmd: Command): Promise<CommandResult> {
    if (!this.hasSubCommands()) {
      return this.action(cmd);
    }

    if (CommandEvaluator.commandIsForHelp(cmd) || cmd.subCommand === undefined) {
      return this.helpDisplay(cmd);
    }

    const subCommandDirective = parse(cmd.args.slice(1).join(' '));
    const subCommand = this.subCommands.get(cmd.subCommand);

    if (subCommand === undefined) {
      throw new Error(`Sub-command ${cmd.subCommand} does not exist on ${this.getCommand()} command.`);
    }

    return subCommand.action(subCommandDirective);
  }

  protected async action(cmd: Command): Promise<CommandResult> {
    return CommandResult.Empty();
  }

  protected addSubCommand(subCmd: CommandEvaluator): void {
    this.subCommands.set(subCmd.getCommand(), subCmd);
  }

  public async helpDisplay(cmd: Command): Promise<CommandResult> {
    const lines = [`Sub-commands for '${this.getCommand()}':`, ''];

    for (const [name, evaluator] of this.subCommands.entries()) {
      lines.push(`%b.pnk ${name}\ns - ${evaluator.getDescription()}`);
    }

    return new CommandResult(null, '', lines);
  }

  private hasSubCommands(): boolean {
    return this.subCommands.size > 0;
  }

  private static commandIsForHelp(cmd: Command): boolean {
    return cmd.subCommand === undefined || cmd.subCommand === '' || cmd.subCommand === '?';
  }
}
