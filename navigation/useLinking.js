import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      App: {
        path: 'app',
        screens: {
          Home: 'home',
          Links: 'links',
          Settings: 'settings',
        },
      },
      Auth: {
        path: 'auth',
        screens: {
          Signup: 'signup',
          Login: 'login',
        },
      },
    },
  });
}
