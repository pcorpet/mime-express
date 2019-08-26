import _memoize from 'lodash/memoize'


export interface Expression {
  definition?: string
  score?: number
  title: string
  vulgaire?: boolean
}


export const datasets = {
  de: {
    expressions: require('./assets/data/german.json'),
    name: 'deutsch',
  },
  en: {
    expressions: require('./assets/data/english.json'),
    name: 'english',
  },
  fr: {
    expressions: require('./assets/data/french.json'),
    hasLevels: true,
    hasVulgaireFlags: true,
    name: 'français',
  },
  it: {
    expressions: require('./assets/data/italian.json'),
    name: 'italiano',
  },
  po: {
    expressions: require('./assets/data/portuguese.json'),
    name: 'português',
  },
  ru: {
    expressions: require('./assets/data/russian.json'),
    name: 'русски',
  },
} as const


export const getExpressions = _memoize(
  ({isVulgarAcepted, lang, minLevelAccepted}): readonly Expression[] =>
    datasets[lang].expressions.filter((expression: Expression): boolean => {
      if (datasets[lang].hasLevels && minLevelAccepted && expression.score < minLevelAccepted) {
        return false
      }
      if (datasets[lang].hasVulgaireFlags && !isVulgarAcepted && expression.vulgaire) {
        return false
      }
      return true
    }),
  ({isVulgarAcepted, lang, minLevelAccepted}): string =>
    `${lang}-${minLevelAccepted || 0}-${isVulgarAcepted || false}`)
