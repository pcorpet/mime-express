import SettingsIcon from 'mdi-react/SettingsIcon'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'

import {getExpressions} from './data'
import {nextExpression, showSettings} from './store'


const stopPropagation = event => event.stopPropagation()

const nextExpressionCreator = () => nextExpression
const showSettingsCreator = () => showSettings


class MimePageBase extends React.Component {
  static propTypes = {
    areDefinitionsShown: PropTypes.bool.isRequired,
    expression: PropTypes.shape({
      definition: PropTypes.string,
      title: PropTypes.string.isRequired,
    }).isRequired,
    onNextExpression: PropTypes.func.isRequired,
    onShowSettings: PropTypes.func.isRequired,
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
    expression: this.props.expression,
    isFadingOut: false,
  }

  componentDidUpdate({expression: prevExpression}) {
    const {expression, transitionDurationMillisec} = this.props
    if (expression !== prevExpression) {
      this.setState({isFadingOut: true})
      this.timeout = setTimeout(() => this.setState({
        expression,
        isFadingOut: false,
      }), transitionDurationMillisec / 2)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  nextExpression = (event) => {
    stopPropagation(event)
    this.props.onNextExpression()
  }

  render() {
    const {areDefinitionsShown, onNextExpression, onShowSettings, transitionDurationMillisec,
      translate} = this.props
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
    return <div style={style} onClick={onNextExpression}>
      <SettingsIcon
        style={settingsStyle}
        onClick={onShowSettings} />
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
const MimePage = connect(({expressionIndex, settings, translate}) => {
  const expressions = getExpressions(settings)
  const numExpressions = expressions.length
  return {
    areDefinitionsShown: !!settings.areDefinitionsShown,
    expression: expressions[((expressionIndex % numExpressions) + numExpressions) % numExpressions],
    translate,
  }
}, {
  onNextExpression: nextExpressionCreator,
  onShowSettings: showSettingsCreator,
})(MimePageBase)


export {MimePage}
