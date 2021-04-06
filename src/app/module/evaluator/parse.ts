import {Command, NamedArg} from './command';

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

export function parse(input: string, inputFromPrevCommand = false): Command {
  const inputParts = input.trim().split(' ');
  const namedArgs = parseNamedArgs(inputParts.slice(1));
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
