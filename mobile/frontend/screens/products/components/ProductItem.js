import React from "react";

import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { addToCart } from "../../../redux/actions/Actions";

// Layout Properties
const windowWidth = Dimensions.get("window").width;

const cardWidth = windowWidth * 0.4;
const cardHeight = cardWidth * 1.35;

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();

  // Add to Cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };


    // Determine if the add to cart button should be disabled
    const isOutOfStock = product.stockQuantity === 0;

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ProductDetails", { product: product })
      }
    >
      <ProductCardWrapper style={{ width: cardWidth, height: cardHeight }}>
        <CardImageWrapper>
          <ProductImage source={{ uri: product.imageUrl }} />
          <ProductNameOverlay numberOfLines={2}>
            {product.name}
          </ProductNameOverlay>
          <FavoriteButton>
            <Icon name="favorite-border" size={20} color="#F6534F" />
          </FavoriteButton>
        </CardImageWrapper>

        <CardContent>
          <ProductCategory>{product?.category?.name}</ProductCategory>
          <ProductStatus stockQuantity={product.stockQuantity}>
            {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
          </ProductStatus>
          <ProductPrices>
            <PriceWrapper>
              <PriceContainer>
                <ProductPrice>Rs.{product.discountprice}</ProductPrice>
                <DiscountPrice>{product.price}</DiscountPrice>
              </PriceContainer>
            </PriceWrapper>
            <AddToCartButton onPress={() => handleAddToCart(product)}
            disabled={isOutOfStock} // Disable button if out of stock
            // style={isOutOfStock ? styles.disabledButton : {}}
            >
              <CartIconWrapper>
                <Icon name="shopping-bag" size={18} color={isOutOfStock ? "#ccc" : "#F6534F"}  />
              </CartIconWrapper>
            </AddToCartButton>
          </ProductPrices>
        </CardContent>
      </ProductCardWrapper>
    </Pressable>
  );
};

export default ProductItem;

const ProductCardWrapper = styled.View`
  background-color: #f4f4f4;
  margin-right: 20px;
  margin-bottom: 20px;
  elevation: 5;
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-radius: 10px;
`;

const CardImageWrapper = styled.View`
  position: relative;
`;

const ProductImage = styled(Image)`
  width: ${cardWidth - 4}px;
  height: ${cardHeight / 2}px;
  margin: 2px;
  border-radius: 8px;
`;

const ProductNameOverlay = styled(Text)`
  position: absolute;
  bottom: 0;
  left: 1px;
  right: 1px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-family: "Poppins-Medium";
  font-size: 12.5px;
  padding-left: 9px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const CardContent = styled(View)`
  margin-top: 8px;
  margin-left: 8px;
`;

const ProductCategory = styled(Text)`
  font-family: "Poppins-Regular";
  font-size: 13px;
  color: #666;
`;

const ProductStatus = styled(Text)`
  font-family: "Poppins-Regular";
  font-size: 11px;
  color: ${props => props.stockQuantity > 0 ? "#28a745" : "#dc3545"};
`;

const ProductPrices = styled(View)`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 2px;
`;

const PriceWrapper = styled(View)`
  align-items: flex-start;
`;

const PriceContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const ProductPrice = styled(Text)`
  font-family: "Poppins-Bold";
  color: red;
  font-size: 16px;
  margin-right: 4px;
`;

const DiscountPrice = styled(Text)`
  font-family: "Poppins-Regular";
  color: #666;
  font-size: 12px;
  text-decoration: line-through;
`;

const AddToCartButton = styled(TouchableOpacity)`
  background-color: #ffd3d0;
  border-radius: 50px;
  align-self: flex-end;
  margin: 10px 7px 0 0;
`;

const CartIconWrapper = styled(View)`
  padding: 5px;
`;


// const styles = StyleSheet.create({
//   disabledButton: {
//     backgroundColor: '#ccc', 
//   },
// });