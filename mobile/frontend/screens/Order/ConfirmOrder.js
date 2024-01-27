import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainHeader from '../../constants/Header/MainHeader'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'

import delivery from '../../../assets/icon/package-delivery.png';


const ConfirmOrder = ({ route, navigation }) => {
  const { orderId, username } = route.params;

  return (
    <>
      <MainHeader
        title="Order Confirmation"
        navigation={navigation}
      />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Image
            source={delivery}
            style={styles.shoppingBagImage}
          />
          <Text style={styles.customerName}>Hey, {username}</Text>
          <Text style={styles.confirmationMessage}>
            Your order #{orderId} on the way, will be delivered to you shortly.
            Thank you for shopping with us.
          </Text>

          <TouchableOpacity 
            style={styles.button}            
            onPress={() => { navigation.navigate("BottomTab", { screen: "Home" })}}
          >
            <Text style={styles.buttonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default ConfirmOrder

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F8',
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  shoppingBagImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  customerName: {
    fontSize: 21,
    fontWeight: 700,
    color: '#E94440',
    marginBottom: 15,
  },
  confirmationMessage: {
    fontSize: 14,
    color: '#BBBBBB',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#E94440',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Lexend'
  },
  buttonSecondary: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderColor: '#6200ee',
    borderWidth: 1,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#E94440',
    fontSize: 18,
    fontWeight: 'bold',
  },
});