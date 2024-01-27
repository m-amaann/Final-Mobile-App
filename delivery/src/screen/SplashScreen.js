import { StatusBar, StyleSheet, Image, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Images, } from '../constant'
import { Display } from '../utils';


export const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000)
  })

  return (
    <View style={styles.container}>
        <StatusBar 
          barStyle='light-content' 
          backgroundColor={Colors.DEFAULT_GREY} 
          translucent
        />

        <Image 
          source={Images.StockMart} 
          resizeMode="contain" 
          style={styles.Image}
        />
        <Text style={styles.title}>Stock Mart Lanka</Text>

    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BG,
  },
  Image: {
    height: Display.setHeight(15),
    width: Display.setWidth(45)
  },
  title: {
    paddingTop: 8,
    color: 'white',
    fontSize: 28,
    fontWeight: '700'

  }
});
