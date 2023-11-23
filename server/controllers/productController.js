// Product Controller
const Product = require("../models/Product");

const productController = {
  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({ data: { products } });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products" });
    }
  },
  // Get product by id
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(`Error fetching product with ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error fetching product" });
    }
  },
  // Create new product
  createProduct: async (req, res) => {
    try {
      const newProduct = await new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Error creating product" });
    }
  },
  // Delete product by id
  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(`Error deleting product with ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error deleting product" });
    }
  },
  // Update product by id
  updateProduct: async (req, res) => {
    try {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updateProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(`Error updating product with ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error updating product" });
    }
  },
};

module.exports = productController;
