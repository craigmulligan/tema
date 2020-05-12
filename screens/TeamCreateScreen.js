import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth } from '../sdk'
import Button from '../primitives/Button'
import TeamInput from '../components/TeamInput'

export default function TeamCreateScreen({ navigation }) {
  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TeamInput navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
})
