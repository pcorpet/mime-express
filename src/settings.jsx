import CloseIcon from 'mdi-react/CloseIcon'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'

import {datasets} from './data'
import {hideSettings, updateSettings} from './store'


const availableLanguages = Object.keys(datasets)
availableLanguages.sort((a, b) => datasets[a].name - datasets[b].name)


const difficultyOptions = [
  {
    name: 'expressions très communes',
    value: 9,
  },
  {
    name: 'expressions communes',
    value: 6,
  },
  {
    name: 'communes et un peu moins',
    value: 4,
  },
  {
    name: 'toutes les expressions',
    value: 1,
  },
]


class SettingsPageBase extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    settings: PropTypes.shape({
      isVulgarAccepted: PropTypes.bool,
      lang: PropTypes.string,
      minLevelAccepted: PropTypes.number,
    }).isRequired,
  }

  close = () => this.props.dispatch(hideSettings)

  handleChangeLang = event => {
    const {dispatch} = this.props
    dispatch(updateSettings({lang: event.target.value}))
  }

  handleChangeLevel = event => {
    const {dispatch} = this.props
    const minLevelAccepted = parseInt(event.target.value, 10)
    dispatch(updateSettings({minLevelAccepted}))
  }

  handleChangeVulgar = () => {
    const {dispatch, settings} = this.props
    dispatch(updateSettings({isVulgarAccepted: !settings.isVulgarAccepted}))
  }

  render() {
    const {isVulgarAccepted, lang, minLevelAccepted} = this.props.settings
    const style = {
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Lato',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 30,
      textAlign: 'center',
    }
    const closeStyle = {
      cursor: 'pointer',
      padding: 20,
      position: 'absolute',
      right: 10,
      top: 10,
    }
    return <div style={style}>
      <CloseIcon onClick={this.close} style={closeStyle} />
      <div style={{marginBottom: 30}}>
        Langue&nbsp;:{' '}
        <select value={lang} onChange={this.handleChangeLang}>
          {availableLanguages.map(lang =>
            <option key={lang} value={lang}>{datasets[lang].name}</option>)}
        </select>
      </div>
      {datasets[lang].hasLevels ? <div style={{marginBottom: 30}}>
        Difficulté&nbsp;:{' '}
        <select value={(minLevelAccepted || 1) + ''} onChange={this.handleChangeLevel}>
          {difficultyOptions.map(({name, value}) =>
            <option key={value} value={value}>{name}</option>
          )}
        </select>
      </div> : null}

      {datasets[lang].hasVulgaireFlags ?
        <div onClick={this.handleChangeVulgar} style={{cursor: 'pointer'}}>
          <input type="checkbox" checked={!isVulgarAccepted} onChange={this.handleChangeVulgar} />
          éviter les expressions osées
        </div> : null}
    </div>
  }
}
const SettingsPage = connect(({settings}) => ({settings}))(SettingsPageBase)


export {SettingsPage}
