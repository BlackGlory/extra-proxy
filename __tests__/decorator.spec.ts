import { Decorator, applyPropertyDecorators } from '@src/decorator'

describe('applyPropertyDecorators', () => {
  test('method', () => {
    const obj = {
      method1: jest.fn(() => 1)
    , method2: jest.fn(() => 2)
    }
    const decorator: Decorator<() => number> = jest.fn(fn => {
      return () => {
        return fn() * 2
      }
    })

    const proxy = applyPropertyDecorators(obj, ['method2'], decorator)

    expect(proxy.method1()).toBe(1)
    expect(proxy.method2()).toBe(4)
    expect(decorator).toBeCalledTimes(1)
  })

  test('variable', () => {
    const obj = {
      variable1: 1
    , variable2: 2
    }
    const decorator: Decorator<number> = jest.fn(x => x * 2)
    
    const proxy = applyPropertyDecorators(obj, ['variable2'], decorator)

    expect(proxy.variable1).toBe(1)
    expect(proxy.variable2).toBe(4)
    expect(decorator).toBeCalledTimes(1)
  })
})
