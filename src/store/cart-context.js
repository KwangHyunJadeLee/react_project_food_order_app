import React from "react";

// Cart item be managed with Context, because it should make sure accessibility in every component.
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
