import * as React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { db } from '../sdk'
import { COLLECTIONS } from '../constants/Api'
import { printDate, colorHash, removeDuplicates } from '../utils'
import { RefreshControl } from 'react-native-web-refresh-control'
import { Link } from '@react-navigation/native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0f0f0f0'
  },
  calloutText: {
    textAlign: 'center',
    padding: 10
  },
  message: {
    marginBottom: 10,
    padding: 25,
    borderLeftWidth: 10
  },
  messageText: {},
  messageMeta: {
    display: 'flex',
    width: '100%',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    fontSize: 12,
    marginBottom: 25
  }
})

function Message({ item }) {
  return (
    <Link
      style={[
        styles.message,
        {
          backgroundColor: colorHash.light.hex(item.threadRef.id),
          borderLeftColor: colorHash.dark.hex(item.threadRef.id)
        }
      ]}
      to={`/app/feed?threadId=${item.threadRef.id}`}
    >
      <Text style={styles.messageMeta}>
        <View>
          <Text>{item.userDisplayName}</Text>
        </View>
        <View>
          <Text>{printDate(new Date(item.createdAt))}</Text>
        </View>
      </Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </Link>
  )
}

function Callout({ threadRef }) {
  if (threadRef) {
    return (
      <View>
        <Link to="/app/feed">
          <Text style={styles.calloutText}>
            Click here to create a new thread
          </Text>
        </Link>
      </View>
    )
  }

  return (
    <View>
      <Text style={styles.calloutText}>Click on a message to reply</Text>
    </View>
  )
}

function useMessages(listRef, singleThread, threadRef = {}) {
  const [lists, setLists] = React.useState([])
  React.useEffect(() => {
    // returning the onSnapshot result will result in
    // the listener being cancelled on unmount.
    let query = db.collection(COLLECTIONS.messages).orderBy('createdAt', 'desc')

    if (singleThread && threadRef) {
      query = query.where('threadRef', '==', threadRef)
    }

    query.limit(6).onSnapshot(snapshot => {
      const newMessages = []
      snapshot.forEach(doc => {
        newMessages.unshift({
          id: doc.id,
          ...doc.data()
        })
      })

      const msgs = removeDuplicates([...lists, ...newMessages], 'id')

      setLists(newMessages)
      if (listRef.current) {
        // TODO only scroll to bottom if the user
        // sent the message themselves.
        // Or if they are currently scrolled to bottom.
        setTimeout(() => {
          listRef.current.scrollToEnd()
        }, 200)
      }
    })
  }, [singleThread, threadRef.id])

  return [lists, setLists]
}

export default function MessageList({ threadRef, singleThread }) {
  console.log({ singleThread, threadRef })
  const listRef = React.useRef()
  const [refreshing, setRefreshing] = React.useState(false)
  const [messages, setMessages] = useMessages(listRef, singleThread, threadRef)

  function refresh() {
    if (refreshing) {
      return
    }
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

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        style={styles.list}
        data={messages}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Message item={item} />}
        ListFooterComponent={() => <Callout threadRef={threadRef} />}
      />
    </View>
  )
}
