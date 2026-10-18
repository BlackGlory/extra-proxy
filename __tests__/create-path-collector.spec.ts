import { describe, test, expect } from 'vitest'
import { createPathCollector } from '@src/create-path-collector.js'

describe('createPathCollector', () => {
  describe('by type', () => {
    test('string', () => {
      const collector = createPathCollector<{
        foo: unknown
      }>()

      const result = collector.foo()

      expect(result).toStrictEqual(['foo'])
    })

    test('number', () => {
      const collector = createPathCollector<{
        [0]: unknown
      }>()

      const result = collector[0]()

      expect(result).toStrictEqual(['0'])
    })

    test('symbol', () => {
      const foo = Symbol()
      const collector = createPathCollector<{
        [foo]: unknown
      }>()

      const result = collector[foo]()

      expect(result).toStrictEqual([foo])
    })
  })

  describe('by depth', () => {
    test('shallow', () => {
      const collector = createPathCollector<{
        foo: {
          bar: unknown
        }
      }>()

      const result = collector.foo()

      expect(result).toStrictEqual(['foo'])
    })

    test('deep', () => {
      const collector = createPathCollector<{
        foo: {
          bar: unknown
        }
      }>()

      const result = collector.foo.bar()

      expect(result).toStrictEqual(['foo', 'bar'])
    })
  })

  test('edge: function', () => {
    const collector = createPathCollector<{
      foo(bar: unknown): unknown
    }>()

    const result = collector.foo()

    expect(result).toStrictEqual(['foo'])
  })
})
