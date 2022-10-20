export type Decorator<T> = (value: T) => T

export function applyPropertyDecorators<T extends object, U>(
  obj: T
, propertyKeys: PropertyKey[]
, propertyDecorator: Decorator<U>
): T {
  return new Proxy<T>(obj, {
    get(target, propertyKey, receiver) {
      const value = Reflect.get(target, propertyKey, receiver)
      if (propertyKeys.includes(propertyKey)) {
        return propertyDecorator(value as unknown as U)
      } else {
        return value
      }
    }
  })
}
