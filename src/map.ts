import { pick } from '@cookbook/dot-notation';

import { defaultOptions, Options } from './options';
import toArray from './utils/to-array';
import is from './utils/is';
import typeOf from './utils/type-of';

type TransformCallback = (...args: unknown[]) => unknown | unknown[];

type MapMethods<T = unknown> = {
  transform(callback: TransformCallback): MapMethods<T>;
  readonly value: T extends [] ? T[] : T;
};

type Map = <T = unknown>(keys: string | string[], options?: Options) => MapMethods<T>;

const suppress = Symbol('map-suppress');

const map = <T = unknown>(source: Record<string, unknown | unknown[]>, mapperOptions: Options = {}): Map => {
  if (!is.object(source)) {
    throw new TypeError(`Instance of "source" must be an object, but instead got "${typeOf(source)}"`);
  }

  return <T = unknown>(keys: string | string[], options: Options = {}) => {
    const OPTIONS = { ...defaultOptions, ...mapperOptions, ...options };

    let result: unknown | unknown[] = is.array(keys) ? keys.map((key) => pick(source, key)) : pick(source, keys);

    return {
      transform(callback: TransformCallback) {
        result = is.array(keys) ? callback(...(<unknown[]>result)) : callback(result);

        return this;
      },
      get value(): T extends [] ? T[] : T {
        const { omitNullUndefined, omitStrategy } = OPTIONS;

        if ((is.nullOrUndefined(result) && omitNullUndefined) || (omitStrategy && omitStrategy(result))) {
          return (suppress as unknown) as T extends [] ? T[] : T;
        }

        return result as T extends [] ? T[] : T;
      },
    };
  };
};

map.omitEntries = (
  entries: Record<string, unknown | unknown[]> | Record<string, unknown | unknown[]>[],
): Record<string, unknown | unknown[]> | Record<string, unknown | unknown[]>[] => {
  const result = toArray(entries).map((entry) => {
    return Object.keys(entry).reduce((acc, key) => {
      if (entry[key] !== suppress) {
        acc[key] = entry[key];
      }

      return acc;
    }, {} as Record<string, unknown | unknown[]>);
  });

  return is.array(entries) ? result : result[0];
};

map.suppress = suppress;

export type { Map, MapMethods, TransformCallback };
export default map;
