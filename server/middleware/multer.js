const multer = require("multer");
const path = require("path");
const dirPath = path.join(__dirname, "../uploads");
const fs = require("fs");

// if the directory doesn't exist, create it
fs.mkdirSync(dirPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dirPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
