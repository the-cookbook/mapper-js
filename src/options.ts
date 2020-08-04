interface Options {
  omitNullUndefined?: boolean;
  omitStrategy?: (value: unknown) => boolean;
}

const defaultOptions: Options = {
  omitNullUndefined: undefined,
  omitStrategy: undefined,
};

export type { Options };
export { defaultOptions };
