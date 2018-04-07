import Messages from './messages'

export const messages = new Messages('en')
export const plural = messages.plural.bind(messages)
export const select = messages.select.bind(messages)

const msg = (strings, ...values) => {
  if (typeof strings === 'string') {
    // called as msg('key') or msg('key', 'value')
    return values.length === 0 ? strings : values[0]
  }
  for (let i = 0; i < values.length; ++i) {
    strings[i] += values[i]
  }
  return strings.join('')
}

export default msg
