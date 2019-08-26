import {SplashScreen} from 'expo'
import React from 'react'

import {getExpressions} from './Data'
import IntroScreen from './Intro'
import MimeScreen from './Mime'
import {SettingsScreen} from './Settings'
import {Settings, getSettings, getTranslator, setSettings} from './Store'



interface AppState {
  areSettingsShown: boolean
  isIntroSeen: boolean
  isReady: boolean
  settings?: Settings
}


export default class App extends React.PureComponent<{}, AppState> {
  public state = {
    areSettingsShown: false,
    isIntroSeen: false,
    isReady: false,
  }

  public componentDidMount(): void {
    SplashScreen.preventAutoHide()
    getSettings().then((settings: Settings): void => {
      this.setState({
        isReady: true,
        settings,
      })
      SplashScreen.hide()
    })
  }

  private handleIntroClose = (): void => {
    this.setState({isIntroSeen: true})
  }

  private handleMimeBack = (): boolean => {
    this.setState({isIntroSeen: false})
    return true
  }

  private hideSettings = (): void => {
    this.setState({areSettingsShown: false})
  }

  private showSettings = (): void => {
    this.setState({areSettingsShown: true})
  }

  private updateSettings = (newSettings: Partial<Settings>): void => {
    const {settings} = this.state
    this.setState({settings: {...settings, ...newSettings}}, (): void => {
      setSettings(this.state.settings)
    })
  }

  public render(): React.ReactNode {
    const {areSettingsShown, isIntroSeen, isReady, settings} = this.state
    const translate = getTranslator(settings && settings.lang)
    if (!isReady) {
      return null
    }
    if (areSettingsShown) {
      return <SettingsScreen
        onClose={this.hideSettings}
        onUpdateSettings={this.updateSettings}
        settings={settings}
        translate={translate} />
    }
    if (!isIntroSeen) {
      return <IntroScreen onClose={this.handleIntroClose} translate={translate} />
    }
    const expressions = getExpressions(settings)
    return <MimeScreen
      allExpressions={expressions} onBack={this.handleMimeBack} translate={translate}
      onOpenSettings={this.showSettings}
      settings={settings} />
  }
}
