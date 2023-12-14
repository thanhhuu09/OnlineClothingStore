import { IProduct } from "./productInterface";

interface ICart {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
}

interface ICartState {
  showCart: boolean;
  cartItems: ICart[];
  totalPrice: number;
  quantity: number;
  totalQuantities: number;
}

type CartActionType =
  | { type: "ADD_TO_CART"; payload: IProduct }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "INCREASE_QUANTITY"; payload: number }
  | { type: "DECREASE_QUANTITY"; payload: number }
  | { type: "TOGGLE_CART" };

export type { ICart, ICartState, CartActionType };
