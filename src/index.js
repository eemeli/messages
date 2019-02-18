import Messages from './messages'

function msg(strings, ...values) {
  if (typeof strings === 'string') {
    // called as msg('key') or msg('key', 'value')
    return values.length === 0 ? strings : values[0]
  }
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

const messages = new Messages('en')
msg.ordinal = messages.plural.bind(messages, true)
msg.plural = messages.plural.bind(messages, false)
Object.defineProperty(msg, 'locale', {
  enumerable: true,
  get() {
    return messages.getLocale()
  },
  set(lc) {
    messages.setLocale(lc)
  }
})

export default msg
