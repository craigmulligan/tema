import * as React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { db } from '../sdk'
import { COLLECTIONS, LIST_LIMIT } from '../constants/Api'
import { printDate, colorHash, removeDuplicates } from '../utils'
import { RefreshControl } from 'react-native-web-refresh-control'
import { auth } from '../sdk'
import { Link } from '@react-navigation/native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0f0f0f0'
  },
  notification: {
    marginBottom: 10,
    padding: 25,
    borderLeftWidth: 10
  },
  notificationText: {},
  notificationMeta: {
    display: 'flex',
    width: '100%',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    fontSize: 12,
    marginBottom: 25
  }
})

function Notification({ item, onPress }) {
  return (
    <Link
      to={`/app/message?thread=${item.threadRef.id}&singleThread=true&message=${item.messageRef.id}`}
    >
      <TouchableOpacity style={[styles.notification]}>
        <Text style={styles.notificationMeta}>
          <View>
            <Text>{printDate(new Date(item.createdAt))}</Text>
          </View>
        </Text>
        <Text style={styles.notificationText}>{item.text}</Text>
      </TouchableOpacity>
    </Link>
  )
}

function useNotifications(listRef) {
  const [lists, setLists] = React.useState([])
  React.useEffect(() => {
    // returning the onSnapshot result will result in
    // the listener being cancelled on unmount.
    // 4avbbkrBcmfSGLEUPtQOKsOgvcf2
    const query = db
      .collection(COLLECTIONS.users)
      .doc(auth.currentUser.uid)
      .collection(COLLECTIONS.notifications)
      .orderBy('createdAt', 'desc')

    query.limit(LIST_LIMIT).onSnapshot(snapshot => {
      const newNotifications = []
      snapshot.forEach(doc => {
        newNotifications.unshift({
          id: doc.id,
          ...doc.data()
        })
      })

      const notifications = removeDuplicates(
        [...lists, ...newNotifications],
        'id'
      )

      setLists(notifications)
      if (listRef.current) {
        // TODO only scroll to bottom if the user
        // sent the notification themselves.
        // Or if they are currently scrolled to bottom.
        setTimeout(() => {
          listRef.current.scrollToEnd()
        }, 200)
      }
    })
  }, [])

  return [lists, setLists]
}

export default function NotificationList({ onPress }) {
  const listRef = React.useRef()
  const [refreshing, setRefreshing] = React.useState(false)
  const [notifications, setNotifications] = useNotifications(listRef)

  function refresh() {
    if (refreshing) {
      return
    }
    setRefreshing(true)
    const first = notifications[0]
    return db
      .collection(COLLECTIONS.users)
      .doc(auth.currentUser.uid)
      .collection(COLLECTIONS.notifications)
      .orderBy('createdAt', 'desc')
      .startAfter(first.createdAt)
      .limit(LIST_LIMIT)
      .get()
      .then(snapshot => {
        const prevNotifications = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setNotifications([...prevNotifications.reverse(), ...notifications])
      })
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false))
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        style={styles.list}
        data={notifications}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Notification item={item} onPress={onPress} />
        )}
      />
    </View>
  )
}
