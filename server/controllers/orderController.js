const Order = require("../models/Order");

const orderController = {
  // Create order - POST /api/orders
  // Permission: admin, user
  createOrder: async (req, res, next) => {
    try {
      const {
        userId,
        orderedItems,
        deliveryStatus,
        totalPrice,
        shippingAddress,
        paymentMethod,
        shippingFee,
        voucher,
        voucherDiscount,
      } = req.body;
      const { id, role } = req.user; // user id and role from token
      if (role === "user" && id !== userId) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      const order = new Order({ ...req.body });
      await order.save();
      if (paymentMethod === "VNPay") {
        // redirect to payment url
        req.orderId = order._id.toString();
        req.amount = totalPrice;
        return next();
      }
      res.status(201).json({ msg: "Order created successfully", data: order });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: error.message });
    }
  },
  // Get all orders - GET /api/orders
  // Permission: admin
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res
        .status(200)
        .json({ msg: "Get all orders successfully", data: orders });
    } catch (error) {
      console.error("Error getting all orders:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get order by id - GET /api/orders/:orderId
  // Permission: admin, user owns the order
  getOrderById: async (req, res) => {
    try {
      const { id, role } = req.user; // user id and role from token
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
      // Check if user owns the order
      if (role === "user" && id !== order.userId.toString()) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      if (!order) {
        return res.status(400).json({ msg: "Order does not exist." });
      }
      res.status(200).json({ msg: "Get order successfully", data: order });
    } catch (error) {
      console.error("Error getting order:", error);
      res.status(500).json({ error: error.message });
    }
  },
  // Get all orders of a user - GET /api/orders/users/:userId
  // Permission: admin, user owns the order
  getUserOrders: async (req, res) => {
    try {
      const { userId } = req.params;
      const { id, role } = req.user; // user id and role from token
      // Check if user owns the order
      if (role === "user" && id !== userId) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      const orders = await Order.find({ userId });
      res
        .status(200)
        .json({ msg: "Get all orders successfully", data: orders });
    } catch (error) {
      console.error("Error getting all orders:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update order - PUT /api/orders/:orderId
  // permission: admin
  updateOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { deliveryStatus, paymentStatus } = req.body;
      if (!orderId) {
        return res.status(400).json({ msg: "Order does not exist." });
      }
      const order = await Order.findByIdAndUpdate(
        { _id: orderId },
        { deliveryStatus, paymentStatus },
        { new: true }
      );
      res.status(200).json({ msg: "Order updated successfully", data: order });
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Delete order - DELETE /api/orders/:orderId
  // permission: admin, user owns the order
  deleteOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { id, role } = req.user; // user id and role from token
      const order = await Order.findById(orderId);
      if (role === "user" && id !== order.userId.toString()) {
        return res.status(403).json({ msg: "Forbidden" });
      } else {
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({ msg: "Order deleted successfully" });
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = orderController;
