import msg from './index'

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
    expect(msg.locale).toBe('en')
  })

  test('set locale', () => {
    msg.locale = 'fi'
    expect(msg.locale).toBe('fi')
  })
})

describe('select', () => {
  test('other as default case', () => {
    const sm = msg.select({ foo: 'FOO', other: 'BAR' })
    expect(sm('foo')).toBe('FOO')
    expect(sm('bar')).toBe('BAR')
  })

  test('defaultCase option', () => {
    const sm = msg.select({ foo: 'FOO', qux: 'BAR' }, { defaultCase: 'qux' })
    expect(sm('foo')).toBe('FOO')
    expect(sm('bar')).toBe('BAR')
  })

  test('missing default case', () => {
    const sm = msg.select({ foo: 'FOO' })
    expect(sm('foo')).toBe('FOO')
    expect(sm('bar')).toBe('')
  })

  test('message variables', () => {
    const sm = msg.select({ foo: 'FOO#', other: 'BAR#' })
    expect(sm('foo')).toBe('FOOfoo')
    expect(sm('bar')).toBe('BARbar')
  })

  test('missing cases', () => {
    expect(() => msg.select()).toThrow(/Missing cases/)
  })
})
