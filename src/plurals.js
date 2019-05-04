import 'intl-pluralrules'
import varStringify from './var-stringify'

const pluralRules = Symbol('pluralRules')
const ordinalRules = Symbol('ordinalRules')

export default class Plurals {
  constructor(lc) {
    this.setLocale(lc)
  }

  getLocale() {
    return this[pluralRules].resolvedOptions().locale
  }

  setLocale(lc) {
    this[pluralRules] = new Intl.PluralRules(lc)
    this[ordinalRules] = null
  }

  pluralRule(arg, { type }) {
    if (type === 'ordinal') {
      if (!this[ordinalRules]) {
        const lc = this.getLocale()
        this[ordinalRules] = new Intl.PluralRules(lc, { type })
      }
      return this[ordinalRules].select(arg)
    }
    return this[pluralRules].select(arg)
  }

  compile(cases, { defaultCase = 'other', ...intlOptions } = {}) {
    if (!cases || typeof cases !== 'object')
      throw new Error('Missing cases argument')
    const caseFns = varStringify(cases, defaultCase)
    return arg => {
      if (!isFinite(arg)) {
        const strArg = JSON.stringify(arg)
        throw new Error(`Plural argument ${strArg} is not numeric`)
      }
      let fn = caseFns[arg]
      if (!fn) {
        const rule = this.pluralRule(arg, intlOptions)
        fn = rule in caseFns ? caseFns[rule] : caseFns[defaultCase]
      }
      return fn(arg)
    }
  }
}
