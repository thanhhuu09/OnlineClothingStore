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
  colors: {
    type: [String],
    required: [true, "Please enter a color"],
  },
  imagesURL: {
    type: [String],
    required: [true, "Please enter an image"],
    trim: true,
  },
  rating: {
    type: Number,
  },
  inventory: {
    type: Number,
    required: [true, "Please enter an inventory"],
  },
  size: {
    type: [String],
    required: [true, "Please enter a size"],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please enter a category"],
  },
});

module.exports = mongoose.model("Product", productSchema);
