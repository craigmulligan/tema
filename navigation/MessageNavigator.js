import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import SignupScreen from '../screens/SignupScreen'
import LoginScreen from '../screens/LoginScreen'

const MessageNavigator = createStackNavigator()
const INITIAL_ROUTE_NAME = 'message'

export default function create({ navigation, route }) {
  return (
    <MessageNavigator.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <MessageNavigator.Screen
        name="signup"
        component={SignupScreen}
        options={{
          title: 'Signup'
        }}
      />
      <MessageNavigator.Screen
        name="login"
        component={LoginScreen}
        options={{
          title: 'Login'
        }}
      />
    </MessageNavigator.Navigator>
  )
}
