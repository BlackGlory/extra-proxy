import { isFunction } from '@blackglory/prelude'

export function bind<T extends object>(obj: T, thisArg: object = obj): T {
  return new Proxy<T>(obj, {
    get(target, propertyKey, receiver) {
      const value = Reflect.get(target, propertyKey, receiver)
      if (isFunction(value)) {
        return value.bind(thisArg)
      } else {
        return value
      }
    }
  })
}
