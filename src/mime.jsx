import React from 'react'


const allExpressions = require('./expressions.json')


class MimePage extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    transitionDurationMillisec: React.PropTypes.number.isRequired,
  }

  static defaultProps = {
    style: {
      backgroundColor: '#1e5089',
      color: '#fff',
    },
    transitionDurationMillisec: 300,
  }

  state = {
    expression: '',
    isFadingOut: false,
  }

  componentWillMount() {
    this.nextExpression()
  }

  nextExpression = () => {
    const {transitionDurationMillisec} = this.props
    clearTimeout(this.timeout)
    const nextExpression = allExpressions[Math.floor(Math.random() * allExpressions.length)]
    this.setState({isFadingOut: true})
    this.timeout = setTimeout(() => this.setState({
      expression: nextExpression,
      isFadingOut: false,
    }), transitionDurationMillisec / 2)
  }

  render() {
    const {transitionDurationMillisec} = this.props
    const {expression, isFadingOut} = this.state
    const style = {
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Lato',
      fontSize: 35,
      justifyContent: 'space-between',
      minHeight: '100vh',
      padding: 30,
      textAlign: 'center',
      ...this.props.style,
    }
    const headerStyle = {
      fontFamily: 'Avenir Next LT Pro',
      fontSize: 16,
    }
    const buttonStyle = {
      backgroundColor: style.color,
      border: 'none',
      borderRadius: 100,
      color: style.backgroundColor,
      cursor: 'pointer',
      fontFamily: 'Avenir Next LT Pro',
      fontSize: 16,
      opacity: .5,
      padding: '13px 30px 10px',
    }
    const expressionStyle = {
      opacity: isFadingOut ? 0 : 1,
      transition: (transitionDurationMillisec / 2) + 'ms',
    }
    return <div style={style} onClick={this.nextExpression}>
      <header style={headerStyle}>
        Mimez l’expression&nbsp;:
      </header>
      <div style={expressionStyle}>
        {expression}
      </div>
      <button onClick={this.nextExpression} style={buttonStyle}>
        Suivant
      </button>
    </div>
  }
}


export {MimePage}
