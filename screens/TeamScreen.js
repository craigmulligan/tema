import { Ionicons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth } from '../sdk'
import Button from '../primitives/Button'
import TeamList from '../components/TeamList'

export default function TeamScreen() {
  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TeamList teamIds={[]} />
      <Button onPress={() => {}}>Create a Team</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
