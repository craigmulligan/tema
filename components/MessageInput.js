import * as React from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colorHash } from '../utils'
import { db } from '../firebase'
import { COLLECTIONS } from '../constants/Api'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  input: {
    flex: 9,
    padding: 50
  },
  button: {
    flex: 1,
    padding: 50,
    alignContent: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff'
  }
})

export default function MessageInput({ threadRef }) {
  const [text, setText] = React.useState('')

  const addMessage = () => {
    db.collection(COLLECTIONS.messages).add({
      text,
      createdAt: Date.now(),
      threadRef: threadRef
        ? threadRef
        : db.collection(COLLECTIONS.threads).doc()
    })

    setText('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={
          threadRef
            ? 'Replying to thread..' + threadRef.id
            : 'Starting a new thread.'
        }
        onChangeText={setText}
        value={text}
      />
      <TouchableOpacity
        style={[
          {
            backgroundColor: threadRef && colorHash.hex(threadRef.id)
          },
          styles.button
        ]}
        onPress={addMessage}
      >
        <Ionicons
          style={[
            styles.buttonText,
            {
              color: !threadRef && 'black'
            }
          ]}
          name="md-send"
        />
      </TouchableOpacity>
    </View>
  )
}
