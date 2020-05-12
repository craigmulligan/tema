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

function Message({ item, isActive, singleThread }) {
  const bgShade = isActive ? 'dark' : 'light'
  const Touch = singleThread ? View : Link
  return (
    <Touch
      draggable="false"
      style={[
        styles.message,
        {
          backgroundColor: colorHash[bgShade].hex(item.threadRef.id),
          borderLeftColor: colorHash.dark.hex(item.threadRef.id)
        }
      ]}
      to={`/app/feed?threadId=${item.threadRef.id}`}
    >
      <Text style={styles.messageMeta}>
        <View>
          <Text>{item.userDisplayName}</Text>
          <Text>{item.id}</Text>
        </View>
        <View>
          <Text>{printDate(new Date(item.createdAt))}</Text>
        </View>
      </Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </Touch>
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

function useMessages(listRef, singleThread, threadRef = {}, messageRef) {
  const [lists, setLists] = React.useState([])
  React.useEffect(() => {
    let listener
    const startListener = async () => {
      // returning the onSnapshot result will result in
      // the listener being cancelled on unmount.
      let query = db
        .collection(COLLECTIONS.messages)
        .orderBy('createdAt', 'desc')

      if (singleThread && threadRef) {
        query = query.where('threadRef', '==', threadRef)
      }

      if (messageRef) {
        // make sure we load the actual message
        const snapshot = await messageRef.get()
        // from the message ref till now
        // TODO we should check for new messages onScrollReachEnd instead of the whole range
        // But notSure how that would work with the listener right now.
        query = query.endAt(snapshot.data().createdAt)
      } else {
        // just get the last x messages.
        query = query.limit(6)
      }

      listener = query.onSnapshot(snapshot => {
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
            if (messageRef) {
              listRef.current.scrollToItem({ item: { id: messageRef.id } })
            } else {
              listRef.current.scrollToEnd()
            }
          }, 200)
        }
      })
    }

    startListener()
    const stopListener = () => {
      listener()
    }

    return stopListener
  }, [singleThread, threadRef.id])

  return [lists, setLists]
}

export default function MessageList({ threadRef, singleThread, messageRef }) {
  const listRef = React.useRef()
  const [refreshing, setRefreshing] = React.useState(false)
  const [messages, setMessages] = useMessages(
    listRef,
    singleThread,
    threadRef,
    messageRef
  )

  function refresh() {
    if (refreshing) {
      return
    }
    setRefreshing(true)
    const first = messages[0]
    let query = db.collection(COLLECTIONS.messages)

    if (singleThread && threadRef) {
      query = query.where('threadRef', '==', threadRef)
    }

    query
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
        renderItem={({ item }) => (
          <Message
            item={item}
            isActive={item.id === messageRef?.id}
            singleThread={singleThread}
          />
        )}
        ListFooterComponent={() => <Callout threadRef={threadRef} />}
      />
    </View>
  )
}
