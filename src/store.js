import Storage from 'local-storage-fallback'
import _memoize from 'lodash/memoize'


const locales = {
  en: {
    'Commencer': 'Start',
    'Difficulté\u00A0:': 'Difficulty:',
    'Fous rires garantis\u00A0!!': 'Laughters guaranteed!!',
    'Langue\u00A0:': 'Language:',
    'Mimez l’expression\u00A0:': 'Mime the expression:',
    'Règles du jeu\u00A0:': 'Rules of the game:',
    'Suivant': 'Next',
    'communes et un peu moins': 'comon and less common',
    'expressions communes': 'common expressions',
    'expressions très communes': 'very common expressions',
    'rules': 'You must mime the expression that show up on the screen. When a player guesses ' +
      "the expression, it's their turn to mime the new one.",
    'toutes les expressions': 'all expressions',
    'éviter les expressions osées': 'avoid crude expressions',
  },
  fr: {
    'rules': "Vous devez mimer l'expression qui s’affiche à l'écran. Lorsqu'un joueur " +
      "découvre l'expression, il devra à son tour mimer une nouvelle expression.",
  },
}

const getTranslator = _memoize(lang => {
  if (locales[lang]) {
    return text => locales[lang][text] || locales.en[text] || text
  }
  return text => locales.en[text] || text
})


const initialSettings = {lang: 'fr', ...JSON.parse(Storage.getItem('SETTINGS') || '{}')}


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
