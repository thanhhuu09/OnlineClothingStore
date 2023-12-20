// cart routes
const router = require("express").Router();
const cartController = require("../controllers/cartController");

// Add to cart
router.post("/:userId/cart", cartController.addToCart);
router.get("/:userId/cart", cartController.getCart);
router.put("/:userId/cart/:productId", cartController.updatedCartItem);
router.delete("/:userId/cart/:productId", cartController.deleteCartItem);
router.delete("/:userId/cart", cartController.emptyCart);

module.exports = router;
