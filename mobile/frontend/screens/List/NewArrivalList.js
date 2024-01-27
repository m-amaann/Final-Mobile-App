import React, { useEffect, useState } from "react";
import Slider from '@react-native-community/slider';

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FilterComponent from "../../constants/FilterModal";
import CustomHead from "../../constants/Header/CustomHead";
import SearchComponent from "../../component/SearchComponent"; 
import Banner from "../../../assets/Banner/NewArrival.png"; 

const NewArrivalList = () => {
  const navigation = useNavigation();

  const [newArrivals, setNewArrivals] = useState([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    // Replace with your actual API endpoint
    const apiUrl = "http://192.168.8.159:5000/api/product/getNewArrivalProducts";
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.message) {
        Alert.alert("Error", "An error occurred while fetching new arrivals.");
      } else {
        setNewArrivals(data);
        setFilteredProducts(data); 
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "An error occurred while fetching new arrivals.");
    }
  };

  const handleSearch = (query) => {
    const formattedQuery = query.toLowerCase();
    const filteredData = newArrivals.filter((item) =>
      item.name.toLowerCase().includes(formattedQuery)
    );
    setFilteredProducts(filteredData);
  };

  return (
    <View style={styles.container}>
      <CustomHead title="New Arrivals" navigation={navigation} />
      <SearchComponent 
        onSearch={handleSearch}
        placeholder="Search in New Arrivals..."
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} // Handling potential undefined IDs
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>LKR {item.price}</Text>
            </View>
          </View>
        )}
        ListHeaderComponent={
          <>
            <View style={styles.filterLayoutContainer}>
              <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterModalVisible(true)}>
                <Text style={styles.filterButtonText}>FILTER</Text>
              </TouchableOpacity>
              <Text style={styles.itemCount}>{`${newArrivals.length} items`}</Text>
            </View>
            <View style={styles.banner}>
              <Image source={Banner} style={styles.bannerImage} />
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerText}>NEW ARRIVAL PRODUCTS</Text>
                <Text style={styles.bannerSubText}>{`${newArrivals.length} items`}</Text>
              </View>
            </View>
          </>
        }
      />
      <FilterComponent
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onFilter={(price) => {
          const filtered = newArrivals.filter((product) => product.price <= price);
          setFilteredProducts(filtered);
          setIsFilterModalVisible(false); 
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
export default NewArrivalList;
