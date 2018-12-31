import PropTypes from 'prop-types'
import React from 'react'
require('styles/fonts/Avenir/stylesheet.css')


class IntroPage extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    style: PropTypes.object,
  }

  static defaultProps = {
    style: {
      backgroundColor: '#1fa270',
      color: '#fff',
    },
  }

  render() {
    const {onSubmit} = this.props
    const style = {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Lato',
      fontSize: 19,
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      ...this.props.style,
    }
    const headerStyle = {
      fontFamily: 'Avenir Next LT Pro',
      fontSize: 33,
      marginBottom: 20,
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
      padding: '13px 30px 10px',
    }
    return <div style={style}>
      <header style={headerStyle}>
        Règles du jeu&nbsp;:
      </header>
      <div style={{maxWidth: 440}}>
        Vous devez mimer l'expression qui s’affiche à l'écran. Lorsqu'un joueur
        découvre l'expression, il devra à son tour mimer une nouvelle expression.
        <br /><br />
        Fous rires garantis&nbsp;!!
      </div>
      <button onClick={onSubmit} style={buttonStyle}>
        Commencer
      </button>
    </div>
  }
}


export {IntroPage}
