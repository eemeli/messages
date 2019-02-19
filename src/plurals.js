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

  pluralRule(arg, ordinal) {
    if (ordinal) {
      if (!this[ordinalRules]) {
        const lc = this.getLocale()
        this[ordinalRules] = new Intl.PluralRules(lc, { type: 'ordinal' })
      }
      return this[ordinalRules].select(arg)
    }
    return this[pluralRules].select(arg)
  }

  get(ordinal, cases) {
    if (!cases || typeof cases !== 'object')
      throw new Error('Missing cases argument')
    if (cases.other == null) throw new Error('cases.other is required')
    const caseFns = varStringify(cases)
    return arg => {
      if (!isFinite(arg)) {
        const strArg = JSON.stringify(arg)
        throw new Error(`Plural argument ${strArg} is not numeric`)
      }
      let fn = caseFns[arg]
      if (!fn) {
        const rule = this.pluralRule(arg, ordinal)
        fn = rule in caseFns ? caseFns[rule] : caseFns.other
      }
      return fn(arg)
    }
  }
}
