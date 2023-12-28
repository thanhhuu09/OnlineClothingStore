const Order = require("../models/Order");
const config = require("config");
const moment = require("moment/moment");
const qs = require("qs");
const crypto = require("crypto");
const PaymentService = require("./paymentService");

// Payment Controller
const paymentController = {
  createPayment: async (req, res, next) => {
    try {
      process.env.TZ = "Asia/Ho_Chi_Minh";
      let vnpUrl = config.get("vnp_Url"); // URL cua VNPAY
      const date = new Date();
      const createDate = moment(date).format("YYYYMMDDHHmmss");
      const ipAddr =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      let queryParams = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: config.get("vnp_TmnCode"),
        vnp_Amount: req.amount * 100,
        vnp_CurrCode: "VND",
        vnp_CreateDate: createDate,
        vnp_CurrCode: "VND",
        vnp_IpAddr: ipAddr,
        vnp_Locale: "vn",
        vnp_OrderInfo: "Thanh toan don hang: " + req.orderId,
        vnp_OrderType: "other",
        vnp_ReturnUrl: config.get("vnp_ReturnUrl"),
        vnp_ExpireDate: moment(date)
          .add(10, "minutes")
          .format("YYYYMMDDHHmmss"),
        vnp_TxnRef: req.orderId,
      };

      queryParams = PaymentService.sortObject(queryParams);
      const signData = qs.stringify(queryParams, { encode: false }); // Encode false to prevent encoding special characters
      const secretKey = config.get("vnp_HashSecret"); // secretKey from config
      const hmac = crypto.createHmac("sha512", secretKey); // Create a HMAC SHA512 hash using the secret key
      const signed = hmac
        .update(new Buffer.from(signData, "utf-8"))
        .digest("hex");
      queryParams.vnp_SecureHash = signed;
      vnpUrl += "?" + qs.stringify(queryParams, { encode: false });
      res
        .status(200)
        .json({ msg: "Create payment url successfully", data: vnpUrl });
    } catch (error) {
      console.error("Error creating payment:", error);
      res.status(500).json({ error: error.message });
    }
  },
  verifyPayment: async (req, res) => {
    try {
      let vnp_Params = req.query; // Get all the params sent by VNPAY
      const secureHash = vnp_Params.vnp_SecureHash; // Get secure hash from VNPAY

      // Remove hash params from vnp_Params to validate all other params
      delete vnp_Params.vnp_SecureHash;
      delete vnp_Params.vnp_SecureHashType;

      vnp_Params = PaymentService.sortObject(vnp_Params);
      const secretKey = config.get("vnp_HashSecret"); // secretKey from config
      const signData = qs.stringify(vnp_Params, { encode: false });

      // Create a HMAC SHA512 hash using the secret key to compare with the signature from VNPAY
      const hmac = crypto.createHmac("sha512", secretKey);
      const signed = hmac
        .update(new Buffer.from(signData, "utf-8"))
        .digest("hex");

      if (secureHash === signed) {
        const orderId = vnp_Params.vnp_TxnRef;
        const rspCode = vnp_Params.vnp_ResponseCode;
        const order = await Order.findById(orderId);
        if (!order) {
          return res.status(400).json({ msg: "Order does not exist." });
        }
        const totalPrice = order.totalPrice;
        if (totalPrice !== vnp_Params.vnp_Amount / 100) {
          return res.status(400).json({ msg: "Invalid amount" });
        }
        if (rspCode === "00") {
          order.paymentStatus = "Completed";
        } else {
          order.paymentStatus = "Failed";
        }
        await order.save();
        res
          .status(200)
          .json({ code: vnp_Params.vnp_ResponseCode, msg: "Success" });
      } else {
        res.status(400).json({ code: "97", msg: "Fail" });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = paymentController;
