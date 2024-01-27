import { useStripe } from '@stripe/stripe-react-native';
import React, { useContext, useState } from "react";
import { Animated, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Popup 
import Popuptoast from "../../constants/Popup";

// Font
import { FontContext } from "../../constants/fonts/FontContext";
import LoadingIndicator from "../../constants/fonts/LoadingIndicator";

// Files Redux
import {
  addToCart,
  decrementQuantity,
  removeFromCart,
} from "../../redux/actions/Actions";
import { selectTotalAmount, selectTotalItems } from "../../redux/selectors";
import CustomHead from '../../constants/Header/CustomHead';


const AddCart = ({ navigation }) => {

  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.5));



  // FONT FAMILY LOADING
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }


  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cart);

  const totalItems = useSelector((state) => selectTotalItems(state));
  const totalAmount = useSelector((state) => selectTotalAmount(state));



  const handleRemoveFromCart = (product) => {
    if (product && product._id) {
      dispatch(removeFromCart(product._id));
      Popuptoast({ message: 'Item Deleted From Cart' });
    }
    else {
      console.error("Invalid product object:", product);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecrement = (product) => {
    dispatch(decrementQuantity(product._id));
  };



  // Payment Stripe function
  // const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // const initializePaymentSheet = async () => {
  //   // Fetch the payment intent client secret from your server
  //   const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

  //   const { error } = await initPaymentSheet({
  //     paymentIntentClientSecret: paymentIntent,
  //     customerId: customer,
  //     customerEphemeralKeySecret: ephemeralKey,
  //   });

  //   if (!error) {
  //     presentPaymentSheet();
  //   }
  // };



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <CustomHead title="Shopping Cart" navigation={navigation} />

        {cartProducts && cartProducts.length > 0 ? (
          cartProducts?.map((product) => (
            <View style={styles.productCard} key={`product-${product._id}`}>
              <View style={styles.productDetails}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: product.imageUrl }}
                    style={styles.image}
                  />
                </View>
                <View style={styles.detailsContainer}>
                  <View>
                    <Text style={styles.itemName} numberOfLines={2} ellipsizeMode="tail">{product.name}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.currency}>Rs. </Text>
                      <Text style={styles.itemPrice}>{product.discountprice}</Text>
                    </View>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleDecrement(product)}
                    >
                      <MaterialCommunityIcons
                        name="minus"
                        style={styles.quantityIcon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{product.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleAddToCart(product)}
                    >
                      <MaterialCommunityIcons
                        name="plus"
                        style={styles.quantityIcon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleRemoveFromCart(product)}
                    >
                      <MaterialCommunityIcons
                        name="delete-outline"
                        style={styles.deleteIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          // This view will only show when the cart is empty
          <View style={styles.emptyCartContainer}>
            <Image
              source={require('../../../assets/icon/empty-cart.png')}
              style={styles.emptyCartImage}
            />
            <Text style={styles.emptyCartText}>Cart is Empty</Text>
            <Text style={styles.emptyCartSubTest}>You have not added any product in your {'\n'} Shopping Cart.</Text>

            <TouchableOpacity
              style={styles.continueShoppingButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        )}


      </ScrollView>
      {cartProducts.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.totalContainer}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
              <Text style={styles.totalText}>Total Items:</Text>
              <Text style={styles.totalText}>{totalItems}</Text>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
              <Text style={styles.totalText}>Total Amount:</Text>
              <Text style={{ fontSize: 16, fontFamily: "Poppins-Bold", color: "black" }}>Rs. {totalAmount}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('CheckoutScreen')}>
            <Text style={styles.checkoutText}>GO TO CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar barStyle="dark-content" />
    </View>
  );
};

// Styling CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    paddingTop: 55,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",

  },
  backIcon: {
    padding: 10,
    fontSize: 25,
    backgroundColor: "#f7f4f4",
    borderRadius: 12,
  },
  headerText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "600",
  },
  cartTitle: {
    fontSize: 22,
    color: "#000",
    letterSpacing: 1,
    paddingHorizontal: 16,
    marginTop: 15,
    marginBottom: 10,
    fontFamily: "Poppins-Bold",
  },
  productCard: {
    margin: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productDetails: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "Poppins-Medium",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currency: {
    fontSize: 15,
    color: "#2b2b2b",
    fontFamily: "Poppins-Regular",
  },
  itemPrice: {
    fontSize: 15,
    color: "#377",
    fontFamily: "Poppins-Regular",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#f4f4f4",
  },
  quantityIcon: {
    fontSize: 15,
    color: "#2b2b2b",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
  },
  deleteButton: {
    marginLeft: "auto",
    padding: 8,
    backgroundColor: "#e8e8e8",
    borderRadius: 5,
  },
  deleteIcon: {
    fontSize: 18,
    color: "#d63333",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff7f5",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  totalContainer: {
    justifyContent: "space-between",
    top: 5,
    paddingHorizontal: 16,
    fontFamily: "Poppins-Bold",
  },
  totalText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#878787",
  },
  checkoutButton: {
    backgroundColor: "#E94440",
    marginVertical: 20,
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledCheckoutButton: {
    backgroundColor: '#ccc',
  },
  checkoutText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, 
  },
  emptyCartImage: {
    width: '100%', 
    height: 200, 
    resizeMode: 'contain',
    opacity: 0.3,
  },
  emptyCartText: {
    fontWeight: 600,
    fontSize: 19,
  },
  emptyCartSubTest: {
    fontSize: 14,
    paddingTop: 9,
    textAlign: 'center'
  },
  continueShoppingButton: {
    backgroundColor: '#E94440',
    padding: 10,
    borderRadius: 50,
    marginTop: 20,
    paddingHorizontal: 40
  },
  continueShoppingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AddCart;
