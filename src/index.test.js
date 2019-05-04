import msg, { getLocale, setLocale, select } from './index'

test('msg(str)', () => {
  expect(msg('foo')).toBe('foo')
})

test('msg`string`', () => {
  expect(msg`foo`).toBe('foo')
})

test('msg`string ${value}`', () => {
  const value = 'val'
  expect(msg`string ${value}`).toBe('string val')
})

test('msg`${value}` string', () => {
  const value = 'val'
  expect(msg`${value} string`).toBe('val string')
})

test('msg`string ${value} string`', () => {
  const value = 'val'
  expect(msg`string ${value} string`).toBe('string val string')
})

test('msg`string ${value} string ${value2}`', () => {
  const value = 'val'
  const value2 = 'val2'
  expect(msg`string ${value} string ${value2}`).toBe('string val string val2')
})

describe('locale', () => {
  test('get locale', () => {
    expect(getLocale()).toBe('en')
  })

  test('set locale', () => {
    setLocale('fi')
    expect(getLocale()).toBe('fi')
  })
})

describe('select', () => {
  test('other as default case', () => {
    const sm = select({ foo: 'FOO', other: 'BAR' })
    expect(sm('foo')).toBe('FOO')
    expect(sm('bar')).toBe('BAR')
  })

  test('defaultCase option', () => {
    const sm = select({ foo: 'FOO', qux: 'BAR' }, { defaultCase: 'qux' })
    expect(sm('foo')).toBe('FOO')
    expect(sm('bar')).toBe('BAR')
  })

  test('missing default case', () => {
    const sm = select({ foo: 'FOO' })
    expect(sm('foo')).toBe('FOO')
    expect(sm('bar')).toBe('')
  })

  test('message variables', () => {
    const sm = select({ foo: 'FOO#', other: 'BAR#' })
    expect(sm('foo')).toBe('FOOfoo')
    expect(sm('bar')).toBe('BARbar')
  })

  test('numerical arguments', () => {
    const sm = select({ one: 'FOO', other: 'BAR' })
    expect(sm(1)).toBe('FOO')
    expect(sm(2)).toBe('BAR')
  })

  test('missing cases', () => {
    expect(() => select()).toThrow(/Missing cases/)
  })
})
