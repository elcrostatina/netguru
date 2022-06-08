type NonFunctionPropertyNames<O> = {
  [K in keyof O]: O[K] extends Function ? never : K;
}[keyof O];

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
