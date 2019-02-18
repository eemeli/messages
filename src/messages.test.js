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

test('defaultOther', () => {
  expect(() => messages.defaultOther('ARG', 'METHOD')).toThrow(/METHOD.*ARG/)
})

test('nonNumeric', () => {
  expect(() => messages.nonNumeric('ARG')).toThrow(/ARG/)
})

describe('plural', () => {
  test('match one', () => {
    const msg = messages.plural(false, 1, { one: 'one', other: 'other' })
    expect(msg).toBe('one')
  })

  test('match other', () => {
    const msg = messages.plural(false, 2, { one: 'one', other: 'other' })
    expect(msg).toBe('other')
  })

  test('match exact', () => {
    const msg = messages.plural(false, 1, {
      1: 'number 1',
      one: 'one',
      other: 'other'
    })
    expect(msg).toBe('number 1')
  })

  test('with ordinal type', () => {
    const msg = messages.plural(
      true,
      3,
      { one: 'one', two: 'two', few: 'few', other: 'other' }
    )
    expect(msg).toBe('few')
  })

  test('with non-numeric string', () => {
    expect(() =>
      messages.plural(false, 'one', { one: 'one', other: 'other' })
    ).toThrow(/Plural.*"one"/)
  })

  test('with non-numeric NaN', () => {
    expect(() =>
      messages.plural(false, NaN, { one: 'one', other: 'other' })
    ).toThrow(/Plural.*"NaN"/)
  })

  test('missing other', () => {
    expect(() => messages.plural(false, 1, { one: 'one' })).toThrow(/plural.*"1"/)
  })

  test('with custom defaultOther', () => {
    messages.defaultOther = arg => String(arg)
    const msg = messages.plural(false, 2, { one: 'one' })
    expect(msg).toBe('2')
  })

  test('with custom nonNumeric', () => {
    messages.nonNumeric = arg => 0
    const msg = messages.plural(false, 'x', { 0: 'zero', one: 'one', other: 'other' })
    expect(msg).toBe('zero')
  })
})

describe('select', () => {
  test('match key', () => {
    const msg = messages.select('one', { one: 'one', other: 'other' })
    expect(msg).toBe('one')
  })

  test('match other', () => {
    const msg = messages.select('two', { one: 'one', other: 'other' })
    expect(msg).toBe('other')
  })

  test('missing other', () => {
    expect(() => messages.select('one', { one: 'one' })).toThrow(
      /select.*"one"/
    )
  })

  test('with custom defaultOther', () => {
    messages.defaultOther = arg => String(arg)
    const msg = messages.select('two', { one: 'one' })
    expect(msg).toBe('two')
  })
})
