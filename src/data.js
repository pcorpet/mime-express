import _memoize from 'lodash/memoize'

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


export const getExpressions = _memoize(
  ({isVulgarAcepted, lang, minLevelAccepted}) => datasets[lang].expressions.filter(expression => {
    if (datasets[lang].hasLevels && minLevelAccepted && expression.score < minLevelAccepted) {
      return false
    }
    if (datasets[lang].hasVulgaireFlags && !isVulgarAcepted && expression.vulgaire) {
      return false
    }
    return true
  }),
  ({isVulgarAcepted, lang, minLevelAccepted}) =>
    `${lang}-${minLevelAccepted || 0}-${isVulgarAcepted || false}`)


