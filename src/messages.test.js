import Messages from './messages'

let messages
beforeEach(() => {
  messages = new Messages('en')
})

test('getLocale', () => {
  expect(messages.getLocale()).toBe('en')
})

test('setLocale', () => {
  messages.setLocale('fi-FI')
  expect(messages.getLocale()).toMatch(/^(fi|fi-FI)$/)
})

describe('plural', () => {
  test('match one', () => {
    const msg = messages.plural(false, { one: 'one', other: 'other' })
    expect(msg(1)).toBe('one')
  })

  test('match other', () => {
    const msg = messages.plural(false, { one: 'one', other: 'other' })
    expect(msg(2)).toBe('other')
  })

  test('match exact', () => {
    const msg = messages.plural(false, {
      1: 'number 1',
      one: 'one',
      other: 'other'
    })
    expect(msg(1)).toBe('number 1')
  })

  test('with ordinal type', () => {
    const msg = messages.plural(true, {
      one: 'one',
      two: 'two',
      few: 'few',
      other: 'other'
    })
    expect(msg(3)).toBe('few')
  })

  test('function messages', () => {
    const msg = messages.plural(true, {
      one: n => `${n}st`,
      two: n => `${n}nd`,
      few: n => `${n}rd`,
      other: n => `${n}th`
    })
    expect(msg(2)).toBe('2nd')
    expect(msg(11)).toBe('11th')
    expect(msg(21)).toBe('21st')
  })

  test('with non-numeric string', () => {
    const msg = messages.plural(false, { one: 'one', other: 'other' })
    expect(() => msg('one')).toThrow(/Plural.*"one"/)
  })

  test('with non-numeric NaN', () => {
    const msg = messages.plural(false, { one: 'one', other: 'other' })
    expect(() => msg(NaN)).toThrow(/Plural.*null/)
  })

  test('missing cases', () => {
    expect(() => messages.plural(false)).toThrow(/Missing cases argument/)
  })

  test('missing other', () => {
    expect(() => messages.plural(false, { one: 'one' })).toThrow(
      /cases.other is required/
    )
  })
})

describe('select', () => {
  test('other as key', () => {
    const msg = messages.select({ foo: 'FOO', other: 'BAR' })
    expect(msg('foo')).toBe('FOO')
    expect(msg('bar')).toBe('BAR')
  })

  test('other as arg', () => {
    const msg = messages.select({ foo: 'FOO' }, 'BAR')
    expect(msg('foo')).toBe('FOO')
    expect(msg('bar')).toBe('BAR')
  })

  test('missing other', () => {
    const msg = messages.select({ foo: 'FOO' })
    expect(msg('foo')).toBe('FOO')
    expect(msg('bar')).toBe('')
  })

  test('function messages', () => {
    const msg = messages.select({ foo: f => `FOO${f}` }, o => `BAR${o}`)
    expect(msg('foo')).toBe('FOOfoo')
    expect(msg('bar')).toBe('BARbar')
  })

  test('missing cases', () => {
    expect(() => messages.select()).toThrow(/Missing cases/)
  })
})
