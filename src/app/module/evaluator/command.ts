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

  constructor(
    public readonly data: unknown,
    public readonly displayData: string,
    public readonly lines: string[],
    public readonly complete = true
  ) { }

  public static Empty(): CommandResult {
    return new CommandResult(null, '', ['']);
  }
}
