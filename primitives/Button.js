import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

export default function Button({ onPress, style, children }) {
  return (
    <TouchableOpacity onPress = {onPress}>
      <View style = {[styles.button, style]}>
        <Text style={[styles.text]}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    borderRadius: 3,
    paddingVertical: 15,
    paddingHorizontal: 30 
  },
  text: {
    color: 'white'
  } 
})




