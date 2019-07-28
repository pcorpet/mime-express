import React from 'react'
import {Platform, Text, TouchableOpacity, TouchableNativeFeedback, View,
  ViewStyleProp} from 'react-native'


interface ButtonProps {
  title: string
  style?: ViewStyleProp
}


export default class Button extends React.PureComponent<ButtonProps> {
  public render(): React.ReactNode {
    const {style, title, ...otherProps} = this.props
    const Touchable =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
    const {backgroundColor, color, fontSize, fontStyle, ...otherStyle} = style || {}
    const viewStyle = {
      backgroundColor,
      borderRadius: 100,
      cursor: 'pointer',
      paddingBottom: 10,
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 10,
      ...otherStyle,
    }
    const textStyle = {
      color,
      fontSize,
      fontStyle,
    }
    return <Touchable {...otherProps}>
      <View style={viewStyle}>
        <Text style={textStyle}>{title}</Text>
      </View>
    </Touchable>
  }
}
