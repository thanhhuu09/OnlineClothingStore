import { Field, ErrorMessage, useFormikContext } from "formik";
import Image from "next/image";
import { Eye, ImagesSquare, X } from "@phosphor-icons/react";
import { useState } from "react";
import { Modal } from "@mui/material";

interface ImageInputProps {
  selectedImages: string[];
  setSelectedImages: (productImages: string[]) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({
  selectedImages,
  setSelectedImages,
}) => {
  const MAX_IMAGES = 6;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageSelecting, setImageSelecting] = useState<string>("");
  const { setFieldValue, values } = useFormikContext<any>();

  const createImageURLs = (files: FileList) =>
    Array.from(files).map((file) => URL.createObjectURL(file));

  // Handle when user choose image
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the files that user choose
    const { files } = event.currentTarget;

    if (files) {
      if (
        files.length > MAX_IMAGES ||
        selectedImages.length + files.length > MAX_IMAGES
      ) {
        alert(`Chỉ được chọn tối đa ${MAX_IMAGES} hình ảnh`);
      } else {
        const newImages = createImageURLs(files);
        setSelectedImages([...selectedImages, ...newImages]); // this help show the image that user choose
        setFieldValue("productImages", [...values.productImages, ...files]); // this help to send the image to the server
      }
    }
  };

  const removeImage = (imageSrc: string, file: File) => {
    // remove the image show in the screen
    const newImages = selectedImages.filter((image) => image !== imageSrc); //index is the index of the image that we want to remove
    setSelectedImages(newImages);

    // remove the image in the formik values
    const newFiles = values.productImages.filter((f: File) => f !== file);
    setFieldValue("productImages", newFiles);
  };
  const handleViewImage = (image: any) => {
    setIsModalOpen(true);
    setImageSelecting(image);
  };

  return (
    <div>
      <label
        htmlFor="productImages"
        className="text-sm font-medium text-gray-700"
      >
        Hình ảnh
      </label>
      {/* Image user choose */}
      <div className="flex flex-wrap">
        {selectedImages.map((image: any) => (
          <div key={image} className="p-2 border m-1 relative group">
            {/* Image */}
            <div className="relative w-20 h-20">
              <Image
                src={image}
                fill
                alt="image_product"
                className="object-cover"
              />
            </div>
            {/* Remove button, view image in full screen */}
            <div className="absolute w-full top-0 right-0 p-1 bg-black opacity-70 group-hover:flex justify-between hidden">
              <button
                type="button"
                onClick={() =>
                  removeImage(
                    image,
                    values.productImages[selectedImages.indexOf(image as any)] // get the file that user choose
                  )
                }
              >
                <X size={16} color="white" />
              </button>
              <button type="button" onClick={() => handleViewImage(image)}>
                <Eye size={16} color="white" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-[600px] h-[600px] relative overflow-hidden m-auto">
          <Image
            src={imageSelecting}
            layout="fill"
            alt="image modal"
            className="object-cover"
          />
        </div>
      </Modal>
      <label
        htmlFor="productImages"
        className="cursor-pointer flex flex-col items-center bg-indigo-100 text-indigo-600 px-4 py-2 rounded-md"
      >
        <ImagesSquare size={26} />
        Thêm hình ảnh {selectedImages.length}/6
      </label>
      <Field
        value={undefined}
        type="file"
        id="productImages"
        name="productImages"
        multiple
        hidden
        onChange={handleImageChange}
      />
      <ErrorMessage
        name="productImages"
        component="span"
        className="text-red-500 text-xs italic"
      />
    </div>
  );
};
export default ImageInput;
