// Auth controllers
const User = require("../models/User");
const bcrypt = require("bcrypt");

const authController = {
  // Register a new user
  register: async (req, res) => {
    try {
      // Check if user already exists
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  // Login an existing user
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      // Check if user not found
      if (!user) {
        res.status(400).json({ message: "User not found" });
      } else {
        // Check if password is correct
        const passwordMatch = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!passwordMatch) {
          res.status(400).json({ message: "Incorrect password" });
        } else {
          res.status(200).json(user);
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
