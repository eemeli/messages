import msg from './index'

const list = items => items.filter(it => it).join(', ')
const time = date => date && date.getHours() + ':' + date.getMinutes()

const itemLocation = ([loc, ...other], start, end) => {
  const locStr = !loc
    ? ''
    : other.length === 0
    ? loc
    : msg`${loc} (${list(other)})`
  const timeStr = !start
    ? ''
    : !end
    ? time(start)
    : msg`${time(start)} - ${time(end)}`
  return list([locStr, timeStr])
}

let start, end
beforeEach(() => {
  start = new Date()
  start.setHours(12)
  start.setMinutes(34)
  start.setSeconds(0)
  end = new Date()
  end.setHours(13)
  end.setMinutes(57)
  end.setSeconds(0)
})

test('loc', () => {
  const str = itemLocation(['loc'])
  expect(str).toBe('loc')
})

test('locX (locY, locZ)', () => {
  const str = itemLocation(['locX', 'locY', 'locZ'])
  expect(str).toBe('locX (locY, locZ)')
})

test('12:34', () => {
  const str = itemLocation([], start)
  expect(str).toBe('12:34')
})

test('12:34 - 13:57', () => {
  const str = itemLocation([], start, end)
  expect(str).toBe('12:34 - 13:57')
})

test('locX (locY, locZ), 12:34 - 13:57', () => {
  const str = itemLocation(['locX', 'locY', 'locZ'], start, end)
  expect(str).toBe('locX (locY, locZ), 12:34 - 13:57')
})
