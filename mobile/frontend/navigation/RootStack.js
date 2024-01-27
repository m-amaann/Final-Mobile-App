import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import BannerCarousel from "../component/Carousels/BannerCarousel";
import Editaddress from "../screens/Address/Editaddress";
import NewArrivalList from "../screens/List/NewArrivalList";
import OrderDetails from "../screens/Order/OrderDetails";
import OrderTracking from "../screens/Order/OrderTracking";
import { PaymentScreen } from "../screens/Payment/PaymentScreen";
import Startchoice from "../screens/Startchoice";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/home/HomeScreen";
import ForgetpasswordScreen from "../screens/login/ForgetpasswordScreen";
import LoginScreen from "../screens/login/LoginScreen";
import ProductDetails from "../screens/products/ProductDetailsScreen";
import RegisterScreen from "../screens/registration/RegisterScreen";
import BottomTab from "./BottomTab";
import SelectAddressScreen from "../screens/Address/SelectAddressScreen";
import NewAddressScreen from "../screens/Address/NewAddressScreen";
import WishlistScreen from "../screens/profile/WishlistScreen";
import CheckoutScreen from "../screens/Payment/CheckoutScreen";
import ConfirmOrder from "../screens/Order/ConfirmOrder";
import FAQs from "../screens/profile/FAQs";
import RegisterwithPhone from "../screens/registration/RegisterwithPhone";
import RegisterOTPVerification from "../screens/registration/RegisterOTPVerification";
import WriteReviewScreen from "../screens/Order/WriteReviewScreen";
import OrderItemsList from "../screens/Order/OrderItemsList";
import PopularProductList from "../screens/List/PopularList";
import AllProductList from "../screens/List/AllProductList";
import EditProfile from "../screens/profile/EditProfile";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  // const [initialRoute, setInitialRoute] = useState('WelcomeScreen'); // Default initial route

  // useEffect(() => {
  //   checkUserLoggedIn().then(isLoggedIn => {
  //     setInitialRoute(isLoggedIn ? 'Home' : 'WelcomeScreen');
  //   });
  // }, []);

  // const checkUserLoggedIn = async () => {
  //     try
  //     {
  //       const user = await AsyncStorage.getItem('user');
  //       return user != null;
  //     }
  //     catch (e) {
  //       console.log(e);
  //       return false;
  //     }
  // };

  const [initialRoute, setInitialRoute] = useState("WelcomeScreen"); // Default initial route

  useEffect(() => {
    checkUserLoggedIn().then((isLoggedIn) => {
      setInitialRoute(isLoggedIn ? "BottomTab" : "WelcomeScreen");
    });
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const tokenString = await AsyncStorage.getItem("token");
      return tokenString && tokenString !== "";
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: "white" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTransparent: true,
            headerLeftContainerStyle: {
              paddingLeft: 10,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Icon name="chevron-back-outline" size={22} color="#777777" />
              </TouchableOpacity>
            ),
          })}
          initialRouteName={initialRoute}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="WelcomeScreen"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Startchoice"
            component={Startchoice}
          />
          <Stack.Screen
            options={{
              title: "",
              headerShown: true,
              headerStyle: { backgroundColor: "transparent" },
            }}
            name="Register"
            component={RegisterScreen}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="RegisterWithPhoneScreen"
            component={RegisterwithPhone}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="RegisterOTPVerification"
            component={RegisterOTPVerification}
          />

          <Stack.Screen
            options={{
              title: "",
              headerShown: true,
              headerStyle: { backgroundColor: "transparent" },
            }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ title: "" }}
            name="Forgetpassword"
            component={ForgetpasswordScreen}
          />
          <Stack.Screen options={{ headerShown: false }} name="ProductDetails" component={ProductDetails} />

          <Stack.Screen
            options={{ headerShown: false }}
            name="ConfirmOrder"
            component={ConfirmOrder}
          />

          <Stack.Screen name="WriteReviewScreen" component={WriteReviewScreen} options={{ headerShown: false }} />

          <Stack.Screen
            options={{ headerShown: false }}
            name="FAQs"
            component={FAQs}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="OrderDetails"
            component={OrderDetails}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Orders"
            component={OrderItemsList}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="NewArrivalList"
            component={NewArrivalList}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="AllProductList"
            component={AllProductList}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="PopularProductList"
            component={PopularProductList}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="WishlistScreen"
            component={WishlistScreen}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="EditProfile"
            component={EditProfile}
          />

          <Stack.Screen
            options={{ title: "Payment" }}
            name="PaymentScreen"
            component={PaymentScreen}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="BottomTab"
            component={BottomTab}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="BannerCarousel"
            component={BannerCarousel}
          />
          <Stack.Screen name="Editaddress" component={Editaddress} />

          <Stack.Screen options={{ headerShown: false }} name="SelectAddressScreen" component={SelectAddressScreen} />

          <Stack.Screen options={{ headerShown: false }} name="NewAddressScreen" component={NewAddressScreen} />
          <Stack.Screen options={{ headerShown: false }} name="CheckoutScreen" component={CheckoutScreen} />



          <Stack.Screen
            name="OrderTracking"
            options={{ headerShown: false }}
            component={OrderTracking}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  backButton: {
    display: "flex",
    backgroundColor: "#FFDFDF",
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 10,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});

export default RootStack;
