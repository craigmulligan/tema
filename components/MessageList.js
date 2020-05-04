import * as React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { db } from '../firebase'
import { COLLECTIONS } from '../constants/Api'
import { printDate, colorHash } from '../utils'
import { RefreshControl } from 'react-native-web-refresh-control'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0f0f0f0'
  },
  callout: {},
  calloutText: {
    textAlign: 'center',
    padding: 10
  },
  message: {
    padding: 50,
    flex: 1,
    flexDirection: 'row'
  },
  messageText: {
    flexGrow: 8
  },
  messageText: {
    flexGrow: 2
  }
})

function Message({ item, onPress }) {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={[
        styles.message,
        { backgroundColor: colorHash.hex(item.threadRef.id) }
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageMeta}>
        {printDate(new Date(item.createdAt))}
      </Text>
    </TouchableOpacity>
  )
}

function Callout({ onPress, threadRef }) {
  if (threadRef) {
    return (
      <TouchableOpacity style={styles.callout} onPress={() => onPress({})}>
        <Text style={styles.callout}>Or create a new thread</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.callout}>
      <Text style={styles.calloutText}>Or click on a message to reply</Text>
    </View>
  )
}

function useMessages(listRef) {
  const [lists, setLists] = React.useState([])
  React.useEffect(() => {
    // returning the onSnapshot result will result in
    // the listener being cancelled on unmount.
    const query = db
      .collection(COLLECTIONS.messages)
      .orderBy('createdAt', 'desc')

    query
      .limit(6)
      .onSnapshot(snapshot => {
        const newMessages = []
        snapshot.forEach(doc => {
          newMessages.unshift({
            id: doc.id,
            ...doc.data()
          })
        })


        setLists([...lists, ...newMessages])
        if (lists.length === 0) {
          // first time we have messages
          // lets scroll to bottom
          // TODO fix this is a little hacky 
          setTimeout(() => {
            listRef.current.scrollToEnd()
          }, 250)
        }
      })
  }, [])

  return [lists, setLists]
}

export default function MessageList({ threadRef, onPress }) {
  const listRef = React.useRef();
  const [refreshing, setRefreshing] = React.useState(false)
  const [messages, setMessages] = useMessages(listRef)

  function refresh() {
    setRefreshing(true)
    const first = messages[0]
    return db
      .collection(COLLECTIONS.messages)
      .orderBy('createdAt', 'desc')
      .startAfter(first.createdAt)
      .limit(6)
      .get()
      .then(snapshot => {
        const prevMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setMessages([...prevMessages.reverse(), ...messages])
      })
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false))
  }

  console.log(refreshing)

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        style={styles.list}
        data={messages}
        refreshControl={<RefreshControl refresh={refreshing} onRefresh={refresh} />}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Message item={item} onPress={onPress} />}
        ListFooterComponent={() => (
          <Callout threadRef={threadRef} onPress={onPress} />
        )}
      />
    </View>
  )
}
