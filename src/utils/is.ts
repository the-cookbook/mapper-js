export default {
  nullOrUndefined: (value: unknown): boolean => value === null || value === undefined,
  object: <T>(value: unknown): value is Record<string, T> =>
    value !== null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]',
  array: <T = unknown>(value: unknown): value is Array<T> => Array.isArray(value),
};
