import * as React from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colorHash } from '../utils'
import { db } from '../firebase'
import { COLLECTIONS } from '../constants/Api'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    minHeight: 80,
    alignItems: 'stretch'
  },
  input: {
    flex: 7,
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
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
        multiline={true}
        style={styles.input}
        placeholder={threadRef ? 'Reply to thread.' : 'Start a new thread.'}
        onChangeText={setText}
        value={text}
      />
      <TouchableOpacity
        style={[
          {
            backgroundColor: threadRef ? colorHash.dark.hex(threadRef.id) : null
          },
          styles.button
        ]}
        onPress={addMessage}
      >
        <View>
          <Ionicons
            style={[
              styles.buttonText,
              {
                color: !threadRef ? 'black' : 'white'
              }
            ]}
            name="md-send"
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}
