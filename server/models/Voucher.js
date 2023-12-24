// Voucher model
const mongoose = require("mongoose");
const voucherSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Please enter a voucher code"],
      unique: true,
      trim: true,
    },
    discountPercentage: {
      type: Number,
      required: [true, "Please enter a discount"],
      min: [0, "Discount cannot be less than 0"],
      max: [100, "Discount cannot be more than 100"],
    },
    expiryDate: {
      type: Date,
      required: [true, "Please enter an expiry date"],
    },
    // Users who have used this voucher
    usersId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User model
      },
    ],
    // Max usage count
    maxUsage: {
      type: Number,
      default: 1,
    },
    // Usage count
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voucher", voucherSchema);
