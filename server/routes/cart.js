// cart routes
const router = require("express").Router();
const cartController = require("../controllers/cartController");
const {
  verifyTokenAndAuth,
} = require("../middleware/authenticationMiddleware");

router.post("/", verifyTokenAndAuth, cartController.addItemToCart); // Add item to cart
// Update item in cart
router.put(
  "/:userId/items/:itemId",
  verifyTokenAndAuth,
  cartController.updateItemInCart
);

// Delete item from cart
router.delete(
  "/:userId/items/:itemId",
  verifyTokenAndAuth,
  cartController.deleteItemFromCart
);

// Checkout cart
router.post("/checkout", verifyTokenAndAuth, cartController.checkout);

// Get user cart
router.get("/:userId", verifyTokenAndAuth, cartController.getUserCart);
module.exports = router;
