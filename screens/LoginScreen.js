import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text>Login will go here</Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
});
