import is from './is';

describe('utils/is', () => {
  it('should match snapshot', () => {
    expect(is).toMatchSnapshot();
  });

  describe('is.nullOrUndefined()', () => {
    it('should flag data type correctly', () => {
      expect(is.nullOrUndefined(null)).toBe(true);
      expect(is.nullOrUndefined(undefined)).toBe(true);
      expect(is.nullOrUndefined('')).toBe(false);
      expect(is.nullOrUndefined('123')).toBe(false);
    });
  });

  describe('is.object()', () => {
    it(`should flag element data type correctly`, () => {
      expect(is.object({})).toBe(true);
      expect(is.object([])).toBe(false);
      expect(is.object(1)).toBe(false);
      expect(is.object(true)).toBe(false);
      expect(is.object(null)).toBe(false);
      expect(is.object('cd ..')).toBe(false);
    });
  });

  describe('is.array()', () => {
    it(`should flag element data type correctly`, () => {
      expect(is.array([])).toBe(true);
      expect(is.array({})).toBe(false);
      expect(is.array(1)).toBe(false);
      expect(is.array(true)).toBe(false);
      expect(is.array(null)).toBe(false);
      expect(is.array('cd ..')).toBe(false);
    });
  });
});
