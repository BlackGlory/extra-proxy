import { NonEmptyArray, pass } from '@blackglory/prelude'

type PathCollector<Obj extends object> = {
  [Key in keyof Obj]:
    Obj[Key] extends object
      ? (
          (() => Array<string | symbol>)
        & PathCollector<Obj[Key]>
        )
      : () => Array<string | symbol>
}

export function createPathCollector<T extends object>(): PathCollector<T> {
  return new Proxy(Object.create(null), {
    get(target, prop) {
      return createCallableNestedProxy([prop])
    }
  })

  function createCallableNestedProxy(
    path: NonEmptyArray<string | symbol>
  ): PathCollector<T> {
    return new Proxy(pass, {
      get(target, prop) {
        return createCallableNestedProxy([...path, prop])
      }
    , apply(target, thisArg, args) {
        return path
      }
    }) as unknown as PathCollector<T>
  }
}
