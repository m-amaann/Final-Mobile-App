import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainHeader from '../../constants/Header/MainHeader';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { useState } from 'react';


const OrderDetails = ({ route }) => {
  const { order } = route.params;
  const navigation = useNavigation();

  const blinkAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    startBlinking();
  }, []);

  const startBlinking = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.2,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        })
      ])
    ).start();
  };


  const [showCancelButton, setShowCancelButton] = useState(false);

  useEffect(() => {
    if (order.paymentType === 'cash' && order.status === 'Pending') {
      setShowCancelButton(true);
    } else {
      setShowCancelButton(false);
    }
  }, [order]);



  // const cancelOrder = () => {
  //   fetch(`http://192.168.8.159:5000/api/order/cancelOrder/${order._id}`, {
  //     method: 'PUT',
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Failed to cancel order');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log('Order cancelled successfully:', data);
  //       Alert.alert('Order Cancelled', 'Your order has been cancelled successfully.');
  //       navigation.goBack(); 
  //     })
  //     .catch((error) => {
  //       console.error('Error cancelling order:', error);
  //       Alert.alert('Error', 'Failed to cancel the order. Please try again.');
  //     });
  // };

  // product items
  const renderProduct = (product, index) => {
    return (
      <View key={index} style={{ padding: 10, backgroundColor: '#fcfcfc' }}>
      <View style={styles.productInfoContainer}>
        <Image source={{ uri: product.productImage }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{product.productName}</Text>
          <Text style={styles.productQty}>Qty: {product.quantity}</Text>
          <Text style={styles.productPrice}>Rs.{product.price}</Text>
        </View>
      </View>
      {showCancelButton && (
        <TouchableOpacity
          style={styles.cancelButton}
          // onPress={handleCancelOrder}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
      {order.status === 'Delivered' && (
        <TouchableOpacity
          style={styles.writeReviewButton}
          onPress={() => navigation.navigate('WriteReviewScreen', {
            product: product.productName,
            productImage: product.productImage,
            productId: product._id, 
            orderId: order._id,
            userId: order.customerId 
          })}
        >
          <Animated.View style={{ opacity: blinkAnim }}>
            <Text style={styles.writeReviewText}>Write Review</Text>
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
    );
  };


  return (
    <>
      <MainHeader
        title="Order Details"
        navigation={navigation}
      />
      <ScrollView style={styles.container}>

        {/* Delivery & Bill To Section */}
        <View style={[styles.deliverySection, styles.section]}>
          <Text style={styles.sectionTitle}>Delivery & bill to</Text>
          <Text style={styles.customerName}>{order.customerId.name}</Text>
          <Text style={styles.mobileNo}>{order.customerId.phone}</Text>
          <Text style={styles.address}>{order.customerId.address}</Text>
        </View>

        <View style={styles.divider}></View>

        {/* Product Information Section */}
        <View style={[styles.productSection, styles.section]}>
          <View style={styles.processingContainer}>
            <Text style={styles.packageLabel}>📦 Package</Text>
            <Text style={styles.processingLabel}>{order.status}</Text>
          </View>
          <Text style={styles.deliveryLabel}>Get by - Today, Standard Delivery</Text>
          {order.orderItems.map(renderProduct)}
        </View>
        <View style={styles.divider}></View>

        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text style={styles.orderId}>Order #{order._id}</Text>
          <TouchableOpacity
            style={styles.trackingButton}
            onPress={() => { navigation.navigate('OrderTracking', { order }) }}
          >
            <Icon name="map-marker" size={20} color="#FFFFFF" />
            <Text style={styles.trackingText}>Tracking</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}></View>


        {/* Subtotal & Delivery Fee Section */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.deliveryFeeLabel}>Delivery Fee</Text>
            <Text style={styles.deliveryFeeValue}>Rs. 300</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.subtotalLabel}>Subtotal</Text>
            <Text style={styles.subtotalValue}>{order.totalAmount}</Text>
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { navigation.navigate('Cart') }}>
            <Text style={styles.buyAgainText}>Buy Again</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    marginBottom: 10,
    color: '#929292',
    fontFamily: 'Poppins-Regular'
  },
  customerName: {
    fontFamily: 'Poppins-Regular',
    paddingBottom: 4,
  },
  mobileNo: {
    fontFamily: 'Poppins-Regular',
    paddingBottom: 6,
  },
  deliverySection: {
    padding: 20,
    fontFamily: 'Poppins-Regular',
  },
  address: {
    fontFamily: 'Poppins-Regular',
    color: '#B2B1B1'
  },
  productSection: {
    padding: 5,
  },
  processingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  packageLabel: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium'
  },
  processingLabel: {
    color: '#8A8888',
    padding: 5,
    alignSelf: 'flex-start',
    borderRadius: 5,
    fontStyle: 'italic',
  },
  deliveryLabel: {
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#ABA9A9'
  },
  productInfoContainer: {
    flexDirection: 'row',
    marginBottom: 7,
    marginTop: 10,
    alignItems: 'center',

  },
  productImage: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginRight: 20,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    color: '#888888'
  },
  productQty: {
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',

  },
  productPrice: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#E51E1E'

  },
  trackingButton: {
    alignItems: 'flex-end',
    verticalAlign: 'middle',
    flexDirection: 'row',
    backgroundColor: '#CDE9F9',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 30
  },
  trackingText: {
    color: '#2281D8',
    marginLeft: 6,
    fontFamily: 'Poppins-Regular',
  },
  orderId: {
    fontSize: 15,
    color: '#097C4C',
    fontFamily: 'Poppins-Regular',
    marginTop: 10
  },
  totalSection: {
    padding: 20,
    marginTop: 40,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subtotalLabel: {
    fontSize: 14,
    color: '#7F7D7D',
    fontFamily: 'Poppins-Regular',
  },
  subtotalValue: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#252525'
  },
  deliveryFeeLabel: {
    fontSize: 14,
    color: '#7F7D7D',
    fontFamily: 'Poppins-Regular',
  },
  deliveryFeeValue: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#252525'
  },
  buttonContainer: {
    alignItems: 'center',
    left: '75%',
    backgroundColor: '#F25C58',
    paddingVertical: 8,
    marginTop: 30,
    width: 100,
    borderRadius: 5,
  },
  buyAgainText: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
  divider: {
    height: 5,
    backgroundColor: '#E9E8E8',
  },
  writeReviewButton: {
    marginTop: 10,
    backgroundColor: '#4E9F3D',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 2,
    alignSelf: 'flex-end',
  },
  writeReviewText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  cancelButton: {
    marginTop: 10,
    borderColor: '#FF3B30', 
    borderWidth: 1, 
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 3,
    elevation: 2,
    alignSelf: 'flex-start', 
  },
  cancelButtonText: {
    color: '#FF3B30',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});

export default OrderDetails;
