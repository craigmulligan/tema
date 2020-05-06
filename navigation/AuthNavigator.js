import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import TabBarIcon from '../components/TabBarIcon'
import SignupScreen from '../screens/SignupScreen'
import LoginScreen from '../screens/LoginScreen'

const AuthNavigator = createStackNavigator()
const INITIAL_ROUTE_NAME = 'signup'

export default function create({ navigation, route }) {
  return (
    <AuthNavigator.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <AuthNavigator.Screen
        name="signup"
        component={SignupScreen}
        options={{
          title: 'Signup'
        }}
      />
      <AuthNavigator.Screen
        name="login"
        component={LoginScreen}
        options={{
          title: 'Login'
        }}
      />
    </AuthNavigator.Navigator>
  )
}
