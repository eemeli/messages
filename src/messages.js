import 'intl-pluralrules'

const pluralRules = Symbol('pluralRules')
const ordinalRules = Symbol('ordinalRules')

export default class Messages {
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

  plural(ordinal, cases) {
    if (!cases || typeof cases !== 'object')
      throw new Error('Missing cases argument')
    if (cases.other == null) throw new Error('cases.other is required')
    return arg => {
      if (!isFinite(arg)) {
        const strArg = JSON.stringify(arg)
        throw new Error(`Plural argument ${strArg} is not numeric`)
      }
      let res
      if (arg in cases) res = cases[arg]
      else {
        const rule = this.pluralRule(arg, ordinal)
        res = rule in cases ? cases[rule] : cases.other
      }
      return typeof res === 'function' ? res(arg) : res
    }
  }
}
