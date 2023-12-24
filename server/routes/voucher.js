// Voucher routes
const router = require("express").Router();
const voucherController = require("../controllers/voucherController");
const {
  verifyTokenAndAdminAuth,
} = require("../middleware/authenticationMiddleware");

router.post("/", verifyTokenAndAdminAuth, voucherController.createVoucher); // Create voucher
router.get("/", verifyTokenAndAdminAuth, voucherController.getVouchers); // Get vouchers

// Get voucher by id
router.get(
  "/:voucherId",
  verifyTokenAndAdminAuth,
  voucherController.getVoucherById
);

// Delete voucher
router.delete(
  "/:voucherId",
  verifyTokenAndAdminAuth,
  voucherController.deleteVoucher
);
router.put(
  "/:voucherId",
  verifyTokenAndAdminAuth,
  voucherController.updateVoucher
); // Update voucher

module.exports = router;
