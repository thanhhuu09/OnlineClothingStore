// Product Routes
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const router = require("express").Router();
const upload = require("../middleware/multer");

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  // authenticationMiddleware.verifyTokenAndAdminAuth,
  upload.array("images", 5), // Upload multiple images - 5 images max
  createProduct
);
router.delete(
  "/:id",
  // authenticationMiddleware.verifyTokenAndAdminAuth,
  deleteProduct
);
router.put(
  "/:id",
  authenticationMiddleware.verifyTokenAndAdminAuth,
  updateProduct
);

module.exports = router;
