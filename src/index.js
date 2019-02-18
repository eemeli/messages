import Plurals from './plurals'

function msg(strings, ...values) {
  if (typeof strings === 'string') return strings // called as msg('message')
  let res = ''
  for (let i = 0; i < values.length; ++i) {
    res += strings[i] + values[i]
  }
  return res + strings[strings.length - 1]
}

msg.select = function select(cases, other) {
  if (!cases || typeof cases !== 'object')
    throw new Error('Missing cases argument')
  return arg => {
    const res = arg in cases ? cases[arg] : cases.other || other || ''
    return typeof res === 'function' ? res(arg) : res
  }
}

const plurals = new Plurals('en')
msg.ordinal = plurals.get.bind(plurals, true)
msg.plural = plurals.get.bind(plurals, false)
Object.defineProperty(msg, 'locale', {
  enumerable: true,
  get() {
    return plurals.getLocale()
  },
  set(lc) {
    plurals.setLocale(lc)
  }
})

export default msg
