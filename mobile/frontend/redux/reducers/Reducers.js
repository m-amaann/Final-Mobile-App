// Reducers.js
import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  DECREMENT_QUANTITY,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
} from "../ActionTypes";

const initialState = {
  cart: [],
  wishlist: [],
};

const Reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:

      const existingProductIndex = state.cart.findIndex(
        (product) => product._id === action.product._id
      );

      console.log("Existing product index:", existingProductIndex);

      if (existingProductIndex !== -1) {
        console.log(
          "Product already in cart. Existing index:",
          existingProductIndex
        );
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += 1; 
        console.log("Increasing quantity for:", action.product);
        console.log("Updated cart:", updatedCart);
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        console.log("Product not in cart. Adding to cart:", action.product);
        console.log("Cart before addition:", state.cart);
        const updatedCart = [...state.cart, { ...action.product, quantity: 1 }]; 
        console.log("Updated cart after addition:", updatedCart);
        return {
          ...state,
          cart: updatedCart,
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => product._id !== action.productId),
      };

    case DECREMENT_QUANTITY:
      console.log("Decrementing quantity for:", action.productId);

      const updatedCart = (state.cart || []).map((product) => {
        if (product._id === action.productId) {
          const newQuantity = Math.max(product.quantity - 1, 0);
          console.log(`New quantity for ${product._id}: ${newQuantity}`);
          return { ...product, quantity: newQuantity };
        }
        return product;
      });

      // Remove the product if the quantity becomes 0
      const filteredCart = updatedCart.filter(
        (product) => product.quantity > 0
      );

      console.log("Updated cart after decrement:", filteredCart);
      return {
        ...state,
        cart: filteredCart,
      };

    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.id !== action.payload // The payload is the ID itself, not an object
        ),
      };
    default:
      return state;
  }
};

export default Reducers;
