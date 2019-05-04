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
const compile = select.compile.bind(select)
const getLocale = select.getLocale.bind(select)
const setLocale = select.setLocale.bind(select)

export { msg as default, compile as select, getLocale, setLocale }
