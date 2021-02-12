/**
 * Ensure that given value is array, if not, convert it.
 * @param value
 */
const toArray = <T = unknown>(value: T | T[]): Array<T> => (Array.isArray(value) ? value : [value]);

export default toArray;
