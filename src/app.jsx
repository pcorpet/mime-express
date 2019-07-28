import PropTypes from 'prop-types'
import React from 'react'
import {connect, Provider} from 'react-redux'
import {createStore} from 'redux'

import 'styles/app.css'

import {getExpressions} from './data'
import {IntroPage} from './intro'
import {MimePage} from './mime'
import {SettingsPage} from './settings'
import {reducer} from './store'


class MainPageBase extends React.Component {
  static propTypes = {
    areSettingsShown: PropTypes.bool.isRequired,
    settings: PropTypes.shape({
      areDefinitionsShown: PropTypes.bool,
      isVulgarAcepted: PropTypes.bool,
      lang: PropTypes.string,
      minLevelAccepted: PropTypes.number,
    }).isRequired,
    translate: PropTypes.func.isRequired,
  }

  state = {
    isIntroSeen: false,
  }

  handleIntroSubmit = () => {
    this.setState({isIntroSeen: true})
  }

  render() {
    const {areSettingsShown, settings, translate} = this.props
    const {isIntroSeen} = this.state
    if (areSettingsShown) {
      return <SettingsPage />
    }
    if (!isIntroSeen) {
      return <IntroPage onSubmit={this.handleIntroSubmit} translate={translate} />
    }
    return <MimePage
      allExpressions={getExpressions(settings)} translate={translate}
      areDefinitionsShown={!!settings.areDefinitionsShown} />
  }
}
const MainPage = connect(({areSettingsShown, settings, translate}) =>
  ({areSettingsShown, settings, translate}))(MainPageBase)


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
