import { MapPropsByKey } from 'hotypes'

export function applyPropertyDecorators<
  Obj extends object
, Keys extends keyof Obj
, OldValue
, NewValue
>(
  obj: Obj
, propertyKeys: Keys[]
, propertyDecorator: (value: OldValue) => NewValue
): MapPropsByKey<Obj, Keys, NewValue> {
  return new Proxy(obj, {
    get(target, propertyKey, receiver) {
      const value = Reflect.get(target, propertyKey, receiver)
      if (propertyKeys.includes(propertyKey as Keys)) {
        return propertyDecorator(value)
      } else {
        return value
      }
    }
  }) as MapPropsByKey<Obj, Keys, NewValue>
}
