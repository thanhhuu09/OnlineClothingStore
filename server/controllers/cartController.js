// Cart Controller
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const {
  checkUserExist,
  updateCart,
  checkProductsExist,
  createCart,
  getCartByUserId,
} = require("../services/cartService");

const cartController = {
  // GET specific cart - GET /user/:userId/cart
  getCart: async (req, res) => {
    try {
      const { userId } = req.params;
      const userCart = await getCartByUserId(userId);
      if (!userCart) {
        return res.status(404).json({ msg: "Cart not found" });
      }
      return res.json({ msg: "Cart found", data: userCart });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // Add To Cart - GET /user/:userId/cart
  addToCart: async (req, res) => {
    try {
      const { userId } = req.params;
      const { productId, quantity, size, color } = req.body;

      // Check if product exists in database
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }

      const price = product.price;

      // Check if user exists in database
      if (!(await checkUserExist(userId))) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Get user's cart
      const userCart = await getCartByUserId(userId);

      // If user has no cart, create a new cart
      if (!userCart) {
        const newCart = await createCart(
          userId,
          [{ productId, quantity, size, color, price }],
          price * quantity
        );

        return res.status(201).json({ msg: "Cart created", data: newCart });
      }
      // Check if item already exists in cart
      const existingItem = userCart.cartItems.find((item) => {
        return (
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
        );
      });
      if (!existingItem) {
        // If item does not exist in cart, add item to cart
        userCart.cartItems.push({ productId, quantity, size, color, price });
      } else {
        // If item exists in cart, update quantity
        existingItem.quantity += quantity;
      }
      // Update total price and save cart
      userCart.totalPrice += price * quantity;
      await userCart.save();
      return res.status(201).json({ msg: "Item added", data: userCart });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // Update item in cart - PUT /users/:userId/cart/:productId
  updatedCartItem: async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const { itemId, quantity, size, color } = req.body;
      if (!quantity || !size || !color) {
        return res.status(400).json({ msg: "Please fill in all fields" });
      }
      const userCart = await getCartByUserId(userId);
      const itemFound = userCart.cartItems.find(
        (item) => item._id.toString() === itemId
      );
      if (!itemFound) {
        return res.status(404).json({ msg: "Item not found" });
      }
      // Update item details and save to database
      itemFound.quantity = quantity;
      itemFound.size = size;
      itemFound.color = color;
      await userCart.save();
      res.status(200).json({ msg: "Item updated", data: userCart });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // Delete item from cart - DELETE /users/:userId/cart/:productId
  deleteCartItem: async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const userCart = await getCartByUserId(userId);
      if (!userCart) {
        return res.status(404).json({ msg: "Cart not found" });
      }
      const itemFound = userCart.cartItems.find(
        (item) => item.productId.toString() === productId
      );
      if (!itemFound) {
        return res.status(404).json({ msg: "Item not found" });
      }
      // Delete item from cart
      userCart.cartItems = userCart.cartItems.filter(
        (item) => item.productId.toString() !== productId
      );
      // Save changes to database
      await userCart.save();
      res.status(200).json({ msg: "Item deleted", data: userCart });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // Empty cart - DELETE /users/:userId/cart
  emptyCart: async (req, res) => {
    try {
      const { userId } = req.params;
      const deletedCart = await Cart.findOneAndDelete({ userId });
      if (!deletedCart) {
        return res.status(404).json({ msg: "Cart not found" });
      }
      return res.json({ msg: "Cart emptied" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = cartController;

// Giỏ hàng
// Thêm vào giỏ hàng:
// - Nếu user chưa có giỏ hàng thì tạo mới giỏ hàng
// - Nếu đã có thì kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
//    + Nếu chưa có thì thêm sản phẩm vào giỏ hàng
//    + Nếu đã có: kiểm tra xem size, color có giống nhau không
//       +  Nếu giống nhau: cập nhật lại số lượng
//       +  Nếu khác nhau: thêm sản phẩm vào giỏ hàng
// => Cập nhật lại tổng tiền của giỏ hàng

// const { userId, productId } = req.params;
// const { quantity, size, color } = req.body;
// if (!quantity || !size || !color) {
//   return res.status(400).json({ msg: "Please fill in all fields" });
// }
// const userCart = await getCartByUserId(userId);

// if (!userCart) {
//   return res.status(404).json({ msg: "Cart not found" });
// }
// const itemFound = userCart.cartItems.find(
//   (item) =>
//     item.productId.toString() === productId ||
//     item.size === size ||
//     item.color === color
// );
// if (!itemFound) {
//   return res.status(404).json({ msg: "Item not found" });
// }
// // Update item details
// itemFound.quantity = quantity;
// itemFound.size = size;
// itemFound.color = color;
// // Save changes to database
// await userCart.save();
// res.status(200).json({ msg: "Item updated", data: userCart });
