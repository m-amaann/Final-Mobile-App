import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export const PaymentScreen = ({ navigation, closeModal, order, user }) => {
  const { confirmPayment, loading } = useStripe();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');


  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch('http://192.168.8.159:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: order.totalAmount }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error.message || 'Unable to create payment intent');
    }
    return data.clientSecret;
  };

  const handlePayPress = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      const clientSecret = await fetchPaymentIntentClientSecret();

      // Confirm the payment with the Stripe API
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            email, // Email captured from the state
            name
          },
        },
      });

      if (error) {
        Alert.alert('Payment failed', error.message);
      } else if (paymentIntent) {
        // Alert.alert('Payment succeeded', 'Payment was successful');
        closeModal();
        placeOrder();
        // Navigate to a success screen or reset the payment form here
      }
    } catch (error) {
      // Handle any other errors
      Alert.alert('Payment failed', error.message);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post('http://192.168.8.159:5000/api/order/orders', order);
      Alert.alert("Order placed successfully");
      navigation.navigate("ConfirmOrder", { orderId: response.data._id, username: user.name });
    } catch (error) {
      console.error('Error placing the order:', error);
      Alert.alert('Error placing the order:', error);
    }
  };

  return (

    <View style={styles.container}>
      <TouchableOpacity onPress={() => closeModal()} style={{ top: 4, right: 3 }}>
        <Ionicons name="close-circle" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.orderTotal}>Your Order ${order.totalAmount}</Text>

      <Text style={styles.cardTexes}>Email</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
      />

      <Text style={styles.cardTexes}>Name of Card</Text>
      <TextInput
        placeholder="Name on card"
        onChangeText={setName}
        value={name}
        style={styles.input}
      />

      <Text style={styles.cardTexes}>Card Information</Text>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '1234 1234 1234 1234',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E8E8E8',
          borderWidth: 1,
          borderRadius: 8,
          fontSize: 16,
          placeholderColor: '#999999',
        }}
        style={{
          width: '100%',
          height: 50,
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} style={styles.button} />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 20
  },
  cardTexes: {
    fontSize: 14,
    marginBottom: 7,
    color: '#282828'
  },
  input: {
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
    paddingTop: 20,
    textAlign: 'center',
  },


});