// Product models
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter a price"],
  },
  category: {
    type: String,
  },
  images: {
    type: [String],
    required: [true, "Please enter an image"],
  },
  ratings: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
        },
        review: {
          type: String,
        },
      },
    ],
    default: [],
  },
  variants: {
    type: [
      {
        size: {
          type: String,
        },
        color: {
          type: String,
        },
        sku: {
          type: String,
        },
        availableQuantity: {
          type: Number,
        },
      },
    ],
  },
});

module.exports = mongoose.model("Product", productSchema);
