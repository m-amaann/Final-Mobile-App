import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { format, isToday, parseISO } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainHeader from '../../constants/Header/MainHeader';

const OrderItemsList = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const userData = JSON.parse(userString);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error retrieving user info:', error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://192.168.8.159:5000/api/order/getOrdersByUserId/${user._id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();

        data.sort((orderA, orderB) => {
          const dateA = new Date(orderA.orderDate);
          const dateB = new Date(orderB.orderDate);
          return dateB - dateA; // Sort in descending order
        });
        setOrders(data);
      } 
      catch (error) {
      }
    };

    fetchOrders();
  }, [user._id, orders]);


  // Format the placed on date
  const formatPlacedOnDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return 'N/A';
    }
    const date = parseISO(dateString);
    return format(date, 'MMM dd, yyyy hh:mm aa');
  };


  // Format the paid on date
  const formatPaidOnDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return 'N/A';
    }
  
    const date = parseISO(dateString);
    return format(date, 'MMM dd, yyyy');
  };


    // Filter orders 
    const currentOrders = orders.filter((order) => ['Pending', 'Processing', 'Packaging'].includes(order.status));
    const pastOrders = orders.filter((order) => order.status === 'Delivered');


  const OrderCard = ({ order }) => (
    <>

    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('OrderDetails', { order })}
    >
      <Text style={styles.orderNumber}>Order: {order._id}</Text>
      <Text style={styles.dateText}>Placed on: {formatPlacedOnDate(order.orderDate)}</Text>
      {order.status === 'Delivered' && (
        <Text style={styles.dateText}>Paid on: {formatPaidOnDate(order.deliveredDate)}</Text>
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalTitle}>Total: </Text>
        <Text style={styles.total}>{order.totalAmount}</Text>
      </View>
    </TouchableOpacity>
    </>
  );

  return (
    <>
        <MainHeader title="My Orders" navigation={navigation} />

      <ScrollView style={styles.container}>
        {currentOrders.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Current Orders</Text>
            {currentOrders.map((order, index) => (
              <OrderCard key={index} order={order} />
            ))}
          </>
        )}
        {pastOrders.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Past Orders</Text>
            {pastOrders.map((order, index) => (
              <OrderCard key={index} order={order} />
            ))}
          </>
        )}
        {currentOrders.length === 0 && pastOrders.length === 0 && (
          <Text style={styles.noOrdersText}>No Orders are Placed</Text>
        )}
      </ScrollView>
    </>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  orderNumber: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: 'Poppins-Medium'
  },
  dateText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 6,
    color: '#424242',
    fontFamily: 'Poppins-Regular'
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Poppins-Medium',
    marginLeft: 10,
    color: '#eaeaea'
  },
  todayHighlight: {
    color: '#FF4500',
    fontWeight: 'bold',
  },
  itemContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    marginTop: 8,
  },
  itemName: {
    fontSize: 14,
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  status: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  delivered: {
    color: 'green',
  },
  cancelled: {
    color: 'red',
  },
  totalContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  totalTitle: {

  },
  total: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#F25C58'
  },
  noOrdersText: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    marginTop: 100,
  },
});

export default OrderItemsList;
