import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity
} from "react-native";
import * as Animatable from "react-native-animatable";

import { SafeAreaView } from "react-native-safe-area-context";
import { Animations } from "../../constants/Animation/animation";

import BannerCarousel from "../../component/Carousels/BannerCarousel";

import { FontContext } from "../../constants/fonts/FontContext";
import LoadingIndicator from "../../constants/fonts/LoadingIndicator";
import TopHeader from "../../navigation/TopHeader";

import {
  AllProductText,
  AllProductWrapper,
  BakingGoodsEssentialsText,
  BrowseButton,
  BrowseButtonText,
  Container,
  DiscoverText,
  LetsOrderText,
  MainWrapper,
  NewCollectionsText,
  NewCollectionsWrapper,
  PopularText,
  PopularWrapper,
  ProductCartWrapper,
  RootView,
  SeeAllButton,
  SeeAllText,
  TopSaleText,
  TopSaleWrapper,
} from "../../component/homescreen_style";
import SearchBar from "../../constants/Search/SearchBar";

import CategoryTypes from "../Product type/CategoryTypes";
import NewArrivalsProduct from "../products/NewArrivalsProduct";
import PopularProduct from "../products/PopularProduct";
import TopSaleProduct from "../products/TopSaleProduct";
import ProductItem2 from "../products/components/ProductItem2";

const HomeScreen = ({ navigation }) => {
  // FONT FAMILY LOADINGs
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  // Browse button function
  const handleAnimationEnd = () => {
    // console.log("Animation ended");
  };

  // Product Fetch Function
  const [newarrival, setNewarrival] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topsale, setTopsale] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNewarrival();
    fetchPopular();
    fetchTopsale();
    fetchCategory();
    fetchAllProducts();
  }, []);

  const fetchNewarrival = async () => {
    try {
      const response = await fetch(
        "http://192.168.8.159:5000/api/product/getNewArrivalProducts",
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
          "An error occurred while fetching new Arrival product"
        );
      } else {
        setNewarrival(data);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error",
        "An error occurred while fetching new Arrival product"
      );
    }
  };

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
        Alert.alert("Error", "An error occurred while fetching popular");
      } else {
        setPopular(data);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while fetching popular products");
    }
  };

  const fetchTopsale = async () => {
    try {
      const response = await fetch(
        "http://192.168.8.159:5000/api/product/getTopSaleProducts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.message) {
        Alert.alert(
          "Error",
          "An error occurred while fetching top sale products"
        );
      } else {
        setTopsale(data);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error",
        "An error occurred while fetching top sale products"
      );
    }
  };

  // console.log(newarrival);

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        "http://192.168.8.159:5000/api/category/getAllCategories",
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
        Alert.alert("Error", "An error occurred while fetching categories");
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while fetching categories");
    }
  };

  // Fetch all products function
  const fetchAllProducts = async () => {
    try {
      const response = await fetch(
        "http://192.168.8.159:5000/api/product/getAllProducts"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError("Failed to load products: " + error.message);
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <TopHeader />

          <SearchBar />

          <RootView>
            <LetsOrderText>Let's Order</LetsOrderText>
            <BakingGoodsEssentialsText>
              All Cake Items & Essentials
            </BakingGoodsEssentialsText>
          </RootView>

          <BannerCarousel />

          <ProductCartWrapper>
            <DiscoverText>Discover</DiscoverText>

            {/* Show Category Types */}
            <CategoryTypes categories={categories} />

            {/* New Arrivals */}
            {newarrival.length > 0 && newarrival && (
              <>
                <NewCollectionsWrapper>
                  <NewCollectionsText>New Arrivals</NewCollectionsText>
                  <SeeAllButton
                    onPress={() => navigation.navigate("NewArrivalList", {
                      products: newarrival,
                    })
                    }
                  >
                    <SeeAllText>See All</SeeAllText>
                  </SeeAllButton>
                </NewCollectionsWrapper>

                <NewArrivalsProduct products={newarrival} />
              </>
            )}

            {/* Popular */}
            {popular.length > 0 && popular && (
              <>
                <PopularWrapper >
                  <PopularText>Popular</PopularText>
                  <SeeAllButton
                    onPress={() => navigation.navigate('PopularProductList',
                      { products: popular })}
                  >
                    <SeeAllText>See All</SeeAllText>
                  </SeeAllButton>
                </PopularWrapper>
                <TouchableOpacity></TouchableOpacity>

                <PopularProduct products={popular} />
              </>
            )}

            {/* Top Sale */}
            {topsale.length > 0 && topsale && (
              <>
                <TopSaleWrapper>
                  <TopSaleText>Top Sale</TopSaleText>
                  <SeeAllButton>
                    <SeeAllText>See All</SeeAllText>
                  </SeeAllButton>
                </TopSaleWrapper>

                <TopSaleProduct products={topsale} />
              </>
            )}
          </ProductCartWrapper>

          {/* **************************************************************** */}

          <MainWrapper>
            {products.length > 0 ? (
              <>
                <AllProductWrapper>
                  <AllProductText>Latest</AllProductText>
                  <ProductItem2 products={products} />
                </AllProductWrapper>
                <BrowseButton onPress={() => navigation.navigate("AllProductList")} >
                    <BrowseButtonText>Browse All</BrowseButtonText>
                </BrowseButton>
              </>
            ) : (
              <Text>Loading products...</Text>
            )}
          </MainWrapper>
        </Container>
      </ScrollView>
      <StatusBar barStyle="light-content" backgroundColor="#ffe8e8" />
    </SafeAreaView>
  );
};

export default HomeScreen;
