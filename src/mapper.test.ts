/* eslint-disable @typescript-eslint/no-explicit-any, jest/no-mocks-import */
import mapper from './mapper';
import data from './__mocks__/data';

const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

describe('mapper()', () => {
  it('should match snapshot', () => {
    expect(mapper).toMatchSnapshot();
  });

  describe('exceptions', () => {
    it('should throw an error when source is not an object', () => {
      [true, '', 0, null, undefined, [0]].forEach((source) => {
        expect(() =>
          mapper((map) => ({
            address: map<string>('person.address').value,
            active: true,
          }))(source as any),
        ).toThrow(TypeError);
      });
    });
  });

  describe('data source', () => {
    describe('object', () => {
      it('should perform simple mappings accordingly', () => {
        const mapping = mapper((map) => ({
          active: map<boolean>('isActive').value,
          'account.balance': map<string>('balance').value,
          'person.age': map<string>('age').value,
          'person.address': map('address').value,
          friends: map('friends').value,
        }));

        const expectation = {
          active: true,
          account: {
            balance: data[0].balance,
          },
          person: {
            age: data[0].age,
            address: data[0].address,
          },
          friends: data[0].friends,
        };

        expect(mapping(data[0])).toStrictEqual(expectation);
      });

      it('should perform mappings with transformations accordingly', () => {
        const mapping = mapper((map) => ({
          username: map('name').transform((name: string) => kebabCase(name)).value,
          active: map('isActive').value,
          'account.balance': map('balance').transform((balance: string) =>
            balance.substring(0, balance.length - 4).padEnd(balance.length, '*'),
          ).value,
          'person.age': map('age').value,
          'person.address': map('address').value,
          closeFriends: map('friends').transform((friends: unknown[]) => friends.slice(0, 2)).value,
        }));

        const expectation = {
          username: kebabCase(data[0].name),
          active: data[0].isActive,
          account: {
            balance: data[0].balance.substring(0, data[0].balance.length - 4).padEnd(data[0].balance.length, '*'),
          },
          person: {
            age: data[0].age,
            address: data[0].address,
          },
          closeFriends: data[0].friends.slice(0, 2),
        };

        expect(mapping(data[0])).toStrictEqual(expectation);
      });

      it('should perform mappings with multiple keys accordingly', () => {
        const mapping = mapper((map) => ({
          coords: map(['latitude', 'longitude']).transform((latitude: number, longitude: number) => [
            latitude,
            longitude,
          ]).value,
          contact: map(['phone', 'email']).transform((phone: number, email: number) => ({
            phone,
            email,
          })).value,
        }));

        const expectation = {
          coords: [data[0].latitude, data[0].longitude],
          contact: {
            phone: data[0].phone,
            email: data[0].email,
          },
        };

        expect(mapping(data[0])).toStrictEqual(expectation);
      });
    });

    describe('array', () => {
      it('should perform simple mappings accordingly', () => {
        const mapping = mapper((map) => ({
          active: map<boolean>('isActive').value,
          'account.balance': map<string>('balance').value,
          'person.age': map<string>('age').value,
          'person.address': map('address').value,
          friends: map('friends').value,
        }));

        const expectation = [
          {
            active: data[1].isActive,
            account: {
              balance: data[1].balance,
            },
            person: {
              age: data[1].age,
              address: data[1].address,
            },
            friends: data[1].friends,
          },
          {
            active: data[2].isActive,
            account: {
              balance: data[2].balance,
            },
            person: {
              age: data[2].age,
              address: data[2].address,
            },
            friends: data[2].friends,
          },
        ];

        expect(mapping([data[1], data[2]])).toStrictEqual(expectation);
      });

      it('should perform mappings with transformations accordingly', () => {
        const mapping = mapper((map) => ({
          username: map('name').transform((name: string) => kebabCase(name)).value,
          active: map('isActive').value,
          'account.balance': map('balance').transform((balance: string) =>
            balance.substring(0, balance.length - 4).padEnd(balance.length, '*'),
          ).value,
          'person.age': map('age').value,
          'person.address': map('address').value,
          closeFriends: map('friends').transform((friends: unknown[]) => friends.slice(0, 2)).value,
        }));

        const expectation = [
          {
            username: kebabCase(data[1].name),
            active: data[1].isActive,
            account: {
              balance: data[1].balance.substring(0, data[1].balance.length - 4).padEnd(data[1].balance.length, '*'),
            },
            person: {
              age: data[1].age,
              address: data[1].address,
            },
            closeFriends: data[1].friends.slice(0, 2),
          },
          {
            username: kebabCase(data[2].name),
            active: data[2].isActive,
            account: {
              balance: data[2].balance.substring(0, data[2].balance.length - 4).padEnd(data[2].balance.length, '*'),
            },
            person: {
              age: data[2].age,
              address: data[2].address,
            },
            closeFriends: data[2].friends.slice(0, 2),
          },
          {
            username: kebabCase(data[3].name),
            active: data[3].isActive,
            account: {
              balance: data[3].balance.substring(0, data[3].balance.length - 4).padEnd(data[3].balance.length, '*'),
            },
            person: {
              age: data[3].age,
              address: data[3].address,
            },
            closeFriends: data[3].friends.slice(0, 2),
          },
        ];

        expect(mapping([data[1], data[2], data[3]])).toStrictEqual(expectation);
      });

      it('should perform mappings with multiple keys accordingly', () => {
        const mapping = mapper((map) => ({
          coords: map(['latitude', 'longitude']).transform((latitude: number, longitude: number) => [
            latitude,
            longitude,
          ]).value,
          contact: map(['phone', 'email']).transform((phone: number, email: number) => ({
            phone,
            email,
          })).value,
        }));

        const expectation = [
          {
            coords: [data[0].latitude, data[0].longitude],
            contact: {
              phone: data[0].phone,
              email: data[0].email,
            },
          },
          {
            coords: [data[1].latitude, data[1].longitude],
            contact: {
              phone: data[1].phone,
              email: data[1].email,
            },
          },
          {
            coords: [data[2].latitude, data[2].longitude],
            contact: {
              phone: data[2].phone,
              email: data[2].email,
            },
          },
          {
            coords: [data[3].latitude, data[3].longitude],
            contact: {
              phone: data[3].phone,
              email: data[3].email,
            },
          },
        ];

        expect(mapping([data[0], data[1], data[2], data[3]])).toStrictEqual(expectation);
      });
    });
  });

  describe('mapping', () => {
    describe('array', () => {
      it('should perform simple mappings accordingly', () => {
        const mapping = mapper((map) => [
          {
            active: map<boolean>('isActive').value,
            'account.balance': map<string>('balance').value,
          },
          {
            'person.age': map<string>('age').value,
            'person.address': map('address').value,
            friends: map('friends').value,
          },
        ]);

        const expectation = [
          {
            active: data[1].isActive,
            account: {
              balance: data[1].balance,
            },
          },
          {
            person: {
              age: data[1].age,
              address: data[1].address,
            },
            friends: data[1].friends,
          },
        ];

        expect(mapping(data[1])).toStrictEqual(expectation);
      });

      it('should perform mappings with transformations accordingly', () => {
        const mapping = mapper((map) => [
          {
            username: map('name').transform((name: string) => kebabCase(name)).value,
            active: map('isActive').value,
          },
          {
            'account.balance': map('balance').transform((balance: string) =>
              balance.substring(0, balance.length - 4).padEnd(balance.length, '*'),
            ).value,
          },
          {
            'person.age': map('age').value,
            'person.address': map('address').value,
            closeFriends: map('friends').transform((friends: unknown[]) => friends.slice(0, 2)).value,
          },
        ]);

        const expectation = [
          {
            username: kebabCase(data[1].name),
            active: data[1].isActive,
          },
          {
            account: {
              balance: data[1].balance.substring(0, data[1].balance.length - 4).padEnd(data[1].balance.length, '*'),
            },
          },
          {
            person: {
              age: data[1].age,
              address: data[1].address,
            },
            closeFriends: data[1].friends.slice(0, 2),
          },
        ];

        expect(mapping(data[1])).toStrictEqual(expectation);
      });

      it('should perform mappings with multiple keys accordingly', () => {
        const mapping = mapper((map) => [
          {
            coords: map(['latitude', 'longitude']).transform((latitude: number, longitude: number) => [
              latitude,
              longitude,
            ]).value,
          },
          {
            contact: map(['phone', 'email']).transform((phone: number, email: number) => ({
              phone,
              email,
            })).value,
          },
        ]);

        const expectation = [
          {
            coords: [data[3].latitude, data[3].longitude],
          },

          {
            contact: {
              phone: data[3].phone,
              email: data[3].email,
            },
          },
        ];

        expect(mapping(data[3])).toStrictEqual(expectation);
      });
    });
  });

  describe('options', () => {
    describe('omitNullUndefined', () => {
      it('should omit "null" and "undefined" from a single entry', () => {
        const objectMapping = mapper((map) => ({
          'account.balance': map<string>('non-available-key').value,
        }));

        const arrayMapping = mapper((map) => [
          {
            'account.balance': map<string>('non-available-key').value,
          },
        ]);

        expect(objectMapping(data[1], { omitNullUndefined: true })).toStrictEqual({});

        expect(arrayMapping(data[1], { omitNullUndefined: true })).toStrictEqual([]);
      });

      it('should omit "null" and "undefined" entries', () => {
        const mapping = mapper((map) => ({
          active: map<boolean>('isActive').value,
          'account.balance': map<string>('balance').value,
          'person.age': map<string>('age').value,
          'person.address': map('address').value,
          commonFriends: map('commonFriends').value,
        }));

        const expectation = {
          active: data[1].isActive,
          account: {
            balance: data[1].balance,
          },
          person: {
            age: data[1].age,
            address: data[1].address,
          },
        };

        expect(mapping(data[1], { omitNullUndefined: true })).toStrictEqual(expectation);
      });
    });

    describe('omitStrategy', () => {
      it('should omit entries through custom strategy', () => {
        const mapping = mapper((map) => ({
          active: map<boolean>('isActive').value,
          'account.balance': map<string>('balance').value,
          'person.age': map<string>('age').value,
          'person.address': map('address').value,
          'person.tags': map('tags').value,
          friends: map('friends').value,
        }));

        const expectation = {
          active: data[1].isActive,
          account: {
            balance: data[1].balance,
          },
          person: {
            age: data[1].age,
            address: data[1].address,
          },
        };

        const omitStrategy = (value: unknown | unknown[]) => Array.isArray(value);

        expect(mapping(data[1], { omitStrategy })).toStrictEqual(expectation);
      });
    });
  });
});
