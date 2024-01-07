import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICartItem, ICartState } from "@/interfaces/cartInterface";
import { IProduct } from "@/interfaces/productInterface";
const initialState: ICartState = {
  showCart: false,
  cartItems: [],
  quantity: 0,
  totalPrice: 0,
  totalQuantities: 0,
};
// Create slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const newItem: ICartItem = {
        ...action.payload,
        quantity: 1,
        color: "black",
        size: "M",
      };
      // Check if product exist in cart
      const exist = state.cartItems.find((item) => item.id === newItem.id);
      if (exist) {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === newItem.id) {
            return { ...item, quantity: Math.min(item.quantity + 1, 10) };
          }
          return item;
        });
      } else {
        state.cartItems.push(newItem);
      }
      state.totalQuantities++;
      state.totalPrice += newItem.price * newItem.quantity;
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      const itemToRemove = state.cartItems.find(
        (item) => item.id === action.payload
      );
      state.totalQuantities -= itemToRemove!.quantity;
      state.totalPrice -= itemToRemove!.price * itemToRemove!.quantity;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const itemToIncrease = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (itemToIncrease!.quantity >= 10) return;
      itemToIncrease!.quantity += 1;
      state.totalQuantities += 1;
      state.totalPrice += itemToIncrease!.price;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const itemToDecrease = state.cartItems.find(
        (item) => item.id === action.payload
      );
      itemToDecrease!.quantity -= 1;
      if (itemToDecrease!.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
      state.totalQuantities -= 1;
      state.totalPrice -= itemToDecrease!.price;
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  toggleCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions; // Export actions
export default cartSlice.reducer; // Export reducer
