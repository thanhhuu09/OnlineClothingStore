// Auth controllers
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  // REGISTER A NEW USER
  register: async (req, res) => {
    try {
      // Check if user already exists
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });

      const user = await newUser.save();
      res.status(200).json({ msg: "User created successfully", data: user });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: error.message });
    }
  },
  // LOGIN A USER
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      // Check if password is correct
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordMatch) {
        return res.status(400).json({ error: "Incorrect password" });
      }

      // Create jwt token
      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).json({ user, accessToken });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;
