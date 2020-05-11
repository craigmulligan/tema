import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import ProfileScreen from '../screens/ProfileScreen'
const App = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'messages'

export default function AppNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) })

  return (
    <App.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <App.Screen
        name="message"
        component={HomeScreen}
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-message" />
          )
        }}
      />
      <App.Screen
        name="notification"
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          )
        }}
      />
      <App.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-contact" />
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
    case 'home':
      return 'Threaded Messages'
    case 'notifications':
      return 'Notifications'
    case 'profile':
      return 'Profile'
  }
}
