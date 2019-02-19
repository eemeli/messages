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
    const msg = plurals.get(false, { one: 'one', other: 'other' })
    expect(msg(1)).toBe('one')
  })

  test('match other', () => {
    const msg = plurals.get(false, { one: 'one', other: 'other' })
    expect(msg(2)).toBe('other')
  })

  test('match exact', () => {
    const msg = plurals.get(false, {
      1: 'number 1',
      one: 'one',
      other: 'other'
    })
    expect(msg(1)).toBe('number 1')
  })

  test('with ordinal type', () => {
    const msg = plurals.get(true, {
      one: 'one',
      two: 'two',
      few: 'few',
      other: 'other'
    })
    expect(msg(3)).toBe('few')
  })

  test('function messages', () => {
    const msg = plurals.get(true, {
      one: '#st',
      two: '#nd',
      few: '#rd',
      other: '#th'
    })
    expect(msg(2)).toBe('2nd')
    expect(msg(11)).toBe('11th')
    expect(msg(21)).toBe('21st')
  })

  test('with non-numeric string', () => {
    const msg = plurals.get(false, { one: 'one', other: 'other' })
    expect(() => msg('one')).toThrow(/Plural.*"one"/)
  })

  test('with non-numeric NaN', () => {
    const msg = plurals.get(false, { one: 'one', other: 'other' })
    expect(() => msg(NaN)).toThrow(/Plural.*null/)
  })

  test('missing cases', () => {
    expect(() => plurals.get(false)).toThrow(/Missing cases argument/)
  })

  test('missing other', () => {
    expect(() => plurals.get(false, { one: 'one' })).toThrow(
      /cases.other is required/
    )
  })
})
