

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import store from './store'; // Import du store Redux
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import PlacesScreen from './screens/PlacesScreen';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Store = configureStore({
  reducer: {user}
});

export default function App() {
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Map') {
              iconName = 'location-arrow';
            } else if (route.name === 'Places') {
              iconName = 'map-pin';
            }
            return (
              <FontAwesomeIcon name={iconName} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: '#B733D0',
          tabBarInactiveTintColor: '#335561',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Places" component={PlacesScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
