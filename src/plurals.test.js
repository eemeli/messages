import Plurals from './plurals'

let plurals
beforeEach(() => {
  plurals = new Plurals('en')
})

test('getLocale', () => {
  expect(plurals.getLocale()).toBe('en')
})

test('setLocale', () => {
  plurals.setLocale('fi-FI')
  expect(plurals.getLocale()).toMatch(/^(fi|fi-FI)$/)
})

describe('plural', () => {
  test('match one', () => {
    const msg = plurals.compile({ one: 'one', other: 'other' })
    expect(msg(1)).toBe('one')
  })

  test('match other', () => {
    const msg = plurals.compile({ one: 'one', other: 'other' })
    expect(msg(2)).toBe('other')
  })

  test('match exact', () => {
    const msg = plurals.compile({
      1: 'number 1',
      one: 'one',
      other: 'other'
    })
    expect(msg(1)).toBe('number 1')
  })

  test('with ordinal type', () => {
    const msg = plurals.compile(
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
    const msg = plurals.compile(
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
    const msg = plurals.compile({ one: 'one' })
    expect(msg(1)).toBe('one')
    expect(msg(2)).toBe('')
  })

  test('custom default case', () => {
    const msg = plurals.compile({ one: 'one', foo: 'bar' }, { defaultCase: 'foo' })
    expect(msg(1)).toBe('one')
    expect(msg(2)).toBe('bar')
  })

  test('with non-numeric arg', () => {
    const msg = plurals.compile({ one: 'one', other: 'other' })
    expect(msg(1)).toBe('one')
    expect(msg('one')).toBe('one')
    expect(msg('foo')).toBe('other')
    expect(msg(NaN)).toBe('other')
  })

  test('missing cases', () => {
    expect(() => plurals.compile()).toThrow(/Missing cases argument/)
  })
})
