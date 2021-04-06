import {Model} from './model';

class TestModel extends Model {
  constructor(
    private readonly num: number,
    private readonly text: string
  ) {
    super('1');
  }

  public toString(): string {
    return 'TestModel';
  }
}

class TestModel2 extends Model {
  constructor(
    private readonly num: number,
    private readonly text: string
  ) {
    super('2');
  }

  public toString(): string {
      throw new Error('Method not implemented.');
  }
}

class TestModel3 extends Model {
  constructor(
    private readonly model1: TestModel,
    private readonly model2: TestModel2
  ) {
    super('3');
  }

  public toString(): string {
    return '';
  }
}

describe('Model', () => {
  it('two given objects of the same property but differ in value should not be equal', () => {
    const model1 = new TestModel(1, 'hello');
    const model2 = new TestModel(2, 'hello');

    expect(model1.equals(model2)).toBeFalse();
  });

  it('two given objects of the same property and same value should be equal', () => {
    const model1 = new TestModel(1, '1');
    const model2 = new TestModel(1, '1');

    expect(model1.equals(model2)).toBeTrue();
  });

  it('two entirely diff object should not be equal', () => {
    const model1 = new TestModel(1, '2');
    const model2 = new TestModel2(1, '2');

    expect(model1.equals(model2)).toBeFalse();
  });

  it('should properly equate two object with objects as property', () => {
    const model1 = new TestModel(1, '2');
    const model2 = new TestModel2(2, 'h');

    const modelX = new TestModel3(model1, model2);
    const modelY = new TestModel3(model1, model2);

    expect(modelX.equals(modelY)).toBeTrue();
  });

  it('should not equate two object with objects as property but not of the same values', () => {
    const model1 = new TestModel(1, '2');
    const model2 = new TestModel2(2, 'h');
    const model3 = new TestModel(2, 'x');

    const modelX = new TestModel3(model3, model2);
    const modelY = new TestModel3(model1, model2);

    expect(modelX.equals(modelY)).toBeFalse();
  });
});
