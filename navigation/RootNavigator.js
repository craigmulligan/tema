import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import ThreadScreen from '../screens/ThreadScreen'
const RootNavigator = createStackNavigator()
import AppNavigator from '../navigation/AppNavigator'

export default function create({ navigation, route }) {
  return (
    <RootNavigator.Navigator mode="modal">
      <RootNavigator.Screen
        name="app"
        component={AppNavigator}
        options={{
          title: 'App'
        }}
      />
      <RootNavigator.Screen
        name="thread"
        options={{
          title: 'Single thread'
        }}
      >
        {props => {
          return <ThreadScreen {...props} singleThread />
        }}
      </RootNavigator.Screen>
    </RootNavigator.Navigator>
  )
}
