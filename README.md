# Messages

A work in progress. Eventually, a complete framework for localizable messages for all user interfaces.

```js
import msg, { ordinal, plural, select } from 'messages'

msg('key') === 'key'
msg('key', 'value') === 'value'
msg`string` === 'string'

const value = 'val'
msg`string ${value}` === 'string val'

const selectMsg = select({ foo: 'bar' }, 'qux')
selectMsg('foo') === 'bar'
selectMsg('baz') === 'qux'

const pluralMsg = plural({ one: 'one', 42: 'truth', other: 'other' })
pluralMsg(1) === 'one'
pluralMsg(2) === 'other'
pluralMsg(42) === 'truth'

const ordinalMsg = ordinal({
  one: n => `${n}st`,
  two: n => `${n}nd`,
  few: n => `${n}rd`,
  other: n => `${n}th`
})
ordinalMsg(2) === '2nd'
ordinalMsg(21) === '21st'
```
