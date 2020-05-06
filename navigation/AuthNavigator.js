import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import TabBarIcon from '../components/TabBarIcon'
import SignupScreen from '../screens/SignupScreen'
import LinksScreen from '../screens/LinksScreen'

const AuthNavigator = createStackNavigator()
const INITIAL_ROUTE_NAME = 'Signup'

export default function create({ navigation, route }) {
  return (
    <AuthNavigator.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <AuthNavigator.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: 'Signup',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          )
        }}
      />
      <AuthNavigator.Screen
        name="Login"
        component={LinksScreen}
        options={{
          title: 'Login',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          )
        }}
      />
    </AuthNavigator.Navigator>
  )
}
