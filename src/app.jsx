import PropTypes from 'prop-types'
import React from 'react'
import {connect, Provider} from 'react-redux'
import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import 'styles/app.css'

import {IntroPage} from './intro'
import {MimePage} from './mime'
import {SettingsPage} from './settings'
import {reducer} from './store'


class MainPageBase extends React.Component {
  static propTypes = {
    areSettingsShown: PropTypes.bool.isRequired,
    translate: PropTypes.func.isRequired,
  }

  state = {
    isIntroSeen: false,
  }

  handleIntroSubmit = () => {
    this.setState({isIntroSeen: true})
  }

  render() {
    const {areSettingsShown, translate} = this.props
    const {isIntroSeen} = this.state
    if (areSettingsShown) {
      return <SettingsPage />
    }
    if (!isIntroSeen) {
      return <IntroPage onSubmit={this.handleIntroSubmit} translate={translate} />
    }
    return <MimePage />
  }
}
const MainPage = connect(({areSettingsShown, translate}) =>
  ({areSettingsShown, translate}))(MainPageBase)


class App extends React.Component {
  state = {
    store: createStore(
      reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
  }

  render() {
    return <Provider store={this.state.store}>
      <MainPage />
    </Provider>
  }
}


export {App}
