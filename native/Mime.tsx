import React from 'react'
import {BackHandler, Linking, StyleSheet, Text, View} from 'react-native'
import Button from './Button'
import {Settings} from './Store'


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    color: '#1e5089',
    fontSize: 16,
    opacity: .5,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#1e5089',
    flex: 1,
    justifyContent: 'space-between',
    padding: 30,
    textAlign: 'center',
  },
  description: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'normal',
    marginTop: 20,
    opacity: .7,
    textAlign: 'center',
  },
  expression: {
    color: '#fff',
    fontSize: 35,
    textAlign: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
  },
})


interface Expression {
  definition?: string
  title: string
  vulgaire?: boolean
}


interface MimeScreenProps {
  allExpressions: readonly Expression[]
  onBack?: () => boolean
  settings: Settings
  translate: (text: string) => string
  transitionDurationMillisec: number
}


interface MimeScreenState {
  expression: Expression
  isFadingOut: boolean
}


export default class MimeScreen extends React.PureComponent<MimeScreenProps> {
  public static defaultProps = {
    transitionDurationMillisec: 300,
  }

  public state = {
    expression: {},
    isFadingOut: false,
  }

  public componentDidMount(): void {
    this.nextExpression()
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  public componentWillUnmount(): void {
    this.backHandler.remove()
  }

  private handleBackPress = (): boolean => {
    const {onBack} = this.props
    if (onBack) {
      return onBack()
    }
  }

  private nextExpression = (): void => {
    const {allExpressions, transitionDurationMillisec} = this.props
    clearTimeout(this.timeout)
    const nextExpression = allExpressions[Math.floor(Math.random() * allExpressions.length)]
    this.setState({isFadingOut: true})
    this.timeout = setTimeout((): void => this.setState({
      expression: nextExpression,
      isFadingOut: false,
    }), transitionDurationMillisec / 2)
  }

  private searchForDefinition = (): void => {
    const {expression} = this.state
    Linking.openURL(`https://www.google.com/search?q=${encodeURIComponent(expression.title)}`)
  }

  public render(): React.ReactNode {
    const {settings, transitionDurationMillisec, translate} = this.props
    const {expression, isFadingOut} = this.state
    const areDefinitionsShown = settings.areDefinitionsShown
    const fadingStyle = {
      opacity: isFadingOut ? 0 : 1,
      transition: (transitionDurationMillisec / 2) + 'ms',
    }
    return <View style={styles.container}>
      {/* <SettingsIcon
        style={settingsStyle}
        onClick={this.openSettings} /> */}
      <Text style={styles.header}>{translate('Mime the expression:')}</Text>
      <View style={fadingStyle}>
        <Text style={styles.expression}>{expression.title}</Text>
        {areDefinitionsShown ? <Text style={styles.description}>
          {expression.definition ? expression.definition : <Text
            style={styles.link} onPress={this.searchForDefinition}>
            {translate('search definition →')}
          </Text>}
        </Text> : null}
      </View>
      <Button
        onPress={this.nextExpression} title={translate('Next')}
        style={styles.button} />
    </View>
  }
}
