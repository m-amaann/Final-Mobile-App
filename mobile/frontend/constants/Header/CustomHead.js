import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { selectTotalItems } from '../../redux/selectors';
import { FontContext } from '../fonts/FontContext';
import LoadingIndicator from '../fonts/LoadingIndicator';


import CartIcon from '../../../assets/icon/shopping-bag.png';


const CustomHead = ({ title, navigation }) => {
  const cartCount = useSelector((state) => selectTotalItems(state));

  const bounceValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 1.4,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(bounceValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [cartCount]);

  // FONT FAMILY LOADING
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }
 
  
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={24} color="#777777" />
        </TouchableOpacity>
        <Text style={[styles.title, { marginLeft: 15 }]}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.right} onPress={() => navigation.navigate('Cart')}>
        <Image source={CartIcon} style={{ width: 27, height: 27 }} />
        <Animated.View style={[styles.badge, { transform: [{ scale: bounceValue }] }]}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 57,
      padding: 10,
      backgroundColor: '#fff',
      // marginBottom: 1,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    right: {
      marginLeft: 'auto',
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 4
    },
    title: {
      fontSize: 18,
      fontFamily: 'Poppins-Bold',
      color: '#2b2b2b'
    },
    badge: {
      position: 'absolute',
      top: -5,
      right: -2,
      backgroundColor: 'red',
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: 'white',
      paddingTop: 1,
      fontFamily: 'Poppins-Bold',
      fontSize: 12,
    },
  });

export default CustomHead;
