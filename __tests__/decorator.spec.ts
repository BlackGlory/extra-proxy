import { applyPropertyDecorators } from '@src/decorator.js'
import { jest } from '@jest/globals'

describe('applyPropertyDecorators', () => {
  test('method', () => {
    class Tester {
      value = 1

      getValue() {
        return this.value
      }

      getDoubleValue() {
        return this.value * 2
      }
    }
    const obj = new Tester()
    const decorator = jest.fn((fn: () => number) => {
      return function (this: Tester) {
        return fn.apply(this) * 3
      }
    })

    const proxy = applyPropertyDecorators(obj, ['getDoubleValue'], decorator)

    expect(proxy.getValue()).toBe(1)
    expect(proxy.getDoubleValue()).toBe(6)
    expect(decorator).toBeCalledTimes(1)
  })

  test('variable', () => {
    class Tester {
      value = 1
      doubleValue = this.value * 2
    }
    const obj = new Tester()
    const decorator = jest.fn((variable: number) => variable * 3)
    
    const proxy = applyPropertyDecorators(obj, ['doubleValue'], decorator)

    expect(proxy.value).toBe(1)
    expect(proxy.doubleValue).toBe(6)
    expect(decorator).toBeCalledTimes(1)
  })

  test('accessor', () => {
    class Tester {
      _value = 1

      get value() {
        return this._value
      }

      get doubleValue() {
        return this._value * 2
      }
    }
    const obj = new Tester()
    const decorator = jest.fn((accestor: number) => accestor * 3)
    
    const proxy = applyPropertyDecorators(obj, ['doubleValue'], decorator)

    expect(proxy.value).toBe(1)
    expect(proxy.doubleValue).toBe(6)
    expect(decorator).toBeCalledTimes(1)
  })
})
