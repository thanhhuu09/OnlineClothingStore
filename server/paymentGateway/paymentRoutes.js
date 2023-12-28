// Payment Routes
const express = require("express");
const router = express.Router();
const paymentController = require("./paymentController");

router.post("/", paymentController.createPayment);
router.get("/vnpay_return", paymentController.verifyPayment);
// router.get("/vnpay_ipn", paymentController.verifyPayment);
module.exports = router;
