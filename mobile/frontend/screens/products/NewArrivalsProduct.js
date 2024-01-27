import React, { useContext } from "react";
import {ScrollView} from "react-native";

// Custom Fonts Imports
import { FontContext } from "../../constants/fonts/FontContext";
import LoadingIndicator from "../../constants/fonts/LoadingIndicator";
import ProductItem from "./components/ProductItem";

const NewArrivalsProduct = ({ navigation, products }) => {
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
        <ProductItem product={product} key={product._id} navigation={navigation}/>
      ))}
    </ScrollView>
  );
};

export default NewArrivalsProduct;


