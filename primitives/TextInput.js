import * as React from 'react'
import {
  StyleSheet,
  TextInput
} from 'react-native'

const styles = StyleSheet.create({
  input: {
    borderRadius: 3,
    padding:  25,
  },
})

export default function Button({ style, ...props }) {
  return <TextInput style={[styles.input, style]} {...props} /> 
}



