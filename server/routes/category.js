// Category Routes
const router = require("express").Router();
const {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
} = require("../controllers/categoryController");

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

module.exports = router;
