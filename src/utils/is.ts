export default {
  nullOrUndefined: (value: unknown): boolean => value === null || value === undefined,
  object: <T = Record<string, unknown>>(value: unknown): value is T =>
    value !== null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]',
  array: <T>(value: T | Array<T>): value is Array<T> => Array.isArray(value),
};
