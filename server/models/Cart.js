// Card models
const mongoose = require("mongoose");

// Cart schema: user, cartItems, totalPrice
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to Product model
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      size: {
        type: String,
        default: "S",
      },
      color: {
        type: String,
        default: "Black",
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
