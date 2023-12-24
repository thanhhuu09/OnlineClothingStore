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
router.get(
  "/:userId",
  authenticationMiddleware.verifyTokenAndAuth,
  getUserById
);

// Update user (admin only or user)
router.put("/:userId", authenticationMiddleware.verifyTokenAndAuth, updateUser);

// Delete user (admin only or user)
router.delete(
  "/:userId",
  authenticationMiddleware.verifyTokenAndAuth,
  deleteUser
);

// Change password (admin only or user)
router.put(
  "/:userId/password",
  authenticationMiddleware.verifyTokenAndAuth,
  changePassword
);

module.exports = router;
