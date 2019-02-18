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

  defaultOther(arg, method) {
    throw new Error(`A ${method} "other" case is required to match "${arg}"`)
  }

  nonNumeric(arg) {
    throw new Error(`Plural argument "${arg}" is not numeric`)
  }

  pluralRule(arg, ordinal) {
    return ordinal
      ? new Intl.PluralRules(this.getLocale(), { type: 'ordinal' }).select(arg)
      : this[pluralRules].select(arg)
  }

  plural(ordinal, arg, cases) {
    if (!isFinite(arg)) arg = this.nonNumeric(arg)
    if (!cases || typeof cases !== 'object')
      return this.defaultOther(arg, 'plural')
    if (!cases.other) cases.other = this.defaultOther(arg, 'plural')
    if (arg in cases) return cases[arg]
    const rule = this.pluralRule(arg, ordinal)
    return rule in cases ? cases[rule] : cases.other
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
