// Product Controller
const Product = require("../models/Product");
const { uploadImageProduct } = require("../api/apiClient");
const { cloudinary } = require("../utils/cloudinary");
const productController = {
  // GET ALL PRODUCTS
  getAllProducts: async (req, res) => {
    try {
      let products = await Product.find();
      // Pagination
      const page = parseInt(req.query.page) || 1; // current page
      const limit = parseInt(req.query.limit) || 10; // limit number of products per page
      const startIndex = (page - 1) * limit; // use to determine where to start rendering data
      const endIndex = page * limit; // use to determine where to stop rendering data
      const total = await Product.countDocuments();
      const pagination = {
        totalRecords: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        prev: null,
        next: null,
      };
      // if endIndex is less than total, there is a next page
      if (endIndex < total) {
        pagination.next = {
          page: page + 1,
          limit: limit,
        };
      }
      // if startIndex is greater than 0, there is a previous page
      if (startIndex > 0) {
        pagination.prev = {
          page: page - 1,
          limit: limit,
        };
      }
      // slice products array to render only products for the current page
      products = products.slice(startIndex, endIndex);
      console.log("products:", products.length);
      res.status(200).json({
        msg: "Products fetched successfully",
        data: products,
        pagination: pagination,
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
      // find product by color
      const color = req.query.color;
      if (color) {
        const foundColorSize = product.sizes.filter(
          (item) => item.color === color
        );
        product.sizes = foundColorSize;
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
      const {
        name,
        description,
        price,
        color,
        size,
        quantity,
        isFeatured,
        category,
      } = JSON.parse(req.body.data); // Get data from form-data
      // Get images from form-data
      let images = [];
      if (req.files) {
        try {
          const imageURL = await uploadImageProduct(req, res);
          images = imageURL;
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      }
      const foundProduct = await Product.findOne({ name });

      // Check if product already exists
      if (!foundProduct) {
        const newProduct = await Product.create({
          name,
          description,
          price,
          colors: [color],
          images: [{ color: color, urls: images }],
          sizes: [{ size: size, quantity: quantity, color: color }],
          inventory: quantity,
          isFeatured,
          category,
        });
        return res
          .status(201)
          .json({ msg: "Product created successfully", data: newProduct });
      } else {
        // If product name exists, check if same color and size exist
        const foundColor = foundProduct.colors.find((item) => item === color);
        const foundSize = foundProduct.sizes.find((item) => item.size === size);
        // If same color and size exist in the database, update quantity and inventory
        if (foundColor && foundSize) {
          // But first, check if user have uploaded new images
          if (images) {
            // If images exist, add them to the existing images array corresponding to the color
            const foundColorImages = foundProduct.images.find(
              (item) => item.color === color
            );
            foundColorImages.urls.push(...images);
          }
          // Find color exist in sizes array, if it exists, update quantity and inventory of that color
          const foundColorSize = foundProduct.sizes.find(
            (item) => item.color === color
          );
          if (foundColorSize) {
            foundColorSize.quantity += quantity;
            foundProduct.inventory += quantity;
          } else {
            foundSize.quantity += quantity;
            foundProduct.inventory += quantity;
          }
        } else {
          // IF user have uploaded new images
          if (images) {
            // If color already exists, add new images to the existing images array
            if (foundColor) {
              const foundColorImages = foundProduct.images.find(
                (item) => item.color === color
              );
              foundColorImages.urls.push(...images);
            } else {
              // If color does not exist, create new color and add new images to the new color
              foundProduct.colors.push(color);
              foundProduct.images.push({ color: color, urls: images });
            }
          }
          // Check existing colors and sizes
          foundProduct.sizes.push({
            size: size,
            quantity: quantity,
            color: color,
          });
          foundProduct.inventory += quantity;
        }
        // Save updated product
        await foundProduct.save();
        return res
          .status(201)
          .json({ msg: "Product created successfully", data: foundProduct });
      }
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

const product = {
  name: "Sample Products",
  price: 29.99,
  colors: ["Red", "Blue", "Green"],
  images: [
    {
      color: "Xanh Navy",
      urls: [
        "https://cdn.ssstutter.com/products/66z6ao28eNQDG839/122023/1703579512058.jpeg",
        "https://cdn.ssstutter.com/products/66z6ao28eNQDG839/122023/1703579512013.jpeg",
      ],
    },
    {
      color: "Be",
      urls: [
        "https://cdn.ssstutter.com/products/66z6ao28eNQDG839/122023/1703579522170.jpeg",
        "https://cdn.ssstutter.com/products/66z6ao28eNQDG839/122023/1703579522048.jpeg",
      ],
    },
  ],
  rating: 4.5,
  inventory: 100,
  sizes: [
    {
      size: "S",
      quantity: 10,
    },
    {
      size: "M",
      quantity: 10,
    },
    {
      size: "L",
      quantity: 10,
    },
    {
      size: "XL",
      quantity: 10,
    },
    {
      size: "XXL",
      quantity: 10,
    },
    {
      size: "XXXL",
      quantity: 10,
    },
  ],
  isFeatured: true,
  category: "Female",
};
