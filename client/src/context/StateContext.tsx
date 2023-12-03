// State Context for the application
"use client";
import { createContext, useContext, useState } from "react";
interface StateContext {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  cardItems: any[];
  totalPrice: number;
  quantity: number;
  totalQuantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}
const defaultState: StateContext = {
  showCart: false,
  setShowCart: () => {},
  cardItems: [],
  totalPrice: 0,
  quantity: 0,
  totalQuantity: 0,
  incrementQuantity: () => {},
  decrementQuantity: () => {},
};

const Context = createContext<StateContext>(defaultState);

export const StateProvider = ({ children }: any) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cardItems, setCardItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  // Increment Quantity
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  // Decrement Quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // Increment Total Quantity

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cardItems,
        totalPrice,
        quantity,
        totalQuantity,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// useStateContext is a custom hook and
// useContext must be called the function component or custom hook
export function useStateContext() {
  return useContext(Context);
}
