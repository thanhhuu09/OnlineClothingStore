const router = require("express").Router();
const upload = require("../middleware/multer");
const { uploadImagesProduct } = require("../controllers/imageController");

router.post("/", upload.array("productImages", 6), uploadImagesProduct);

module.exports = router;
