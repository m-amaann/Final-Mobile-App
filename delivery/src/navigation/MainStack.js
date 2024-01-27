// Appnavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './Appnavigation';

const Navigators = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default Navigators;
