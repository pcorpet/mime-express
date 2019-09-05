import React from 'react'
import {Picker, StyleSheet, Switch, Text, View} from 'react-native'
import {Icon} from 'react-native-elements'

import {datasets} from './Data'
import {Settings} from './Store'


const availableLanguages = Object.keys(datasets)
availableLanguages.sort((a, b): number => datasets[a].name - datasets[b].name)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
    textAlign: 'center',
  },
  switchRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})


const difficultyOptions = [
  {
    name: 'very common expressions',
    value: 9,
  },
  {
    name: 'common expressions',
    value: 6,
  },
  {
    name: 'common and less common',
    value: 4,
  },
  {
    name: 'all expressions',
    value: 1,
  },
]


interface ScreenProps {
  onClose: () => void
  onUpdateSettings: (newSettings: Partial<Settings>) => void
  settings: Settings
  translate: (text: string) => string
}


class SettingsScreen extends React.PureComponent<ScreenProps> {
  private handleChangeLang = (lang): void => {
    const {onUpdateSettings} = this.props
    onUpdateSettings({lang})
  }

  private handleChangeLevel = (minLevelAccepted): void => {
    const {onUpdateSettings} = this.props
    onUpdateSettings({minLevelAccepted})
  }

  private handleChangeVulgar = (): void => {
    const {onUpdateSettings, settings} = this.props
    onUpdateSettings({isVulgarAccepted: !settings.isVulgarAccepted})
  }

  private handleChangeDefinition = (): void => {
    const {onUpdateSettings, settings} = this.props
    onUpdateSettings({areDefinitionsShown: !settings.areDefinitionsShown})
  }

  public render(): React.ReactNode {
    const {settings: {areDefinitionsShown, isVulgarAccepted, lang, minLevelAccepted},
      onClose, translate} = this.props
    const closeStyle = {
      padding: 20,
      position: 'absolute',
      right: 10,
      top: 30,
    }
    return <View style={styles.container}>
      <Icon name="close" type="MaterialIcons" onPress={onClose} containerStyle={closeStyle} />
      <View style={{marginBottom: 50}}>
        <Text>{translate('Language:')}{' '}</Text>
        <Picker selectedValue={lang} onValueChange={this.handleChangeLang}>
          {availableLanguages.map((lang): React.Component<Picker.Item> =>
            <Picker.Item key={lang} value={lang} label={datasets[lang].name} />
          )}
        </Picker>
      </View>

      <View onClick={this.handleChangeDefinition} style={{...styles.switchRow, marginBottom: 50}}>
        <Text>{translate('Show the definitions')}</Text>
        <Switch value={areDefinitionsShown} onValueChange={this.handleChangeDefinition} />
      </View>

      {datasets[lang].hasLevels ? <View style={{marginBottom: 50}}>
        <Text>{translate('Difficulty:')}{' '}</Text>
        <Picker selectedValue={minLevelAccepted || 1} onValueChange={this.handleChangeLevel}>
          {difficultyOptions.map(({name, value}): React.ReactNode =>
            <Picker.Item key={value} value={value} label={translate(name)} />
          )}
        </Picker>
      </View> : null}

      {datasets[lang].hasVulgaireFlags ?
        <View onClick={this.handleChangeVulgar} style={styles.switchRow}>
          <Text>{translate('Avoid crude expressions')}</Text>
          <Switch value={!isVulgarAccepted} onValueChange={this.handleChangeVulgar} />
        </View> : null}
    </View>
  }
}


export {SettingsScreen}
