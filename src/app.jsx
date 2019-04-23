import React from 'react'

import {IntroPage} from './intro'
import {MimePage} from './mime'

import 'styles/app.css'


const allExpressions = require('./expressions.json')


class App extends React.Component {
  state = {
    isIntroSeen: false,
  }

  render() {
    const {isIntroSeen} = this.state
    if (!isIntroSeen) {
      return <IntroPage onSubmit={() => this.setState({isIntroSeen: true})} />
    }
    return <MimePage allExpressions={allExpressions} />
  }
}


export {App}
