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
  team: {
    marginBottom: 10,
    padding: 25,
    borderLeftWidth: 10
  },
  teamText: {},
  teamMeta: {
    display: 'flex',
    width: '100%',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    fontSize: 12,
    marginBottom: 25
  }
})

function Team({ item }) {
  return (
    <Link to={`/app/${item.id}/feed`} draggable="false" style={[styles.team]}>
      <Text style={styles.teamMeta}>
        <View>
          <Text>{printDate(new Date(item.createdAt))}</Text>
        </View>
      </Text>
      <Text style={styles.teamText}>{item.text}</Text>
    </Link>
  )
}

function useTeams(listRef) {
  const [lists, setLists] = React.useState([])
  React.useEffect(() => {
    // returning the onSnapshot result will result in
    // the listener being cancelled on unmount.
    // 4avbbkrBcmfSGLEUPtQOKsOgvcf2
    const query = db.collection(COLLECTIONS.teams).orderBy('createdAt', 'desc')

    query.limit(LIST_LIMIT).onSnapshot(snapshot => {
      const newTeams = []
      snapshot.forEach(doc => {
        newTeams.unshift({
          id: doc.id,
          ...doc.data()
        })
      })

      const teams = removeDuplicates([...lists, ...newTeams], 'id')

      setLists(teams)
      if (listRef.current) {
        // TODO only scroll to bottom if the user
        // sent the team themselves.
        // Or if they are currently scrolled to bottom.
        setTimeout(() => {
          listRef.current.scrollToEnd()
        }, 200)
      }
    })
  }, [])

  return [lists, setLists]
}

export default function TeamList({ ids }) {
  const listRef = React.useRef()
  const [teams, setTeams] = useTeams(listRef)

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        style={styles.list}
        data={teams}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Team item={item} onPress={onPress} />}
      />
    </View>
  )
}
