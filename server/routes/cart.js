// cart routes
const router = require("express").Router();
const cartController = require("../controllers/cartController");
const {
  verifyToken,
  verifyTokenAndAuth,
} = require("../middleware/authenticationMiddleware");

// Add to cart
router.post("/:userId", verifyToken, cartController.addItemToCart);
router.put(
  "/:userId/items/:itemId ",
  verifyToken,
  cartController.updateItemInCart
);
router.delete("/items/:itemId", verifyToken, cartController.deleteItemFromCart);
router.get("/:userId", verifyTokenAndAuth, cartController.getUserCart);
module.exports = router;
