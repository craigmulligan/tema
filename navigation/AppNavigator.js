import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'

import TabBarIcon from '../components/TabBarIcon'
import NotificationsScreen from '../screens/NotificationsScreen'
import ThreadScreen from '../screens/ThreadScreen'
import ProfileScreen from '../screens/ProfileScreen'
const App = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'threads'

export default function AppNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) })

  return (
    <App.Navigator>
      <App.Screen
        name="feed"
        component={ThreadScreen}
        options={{
          title: 'Threads',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="message-circle" />
          )
        }}
      />
      <App.Screen
        name="notifications"
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="bell" />
          )
        }}
      />
      <App.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="settings" />
          )
        }}
      />
    </App.Navigator>
  )
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME

  switch (routeName) {
    case 'feed':
      return 'Message Feed'
    case 'notifications':
      return 'Notifications'
    case 'profile':
      return 'Profile'
  }
}
