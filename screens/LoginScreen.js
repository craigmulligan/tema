import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Button from '../primitives/Button'
import TextInput from '../primitives/TextInput'
import { auth } from '../sdk'

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error.length > 0 && <Text>{error}</Text>}
      <TextInput value={email} onChangeText={setEmail} placeholder={'Email'} />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder={'Password'}
        secureTextEntry={true}
      />
      <Button
        style={{ marginBottom: 20 }}
        onPress={() => {
          setLoading(true)
          auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              setLoading(false)
            })
            .catch(error => {
              setLoading(false)
              console.log('no!', error)
              let errorCode = error.code
              let errorMessage = error.message
              if (errorCode == 'auth/weak-password') {
                setError('Weak Password')
              } else {
                setError(errorMessage)
              }
            })
        }}
      >
        Login
      </Button>
      <Text onPress={() => navigation.navigate('signup')}>Or Signup</Text>
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
