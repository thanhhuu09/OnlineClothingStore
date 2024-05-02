const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Upload image to Cloudinary
const uploadImagesToCloudinary = async (imagePaths, folderName) => {
  try {
    const uploadPromises = imagePaths.map((imagePath) =>
      cloudinary.uploader.upload(imagePath, {
        folder: folderName,
      })
    );
    const imageResponses = await Promise.all(uploadPromises);
    return imageResponses.map((response) => response.secure_url);
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error);
    throw error;
  }
};

module.exports = { uploadImagesToCloudinary };
