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

  plural(key, arg, cases, options) {
    if (typeof arg === 'object' && arguments.length < 4) {
      // plural(arg, cases[, options])
      key = null
      arg = arguments[0]
      cases = arguments[1]
      options = arguments.length >= 3 ? arguments[2] : {}
    } else if (!options) {
      options = {}
    }
    if (!isFinite(arg)) arg = this.nonNumeric(arg)
    if (!cases || typeof cases !== 'object')
      return this.defaultOther(arg, 'plural')
    if (!cases.other) cases.other = this.defaultOther(arg, 'plural')
    if (arg in cases) return cases[arg]
    const rule = this.pluralRule(arg, options.type === 'ordinal')
    return rule in cases ? cases[rule] : cases.other
  }

  select(key, arg, cases) {
    if (typeof arg === 'object' && arguments.length === 2) {
      // select(arg, cases)
      key = null
      arg = arguments[0]
      cases = arguments[1]
    }
    if (!cases || typeof cases !== 'object')
      return this.defaultOther(arg, 'select')
    if (!cases.other) cases.other = this.defaultOther(arg, 'select')
    return arg in cases ? cases[arg] : cases.other
  }
}
