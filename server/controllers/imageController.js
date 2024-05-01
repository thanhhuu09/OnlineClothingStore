const { uploadImagesToCloudinary } = require("../services/cloudinaryService");
const fs = require("fs");

const imageController = {
  uploadImagesProduct: async (req, res) => {
    try {
      const files = req.files.map((file) => file.path);
      const uploadedImages = await uploadImagesToCloudinary(
        files,
        "OnlineClothingStore/products/"
      );
      // Delete the images from the server, we don't need them anymore
      files.forEach((file) => fs.unlinkSync(file));
      return res.status(200).json({ images: uploadedImages });
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = imageController;
