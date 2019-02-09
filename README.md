# Messages

A work in progress. Eventually, a complete framework for localizable messages for all user interfaces.

```js
import msg, { plural, select } from 'messages'

msg('key') === 'key'
msg('key', 'value') === 'value'
msg`string` === 'string'

const value = 'val'
msg`string ${value}` === 'string val'

select('foo', { foo: 'bar', other: 'qux' }) === 'bar'
select('baz', { foo: 'bar', other: 'qux' }) === 'qux'

const pluralMsg = n => plural(n, { one: 'one', other: 'other', 42: 'truth' })
pluralMsg(1) === 'one'
pluralMsg(2) === 'other'
pluralMsg(42) === 'truth'

const ordinalChoices = { one: 'one', two: 'two', few: 'few', other: 'other' }
plural(3, ordinalChoices, { type: 'ordinal' }) === 'few'
plural(2, ordinalChoices, { offset: 1, type: 'ordinal' }) === 'one'
```
