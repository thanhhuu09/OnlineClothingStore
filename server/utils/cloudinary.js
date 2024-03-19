// Cloudinary configuration
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dkzwpqr8q",
  api_key: "465476794531459",
  api_secret: "8MQuYB88TBZdqGGycPEOWW2R4MA",
});

module.exports = cloudinary;
