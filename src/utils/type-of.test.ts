import typeOf from './type-of';

describe('utils/typeOf()', () => {
  const expectations: Record<string, unknown | unknown[]> = {
    string: 'string',
    number: 1,
    boolean: true,
    null: <string>null,
    object: {},
    array: [],
    function: (): void => null,
    date: new Date(),
  };

  Object.keys(expectations).forEach((type) => {
    it(`should flag "${<string>expectations[type]}" as "${type}"`, () => {
      expect(typeOf(expectations[type])).toStrictEqual(type);
    });
  });
});
