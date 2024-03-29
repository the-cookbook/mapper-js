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

const map = (source: Record<string, unknown>, mapperOptions: Options = {}): Map => {
  if (!is.object(source)) {
    throw new TypeError(`Instance of "source" must be an object, but instead got "${typeOf(source)}"`);
  }

  return <T = unknown>(keys: string | string[], options: Options = {}) => {
    const OPTIONS = { ...defaultOptions, ...mapperOptions, ...options };

    let result: unknown | unknown[] = is.array(keys) ? keys.map((key) => pick(source, key)) : pick(source, keys);

    return {
      transform(callback: TransformCallback) {
        result = is.array(keys) ? callback(...(<unknown[]>result)) : callback(result);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this;
      },
      get value(): T extends [] ? T[] : T {
        const { omitNullUndefined, omitStrategy } = OPTIONS;

        if ((is.nullOrUndefined(result) && omitNullUndefined) || (omitStrategy && omitStrategy(result))) {
          return suppress as unknown as T extends [] ? T[] : T;
        }

        return result as T extends [] ? T[] : T;
      },
    };
  };
};

map.omitEntries = <T extends Record<string, unknown>>(entries: T | T[]): T => {
  const result = toArray(entries).map((entry) => {
    const values: Record<string, unknown> = {};
    const keys = Object.keys(entry);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];

      if (entry[key] !== suppress) {
        values[key] = entry[key];
      }
    }

    return values;
  });

  return (is.array(entries) ? result : result[0]) as T;
};

map.suppress = suppress;

export type { Map, MapMethods, TransformCallback };
export default map;
