import './timer-config'
import * as React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { SplashScreen } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import RootNavigator from './navigation/RootNavigator'
import AuthNavigator from './navigation/AuthNavigator'
import useLinking from './navigation/useLinking'
import { auth } from './sdk'
import Loading from './primitives/Loading'

const Stack = createStackNavigator()

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false)
  const [initialNavigationState, setInitialNavigationState] = React.useState()
  const [user, setUser] = React.useState()
  const [authReady, setAuthReady] = React.useState(false)
  const [token, setToken] = React.useState()
  const [tokenReady, setTokenReady] = React.useState(false)

  const containerRef = React.useRef()
  const { getInitialState } = useLinking(containerRef)

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide()

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState())

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        SplashScreen.hide()
        setLoadingComplete(true)
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  React.useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setAuthReady(true)
      setUser(user)

      user
        .getIdTokenResult()
        .then(setToken)
        .then(() => {
          setTokenReady(true)
        })
    })
  })

  if (
    (!isLoadingComplete && !props.skipLoadingScreen) ||
    !authReady ||
    !tokenReady
  ) {
    return <Loading />
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}
        >
          <Stack.Navigator>
            {user == null ? (
              <Stack.Screen name="auth" component={AuthNavigator} />
            ) : (
              <Stack.Screen name="root" component={RootNavigator} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
