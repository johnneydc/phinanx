export interface Command {
  command: string;
  subCommand?: string;
  args: string[];
  namedArgs: NamedArg[];
  raw: string;
  inputFromPrevCommand: boolean;
  inputData: unknown;
  displayData: string;
}

export interface NamedArg {
  name: string;
  longName?: string;
  value: string;
}

export class CommandResult {
  public readonly data: unknown;
  public readonly lines: string[];
  public readonly displayData: string;

  constructor(data: unknown, displayData: string, lines: string[]) {
    this.data = data;
    this.lines = lines;
    this.displayData = displayData;
  }

  public static Empty(): CommandResult {
    return new CommandResult(null, '', ['']);
  }
}
