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
    padding: 25
  },
  button: {
    padding: 25,
    flex: 1,
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
    if (text === '') {
      throw new Error('Invalid Message')
    }
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
        placeholder={threadRef ? 'Reply to thread.' : 'Start a new thread.'}
        onChangeText={setText}
        value={text}
      />
      <TouchableOpacity
        style={[
          {
            backgroundColor: threadRef ? colorHash.hex(threadRef.id) : null
          },
          styles.button
        ]}
        onPress={addMessage}
      >
        <Ionicons
          style={[
            styles.buttonText,
            {
              color: !threadRef ? 'black' : 'white'
            }
          ]}
          name="md-send"
        />
      </TouchableOpacity>
    </View>
  )
}
