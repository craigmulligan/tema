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
      <Text style={styles.teamText}>{item.text}</Text>
    </Link>
  )
}

function useTeams() {
  const [lists, setLists] = React.useState([])
  React.useEffect(() => {
    const getTeams = async () => {
      const query = db
        .collection(COLLECTIONS.users)
        .doc(auth.currentUser.uid)
        .collection(COLLECTIONS.teams)

      const snapshot = await query.limit(LIST_LIMIT).get()
      const teamRefs = snapshot.docs.map(doc => {
        const data = doc.data()
        return data.teamRef.get()
      })

      const data = await Promise.all(teamRefs)

      setLists(
        data.map(d => {
          return {
            id: d.id,
            ...d.data()
          }
        })
      )
    }

    getTeams()
  }, [auth.currentUser.uid])

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
        renderItem={({ item }) => <Team item={item} />}
      />
    </View>
  )
}
