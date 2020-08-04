const toArray = <T>(source: T | T[]): T[] => (Array.isArray(source) ? source : [source]);

export default toArray;
