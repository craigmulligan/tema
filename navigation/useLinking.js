import { useLinking } from '@react-navigation/native'
import { Linking } from 'expo'

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      app: {
        path: 'app',
        screens: {
          home: 'home',
          links: 'links',
          settings: 'settings'
        }
      },
      auth: {
        path: 'auth',
        screens: {
          signup: 'signup',
          login: 'login'
        }
      }
    }
  })
}
