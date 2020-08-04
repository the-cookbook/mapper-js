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

      return (is.array(mapped) ? mapped.map(parse) : parse<T>(mapped)) as T extends [] ? T[] : T;
    });

    return (is.array(source) ? result : result[0]) as T extends [] ? T[] : T;
  };
};

export type { Mapper, Mapping };
export default mapper;
