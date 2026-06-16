import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from '../screens/SearchScreen';
import EventsScreen from '../screens/EventsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
  const icons = {
    Search: focused ? '⌕' : '⌕',
    Events: focused ? '📅' : '📅',
    Favourites: focused ? '♥' : '♡',
    Profile: focused ? '👤' : '👤',
  };

  return (
    <Text
      style={{
        fontSize: name === 'Favourites' ? 22 : 20,
        color: focused ? '#3DB28C' : '#AAAAAA',
      }}>
      {icons[name]}
    </Text>
  );
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name} focused={focused} />
        ),
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 2,
        },
        tabBarActiveTintColor: '#3DB28C',
        tabBarInactiveTintColor: '#AAAAAA',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          height: 60,
          paddingBottom: 6,
        },
      })}>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Favourites" component={FavoritesScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
