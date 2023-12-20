const Cart = require("../models/Cart");
const Product = require("../models/Product");
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;
    if (!productId || !quantity || !size || !color) {
      return res.status(400).json({ msg: "Please fill in all fields." });
    }
    const userId = req.user.id; // From authentication middleware

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

module.exports = {
  addItemToCart,
};
