// User Controller
const User = require("../models/User");
const bcrypt = require("bcrypt");
const userController = {
  // GET ALL USERS (admin only)
  getAllUsers: async (req, res) => {
    try {
      console.log("req.user", req);
      const users = await User.find();
      if (users.length === 0) {
        return res.status(404).json({ error: "Users not found" });
      }
      res.status(200).json({ msg: "Users fetched successfully", data: users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: error.message });
    }
  },
  // GET USER BY ID (admin only or user)
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ msg: "User fetched successfully", data: user });
    } catch (error) {
      console.error(`Error fetching user with ID ${req.params.id}:`, error);
      res.status(500).json({ error: error.message });
    }
  },
  // UPDATE USER (admin only or user)
  updateUser: async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { firstName, lastName, email },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res
        .status(200)
        .json({ msg: "User updated successfully", data: updatedUser });
    } catch (error) {
      console.error(`Error updating user with ID ${req.params.id}:`, error);
      res.status(500).json({ error: error.message });
    }
  },
  // DELETE USER (admin only or user)
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res
        .status(200)
        .json({ msg: "User deleted successfully", data: deletedUser });
    } catch (error) {
      console.error(`Error deleting user with ID ${req.params.id}:`, error);
      res.status(500).json({ error: error.message });
    }
  },
  // CHANGE USER PASSWORD (admin only or user)
  changePassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;

      // Get user from DB
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Compare old password with password in DB
      const isSamePassword = await bcrypt.compare(oldPassword, user.password);
      if (!isSamePassword) {
        return res.status(400).json({ error: "Incorrect password" });
      }

      // Update password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword; // Set new password
      await user.save(); // Save user in DB

      res.status(200).json({ msg: "Password updated successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = userController;
