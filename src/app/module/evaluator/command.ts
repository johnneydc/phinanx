export interface Command {
  command: string;
  subCommand?: string;
  args: string[];
  namedArgs: NamedArg[];
  raw: string;
  inputFromPrevCommand: boolean;
}

export interface NamedArg {
  name: string;
  longName?: string;
  value: string;
}
