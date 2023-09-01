import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// Reducer function. state indicate the current state about the state value
// action indicate values included function when be occured
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount; // add the newly added items.

    const existingCartItemIndex = state.items.findIndex(
      // if the item already exsisted, then it would be added only to amount.
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex]; // set the item.
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount, // only add the amount of itme.
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem; // edit the updated item which is already existed in Cart
    } else {
      updatedItems = state.items.concat(action.item); // concat the item when the item is not existed in Cart
    }

    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      // if the item reamin only one amount, then it should be totally removed in Cart.
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex]; // set the item.
    const updateTotalAmount = state.totalAmount - existingCartItem.price; // remove the item price.

    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id); // if the item's amount only one left, store the item which are not has the same id items with the Filter function. Which means delete.
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,                          // If there's amount more than one, than just remove one.
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;              // edit the updated item which is already existed in Cart
    }

    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  // Basic Reducer form : const [state, dispatch] = useReducer(reducer, initialState)
  // Reducer make it possible to execute the function what user set up related to when dispatch occured
  // Here, Reducer used instead of useState, because remove and add item function should be included.
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });          // action.type = "ADD", it will be executed in Reducer function
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });          // action.type = "REMOVE", it will be executed in Reducer function
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
