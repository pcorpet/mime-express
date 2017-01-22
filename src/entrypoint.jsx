import React from 'react'
import ReactDOM from 'react-dom'

import {IntroPage} from './intro'
import {MimePage} from './mime'


class App extends React.Component {
  state = {
    isIntroSeen: false,
  }

  render() {
    const {isIntroSeen} = this.state
    if (!isIntroSeen) {
      return <IntroPage onSubmit={() => this.setState({isIntroSeen: true})} />
    }
    return <MimePage />
  }
}


// Render the main component into the dom.
// The Provider puts the store on a `Context`, so we can connect other components to it.
ReactDOM.render(
  <App />,
  document.getElementById('app'))
