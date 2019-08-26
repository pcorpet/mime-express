import _memoize from 'lodash/memoize'
import {AsyncStorage, NativeModules, Platform} from 'react-native'


const locales = {
  en: {
    'rules': 'You must mime the expression that show up on the screen. When a player guesses ' +
      "the expression, it's their turn to mime the new one.",
  },
  fr: {
    'Avoid crude expressions': 'Éviter les expressions osées',
    'Difficulty:': 'Difficulté\u00A0:',
    'Language:': 'Langue\u00A0:',
    'Laughters guaranteed!!': 'Fous rires garantis\u00A0!!',
    'Mime the expression:': 'Mimez l’expression\u00A0:',
    'Next': 'Suivant',
    'Rules of the game:': 'Règles du jeu\u00A0:',
    'Show the definitions': 'Montrer les définitions',
    'Start': 'Commencer',
    'all expressions': 'toutes les expressions',
    'common and less common': 'communes et un peu moins',
    'common expressions': 'expressions communes',
    'rules': "Vous devez mimer l'expression qui s’affiche à l'écran. Lorsqu'un joueur " +
      "découvre l'expression, il devra à son tour mimer une nouvelle expression.",
    'search definition →': 'chercher la définition →',
    'very common expressions': 'expressions très communes',
  },
}


const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier


function getDefaultLanguage(): string {
  const lang = deviceLanguage
  if (locales[lang]) {
    return lang
  }
  const langCode = lang.substr(0, 2)
  if (locales[langCode]) {
    return langCode
  }
  return 'en'
}


const getTranslator = _memoize((lang?: string): ((text: string) => string) => {
  if (!lang) {
    lang = getDefaultLanguage()
  }
  if (locales[lang]) {
    return (text: string): string => locales[lang][text] || locales.en[text] || text
  }
  return (text: string): string => locales.en[text] || text
})


export interface Settings {
  areDefinitionsShown?: boolean
  isVulgarAccepted?: boolean
  lang: string
  minLevelAccepted?: number
}


const defaultSettings: Settings = {
  areDefinitionsShown: true,
  lang: getDefaultLanguage(),
}


async function getSettings(): Promise<Settings> {
  try {
    const value = await AsyncStorage.getItem('SETTINGS')
    if (!value) {
      return defaultSettings
    }
    return JSON.parse(value)
  } catch (err) {
    return defaultSettings
  }
}


async function setSettings(value: Settings): Promise<void> {
  try {
    await AsyncStorage.setItem('SETTINGS', JSON.stringify(value))
  } catch (err) {
    // Silence the error.
  }
}


export {
  getSettings,
  getTranslator,
  setSettings,
}
