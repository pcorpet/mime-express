import React from 'react'


const allExpressions = require('./expressions.json')


class MimePage extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
  }

  static defaultProps = {
    style: {
      backgroundColor: '#1e5089',
      color: '#fff',
    },
  }

  state = {
    expression: '',
  }

  componentWillMount() {
    this.nextExpression()
  }

  nextExpression = () => {
    this.setState({
      expression: allExpressions[Math.floor(Math.random() * allExpressions.length)],
    })
  }

  render() {
    const {expression} = this.state
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
      marginTop: 50,
      opacity: .5,
      padding: '13px 30px 10px',
    }
    return <div style={style}>
      <header style={headerStyle}>
        Mimez l’expression&nbsp;:
      </header>
      {expression}
      <button onClick={this.nextExpression} style={buttonStyle}>
        Suivant
      </button>
    </div>
  }
}


export {MimePage}
