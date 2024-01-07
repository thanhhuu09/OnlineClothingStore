// Refresh Token model
// ===================

const mongoose = require("mongoose");
const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
