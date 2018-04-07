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
  expect(messages.getLocale()).toBe('fi')
})

test('defaultOther', () => {
  expect(() => messages.defaultOther('ARG', 'METHOD')).toThrow(/METHOD.*ARG/)
})

test('nonNumeric', () => {
  expect(() => messages.nonNumeric('ARG')).toThrow(/ARG/)
})

describe('plural', () => {
  test('with key', () => {
    const msg = messages.plural('key', 1, { one: 'one', other: 'other' })
    expect(msg).toBe('one')
  })

  test('without key', () => {
    const msg = messages.plural(1, { one: 'one', other: 'other' })
    expect(msg).toBe('one')
  })

  test('matching other', () => {
    const msg = messages.plural(2, { one: 'one', other: 'other' })
    expect(msg).toBe('other')
  })

  test('matching exact', () => {
    const msg = messages.plural(1, { 1: 'number 1', one: 'one', other: 'other' })
    expect(msg).toBe('number 1')
  })

  test('with ordinal type', () => {
    const msg = messages.plural(3, { one: 'one', two: 'two', few: 'few', other: 'other' }, { type: 'ordinal' })
    expect(msg).toBe('few')
  })

  test('with offset & ordinal type', () => {
    const msg = messages.plural(2, { one: 'one', two: 'two', few: 'few', other: 'other' }, { offset: 1, type: 'ordinal' })
    expect(msg).toBe('one')
  })

  test('with non-numeric value', () => {
    expect(() => messages.plural('one', { one: 'one', other: 'other' })).toThrow(/Plural.*"one"/)
    expect(() => messages.plural(NaN, { one: 'one', other: 'other' })).toThrow(/Plural.*"NaN"/)
  })

  test('missing other', () => {
    expect(() => messages.plural(1, { one: 'one' })).toThrow(/plural.*"1"/)
  })

  test('with custom defaultOther', () => {
    messages.defaultOther = (arg) => String(arg)
    const msg = messages.plural(2, { one: 'one' })
    expect(msg).toBe('2')
  })

  test('with custom nonNumeric', () => {
    messages.nonNumeric = (arg) => 0
    const msg = messages.plural('x', { 0: 'zero', one: 'one', other: 'other' })
    expect(msg).toBe('zero')
  })
})

describe('select', () => {
  test('with key', () => {
    const msg = messages.select('key', 'one', { one: 'one', other: 'other' })
    expect(msg).toBe('one')
  })

  test('without key', () => {
    const msg = messages.select('one', { one: 'one', other: 'other' })
    expect(msg).toBe('one')
  })

  test('matching other', () => {
    const msg = messages.select('two', { one: 'one', other: 'other' })
    expect(msg).toBe('other')
  })

  test('missing other', () => {
    expect(() => messages.select('one', { one: 'one' })).toThrow(/select.*"one"/)
  })

  test('with custom defaultOther', () => {
    messages.defaultOther = (arg) => String(arg)
    const msg = messages.select('two', { one: 'one' })
    expect(msg).toBe('two')
  })
})
