function parseNamedArgs(args: string[]): NamedArg[] {
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

export function cmdParse(input: string): Command {
  const inputParts = input.trim().split(' ');
  const namedArgs = parseNamedArgs(inputParts.slice(1));
  const subCommand = inputParts[1];

  return {
    command: inputParts[0],
    subCommand,
    args: [...inputParts.slice(1)],
    namedArgs
  };
}

export interface Command {
  command: string;
  subCommand?: string;
  args: string[];
  namedArgs: NamedArg[];
}

export interface NamedArg {
  name: string;
  longName?: string;
  value: string;
}
