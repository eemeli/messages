import msg from './index'

test('msg(key)', () => {
  expect(msg('key')).toBe('key')
})

test('msg(key, value)', () => {
  expect(msg('key', 'value')).toBe('value')
})

test('msg`string`', () => {
  expect(msg`string`).toBe('string')
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
