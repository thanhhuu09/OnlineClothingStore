import { ICartState, CartActionType } from "@/interfaces/cartInterface";

// cartReducer
const cartReducer = (state: ICartState, action: CartActionType): ICartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      // Check if product exist in cart
      const exist = state.cartItems.find((item) => item.id === product.id);
      if (exist) {
        const updatedCartItems = state.cartItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return {
          ...state,
          totalPrice: state.totalPrice + product.price,
          totalQuantities: state.totalQuantities + 1,
          cartItems: updatedCartItems,
        };
      }
      // If product does not exist in cart
      return {
        ...state,
        totalQuantities: state.totalQuantities + 1,
        totalPrice: state.totalPrice + product.price,
        cartItems: [
          ...state.cartItems,
          { ...product, quantity: 1, size: "M", color: "Đen" },
        ],
      };
    }
    case "REMOVE_FROM_CART": {
      // remove item from cart and update total price and total quantities
      const productID = action.payload;
      const productToRemove = state.cartItems.find(
        (item) => item.id === productID
      );
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== productID
      );
      const updatedTotalPrice =
        state.totalPrice - productToRemove!.price * productToRemove!.quantity;

      const updatedTotalQuantities =
        state.totalQuantities - productToRemove!.quantity;
      return {
        ...state,
        cartItems: updatedCartItems,
        totalPrice: updatedTotalPrice,
        totalQuantities: updatedTotalQuantities,
      };
    }

    case "INCREASE_QUANTITY": {
      alert("INCREASE_QUANTITY");
    }
    case "DECREASE_QUANTITY": {
      alert("DECREASE_QUANTITY");
    }
    case "TOGGLE_CART": {
      return {
        ...state,
        showCart: !state.showCart,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
