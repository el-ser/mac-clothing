import { createAction } from "../../utils/utils/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const { SET_CART_ITEMS, SET_IS_CART_OPEN } = CART_ACTION_TYPES;

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains the product to add
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // return new array
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find item
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return cart with reduced items
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const setIsCartOpen = (bool) => createAction(SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(SET_CART_ITEMS, newCartItems);
};

export const removeItemToCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(SET_CART_ITEMS, newCartItems);
};
