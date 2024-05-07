// Product Controller
const Product = require("../models/Product");

const productController = {
  // GET ALL PRODUCTS
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      // Pagination
      const page = parseInt(req.query.page) || 1; // Default page 1 if not provided
      const limit = parseInt(req.query.limit) || 10; // Default limit 10 if not provided
      // Calculate total pages
      const totalProducts = products.length;
      const totalPages = Math.ceil(totalProducts / limit);
      // Calculate start and end index to slice products array
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      // Slice products array to return products for the requested page
      const productPage = products.slice(startIndex, endIndex);
      // Pagination result
      const pagination = { page, totalPages, totalProducts, limit };
      res.status(200).json({
        msg: "Products fetched successfully",
        data: productPage,
        pagination,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ msg: "Error fetching products" });
    }
  },
  // GET PRODUCT BY ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res
        .status(200)
        .json({ msg: "Product fetched successfully", data: product });
    } catch (error) {
      console.error(`Error fetching product with ID ${req.params.id}:`, error);
      res.status(500).json({ msg: "Error fetching product" });
    }
  },
  // CREATE A PRODUCT
  createProduct: async (req, res) => {
    try {
      const newProduct = await new Product(req.body);
      await newProduct.save();
      res
        .status(201)
        .json({ msg: "Product created successfully", data: newProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ msg: "Error creating product" });
    }
  },
  // DELETE A PRODUCT
  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);

      if (!deletedProduct) {
        return res.status(404).json({ msg: "Product not found" });
      }

      res.status(200).json({
        msg: "Product deleted successfully",
        data: deletedProduct,
      });
    } catch (error) {
      console.error(`Error deleting product with ID ${req.params.id}:`, error);
      res.status(500).json({ msg: "Error deleting product" });
    }
  },
  // UPDATE A PRODUCT
  updateProduct: async (req, res) => {
    try {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updateProduct) {
        return res.status(404).json({ msg: "Product not found" });
      }

      res
        .status(200)
        .json({ msg: "Product updated successfully", data: updateProduct });
    } catch (error) {
      console.error(`Error updating product with ID ${req.params.id}:`, error);
      res.status(500).json({ msg: "Error updating product" });
    }
  },
};

module.exports = productController;
