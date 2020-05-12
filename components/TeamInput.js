import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Button from '../primitives/Button'
import TextInput from '../primitives/TextInput'
import { auth } from '../sdk'
import { mutate } from '../utils'

export default function SignUpScreen({ navigation }) {
  const [name, setName] = React.useState('')
  const [error, setError] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error.length > 0 && <Text>{error}</Text>}
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder={'Team Name'}
      />
      <Button
        style={{ marginBottom: 20 }}
        onPress={async () => {
          setLoading(true)
          try {
            const snapshot = await mutate('/teams', {
              text: name,
              userId: auth.currentUser.uid
            })
            console.log(snapshot)
            setLoading(false)
            navigation.navigate('app', {
              screen: 'feed',
              params: {
                teamId: snapshot.id
              }
            })
          } catch (err) {
            setLoading(false)
            setError(err.message)
          }
        }}
      >
        Create
      </Button>
      <Text onPress={() => navigation.goBack()}>Cancel</Text>
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
