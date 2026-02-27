import React, { createContext, useReducer, useContext, useEffect } from "react";
import {
  fetchCart,
  addToCartBackend,
  updateCartItemBackend,
  removeFromCartBackend,
  clearCartBackend
} from "../services/authService.js";

const CartStateContext=createContext();
const CartDispatchContext=createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;
    default:
      return state;
  }
};
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);

  // Load cart from backend if logged in, else keep empty
  useEffect(() => {
    const syncCart = async () => {
      if (localStorage.getItem("token")) {
        const backendCart = await fetchCart();
        const cart = backendCart.map(({ quantity, ...item }) => ({ ...item, qty: quantity }));
        dispatch({ type: "SET_CART", payload: cart });
      } else {
        dispatch({ type: "SET_CART", payload: [] });
      }
    };
    syncCart();
  }, []);

  // Cart actions that sync with backend if logged in
  const addItem = async (item) => {
    if (localStorage.getItem("token")) {
      const backendCart = await addToCartBackend({ ...item, quantity: item.qty });
      const cart = backendCart.map(({ quantity, ...i }) => ({ ...i, qty: quantity }));
      dispatch({ type: "SET_CART", payload: cart });
    } else {
      // Fallback: local state only — perform local add logic
      const existingIndex = state.findIndex(
        (it) => it.foodItem === item.foodItem && it.size === item.size
      );
      let newState;
      if (existingIndex !== -1) {
        newState = [...state];
        newState[existingIndex] = {
          ...newState[existingIndex],
          qty: newState[existingIndex].qty + item.qty,
          price: item.price,
        };
      } else {
        newState = [...state, item];
      }
      dispatch({ type: "SET_CART", payload: newState });
    }
  };

  const removeItem = async ({ foodItem, size }) => {
    if (localStorage.getItem("token")) {
      const backendCart = await removeFromCartBackend({ foodItem, size });
      const cart = backendCart.map(({ quantity, ...i }) => ({ ...i, qty: quantity }));
      dispatch({ type: "SET_CART", payload: cart });
    } else {
      const newState = state.filter(
        (item) => !(item.foodItem === foodItem && item.size === size)
      );
      dispatch({ type: "SET_CART", payload: newState });
    }
  };

  const updateQuantity = async ({ foodItem, size, qty }) => {
    if (localStorage.getItem("token")) {
      const backendCart = await updateCartItemBackend({ foodItem, size, quantity: qty });
      const cart = backendCart.map(({ quantity, ...i }) => ({ ...i, qty: quantity }));
      dispatch({ type: "SET_CART", payload: cart });
    } else {
      const newState = state.map((item) =>
        item.foodItem === foodItem && item.size === size ? { ...item, qty } : item
      );
      dispatch({ type: "SET_CART", payload: newState });
    }
  };

  const clearCart = async () => {
    if (localStorage.getItem("token")) {
      await clearCartBackend();
      dispatch({ type: "SET_CART", payload: [] });
    } else {
      dispatch({ type: "SET_CART", payload: [] });
    }
  };

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={{ addItem, removeItem, updateQuantity, clearCart }}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCart() {
  return useContext(CartStateContext);
}

export function useDispatchCart() {
  return useContext(CartDispatchContext);
}