import { parse } from '@cookbook/dot-notation';

import map, { Map } from './map';
import type { Options } from './options';
import is from './utils/is';
import toArray from './utils/to-array';
import typeOf from './utils/type-of';

type Mapping = (map: Map) => Record<string, unknown> | Record<string, unknown>[];

type Mapper = (
  mapping: Mapping,
) => <T>(
  source: Record<string, unknown | unknown[]> | Record<string, unknown | unknown[]>[],
  options?: Options,
) => T extends [] ? T[] : T;

const mapper: Mapper = (mapping: Mapping) => {
  return <T>(
    source: Record<string, unknown | unknown[]> | Record<string, unknown | unknown[]>[],
    options: Options = {},
  ): T extends [] ? T[] : T => {
    const result = toArray(source).map((src) => {
      if (!is.object(src)) {
        throw new TypeError(`Instance of "source" must be an object, but instead got "${typeOf(source)}"`);
      }

      const mapped = map.omitEntries(mapping(map(src, options)));

      if (is.array(mapped)) {
        const values: T[] = [];

        if (!mapped.length) {
          return values;
        }

        for (let i = 0; i < mapped.length; i += 1) {
          const value = mapped[i];

          if (value && Object.keys(value).length) {
            values.push(parse(value as Record<string, unknown>) as T);
          }
        }

        return values;
      }

      return (Object.keys(mapped).length ? parse<T>(mapped) : {}) as T;
    });

    return (is.array(source) ? result : result[0]) as T extends [] ? T[] : T;
  };
};

export type { Mapper, Mapping };
export default mapper;
