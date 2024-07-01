import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import PomodoroScreen from './PomodoroPage';

const Stack = createStackNavigator();

function HomePageStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomePage} 
          options={{ headerShown: false }} // Disable the header for the HomePage
        />
        <Stack.Screen name="Pomodoros" component={PomodoroScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    );
  }

export default HomePageStack;
