import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Button from './Button'


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    color: '#1fa270',
    fontSize: 16,
    marginTop: 50,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#1fa270',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 19,
    textAlign: 'center',
  },
})


interface IntroScreenProps {
  onClose: () => void
  translate: (text: string) => string
}


export default class IntroScreen extends React.PureComponent<IntroScreenProps> {
  public render(): React.ReactNode {
    const {onClose, translate} = this.props
    const headerStyle = {
      ...styles.text,
      fontSize: 33,
      marginBottom: 20,
    }
    return <View style={styles.container}>
      <Text style={headerStyle}>{translate('Rules of the game:')}</Text>
      <Text style={{maxWidth: 440, ...styles.text}}>
        {translate('rules')}
        {'\n\n'}
        {translate('Laughters guaranteed!!')}
      </Text>
      <Button style={styles.button} onPress={onClose} title={translate('Start')} />
    </View>
  }
}
