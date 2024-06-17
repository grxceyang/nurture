import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomePage';
import ProfileScreen from './ProfilePage';
import GardenScreen from './GardenPage';
import SettingsPage from './SettingsPage';
import ValueProvider from './ValueContext';

const Tab = createBottomTabNavigator();

export default function App() {
  const data = { username: 'none', status: 'admin' };

  return (
    <ValueProvider value={data}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Garden" component={GardenScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Settings" component={SettingsPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  );
}
