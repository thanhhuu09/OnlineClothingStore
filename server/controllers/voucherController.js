const Voucher = require("../models/Voucher");
// Voucher controller

// Create voucher - POST /api/v1/vouchers
// Access: Admin
const createVoucher = async (req, res) => {
  try {
    const { code, discountPercentage, maxUsage, expiryDate, usersId } =
      req.body;
    const voucher = new Voucher({
      code,
      discountPercentage,
      maxUsage,
      expiryDate,
      usersId,
    });
    await voucher.save();
    res
      .status(201)
      .json({ msg: "Voucher created successfully", data: voucher });
  } catch (error) {
    console.error("Error creating voucher:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get vouchers - GET /api/v1/vouchers
// Access: Admin
const getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.status(200).json({ msg: "Get vouchers successfully", data: vouchers });
  } catch (error) {
    console.error("Error getting vouchers:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get voucher by id - GET /api/v1/vouchers/:voucherId
// Access: Admin
const getVoucherById = async (req, res) => {
  try {
    const { voucherId } = req.params;
    const voucher = await Voucher.findById(voucherId);
    if (!voucher) {
      return res.status(400).json({ msg: "Voucher does not exist." });
    }
    res.status(200).json({ msg: "Get voucher successfully", data: voucher });
  } catch (error) {
    console.error("Error getting voucher:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete voucher - DELETE /api/v1/vouchers/:voucherId
// Access: Admin
const deleteVoucher = async (req, res) => {
  try {
    const { voucherId } = req.params;
    const voucher = await Voucher.findByIdAndDelete(voucherId);
    if (!voucher) {
      return res.status(400).json({ msg: "Voucher does not exist." });
    }
    res
      .status(200)
      .json({ msg: "Voucher deleted successfully", data: voucher });
  } catch (error) {
    console.error("Error deleting voucher:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update voucher - PUT /api/v1/vouchers/:voucherId
const updateVoucher = async (req, res) => {
  try {
    const { voucherId } = req.params;
    const { code, discountPercentage, maxUsage, expiryDate, usersId } =
      req.body;
    const voucher = await Voucher.findByIdAndUpdate(
      voucherId,
      { code, discountPercentage, maxUsage, expiryDate, usersId },
      { new: true }
    );
    if (!voucher) {
      return res.status(400).json({ msg: "Voucher does not exist." });
    }
    res
      .status(200)
      .json({ msg: "Voucher updated successfully", data: voucher });
  } catch (error) {
    console.error("Error updating voucher:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVoucher,
  getVouchers,
  deleteVoucher,
  updateVoucher,
  getVoucherById,
};
