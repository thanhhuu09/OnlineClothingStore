// cart routes
const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyToken } = require("../middleware/authenticationMiddleware");
// Add to cart
router.post("/", verifyToken, cartController.addItemToCart);

module.exports = router;
