// NOTE: cannot export PropType from vue module
export type PropConstructor<T = any> =
  | {
      new (...args: any[]): T;
    }
  | {
      (): T;
    }
  | PropMethod<T>;
type PropMethod<T, TConstructor = any> = [T] extends [
  ((...args: any) => any) | undefined
]
  ? {
      new (): TConstructor;
      (): T;
      readonly prototype: TConstructor;
    }
  : never;
