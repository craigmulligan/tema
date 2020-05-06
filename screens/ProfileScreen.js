import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { auth } from '../firebase'
import Button from '../primitives/Button'

export default function LinksScreen() {
  return (
    <View style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text>{auth.currentUser.email}</Text>
      <Button onPress={() => auth.signOut()} />Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  }
});
