import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, Animated } from 'react-native';


const FadeInView = (props) => {
  const fadeAnim = new Animated.Value(0); // Initial opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};


const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  const fetchCompletedOrders = async () => {
    try {
      const response = await fetch('http://192.168.8.159:5000/api/order/delivered');
      if (!response.ok) {
        throw new Error('Failed to fetch completed orders');
      }
      const orders = await response.json();
      // console.log(orders);
      setCompletedOrders(orders);
    } catch (error) {
      console.error("Error fetching completed orders:", error);
    }
  };

  return (
    <FadeInView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Text style={styles.header}>Completed Orders: {completedOrders.length}</Text>
      <ScrollView>
        {completedOrders.map((order) => (
          <View key={order._id} style={styles.orderCard}>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Order ID:</Text>
              <Text style={styles.orderValue}>{order._id}</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Customer Name:</Text>
              <Text style={styles.orderValue}>{order.customerId.name}</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Amount:</Text>
              <Text style={styles.orderValue}>LKR. {order.totalAmount}</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Address: </Text>
              <Text style={styles.orderValue} numberOfLines={1} ellipsizeMode='tail'>
                {order.customerId.address}
              </Text>
            </View>
            {order.deliveredDate && (
              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Delivered On:</Text>
                <Text style={styles.orderValue}>
                  {new Date(order.deliveredDate).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </Text>
              </View>
            )}
            {order.deliveredDate && (
              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Delivered Time:</Text>
                <Text style={styles.orderValue}>
                  {new Date(order.deliveredDate).toLocaleTimeString('en-US', {
                    hour: '2-digit', minute: '2-digit',
                    hour12: true,
                  })}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </FadeInView>
  );
};

export default CompletedOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
    backgroundColor: 'rgba(252, 248, 247, 0.5)',
  },
  header: {
    fontSize: 20,
    fontFamily: 'Lexend-Medium',
    color: '#E94440',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#E94440',
    marginBottom: 10,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#E94440',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  orderLabel: {
    fontFamily: 'Lexend-Medium',
    fontSize: 14,
    color: '#333',
  },
  orderValue: {
    fontFamily: 'Lexend',
    fontSize: 14,
    color: '#555',
    flexShrink: 1,
  },
});