import React from 'react';
import { Image, Text, View } from 'react-native';

const CustomCARTIndicator = ({ focused, iconSource, cartCount }) => {
  return (
    <View style={{ position: 'relative' }}>
      <Image source={iconSource} style={{ width: 25, height: 25 }} />
      {cartCount > 0 && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
            right: -5,
            top: -5,
          }}
        >
          <Text style={{ color: 'white' }}>{cartCount}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomCARTIndicator;
