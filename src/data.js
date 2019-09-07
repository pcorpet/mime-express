import _memoize from 'lodash/memoize'
import SeededRandom from 'random-seed'

export const datasets = {
  de: {
    expressions: require('./data/german.json'),
    name: 'deutsch',
  },
  en: {
    expressions: require('./data/english.json'),
    name: 'english',
  },
  fr: {
    expressions: require('./data/french.json'),
    hasLevels: true,
    hasVulgaireFlags: true,
    name: 'français',
  },
  it: {
    expressions: require('./data/italian.json'),
    name: 'italiano',
  },
  po: {
    expressions: require('./data/portuguese.json'),
    name: 'português',
  },
  ru: {
    expressions: require('./data/russian.json'),
    name: 'русски',
  },
}

const seed = (Math.random() * 0x100000000).toString(16)


export const getExpressions = _memoize(
  ({isVulgarAcepted, lang, minLevelAccepted}) => {
    const expressions = datasets[lang].expressions.filter(expression => {
      if (datasets[lang].hasLevels && minLevelAccepted && expression.score < minLevelAccepted) {
        return false
      }
      if (datasets[lang].hasVulgaireFlags && !isVulgarAcepted && expression.vulgaire) {
        return false
      }
      return true
    })
    // Shuffle.
    const rand = SeededRandom(seed)
    for (let i = expressions.length - 1; i > 0; --i) {
      const j = rand.range(i + 1)
      if (i === j) {
        continue
      }
      const valI = expressions[i]
      expressions[i] = expressions[j]
      expressions[j] = valI
    }
    return expressions
  },
  ({isVulgarAcepted, lang, minLevelAccepted}) =>
    `${lang}-${minLevelAccepted || 0}-${isVulgarAcepted || false}`)
