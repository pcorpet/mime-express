import SettingsIcon from 'mdi-react/SettingsIcon'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'

import {showSettings} from './store'


const stopPropagation = event => event.stopPropagation()


class MimePageBase extends React.Component {
  static propTypes = {
    allExpressions: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      vulgaire: PropTypes.bool,
    })).isRequired,
    areDefinitionsShown: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    style: PropTypes.object,
    transitionDurationMillisec: PropTypes.number.isRequired,
    translate: PropTypes.func.isRequired,
  }

  static defaultProps = {
    style: {
      backgroundColor: '#1e5089',
      color: '#fff',
    },
    transitionDurationMillisec: 300,
  }

  state = {
    expression: {},
    isFadingOut: false,
  }

  componentDidMount() {
    this.nextExpression()
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  nextExpression = () => {
    const {allExpressions, transitionDurationMillisec} = this.props
    clearTimeout(this.timeout)
    const nextExpression = allExpressions[Math.floor(Math.random() * allExpressions.length)]
    this.setState({isFadingOut: true})
    this.timeout = setTimeout(() => this.setState({
      expression: nextExpression,
      isFadingOut: false,
    }), transitionDurationMillisec / 2)
  }

  openSettings = () => {
    this.props.dispatch(showSettings)
  }

  render() {
    const {areDefinitionsShown, transitionDurationMillisec, translate} = this.props
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
      fontWeight: areDefinitionsShown ? 'bold' : 'inherit',
      opacity: isFadingOut ? 0 : 1,
      transition: (transitionDurationMillisec / 2) + 'ms',
    }
    const descriptionStyle = {
      fontSize: '60%',
      fontWeight: 'normal',
      marginTop: 20,
      opacity: .7,
    }
    const linkStyle = {
      color: 'inherit',
      textDecoration: 'none',
    }
    const settingsStyle = {
      cursor: 'pointer',
      padding: 20,
      position: 'absolute',
      right: 10,
      top: 10,
    }
    return <div style={style} onClick={this.nextExpression}>
      <SettingsIcon
        style={settingsStyle}
        onClick={this.openSettings} />
      <header style={headerStyle}>
        {translate('Mime the expression:')}
      </header>
      <div style={expressionStyle}>
        {expression.title || null}
        {areDefinitionsShown ? <div style={descriptionStyle}>
          {expression.definition ? expression.definition : <a
            href={`https://www.google.com/search?q=${encodeURIComponent(expression.title)}`}
            target="_blank" rel="noopener noreferrer" style={linkStyle}
            onClick={stopPropagation}>
            {translate('search definition →')}
          </a>}
        </div> : null}
      </div>
      <button onClick={this.nextExpression} style={buttonStyle}>
        {translate('Next')}
      </button>
    </div>
  }
}
const MimePage = connect()(MimePageBase)


export {MimePage}
