// Auth Routes
const router = require("express").Router();
const {
  register,
  login,
  logout,
  refreshToken,
} = require("../controllers/authController");
const {
  verifyTokenAndAuth,
} = require("../middleware/authenticationMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

module.exports = router;
