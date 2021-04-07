import {CommandEvaluator} from './command-evaluator';
import {Command, CommandResult} from './command';
import {parse} from './parse';

class SubCommand extends CommandEvaluator {
  public async action(cmd: Command): Promise<CommandResult> {
    return new CommandResult(100, '100', []);
  }

  public getCommand(): string {
    return 'sub';
  }

  public getDescription(): string {
    return 'sub description';
  }
}

class MainCommand extends CommandEvaluator {
  constructor() {
    super();
    this.addSubCommand(new SubCommand());
  }

  public async action(cmd: Command): Promise<CommandResult> {
    return new CommandResult(5, '5', []);
  }

  public getCommand(): string {
    return 'main';
  }

  public getDescription(): string {
    return 'main description';
  }
}

class TestCommand extends CommandEvaluator {
  public async action(cmd: Command): Promise<CommandResult> {
    return CommandResult.Empty();
  }

  public getCommand(): string {
    return 'test';
  }

  public getDescription(): string {
    return 'test description';
  }
}

describe('CommandEvaluator', () => {
  it('when an input with no 1st param is passed to a command with no sub-commands there help command should not be called', () => {
    const cmd = new TestCommand();
    spyOn(cmd, 'helpDisplay');

    const input = parse('test');
    cmd.process(input);

    expect(cmd.helpDisplay).not.toHaveBeenCalled();
  });

  it('sub-command should process query', async () => {
    const cmd = new MainCommand();
    const input = parse('main sub');

    const result = await cmd.process(input);

    expect(result.data).toBe(100);
    return;
  });
});
