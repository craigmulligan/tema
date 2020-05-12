import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import ThreadScreen from '../screens/ThreadScreen'
import TeamScreen from '../screens/TeamScreen'
import TeamCreateScreen from '../screens/TeamCreateScreen'
const RootNavigator = createStackNavigator()
import AppNavigator from '../navigation/AppNavigator'

export default function create({ navigation, route }) {
  return (
    <RootNavigator.Navigator name="root" mode="modal">
      <RootNavigator.Screen
        name="team"
        component={TeamScreen}
        options={{
          title: 'Teams'
        }}
      ></RootNavigator.Screen>

      <RootNavigator.Screen
        name="teamCreate"
        component={TeamCreateScreen}
        options={{
          title: 'Create Team'
        }}
      ></RootNavigator.Screen>

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
