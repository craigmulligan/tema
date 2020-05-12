import { useLinking } from '@react-navigation/native'
import { Linking } from 'expo'

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      root: {
        path: '',
        screens: {
          app: 'app',
          thread: 'thread',
          teamCreate: 'create',
          team: 'team'
        }
      },
      auth: 'auth'
    }
  })
}
