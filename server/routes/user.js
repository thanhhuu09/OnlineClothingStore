const router = require("express").Router();
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const {
  getAllUsers,
  changePassword,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userController");

// Get all users (admin only)
router.get("/", authenticationMiddleware.verifyTokenAndAdminAuth, getAllUsers);

// Get user by ID (admin only or user)
router.get("/:id", authenticationMiddleware.verifyTokenAndAuth, getUserById);

// Update user (admin only or user)
router.put("/:id", authenticationMiddleware.verifyTokenAndAuth, updateUser);

// Delete user (admin only or user)
router.delete("/:id", authenticationMiddleware.verifyTokenAndAuth, deleteUser);

// Change password (admin only or user)
router.put(
  "/:id/password",
  authenticationMiddleware.verifyTokenAndAuth,
  changePassword
);

module.exports = router;
