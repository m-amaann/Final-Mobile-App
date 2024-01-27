import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../constant/MainHeader';
import { FontContext } from '../constant/fonts/FontContext';
import LoadingIndicator from '../constant/fonts/LoadingIndicator';

const OrderDetailsScreen = ({ route, navigation }) => {
  const { order , onGoBack} = route.params;

  // FONT FAMILY LOADING LOGIC
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }


  const [isDelivered, setIsDelivered] = useState(order.status === 'Delivered');


  const handleDeliveryStatusChange = async (orderId) => {
    try {
      const response = await fetch(`http://192.168.8.159:5000/api/order/updateOrderStatusById/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newStatus: 'Delivered' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      Alert.alert("Order Status Changed", "You order is delivered successfully");
      setIsDelivered(true);
      onGoBack();
      navigation.goBack();
    } catch (error) {
      console.error('Error updating order status:', error);
      // Alert.alert("Order Status Changed", "You order is delivered unsuccessfully");
    }
  };

  // const handleSave = () => {
  //   navigation.goBack();
  // };




  return (
    <>
      <MainHeader
        title="Order Details"
        navigation={navigation}
      />
      <ScrollView style={styles.container}>
        <SafeAreaView style={{ marginBottom: 110 }}>
          <View style={styles.customerInfoContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: order.customerId.image }} style={styles.customerImage} />
              <View style={styles.customerDetails}>
                <Text style={styles.customerName}>{order.customerId.name}</Text>
                <Text style={styles.customerAddress}>{order.customerId.address}</Text>
                <Text style={styles.customerPhone}>{order.customerId.phone}</Text>
              </View>
            </View>

            <View style={styles.orderInfoContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: 'Poppins-Medium' }}>Order ID:</Text>
                <Text style={styles.orderInfoText}>   {order._id}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: 'Poppins-Medium' }}>Total Amount:</Text>
                <Text style={styles.orderInfoText}>   LKR.{order.totalAmount}</Text>
              </View>
            </View>
          </View>

          {order.orderItems.map((item, index) => (
            <View key={index} style={styles.productItemContainer}>
              <Image source={{ uri: item.productImage }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.productPrice}>Price: LKR {item.price}</Text>
                <Text style={styles.productSize}>Size: {item.size}</Text>
                <Text style={styles.productColor}>Color: {item.color}</Text>
              </View>
            </View>
          ))}

          <View style={styles.footerContainer}>

            <TouchableOpacity
              style={[
                styles.button,
                styles.deliveredButton,
                isDelivered ? styles.buttonActive : styles.buttonInactive,
              ]}
              onPress={() => handleDeliveryStatusChange(order._id)}
              disabled={order.status === 'Delivered'} 
              >
              <Text style={styles.buttonText}>DELIVERED</Text>
            </TouchableOpacity>
{/* 
            <TouchableOpacity
              style={[styles.button, styles.okButton]}
              onPress={handleSave}
              disabled={!isDelivered}
            >
              <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            </TouchableOpacity> */}
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  customerInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    margin: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  customerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'Poppins-Medium',
  },
  customerAddress: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Lexend',
  },
  customerPhone: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Lexend',
  },
  orderInfoContainer: {
    marginTop: 14,
    alignContent: 'space-between'

  },
  orderInfoText: {
    marginBottom: 5,
    fontSize: 15,
    color: 'rgba(233, 68, 64, 1)',
    fontWeight: '600',
    fontFamily: 'Lexend',
  },
  productItemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 0,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    fontFamily: 'Lexend',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'Lexend',
  },
  productQuantity: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Lexend',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Lexend',
  },
  productSize: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Lexend',
  },

  productColor: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Lexend',
  },

  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  deliveredButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 11,
    backgroundColor: '#28a745',
    flex: 1,
    marginRight: 10,
    marginTop: 70,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  okButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    position: 'absolute',
    right: 20,
    top: 150,
    bottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 15
  },
  buttonActive: {
    backgroundColor: '#11c67b',
    borderColor: '#088953',
  },
  buttonInactive: {
    backgroundColor: '#6c757d', // Inactive color
  },


});

