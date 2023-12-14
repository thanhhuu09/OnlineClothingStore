// cartContext
"use client";
import { createContext, useContext, useReducer, useState } from "react";
import { IProduct } from "@/interfaces/productInterface";
import { ICart, ICartState } from "@/interfaces/cartInterface";
import cartReducer from "@/reducers/cartReducer";

// initial state
const initialState: ICartState = {
  showCart: false,
  cartItems: [],
  quantity: 0,
  totalPrice: 0,
  totalQuantities: 0,
};

export const CartContext = createContext({
  state: initialState,
  dispatch: (action: any) => {},
});

export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
