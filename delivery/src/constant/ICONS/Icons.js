
import React from 'react';
import { Image } from 'react-native';

const TabBarIcons = ({ focused, iconSource }) => {
 
  const iconSize = 24;


  return (
    <Image
      source={iconSource}
      style={{
        width: iconSize,
        height: iconSize,
        
        tintColor: focused ? '#E94440' : '#656161',
      }}
      resizeMode="contain"
    />
  );
};

export default TabBarIcons;
