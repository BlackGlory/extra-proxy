export function unboxNonCallable<T extends object>(getter: () => T): T {
  const fakeTarget = Object.create(null)
  const proxy = new Proxy(fakeTarget, {
    get(_, propertyKey, receiver) {
      const target = getter()
      return Reflect.get(target, propertyKey, receiver)
    }
  , set(_ ,propertyKey, value, receiver) {
      const target = getter()
      return Reflect.set(target, propertyKey, value, receiver)
    }
  , has(_, propertyKey) {
      const target = getter()
      return Reflect.has(target, propertyKey)
    }
  , ownKeys(_) {
      const target = getter()
      return Reflect.ownKeys(target)
    }
  , defineProperty(_, propertyKey, attributes) {
      const target = getter()
      return Reflect.defineProperty(target, propertyKey, attributes)
    }
  , deleteProperty(_, propertyKey) {
      const target = getter()
      return Reflect.deleteProperty(target ,propertyKey)
    }
  , getOwnPropertyDescriptor(_, propertyKey) {
      const target = getter()
      return Reflect.getOwnPropertyDescriptor(target, propertyKey)
    }
  , getPrototypeOf(_) {
      const target = getter()
      return Reflect.getPrototypeOf(target)
    }
  , setPrototypeOf(_, prototype) {
      const target = getter()
      return Reflect.setPrototypeOf(target, prototype)
    }
  , isExtensible(_) {
      const target = getter()
      return Reflect.isExtensible(target)
    }
  , preventExtensions(_) {
      const target = getter()
      // prevent 'TypeError: trap returned truish but the proxy target is extensible'
      Reflect.preventExtensions(fakeTarget)
      return Reflect.preventExtensions(target)
    }
  })

  return proxy as T
}
