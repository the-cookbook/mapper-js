const typeOf = (value: unknown | unknown[]): string =>
  ({}.toString
    .call(value)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase());

export default typeOf;
