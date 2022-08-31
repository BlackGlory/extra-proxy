import { unboxNonCallable } from '@src/unbox-non-callable'

describe('unboxNonCallable', () => {
  describe('get', () => {
    test('exists', () => {
      const obj = {
       value: {}
      }
      const proxy = unboxNonCallable(() => obj)

      const result = Reflect.get(proxy, 'value')

      expect(result).toBe(Reflect.get(obj, 'value'))
    })

    test('does not exist', () => {
      const obj: Record<string, unknown> = {}
      const proxy = unboxNonCallable(() => obj)

      const result = Reflect.get(proxy, 'value')

      expect(result).toBe(Reflect.get(obj, 'value'))
    })
  })

  describe('set', () => {
    test('exists', () => {
      const newValue = {}
      const obj = {
        value: {}
      }
      const proxy = unboxNonCallable(() => obj)

      const result = Reflect.set(proxy, 'value', newValue)

      expect(result).toBe(true)
      expect(obj.value).toBe(newValue)
    })

    test('does not exist', () => {
      const newValue = {}
      const obj: Record<string, unknown> = {}
      const proxy = unboxNonCallable(() => obj)

      const result = Reflect.set(proxy, 'value', newValue)

      expect(result).toBe(true)
      expect(obj.value).toBe(newValue)
    })
  })

  describe('has', () => {
    test('exists', () => {
      const obj = {
        value: {}
      }
      const proxy = unboxNonCallable(() => obj)

      const result = Reflect.has(proxy, 'value')

      expect(result).toBe(Reflect.has(obj, 'value'))
    })

    test('does not exist', () => {
      const obj = {}
      const proxy = unboxNonCallable(() => obj)

      const result = Reflect.has(proxy, 'value')

      expect(result).toBe(Reflect.has(obj, 'value'))
    })
  })

  test('ownKeys', () => {
    const obj = {
      value: {}
    }
    const proxy = unboxNonCallable(() => obj)

    const result = Reflect.ownKeys(proxy)

    expect(result).toStrictEqual(Reflect.ownKeys(obj))
  })

  describe('defineProperty', () => {
    test('exists', () => {
      const value = {}
      const obj = {
        value
      }
      const proxy = unboxNonCallable(() => obj)

      const result = Reflect.defineProperty(proxy, 'value', { enumerable: true })

      expect(result).toBe(true)
      expect(Reflect.getOwnPropertyDescriptor(obj, 'value')).toStrictEqual({
        configurable: true
      , enumerable: true
      , value
      , writable: true
      })
    })

    test('does not exist', () => {
      const obj = {}
      const proxy = unboxNonCallable(() => obj)

      const result = Reflect.defineProperty(proxy, 'value', { enumerable: true })

      expect(result).toBe(true)
      expect(Reflect.getOwnPropertyDescriptor(obj, 'value')).toStrictEqual({
        configurable: false
      , enumerable: true
      , value: undefined
      , writable: false
      })
    })
  })

  describe('deleteProperty', () => {
    test('exists', () => {
      const obj = {
        value: {}
      }
      const proxy = unboxNonCallable(() => obj)

      const result = Reflect.deleteProperty(proxy, 'value')

      expect(result).toBe(true)
      expect(Reflect.has(obj, 'value')).toBe(false)
    })

    test('does not exist', () => {
      const obj = {}
      const proxy = unboxNonCallable(() => obj)

      const result = Reflect.deleteProperty(proxy, 'value')

      expect(result).toBe(true)
      expect(Reflect.has(obj, 'value')).toBe(false)
    })
  })

  describe('getOwnPropertyDescriptor', () => {
    test('exists', () => {
      const obj = {
        value: {}
      }
      const proxy = unboxNonCallable(() => obj)

      const result = Reflect.getOwnPropertyDescriptor(proxy, 'value')

      expect(result).toStrictEqual(Reflect.getOwnPropertyDescriptor(obj, 'value'))
    })

    test('does not exist', () => {
      const obj = {}
      const proxy = unboxNonCallable(() => obj)

      const result = Reflect.getOwnPropertyDescriptor(proxy, 'value')

      expect(result).toBe(Reflect.getOwnPropertyDescriptor(obj, 'value'))
    })
  })

  test('getPrototypeOf', () => {
    const obj = {}
    const proxy = unboxNonCallable(() => obj)

    const result = Reflect.getPrototypeOf(proxy)

    expect(result).toBe(Object.prototype)
    expect(result).toBe(Reflect.getPrototypeOf(obj))
  })

  test('setPrototypeOf', () => {
    const obj = {}
    const proxy = unboxNonCallable(() => obj)

    const result = Reflect.setPrototypeOf(proxy, null)

    expect(result).toBe(true)
    expect(Reflect.getPrototypeOf(proxy)).toBe(null)
    expect(Reflect.getPrototypeOf(proxy)).toBe(Reflect.getPrototypeOf(obj))
  })

  test('isExtensible', () => {
    const obj = {}
    const proxy = unboxNonCallable(() => obj)

    const result = Reflect.isExtensible(proxy)

    expect(result).toBe(true)
    expect(result).toBe(Reflect.isExtensible(obj))
  })

  test('preventExtensions', () => {
    const obj = {}
    const proxy = unboxNonCallable(() => obj)

    const result = Reflect.preventExtensions(proxy)

    expect(result).toBe(true)
    expect(Reflect.isExtensible(proxy)).toBe(false)
    expect(Reflect.isExtensible(proxy)).toBe(Reflect.isExtensible(obj))
  })
})
