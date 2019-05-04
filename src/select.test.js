import Select from './select'

let select
beforeEach(() => {
  select = new Select('en')
})

test('getLocale', () => {
  expect(select.getLocale()).toBe('en')
})

test('setLocale', () => {
  select.setLocale('fi-FI')
  expect(select.getLocale()).toMatch(/^(fi|fi-FI)$/)
})

describe('plural', () => {
  test('match one', () => {
    const msg = select.compile({ one: 'one', other: 'other' })
    expect(msg(1)).toBe('one')
  })

  test('match other', () => {
    const msg = select.compile({ one: 'one', other: 'other' })
    expect(msg(2)).toBe('other')
  })

  test('match exact', () => {
    const msg = select.compile({
      1: 'number 1',
      one: 'one',
      other: 'other'
    })
    expect(msg(1)).toBe('number 1')
  })

  test('with ordinal type', () => {
    const msg = select.compile(
      {
        one: 'one',
        two: 'two',
        few: 'few',
        other: 'other'
      },
      { type: 'ordinal' }
    )
    expect(msg(3)).toBe('few')
  })

  test('function messages', () => {
    const msg = select.compile(
      {
        one: '#st',
        two: '#nd',
        few: '#rd',
        other: '#th'
      },
      { type: 'ordinal' }
    )
    expect(msg(2)).toBe('2nd')
    expect(msg(11)).toBe('11th')
    expect(msg(21)).toBe('21st')
  })

  test('missing default case', () => {
    const msg = select.compile({ one: 'one' })
    expect(msg(1)).toBe('one')
    expect(msg(2)).toBe('')
  })

  test('custom default case', () => {
    const msg = select.compile({ one: 'one', foo: 'bar' }, { defaultCase: 'foo' })
    expect(msg(1)).toBe('one')
    expect(msg(2)).toBe('bar')
  })

  test('with non-numeric arg', () => {
    const msg = select.compile({ one: 'one', other: 'other' })
    expect(msg(1)).toBe('one')
    expect(msg('one')).toBe('one')
    expect(msg('foo')).toBe('other')
    expect(msg(NaN)).toBe('other')
  })

  test('missing cases', () => {
    expect(() => select.compile()).toThrow(/Missing cases argument/)
  })
})
