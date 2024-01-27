// Appnavigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screen/SplashScreen';
import LoginScreen from '../screen/LoginScreen';
import { BottomTabNavigator } from './BottomNavigation';
import OrderDetailsScreen from '../screen/OrderDetailsScreen';
import ProcessOrder from '../screen/ProcessOrder';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" >
      <Stack.Screen name="Splash" component={SplashScreen} screenOptions={{ headerShown: false }} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProcessOrder" component={ProcessOrder} options={{ headerShown: false }} />
      <Stack.Screen 
  name="OrderDetailsScreen" 
  component={OrderDetailsScreen} 
  options={{ headerShown: false }}
/>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
      {/* Add other screens here if needed */}
    </Stack.Navigator>
  );
};
