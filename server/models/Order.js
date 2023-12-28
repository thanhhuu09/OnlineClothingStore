// Order
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    userId: {
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
          enum: ["S", "M", "L", "XL", "XXL"],
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
      enum: ["Processing", "Delivering", "Shipped", "Cancelled"],
      default: "Processing",
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "VNPay"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    voucher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voucher",
    },
    voucherDiscount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
