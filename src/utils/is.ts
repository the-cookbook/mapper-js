export default {
  nullOrUndefined: (value: unknown): boolean => value === null || value === undefined,
  object: <T extends Record<string, unknown>>(value: unknown): value is T =>
    value !== null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]',
  array: <T = unknown>(value: unknown): value is T[] => Array.isArray(value),
};
