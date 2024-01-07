interface ICartItem {
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
  cartItems: ICartItem[];
  quantity: number;
  totalPrice: number;
  totalQuantities: number;
}

export type { ICartState, ICartItem };
