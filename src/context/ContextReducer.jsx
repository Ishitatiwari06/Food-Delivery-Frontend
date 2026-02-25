import React, { createContext, useReducer, useContext } from "react";

const CartStateContext=createContext();
const CartDispatchContext=createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { foodItem, name, price, qty, size, img } = action.payload;
      // Check if item with same foodItem and size exists
      const existingIndex = state.findIndex(
        item => item.foodItem === foodItem && item.size === size
      );
      if (existingIndex !== -1) {
        // Update quantity and price
        const updatedState = [...state];
        updatedState[existingIndex] = {
          ...updatedState[existingIndex],
          qty: updatedState[existingIndex].qty + qty,
          price: price,
        };
        return updatedState;
      }
      return [
        ...state,
        { foodItem, name, price, qty, size, img }
      ];
    }
    case "REMOVE_ITEM": {
      const { foodItem, size } = action.payload;
      return state.filter(
        item => !(item.foodItem === foodItem && item.size === size)
      );
    }
    case "UPDATE_QUANTITY": {
      const { foodItem, size, qty } = action.payload;
      return state.map(item =>
        item.foodItem === foodItem && item.size === size
          ? { ...item, qty }
          : item
      );
    }
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};
export const CartProvider = ({children}) => {
    const [state,dispatch]=useReducer(reducer,[]);
    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    )
}
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);