// Card models
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to Product model
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Card", cardSchema);
