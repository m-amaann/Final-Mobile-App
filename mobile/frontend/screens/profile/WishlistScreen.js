import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainHeader from '../../constants/Header/MainHeader'
import { TouchableOpacity } from 'react-native'
import IMG from '../../../assets/Products/NewArrival/1.png';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../../redux/actions/Actions';
import { Alert } from 'react-native';




const WishlistScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.cart.wishlist);

  const handleRemoveFromWishlist = (productId) => { // Change here: use productId instead of product
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your wishlist?",
      [
        // Button to cancel
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        // Button to confirm
        {
          text: "OK", onPress: () => {
            dispatch(removeFromWishlist(productId)); 
            Alert.alert("Removed", "The item has been removed from your wishlist.");
          }
        }
      ]
    );
  };

  return (
    <>
      <MainHeader
        title="My Wishlist"
        navigation={navigation}
      />
      {/* <FlatList> */}
      <SafeAreaView style={styles.container}>
        <View style={styles.productList}>
          {wishlist.map((product) => (
            <View style={styles.productCard} key={product.id}>
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.discountprice}</Text>
              </View>
              <TouchableOpacity style={styles.favoriteIcon}
                onPress={() => handleRemoveFromWishlist(product.id)}
              >
                <MaterialIcons
                  name={"delete"}
                  size={24}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          ))}

          {/* {Products.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>You Not Added to Favorite List</Text>
        )} */}
        </View>
      </SafeAreaView>
      {/* </FlatList> */}

    </>
  )
}

export default WishlistScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  productList: {
    margin: 4
  },
  productCard: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "white",
  },
  productImage: {
    flex: 1,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#e8e5e5",
    marginRight: 10,
  },
  productInfo: {
    flex: 2,
    marginLeft: 15,
  },
  productName: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
  },
  productPrice: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#777",
    marginTop: 5,
  },
  favoriteIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    fontSize: 20,
    color: "#FF5555",
  },
})