/**
 * Ensure that given value is array, if not, convert it.
 * @param value
 */
const toArray = <T>(value: T | T[]): T extends Array<unknown> ? T : Array<T> =>
  (Array.isArray(value) ? value : [value]) as T extends Array<unknown> ? T : Array<T>;

export default toArray;
