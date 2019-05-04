import Select from './select'

function msg(strings, ...values) {
  if (typeof strings === 'string') return strings // called as msg('message')
  let res = ''
  for (let i = 0; i < values.length; ++i) {
    res += strings[i] + values[i]
  }
  return res + strings[strings.length - 1]
}

const select = new Select('en')
const compileSelector = select.compile.bind(select)

Object.defineProperty(msg, 'locale', {
  enumerable: true,
  get() {
    return select.getLocale()
  },
  set(lc) {
    select.setLocale(lc)
  }
})


export { msg as default, compileSelector as select }
