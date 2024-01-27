// selectors.js

export const selectTotalItems = (state) => {
  return state.cart.cart.reduce((total, product) => total + product.quantity, 0);
};

export const selectTotalAmount = (state) => {
  return state.cart.cart.reduce((total, product) => {
    return total + product.quantity * product.discountprice; // Assuming there's a 'discountprice' property
  }, 0);
};
