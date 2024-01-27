import React, { useContext, useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontContext } from './fonts/FontContext';
import LoadingIndicator from './fonts/LoadingIndicator';


const MainHeader = ({ title, navigation }) => {


  // FONT FAMILY LOADING LOGIC
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator/>;
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={24} color="#777777" />
        </TouchableOpacity>
        <Text style={[styles.title, { marginLeft: 15 }]}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 57,
      padding: 10,
      // backgroundColor: '#fff',
      // marginBottom: 1,
      marginTop: 38
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontFamily: 'Poppins-Medium',
      color: '#2b2b2b',

    },
   
  });

export default MainHeader;
