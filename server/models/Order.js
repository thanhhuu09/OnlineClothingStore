// Order
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderedItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
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
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered"],
    default: "Processing",
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Order", orderSchema);
