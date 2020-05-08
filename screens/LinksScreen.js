import { Ionicons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NotificationList from '../components/NotificationList'

export default function LinksScreen() {
  return (
    <View style={styles.container}>
      <NotificationList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  }
})
