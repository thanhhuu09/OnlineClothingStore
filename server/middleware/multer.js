// Multer middleware
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const dirPath = path.join(__dirname, "../public/images/products"); // Path to save image: server/public/images/products
fs.mkdirSync(dirPath, { recursive: true }); // Create folder if not exist

const storage = multer.diskStorage({
  // Set destination folder
  destination: (req, file, cb) => {
    cb(null, dirPath);
  },
  // Set filename on destination folder
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
