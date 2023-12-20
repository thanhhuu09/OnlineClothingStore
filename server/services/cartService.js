// Cart Service
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

const checkUserExist = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    return false;
  }
  return true;
};

const checkProductsExist = async (productId) => {
  const productFound = await Product.findById(productId);
  if (!productFound) {
    return false;
  }
  return true;
};

const getCartByUserId = async (userId) => {
  return await Cart.findOne({ userId });
};

const updateCart = async (cart, cartItems, totalPrice) => {
  cart.cartItems = cartItems;
  cart.totalPrice = totalPrice;
  return await cart.save();
};

const createCart = async (userId, cartItems, totalPrice) => {
  const newCart = new Cart({
    userId,
    cartItems,
    totalPrice,
  });
  return await newCart.save();
};

module.exports = {
  checkUserExist,
  checkProductsExist,
  getCartByUserId,
  updateCart,
  createCart,
};
