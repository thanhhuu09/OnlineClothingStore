const router = require("express").Router();
const orderController = require("../controllers/orderController");
const paymentRoutes = require("../paymentGateway/paymentRoutes");
const {
  verifyTokenAndAuth,
  verifyTokenAndAdminAuth,
} = require("../middleware/authenticationMiddleware");

// Create order
router.post(
  "/",
  verifyTokenAndAuth,
  orderController.createOrder,
  paymentRoutes
);

// Get all orders
router.get("/", verifyTokenAndAdminAuth, orderController.getAllOrders);

// Ger all orders of a user
router.get("/user/:userId", verifyTokenAndAuth, orderController.getUserOrders);

// Get order by id
router.get("/:orderId", verifyTokenAndAuth, orderController.getOrderById);

// Update order
router.put("/:orderId", verifyTokenAndAdminAuth, orderController.updateOrder);

// Delete order
router.delete(
  "/:orderId",
  verifyTokenAndAdminAuth,
  orderController.deleteOrder
);
module.exports = router;
