// Product Controller
const Product = require("../models/Product");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        status: "success",
        data: { products },
        message: "Successfully get all products",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: {
          message: error.message,
        },
      });
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  createProduct: async (req, res) => {
    try {
      const newProduct = await new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateProduct: async (req, res) => {
    try {
      // HTTP PATCH method
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updateProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = productController;
