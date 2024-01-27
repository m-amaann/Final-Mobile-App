import React, { useContext } from "react";
import {
  Dimensions,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
//Font Awesome
import { FontContext } from "../../constants/fonts/FontContext";
import LoadingIndicator from "../../constants/fonts/LoadingIndicator";
import ProductItem from "./components/ProductItem";

const windowWidth = Dimensions.get("window").width;

const cardWidth = windowWidth * 0.4;
const cardHeight = cardWidth * 1.35;

const TopSaleProduct = ({ navigation, products }) => {
  // FONT FAMILY LOADING
  const fontsLoaded = useContext(FontContext);
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView
      className="mt-3"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {products.map((product) => (
        <ProductItem product={product} key={product._id} navigation={navigation} />
      ))}
    </ScrollView>

  );
};

export default TopSaleProduct;
