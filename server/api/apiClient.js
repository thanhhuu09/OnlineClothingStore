const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

async function uploadImageProduct(req, res) {
  try {
    const filesPath = req.files.map((file) => file.path); // Get path of each image
    const product = {
      _id: "123456789",
    };
    // upload each image to cloudinary. Promise.all() will wait for all promises to be resolved
    const result = await Promise.all(
      filesPath.map(async (image) => {
        const result = await cloudinary.uploader.upload(image, {
          folder: "OnlineClothingStore/products", // Folder name on cloudinary
          public_id: `product-${product._id}-${Date.now()}}`, // Public ID of each image
        });
        return result.secure_url;
      })
    );
    filesPath.forEach((image) => fs.unlinkSync(image)); // Delete image from local folder
    return result; // Return array of image URLs
  } catch (error) {
    throw new Error("Image upload failed");
  }
}

module.exports = {
  uploadImageProduct,
};
