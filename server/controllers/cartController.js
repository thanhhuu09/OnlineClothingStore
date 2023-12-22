const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add to cart - POST /api/v1/cart/:userId
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;
    const { userId } = req.params;

    if (!productId || !quantity || !size || !color) {
      return res.status(400).json({ msg: "Please fill in all fields." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ msg: "Product does not exist." });
    }

    // Check if user has cart
    let userCart = await Cart.findOne({ userId });
    if (!userCart) {
      // If user doesn't have cart, create new cart
      userCart = new Cart({
        userId,
        cartItems: [{ productId, quantity, size, color, price: product.price }],
        totalPrice: product.price * quantity,
      });
      await userCart.save();
    } else {
      // If user has cart, check if item already exists in cart
      const existingItem = userCart.cartItems.find(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );
      console.log(existingItem);
      if (existingItem) {
        // If item exists, update quantity
        existingItem.quantity += quantity;
        userCart.totalPrice += quantity * product.price;
      } else {
        // If doesn't exist, add new item
        userCart.cartItems.push({
          productId,
          quantity,
          size,
          color,
          price: product.price,
        });
        userCart.totalPrice += quantity * product.price;
      }
      await userCart.save();
    }
    return res.status(200).json({ msg: "Item added to cart", data: userCart });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Update cart
// PUT /api/v1/cart/:userId/items/:itemId (itemId = cart item id)
const updateItemInCart = async (req, res) => {
  try {
    const { quantity, size, color } = req.body;
    const { userId, itemId } = req.params;

    const userCart = await Cart.findOne({ userId });
    if (!userCart) {
      return res.status(400).json({ msg: "Cart does not exist." });
    }
    const item = userCart.cartItems.find(
      (item) => item._id.toString() === itemId
    );
    if (!item) {
      return res.status(400).json({ msg: "Item does not exist." });
    }
    // update item details
    if (quantity) item.quantity = quantity;
    if (size) item.size = size;
    if (color) item.color = color;
    // update total price
    userCart.totalPrice = userCart.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    console.log(userCart.totalPrice);
    await userCart.save();
    return res
      .status(200)
      .json({ msg: "Cart item updated successfully", data: userCart });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Delete item from cart
// DELETE /api/v1/cart/items/:itemId (itemId = cart item id)
const deleteItemFromCart = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const userId = req.user.id; // From authentication middleware
    const userCart = await Cart.findOne({ userId });
    if (!userCart) {
      return res.status(400).json({ msg: "Cart does not exist." });
    }
    const item = userCart.cartItems.find(
      (item) => item._id.toString() === itemId
    );
    if (!item) {
      return res.status(400).json({ msg: "Item does not exist." });
    }

    // remove item from cart
    userCart.cartItems = userCart.cartItems.filter(
      (item) => item._id.toString() !== itemId
    );
    // update total price
    userCart.totalPrice = userCart.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    await userCart.save();
    return res
      .status(200)
      .json({ msg: "Cart item deleted successfully", data: userCart });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
// Get user cart - GET /api/v1/cart/:userId
// Admin can get any user's cart, user can only get their own cart
const getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userCart = await Cart.findOne({ userId });
    if (!userCart) {
      return res.status(400).json({ msg: "Cart does not exist." });
    }
    return res
      .status(200)
      .json({ msg: "Get user cart successfully", data: userCart });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = {
  addItemToCart,
  updateItemInCart,
  deleteItemFromCart,
  getUserCart,
};
