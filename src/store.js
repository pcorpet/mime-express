import Storage from 'local-storage-fallback'


const initialState = {
  areSettingsShown: false,
  settings: {lang: 'fr', ...JSON.parse(Storage.getItem('SETTINGS') || '{}')},
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
    return {...state, settings}
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
