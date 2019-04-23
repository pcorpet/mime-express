import _memoize from 'lodash/memoize'
import PropTypes from 'prop-types'
import React from 'react'
import {connect, Provider} from 'react-redux'
import {createStore} from 'redux'

import {IntroPage} from './intro'
import {MimePage} from './mime'
import {SettingsPage} from './settings'
import {reducer} from './store'

import 'styles/app.css'


const allExpressions = require('./expressions.json')


const filterExpressions = _memoize(
  ({isVulgarAcepted, minLevelAccepted}) => allExpressions.filter(expression => {
    if (minLevelAccepted && expression.score < minLevelAccepted) {
      return false
    }
    if (!isVulgarAcepted && expression.vulgaire) {
      return false
    }
    return true
  }),
  ({isVulgarAcepted, minLevelAccepted}) => `${minLevelAccepted || 0}-${isVulgarAcepted || false}`)


class MainPageBase extends React.Component {
  static propTypes = {
    areSettingsShown: PropTypes.bool.isRequired,
    settings: PropTypes.shape({
      isVulgarAcepted: PropTypes.bool,
      minLevelAccepted: PropTypes.number,
    }).isRequired,
  }

  state = {
    isIntroSeen: false,
  }

  render() {
    const {areSettingsShown, settings} = this.props
    const {isIntroSeen} = this.state
    if (areSettingsShown) {
      return <SettingsPage />
    }
    if (!isIntroSeen) {
      return <IntroPage onSubmit={() => this.setState({isIntroSeen: true})} />
    }
    return <MimePage allExpressions={filterExpressions(settings)} />
  }
}
const MainPage = connect(({areSettingsShown, settings}) =>
  ({areSettingsShown, settings}))(MainPageBase)


class App extends React.Component {
  state = {
    store: createStore(reducer),
  }

  render() {
    return <Provider store={this.state.store}>
      <MainPage />
    </Provider>
  }
}


export {App}
