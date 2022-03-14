declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

declare type Nullable<T> = T | null

declare type Recordable<T = any> = Record<string, T>

declare interface Window {
  SERVER_CONFIG: any
}
