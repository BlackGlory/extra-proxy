import { bind } from '@src/bind.js'

describe('bind', () => {
  test('function', () => {
    class Foo {
      value = 'bar'

      foo(): string {
        return this.value
      }
    }
    const obj = new Foo()

    const proxy = bind(obj, obj)
    const method = proxy.foo
    const result = method()

    expect(result).toBe('bar')
  })

  test('non-function', () => {
    class Foo {
      value = 'bar'
    }
    const obj = new Foo()

    const proxy = bind(obj, obj)
    const value = proxy.value

    expect(value).toBe('bar')
  })
})
