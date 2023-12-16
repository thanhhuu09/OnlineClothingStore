const router = require("express").Router();
const authenticationToken = require("../middleware/authenticationMiddleware");
const {
  getAllUsers,
  changePassword,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put(
  "/:id/password",
  authenticationToken.comparePasswords,
  changePassword
);

module.exports = router;
