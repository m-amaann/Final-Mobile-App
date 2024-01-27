// FontContext.js
import * as Font from 'expo-font';
import React, { createContext, useEffect, useState } from 'react';

export const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFontsAsync = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-ExtraBold': require('../../../assets/fonts/Poppins-ExtraBold.ttf'),

        'Lexend': require('../../../assets/fonts/Lexend-Regular.ttf'),
        'Lexend-Medium': require('../../../assets/fonts/Lexend-Medium.ttf'),
        'Lexend-SemiBold': require('../../../assets/fonts/Lexend-SemiBold.ttf'),
      });

      setFontsLoaded(true);
    };

    loadFontsAsync();
  }, []);

  return (
    <FontContext.Provider value={fontsLoaded}>
      {children}
    </FontContext.Provider>
  );
};
