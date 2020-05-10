import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Loading({ style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text]}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  text: {
    textAlign: 'center'
  }
})
