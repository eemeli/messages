# Messages

A work in progress. Eventually, a complete framework for localizable messages for all user interfaces.

The commented examples below use [Fluent](https://projectfluent.org/) notation.

```js
import msg, { select } from 'messages'

// msg1 = foo
msg('foo') === 'foo'

// msg2 = bar
msg`bar` === 'bar'

// msg3 = string {$baz}
const baz = 'BAZ'
msg`string ${baz}` === 'string BAZ'

// selectMsg = { $arg ->
//    [foo] bar
//   *[other] qux
// }
const selectMsg = select({ foo: 'bar', other: 'qux' })
selectMsg('foo') === 'bar'
selectMsg('baz') === 'qux'

// pluralMsg = { $arg ->
//    [42] truth
//    [one] one
//   *[other] other
// }
const pluralMsg = select({ one: 'one', 42: 'truth', other: 'other' })
pluralMsg(1) === 'one'
pluralMsg(2) === 'other'
pluralMsg(42) === 'truth'

// ordinalMsg = { NUMBER($arg, type: "ordinal") ->
//    [1] first!
//    [one] {$arg}st
//    [two] {$arg}nd
//    [few] {$arg}rd
//   *[other] {$arg}th
// }
const ordinalMsg = select(
  {
    1: 'first!',
    one: '#st',
    two: '#nd',
    few: '#rd',
    other: '#th'
  },
  { type: 'ordinal' }
)
ordinalMsg(2) === '2nd'
ordinalMsg(21) === '21st'

// -person = { $gender ->
//    [male] He
//    [female] She
//   *[other] They
// }
// -results = { $count ->
//    [0] no results
//    [one] 1 result
//   *[other] # results
// }
// resultSummary = {-person} found {-results}
const person = select({ male: 'He', female: 'She', other: 'They' })
const results = select({
  0: 'no results',
  one: '1 result',
  other: '# results'
})
const resultSummary = msg`${person(gender)} found ${results(count)}.`
```
