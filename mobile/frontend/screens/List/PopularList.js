import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Banner from "../../../assets/Banner/NewArrival.png";

import { useNavigation } from "@react-navigation/native";
import FilterComponent from "../../constants/FilterModal";
import CustomHead from "../../constants/Header/CustomHead";

const PopularProductList = ({ product }) => {
  const navigation = useNavigation();

  const [popular, setPopular] = useState([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);


  // Favourit toggle change --------
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };


  //Popular product 
  const fetchPopular = async () => {
    try {
      const response = await fetch(
        "http://192.168.8.159:5000/api/product/getPopularProducts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.message) {
        // Handle if there's an error message
        Alert.alert(
          "Error", 
          "An error occurred while fetching popular"
        );
      } 
      else {
        setPopular(data);
        setFilteredProducts(data); 
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while fetching popular products");
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  return (
    <>
      <View>
        <CustomHead
          title="Popular Products"
          navigation={navigation}
        />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for products..."
          />
        </View>
        <View style={styles.filterLayoutContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterModalVisible(true)}>
            <Text style={styles.filterButtonText}>FILTER</Text>
          </TouchableOpacity>
          <Text style={styles.itemCount}>{`${popular.length} items`}</Text>
        </View>

        <View style={styles.banner}>
          <Image source={Banner} style={styles.bannerImage} />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerText}>POPULAR PRODUCTS</Text>
            <Text style={styles.bannerSubText}
            >{`${popular.length} items`}</Text>
          </View>
        </View>

        <View
          style={styles.productList}
          onPress={() => navigation.navigate("ProductDetails", { product: product })}
        >
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>LKR.{product.price}</Text>
              </View>
              <TouchableOpacity style={styles.favoriteIcon} onPress={handleFavoriteClick} >
                <MaterialIcons
                  name={isFavorited ? "favorite" : "favorite-border"}
                  size={24}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          ))}


        </View>

        {/* Filter Modal */}
        <FilterComponent
          isVisible={isFilterModalVisible}
          onClose={() => setIsFilterModalVisible(false)}
          onFilter={(price) => {
            const filtered = popular.filter((product) => product.price <= price);
            setFilteredProducts(filtered);
            setIsFilterModalVisible(false);
          }}
        />


      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    fontFamily: "Poppins-Regular",
  },
  searchBar: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: '#ededed',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  filterLayoutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
    paddingVertical: 10,
  },
  filterButton: {
    padding: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  filterButtonText: {
    fontFamily: "Poppins-Bold",
  },
  itemCount: {
    marginLeft: 15,
    fontSize: 14,
    marginVertical: 4,
    fontFamily: "Poppins-Medium",
  },
  banner: {
    alignItems: "center",
    marginBottom: 15,
  },
  bannerImage: {
    width: "100%",
    height: 220,
    resizeMode: "contain",
    marginTop: 10,
  },
  bannerTextContainer: {
    position: "absolute",
    top: "40%",
    alignItems: "center",
  },
  bannerText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    marginBottom: 5,
    color: "#f15656",
  },
  bannerSubText: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
  },
  productList: {
    paddingHorizontal: 15,
  },
  productCard: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "f5f5f5f5",
  },
  productImage: {
    flex: 1,
    height: 150,
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
});
export default PopularProductList;
