const Category = require("../models/Category");

const categoryController = {
  // GET ALL CATEGORIES
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // CREATE A CATEGORY
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category) {
        return res.status(400).json({ msg: "This category already exists" });
      }
      const newCategory = new Category({ name });
      await newCategory.save();
      res.json({ msg: "Created a category", data: newCategory });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // DELETE A CATEGORY
  deleteCategory: async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        return res.status(404).json({ msg: "Category not found" });
      }
      res.json({ msg: "Deleted a category", data: deletedCategory });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // UPDATE A CATEGORY
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const updatedCategory = await Category.findByIdAndUpdate(
        { _id: req.params.id },
        { name },
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ msg: "Category not found" });
      }
      res.json({ msg: "Updated a category", data: updatedCategory });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // GET A CATEGORY BY ID
  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ msg: "Category not found" });
      }
      res.json({ msg: "Fetched a category", data: category });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = categoryController;
