

const initialState = {
  areSettingsShown: false,
  settings: {},
}


function reducer(state = initialState, action) {
  if (action.type === 'SHOW_SETTINGS') {
    return {...state, areSettingsShown: true}
  }
  if (action.type === 'HIDE_SETTINGS') {
    return {...state, areSettingsShown: false}
  }
  if (action.type === 'UPDATE_SETTINGS') {
    return {...state, settings: {...state.settings, ...action.settings}}
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
