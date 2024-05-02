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
  category: {
    type: String,
  },
  productImages: {
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
        color: {
          type: String,
        },
        sizes: {
          type: [
            {
              size: {
                type: String,
              },
              price: {
                type: Number,
              },
              stock: {
                type: Number,
              },
              SKU: {
                type: String,
              },
            },
          ],
        },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Product", productSchema);
// const variations = [
//   {
//     color: "Trắng",
//     sizes: [
//       { size: "Small", price: 0, stock: 0, SKU: 0 },
//       { size: "Big", price: 0, stock: 0, SKU: 0 },
//     ],
//   },
//   {
//     color: "Đen",
//     sizes: [
//       { size: "Small", price: 0, stock: 0, SKU: 0 },
//       { size: "Big", price: 0, stock: 0, SKU: 0 },
//     ],
//   },
// ];
