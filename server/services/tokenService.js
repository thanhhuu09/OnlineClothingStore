// Token service for generating access and refresh tokens
// =================================================

const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const payload = { id: user._id, role: user.role };
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};

const generateRefreshToken = (user, expiresIn) => {
  const payload = { id: user.id, role: user.role };
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: expiresIn,
  });
  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
