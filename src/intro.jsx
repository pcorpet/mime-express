import PropTypes from 'prop-types'
import React from 'react'
require('styles/fonts/Avenir/stylesheet.css')


class IntroPage extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    style: PropTypes.object,
    translate: PropTypes.func.isRequired,
  }

  static defaultProps = {
    style: {
      backgroundColor: '#1fa270',
      color: '#fff',
    },
  }

  render() {
    const {onSubmit, translate} = this.props
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
        {translate('Règles du jeu\u00A0:')}
      </header>
      <div style={{maxWidth: 440}}>
        {translate('rules')}
        <br /><br />
        {translate('Fous rires garantis\u00A0!!')}
      </div>
      <button onClick={onSubmit} style={buttonStyle}>
        {translate('Commencer')}
      </button>
    </div>
  }
}


export {IntroPage}
