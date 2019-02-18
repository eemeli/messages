import 'intl-pluralrules'

const pluralRules = Symbol('pluralRules')

export default class Messages {
  constructor(lc) {
    this.setLocale(lc)
  }

  getLocale() {
    return this[pluralRules].resolvedOptions().locale
  }

  setLocale(lc) {
    this[pluralRules] = new Intl.PluralRules(lc)
  }

  pluralRule(arg, ordinal) {
    return ordinal
      ? new Intl.PluralRules(this.getLocale(), { type: 'ordinal' }).select(arg)
      : this[pluralRules].select(arg)
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

  select(cases, other) {
    if (!cases || typeof cases !== 'object')
      throw new Error('Missing cases argument')
    return arg => {
      const res = arg in cases ? cases[arg] : cases.other || other || ''
      return typeof res === 'function' ? res(arg) : res
    }
  }
}
