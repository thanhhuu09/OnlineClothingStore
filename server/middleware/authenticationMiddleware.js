// Middleware relate to authentication
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const comparePasswords = async (req, res, next) => {
  try {
    const { oldPassword } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isSamePassword = await bcrypt.compare(oldPassword, user.password);
    // If passwords don't match, return error
    if (!isSamePassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    next();
  } catch (error) {
    console.error("Error comparing passwords:", error);
    res.status(500).json({ error: error.message });
  }
};

const authenticationToken = async (req, res, next) => {};
module.exports = { comparePasswords, authenticationToken };
