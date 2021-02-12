/* eslint-disable @typescript-eslint/no-explicit-any, jest/no-mocks-import */
import map from './map';
import data from './__mocks__/data';

describe('map()', () => {
  it('should match snapshot', () => {
    expect(map).toMatchSnapshot();
  });

  describe('exceptions', () => {
    it('should throw an error when source is not an object', () => {
      [true, '', 0, null, undefined, [0]].forEach((source) => {
        expect(() => map(source as any)('person.address[0]').value).toThrow(TypeError);
      });
    });
  });

  describe('default', () => {
    it('should map single keys', () => {
      expect(map(data[0])('address[0]').value).toEqual(data[0].address[0]);
      expect(map(data[0])('email').value).toEqual(data[0].email);
      expect(map(data[0])('name').transform((name: string) => name.replace(/\s/gm, '-')).value).toEqual(
        data[0].name.replace(/\s/gm, '-'),
      );
    });

    it('should map multiple keys', () => {
      expect(
        map(data[2])(['latitude', 'longitude']).transform((latitude: number, longitude: number) => [
          latitude,
          longitude,
        ]).value,
      ).toEqual([data[2].latitude, data[2].longitude]);

      expect(
        map(data[2])(['phone', 'email']).transform((phone: number, email: number) => ({
          phone,
          email,
        })).value,
      ).toEqual({
        phone: data[2].phone,
        email: data[2].email,
      });
    });
  });

  describe('options', () => {
    describe('omitNullUndefined', () => {
      it('should omit "null" and "undefined" entries', () => {
        expect(map(data[0])('closeFriends', { omitNullUndefined: true }).value).toEqual(map.suppress);
        expect(map(data[0])('non-existing', { omitNullUndefined: true }).value).toEqual(map.suppress);
      });
    });

    describe('omitStrategy', () => {
      it('should omit entries through custom strategy', () => {
        const omitStrategy = (value: unknown | unknown[]): boolean => Array.isArray(value);

        expect(map(data[0])('friends', { omitStrategy }).value).toEqual(map.suppress);
        expect(map(data[0])('tags', { omitStrategy }).value).toEqual(map.suppress);
      });
    });
  });
});
/* eslint-enable @typescript-eslint/no-explicit-any, jest/no-mocks-import */
