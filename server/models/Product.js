// Product models
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    trim: true,
    unique: true,
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
  colors: {
    type: [String],
    required: [true, "Please enter a color"],
  },
  images: [
    {
      color: {
        type: String,
        required: [true, "Please enter a color"],
      },
      urls: {
        type: [String],
        required: [true, "Please enter a image url"],
      },
    },
  ],
  rating: {
    // Average rating
    rate: {
      type: Number,
      default: 0,
    },
    // Total rating
    count: {
      type: Number,
      default: 0,
    },
  },
  inventory: {
    type: Number,
    default: 0,
  },
  sizes: [
    {
      size: {
        type: String,
        required: [true, "Please enter a size"],
      },
      quantity: {
        type: Number,
        required: [true, "Please enter a quantity"],
      },
      color: {
        type: String,
        required: [true, "Please enter a color"],
      },
    },
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: [true, "Please enter a category"],
  },
});

module.exports = mongoose.model("Product", productSchema);
const product = {
  name: "Sample Products",
  description: "This is a sample product description...",
  price: 29.99,
  colors: ["Red", "Blue", "Green"],
  images: [
    {
      color: "Xanh Navy",
      urls: [
        "https://cdn.ssstutter.com/products/66z6ao28eNQDG839/122023/1703579512058.jpeg",
        "https://cdn.ssstutter.com/products/66z6ao28eNQDG839/122023/1703579512013.jpeg",
      ],
    },
    {
      color: "Be",
      urls: [
        "https://cdn.ssstutter.com/products/66z6ao28eNQDG839/122023/1703579522170.jpeg",
        "https://cdn.ssstutter.com/products/66z6ao28eNQDG839/122023/1703579522048.jpeg",
      ],
    },
  ],
  rating: 4.5,
  inventory: 100,
  size: [
    {
      size: "S",
      quantity: 10,
    },
    {
      size: "M",
      quantity: 10,
    },
    {
      size: "L",
      quantity: 10,
    },
    {
      size: "XL",
      quantity: 10,
    },
    {
      size: "XXL",
      quantity: 10,
    },
    {
      size: "XXXL",
      quantity: 10,
    },
  ],
  isFeatured: true,
  category: "Female",
};
