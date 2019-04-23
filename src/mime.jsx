import SettingsIcon from 'mdi-react/SettingsIcon'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'

import {showSettings} from './store'


class MimePageBase extends React.Component {
  static propTypes = {
    allExpressions: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      vulgaire: PropTypes.bool,
    })).isRequired,
    dispatch: PropTypes.func.isRequired,
    style: PropTypes.object,
    transitionDurationMillisec: PropTypes.number.isRequired,
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
      expression: nextExpression.title,
      isFadingOut: false,
    }), transitionDurationMillisec / 2)
  }

  openSettings = () => {
    this.props.dispatch(showSettings)
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
const MimePage = connect()(MimePageBase)


export {MimePage}
