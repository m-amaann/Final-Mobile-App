import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
// Image
import Shopping from "../../../assets/icon/bag.png";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TransHeader from "../../constants/Header/TransHeader";
import { addToCart } from "../../redux/actions/Actions";
import { SafeAreaView } from "react-native";

const ProductDetails = ({ navigation, route }) => {
  const { product } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedColorName, setSelectedColorName] = useState("");

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://192.168.8.159:5000/api/reviews/getAllReviews`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        // console.error("Error fetching reviews:", error);
        Alert.alert("Error", error.message);
      }
    };

    fetchReviews();
  }, [product._id]);

  // console.log(reviews);

  // Colors Function
  useEffect(() => {
    if (product.colors && product.colors.length > 0) {
      setSelectedColorName(product.colors[0].name);
    }
  }, [product]);


  // Add Cart 
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cart);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };


  // Stock status text and color
  const stockStatusText = product.stockQuantity > 0 ? "In Stock" : "Out of Stock";
  const stockStatusColor = product.stockQuantity > 0 ? "#28a745" : "#dc3545";


  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <>
      <View>
        <TransHeader navigation={navigation} />
      </View>

      <ScrollView style={styles.container}>
        <SafeAreaView>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.imageUrl }}
              style={styles.productImage}
            />
            <View style={{ bottom: 10, left: 5 }}>
              <TouchableOpacity style={styles.heartIcon} onPress={handleFavoriteClick} >
                <MaterialIcons
                  name={isFavorited ? "favorite" : "favorite-border"}
                  size={24}
                  color="red"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadIcon}>
                <MaterialIcons name="share" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.categoryName}>Category</Text>
            <Text style={styles.productName}>{product.name}</Text>
            {/* Stock Status Display */}
            <Text style={[styles.stockStatus, { color: stockStatusColor }]}>
              {stockStatusText}
            </Text>

            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>Rs. {product.discountprice}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => setQuantity(quantity - 1)}>
                  <MaterialIcons name="remove" style={styles.quantityControl} />
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantity}</Text>
                <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                  <MaterialIcons name="add" style={styles.quantityControl} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 ? (
              <View>
                <Text style={styles.labelText}>Color</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={styles.colorContainerScroll}
                >
                  {product.colors.map((color, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedColorName(color.name)}
                      style={[
                        styles.colorOption,
                        selectedColorName === color.name && styles.selectedColor,
                      ]}
                    >
                      <Text style={styles.colorNameText}>{color.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ) : (
              <Text style={styles.noColorText}></Text>
            )}


            {/* Size Selection */}
            <Text style={styles.labelText}>Size</Text>
            <View style={styles.sizeContainer}>
              {product.sizes.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedSize(size)}
                  style={[
                    styles.sizeBox,
                    selectedSize === size && styles.selectedSizeOption,
                  ]}
                >
                  <Text
                    style={
                      selectedSize === size
                        ? styles.sizeTextSelected
                        : styles.sizeText
                    }
                  >
                    {size.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.descriptionLabel}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>

            <View
              style={{
                backgroundColor: "#efefef",
                height: 13,
                width: 430,
                alignItems: "center",
                alignSelf: "center",
                marginTop: 20,
              }}
            ></View>

            <View style={styles.reviewsContainer}>
              <Text style={styles.reviewTitle}>Customer Reviews</Text>
              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewItem}>
                  <Image
                    source= {{uri: review.userId.image} }
                    style={styles.reviewerImage}
                  />
                  <View style={styles.reviewTextContainer}>
                    <Text style={styles.reviewerName}>{review.userId.name}</Text>
                    <Text style={styles.stars}>
                      {"⭐".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)} ({review.rating}/5)
                    </Text>
                    <Text style={styles.reviewComment}>{review.review}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buyNowButton}>
                <Text style={styles.buyNowText}>BUY NOW</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(product)}>
                <Image source={Shopping} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  cardContainer: {
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    shadowRadius: 8,
    marginTop: -10,
    paddingBottom: 20,
    zIndex: 1,
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 380,
    borderRadius: 5,
    zIndex: 0,
  },
  heartIcon: {
    position: "absolute",
    marginLeft: 9,
    bottom: 10,
    fontSize: 24,
  },
  uploadIcon: {
    position: "absolute",
    bottom: 10,
    left: 35,
    fontSize: 24,
  },
  categoryName: {
    fontSize: 16,
    color: "grey",
    marginTop: 20,
    fontFamily: "Poppins-Medium",
  },
  productName: {
    fontSize: 19,
    marginTop: 2,
    fontFamily: "Lexend-SemiBold",
    color: "#545454",
  },
  stockStatus: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 10,
  },
  productPrice: {
    fontSize: 18,
    color: "#FF4500",
    fontFamily: "Lato-B",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityControl: {
    fontSize: 17,
    padding: 5,
    borderRadius: 5,
    color: '#a8a8a8'
  },
  quantityValue: {
    fontSize: 16,
    marginHorizontal: 10,
    fontFamily: "Poppins-Regular",
  },
  labelText: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: "Poppins-Medium",
    color: "#505050",
  },
  colorContainerScroll: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 7,
  },
  colorOption: {
    marginHorizontal: 5,
    paddingLeft: 8,
    padding: 5,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  colorNameText: {
    color: "#333",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  selectedColor: {
    borderColor: "blue",
    fontWeight: "bold",
  },
  selectedSizeOption: {
    borderColor: "green",
  },
  sizeContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  sizeBox: {
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  sizeText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  sizeTextSelected: {
    color: "black",
    fontFamily: "Poppins-Medium",
  },
  descriptionLabel: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: "Poppins-Medium",
    color: "#505050",
  },
  descriptionText: {
    fontSize: 14.5,
    marginTop: 10,
    lineHeight: 24,
    fontFamily: "Poppins-Regular",
    color: "#949494",
  },

  //   Review  style
  reviewsContainer: {
    marginTop: 30,
  },
  reviewTitle: {
    fontFamily: "Poppins-Medium",
    color: "#505050",
    fontSize: 16,
  },
  reviewItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewTextContainer: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
  },
  stars: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: "Poppins-Regular",
  },
  reviewcomment: {
    color: "#898989",
    marginTop: 5,
    fontFamily: "Poppins-Regular",
    fontSize: 13,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 20,
  },
  buyNowButton: {
    backgroundColor: "#E94440",
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buyNowText: {
    fontSize: 18,
    color: "#FFF",
    fontFamily: "Poppins-Bold",
  },
  addToCartButton: {
    backgroundColor: "#F87C79",
    width: 50,
    height: 50,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default ProductDetails;