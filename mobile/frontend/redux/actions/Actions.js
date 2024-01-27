import { ADD_TO_CART, ADD_TO_WISHLIST, DECREMENT_QUANTITY, REMOVE_FROM_CART, REMOVE_FROM_WISHLIST } from "../ActionTypes";


// ADD TO CART ITEMS
export const addToCart = (product) => {
  return {
      type: ADD_TO_CART,
      product,
  };
};

export const removeFromCart = (productId) => {
  return {
      type: REMOVE_FROM_CART,
      productId,
  };
};
  
export const decrementQuantity = (productId) => {
  return {
    type: DECREMENT_QUANTITY,
    productId,
  };
};



// ADD TO FAVOURITE LIST
export const addToWishlist = (product) => {
  return { 
      type: ADD_TO_WISHLIST, 
      payload: product 
  };
};

export const removeFromWishlist = (productId) => {
  return { 
      type: REMOVE_FROM_WISHLIST, 
      payload: productId // Just the ID, not an object
  };
};