"use client";
import { Form, Formik, useFormikContext } from "formik";
import { useState } from "react";
import * as yup from "yup";
import FormInput from "./FormInput";
import ImageInput from "./ImageInput";
import VariationList from "./VariationList";
import productHelpers from "@/helpers/productHelpers";
import { useAppSelector } from "@/redux/store";

export default function AddProductForm() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const accessToken = useAppSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  const initialValues = {
    name: "",
    description: "",
    category: "",
    productImages: [],
    colors: "",
    sizes: "",
    variations: [],
    price: "",
    stock: "",
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    // Call API to add product
    const productData: any = {
      name: values.name,
      description: values.description,
      category: values.category,
      productImages: values.productImages,
      variants: values.variations,
    };

    await productHelpers.addProduct(productData, accessToken as string);
    setSubmitting(false);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Tên sản phẩm không được để trống"),
    description: yup.string().required("Mô tả không được để trống"),
    category: yup.string().required("Ngành hàng không được để trống"),
    colors: yup.string().required("Màu sắc không được để trống"),
    sizes: yup.string().required("Kích thước không được để trống"),
    price: yup.number().required("Giá bán không được để trống"),
    stock: yup.number().required("Hàng trong kho không được để trống"),
  });

  return (
    <div>
      {/* Thông tin cơ bản: name (tên sản phẩm), desc (mô tả), price (giá bán), category (ngành hàng), productImages (hình ảnh) */}
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, { setSubmitting });
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-2 gap-4">
            <FormInput type="text" name="name" label="Tên sản phẩm" />
            <FormInput type="text" name="description" label="Mô tả" />
            <FormInput type="text" name="category" label="Ngành hàng" />
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
            <FormInput
              type="text"
              name="price"
              label="Giá bán"
              note="Giá này áp dụng cho tất cả biến thể. Có thể chỉnh sửa sau khi thêm"
            />
            <FormInput
              type="text"
              name="stock"
              label="Hàng trong kho"
              note="Số lượng này áp dụng cho tất cả biến thể. Có thể chỉnh sửa sau khi thêm"
            />
            <ImageInput
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
            />
            <div className="col-span-2">
              <VariationList />
            </div>
            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
              >
                Thêm sản phẩm
              </button>
              {/* Reset button */}
              <button
                type="reset"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded ml-2"
              >
                Xóa
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
