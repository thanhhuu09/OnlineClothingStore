// {
//     "name": "Sample Product",
//     "description": "This is a sample product",
//     "price": 99.99,
//     "category": "Electronics",
//     "images": ["image1.jpg", "image2.jpg"],
//     "ratings": [
//       {
//         "userId": "60d6c47e4094a45b0468d7a6",
//         "rating": 5,
//         "review": "Great product!"
//       },
//       {
//         "userId": "60d6c47e4094a45b0468d7b7",
//         "rating": 4,
//         "review": "Good product"
//       }
//     ],
//     "variants": [
//       {
//         "size": "M",
//         "color": "Blue",
//         "sku": "SP1",
//         "availableQuantity": 10
//       },
//       {
//         "size": "L",
//         "color": "Red",
//         "sku": "SP2",
//         "availableQuantity": 5
//       }
//     ]
//   }

// dummy data
// const variations = [
//   {
//     color: "Trắng",
//     sizes: [
//       { size: "Small", price: 0, stock: 0, SKU: 0 },
//       { size: "Big", price: 0, stock: 0, SKU: 0 },
//     ],
//   },
//   {
//     color: "Đen",
//     sizes: [
//       { size: "Small", price: 0, stock: 0, SKU: 0 },
//       { size: "Big", price: 0, stock: 0, SKU: 0 },
//     ],
//   },
// ];
"use client";
import { Form, Formik, useFormikContext } from "formik";
import { useState } from "react";
import * as yup from "yup";
import FormInput from "./FormInput";
import ImageInput from "./ImageInput";
import VariationList from "./VariationList";

export default function AddProductForm() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const initialValues = {
    name: "",
    description: "",
    category: "",
    images: [],
    colors: "",
    sizes: "",
    variations: [],
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    setSubmitting(false);
    console.log(values);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Tên sản phẩm không được để trống"),
  });

  return (
    <div>
      {/* Thông tin cơ bản: name (tên sản phẩm), desc (mô tả), price (giá bán), category (ngành hàng), images (hình ảnh) */}
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, { setSubmitting });
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormInput type="text" name="name" label="Tên sản phẩm" />
            <FormInput type="text" name="description" label="Mô tả" />
            <FormInput type="text" name="category" label="Ngành hàng" />
            <ImageInput
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
            />
            <FormInput
              type="text"
              name="colors"
              label="Màu sắc"
              placeholder="Xanh, Đỏ, Vàng"
            />
            <FormInput
              type="text"
              name="sizes"
              label="Kích thước"
              placeholder="X, XL"
            />

            <VariationList />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
            >
              Thêm sản phẩm
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
