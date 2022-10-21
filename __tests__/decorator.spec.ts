import { Decorator, applyPropertyDecorators } from '@src/decorator'

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
    const instance = new Tester()
    const decorator: Decorator<() => number> = jest.fn(fn => {
      return function (this: Tester) {
        return fn.apply(this) * 3
      }
    })

    const proxy = applyPropertyDecorators(instance, ['getDoubleValue'], decorator)

    expect(proxy.getValue()).toBe(1)
    expect(proxy.getDoubleValue()).toBe(6)
    expect(decorator).toBeCalledTimes(1)
  })

  test('variable', () => {
    class Tester {
      value = 1
      doubleValue = this.value * 2
    }
    const instance = new Tester()
    const decorator: Decorator<number> = jest.fn(variable => variable * 3)
    
    const proxy = applyPropertyDecorators(instance, ['doubleValue'], decorator)

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
    const instance = new Tester()
    const decorator: Decorator<number> = jest.fn(accestor => accestor * 3)
    
    const proxy = applyPropertyDecorators(instance, ['doubleValue'], decorator)

    expect(proxy.value).toBe(1)
    expect(proxy.doubleValue).toBe(6)
    expect(decorator).toBeCalledTimes(1)
  })
})
