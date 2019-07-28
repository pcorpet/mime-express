import React from 'react'
import {SplashScreen} from 'expo'

import IntroScreen from './Intro'
import MimeScreen from './Mime'
import {getSettings, getTranslator, Settings} from './Store'
import enExpressions from './assets/data/english.json'



interface AppState {
  isIntroSeen: boolean
  isReady: boolean
  settings?: Settings
  translate?: (text: string) => string
}


export default class App extends React.PureComponent<{}, AppState> {
  public state = {
    isIntroSeen: false,
    isReady: false,
  }

  public componentDidMount(): void {
    SplashScreen.preventAutoHide()
    getSettings().then((settings: Settings): void => {
      this.setState({
        isReady: true,
        settings,
        translate: getTranslator(settings && settings.lang),
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

  public render(): React.ReactNode {
    const {isIntroSeen, isReady, settings, translate} = this.state
    if (!isReady) {
      return null
    }
    if (!isIntroSeen) {
      return <IntroScreen onClose={this.handleIntroClose} translate={translate} />
    }
    return <MimeScreen
      allExpressions={enExpressions} onBack={this.handleMimeBack} translate={translate}
      settings={settings} />
  }
}
