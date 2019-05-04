function endIsEscaped(str) {
  let n = 0
  let i = str.length
  while (str[--i] === '\\') ++n
  return n % 2 === 1
}

function varString(str) {
  const parts = String(str).split('#')
  for (let i = parts.length - 2; i >= 0; --i) {
    const part = parts[i]
    if (endIsEscaped(part)) {
      const combined = part.slice(0, -1) + '#' + parts[i + 1]
      parts.splice(i, 2, combined)
    }
  }
  return arg => parts.join(arg)
}

export default function varStringify(cases, defaultCase) {
  const res = {}
  for (const key of Object.keys(cases)) {
    res[key] = varString(cases[key])
  }
  if (!res[defaultCase]) res[defaultCase] = () => ''
  return res
}
