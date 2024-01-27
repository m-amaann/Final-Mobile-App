import React, { useContext, useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductImg from '../../assets/Cover/profile.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontContext } from '../constant/fonts/FontContext';
import LoadingIndicator from '../constant/fonts/LoadingIndicator';
import MainHeader from '../constant/MainHeader';

const ProcessOrder = ({ navigation }) => {

  // FONT FAMILY LOADING LOGIC
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  const [orders, setOrders] = useState([]);
  const [driver, setDriver] = useState(null);
  const [driverId, setDriverId] = useState(null);

  // const driverString = AsyncStorage.getItem('driver');

  // console.log("drie datas" + driverString);
  // ***** Fetch Orders *****
  useEffect(() => {
    fetchOrders();
    // getDriverInfo();
  }, []);

  // useEffect(() => {
  //   if (driver && driver._id) {
  //     fetchOrders(driver._id);
  //   }
  // }, [driver]);



  // const getDriverInfo = async () => {
  //   try {
  //     const driverString = await AsyncStorage.getItem('driver');
  //     if (driverString) {
  //       const driverData = JSON.parse(driverString);
  //       setDriver(driverData);
  //       fetchOrders(driverData._id); // Call fetchOrders here
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving driver info:', error);
  //   }
  // };

  useEffect(() => {
    const fetchDriverId = async () => {
      try {
        const storedDriverId = await AsyncStorage.getItem('driver');
        if (storedDriverId !== null) {
          const driverObject = JSON.parse(storedDriverId);
          setDriverId(driverObject);
          // console.log('Driver ID fetched:', driverObject);
        }
      } catch (e) {
        console.log('Failed to fetch the driver ID');
      }
    };

    fetchDriverId();
  }, []);

  // console.log(`http://192.168.8.159:5000/api/order/active/${driverId}`);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://192.168.8.159:5000/api/order/active/${driverId}`,
        // `http://192.168.8.159:5000/api/order/active/6559de44c456f7502fae0e65`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log(data)

      if (data.message) 
      {
        // Alert.alert("Error", "An error occurred while fetching orders");
      } else {
        setOrders(data);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error",
        "An error occurred while fetching orders"
      );
    }
  };

  useEffect(() => {
    fetchOrders();
    // getDriverInfo();
  }, [driverId]);

  const renderOrderItem = (order) => {

    const totalPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
      <View style={styles.container} key={order._id} >
        <View style={styles.itemContainer}>
          <View style={styles.leftContainer} >
            <View style={styles.UserImageContainer}>
              <Image source={ order.customerId.image } style={styles.userImage} />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.productName}>{order.customerId.name}</Text>
              <Text style={styles.price}>Total Amount: {totalPrice}</Text>
              <View style={styles.orderInfo}>
                <Text style={styles.orderIDText}>Order ID: </Text>
                <Text style={styles.orderNumber}>#{order._id}</Text>
              </View>
              <View style={styles.addressContainer}>
                <Ionicons name="location-sharp" size={20} color="grey" />
                <Text
                  style={styles.addressText}
                >
                  {order.customerId.address}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => navigation.navigate('OrderDetailsScreen', { 
              order: order,
              onGoBack: () => fetchOrders(), 
            })}
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
    <MainHeader
    title="Processing Orders"
    navigation={navigation}
  />
    <SafeAreaView style={styles.container}>
      {/* <Text>
        {driverId}
      </Text> */}
      <ScrollView>
        {orders.map(renderOrderItem)}
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default ProcessOrder;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(252, 248, 247, 0.5)',

  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    marginBottom: 7
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  UserImageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  userImage: {
    width: 75,
    height: 70,
    marginRight: 10,
    borderRadius: 5,
  },
  detailsContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  productName: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Lexend-Medium',

  },
  price: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 10,
    fontFamily: 'Lexend',
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIDText: {
    fontSize: 14,
    color: 'grey',
    fontFamily: 'Lexend',
  },
  orderNumber: {
    fontSize: 14,
    color: 'rgba(233, 68, 64, 1)',
    fontWeight: 'bold',
    fontFamily: 'Lexend',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addressText: {
    fontSize: 14,
    color: 'grey',
    marginLeft: 5,
    fontFamily: 'Lexend',
  },
  separator: {
    height: 1,
    backgroundColor: '#efefef',
    marginVertical: 10,
  },
  viewDetailsButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
  },
  viewDetailsText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium'
  },
});
