import _memoize from 'lodash/memoize'
import React from 'react'

import IntroScreen from './Intro'
import MimeScreen from './Mime'
import enExpressions from './assets/data/english.json'


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
    'search definition →': 'chercher la définition →',
    'show the definitions': 'montrer les définitions',
    'very common expressions': 'expressions très communes',
  },
}

const getTranslator = _memoize((lang: string): ((text: string) => string) => {
  if (locales[lang]) {
    return (text: string): string => locales[lang][text] || locales.en[text] || text
  }
  return (text: string): string => locales.en[text] || text
})



export default class App extends React.PureComponent {
  public state = {
    isIntroSeen: false,
  }

  private handleIntroClose = (): void => {
    this.setState({isIntroSeen: true})
  }

  private handleMimeBack = (): boolean => {
    this.setState({isIntroSeen: false})
    return true
  }

  public render(): React.ReactNode {
    const translate = getTranslator('fr')
    if (!this.state.isIntroSeen) {
      return <IntroScreen onClose={this.handleIntroClose} translate={translate} />
    }
    return <MimeScreen
      allExpressions={enExpressions} onBack={this.handleMimeBack} translate={translate} />
  }
}
