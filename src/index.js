import Plurals from './plurals'

function msg(strings, ...values) {
  if (typeof strings === 'string') return strings // called as msg('message')
  let res = ''
  for (let i = 0; i < values.length; ++i) {
    res += strings[i] + values[i]
  }
  return res + strings[strings.length - 1]
}

const plurals = new Plurals('en')

Object.defineProperty(msg, 'locale', {
  enumerable: true,
  get() {
    return plurals.getLocale()
  },
  set(lc) {
    plurals.setLocale(lc)
  }
})

export const select = plurals.compile.bind(plurals)
export default msg
