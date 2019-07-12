import Storage from 'local-storage-fallback'
import _memoize from 'lodash/memoize'


const locales = {
  en: {
    'rules': 'You must mime the expression that show up on the screen. When a player guesses ' +
      "the expression, it's their turn to mime the new one.",
  },
  fr: {
    'Difficulty:': 'Difficulté\u00A0:',
    'Language:': 'Langue\u00A0:',
    'Laughters guaranteed!!': 'Fous rires garantis\u00A0!!',
    'Mime the expression:': 'Mimez l’expression\u00A0:',
    'Next': 'Suivant',
    'Rules of the game:': 'Règles du jeu\u00A0:',
    'Start': 'Commencer',
    'all expressions': 'toutes les expressions',
    'avoid crude expressions': 'éviter les expressions osées',
    'common and less common': 'communes et un peu moins',
    'common expressions': 'expressions communes',
    'rules': "Vous devez mimer l'expression qui s’affiche à l'écran. Lorsqu'un joueur " +
      "découvre l'expression, il devra à son tour mimer une nouvelle expression.",
    'very common expressions': 'expressions très communes',
  },
}

const getTranslator = _memoize(lang => {
  if (locales[lang]) {
    return text => locales[lang][text] || locales.en[text] || text
  }
  return text => locales.en[text] || text
})


function getNavigatorLanguage() {
  const lang = navigator.language || navigator.userLanguage
  if (locales[lang]) {
    return lang
  }
  const langCode = lang.substr(0, 2)
  if (locales[langCode]) {
    return langCode
  }
  return 'en'
}


const initialSettings = {
  lang: getNavigatorLanguage(),
  ...JSON.parse(Storage.getItem('SETTINGS') || '{}'),
}


const initialState = {
  areSettingsShown: false,
  settings: initialSettings,
  translate: getTranslator(initialSettings.lang),
}


function reducer(state = initialState, action) {
  if (action.type === 'SHOW_SETTINGS') {
    return {...state, areSettingsShown: true}
  }
  if (action.type === 'HIDE_SETTINGS') {
    return {...state, areSettingsShown: false}
  }
  if (action.type === 'UPDATE_SETTINGS') {
    const settings = {
      ...state.settings,
      ...action.settings,
    }
    Storage.setItem('SETTINGS', JSON.stringify(settings))
    return {...state, settings, translate: getTranslator(settings.lang)}
  }
  return state
}


const hideSettings = {type: 'HIDE_SETTINGS'}


const showSettings = {type: 'SHOW_SETTINGS'}

const updateSettings = (settings) => ({
  settings,
  type: 'UPDATE_SETTINGS',
})


export {hideSettings, reducer, showSettings, updateSettings}
