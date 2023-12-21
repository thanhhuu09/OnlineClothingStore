// cart routes
const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyToken } = require("../middleware/authenticationMiddleware");
// Add to cart
router.post("/", verifyToken, cartController.addItemToCart);
router.put("/items/:itemId", verifyToken, cartController.updateItemInCart);
router.delete("/items/:itemId", verifyToken, cartController.deleteItemFromCart);
module.exports = router;
