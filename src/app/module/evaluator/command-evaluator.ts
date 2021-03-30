import {Command, CommandResult} from './command';

export abstract class CommandEvaluator {
  public abstract getCommand(): string;
  public abstract getDescription(): string;
  public abstract evaluate(cmd: Command): Promise<CommandResult>;
}
