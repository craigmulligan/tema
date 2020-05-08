import * as React from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colorHash } from '../utils'
import { db } from '../firebase'
import { COLLECTIONS } from '../constants/Api'
import { auth } from '../sdk'
import { mutate } from '../utils'
import extract from 'mention-hashtag'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    minHeight: 80,
    alignItems: 'stretch'
  },
  input: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputText: {
    width: '100%',
    paddingLeft: 25
  },
  button: {
    maxWidth: 200,
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

  const addMessage = async () => {
    if (text === '') {
      throw new Error('Invalid Message')
    }

    const currentUser = auth.currentUser
    const mentions = ['4avbbkrBcmfSGLEUPtQOKsOgvcf2']

    if (!currentUser) {
      throw new Error('You need to be logged in to send a message')
    }

    const data = mutate('/messages', {
      userDisplayName: currentUser.displayName || currentUser.email,
      text,
      createdAt: Date.now(),
      userId: currentUser.uid,
      threadId: threadRef && threadRef.id,
      mentions
    })

    setText('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          multiline={true}
          placeholder={threadRef ? 'Reply to thread.' : 'Start a new thread.'}
          onChangeText={setText}
          value={text}
        />
      </View>
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
