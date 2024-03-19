"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { addProduct } from "@/services/dashboard/productService";
import { use, useEffect, useState } from "react";

type FormData = {
  [key: string]: any;
};
interface InputProps {
  name: string;
  placeholder?: string;
  type: string;
  error?: string;
  required?: boolean;
  label?: string;
  checked?: boolean;
}
const inputs: InputProps[] = [
  {
    name: "productName",
    placeholder: "Tên sản phẩm",
    type: "text",
    required: true,
  },
  {
    name: "price",
    placeholder: "Giá",
    type: "text",
    required: true,
  },
  {
    name: "quantity",
    placeholder: "Số lượng",
    type: "number",
    required: true,
  },
  {
    name: "category",
    placeholder: "Danh mục",
    type: "text",
    required: true,
  },
  {
    name: "color",
    placeholder: "Màu sắc",
    type: "text",
    required: true,
  },
  {
    name: "size",
    placeholder: "Kích thước",
    type: "text",
    required: true,
  },
  {
    name: "isFeatured",
    type: "checkbox",
    label: "Sản phẩm nổi bật",
    required: false,
    error: "",
    checked: true,
  },
  {
    name: "imagesProduct",
    placeholder: "Hình ảnh. Có thể thêm nhiều hình ảnh",
    type: "file",
    required: false,
  },
  {
    name: "description",
    placeholder: "Mô tả",
    type: "textarea",
    required: true,
  },
];
export default function AddProduct() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormData>({});
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    price: "",
    quantity: "",
    category: "",
    color: "",
    size: "",
    isFeatured: false,
    description: "",
    imagesProduct: [],
  });
  console.log(typeof formData.price);

  const handleInputChange = (e: any) => {
    const { name, value, type, placeholder, checked, files } = e.target;
    // Validate image file. Just allow to upload 5 images
    if (type === "file") {
      if (files.length > 5) {
        alert("Chỉ được thêm tối đa 5 hình ảnh");
        return;
      } else {
        // Update form data state
        setFormData({
          ...formData,
          [name]: files,
        });
      }
    } else if (name === "price") {
      // Update form data state
      const rawValue = value.replace(/\D/g, ""); // Remove all non-numeric characters: 1.000.000 => 1000000
      const formattedPrice = new Intl.NumberFormat("vi-VN").format(
        Number(rawValue)
      ); // Format number to currency
      setFormData({
        ...formData,
        [name]: formattedPrice,
      });
    } else {
      // Update form data state
      setFormData({
        ...formData,
        [name]:
          // Style number for easy to read if name = price.
          type === "checkbox" ? checked : value,
      });
    }
    // Validate the current field and update errors state when user type
    const updatedErrors = { ...errors };
    // Just field required need to be validate
    if (inputs.find((input) => input.name === name)?.required) {
      updatedErrors[name] = value ? "" : `${placeholder} không được để trống`;
    }

    setErrors(updatedErrors);
  };

  // Handle form validation field
  const validateForm = () => {
    const tempErrors: FormData = {}; // Create a temp errors object to store errors
    // Loop through all inputs and check if it is empty
    inputs.forEach((input) => {
      // Get value of current input
      const value = formData[input.name] as string;
      if (input.required && !value) {
        tempErrors[input.name] = `${input.placeholder} không được để trống`;
      }
    });
    setErrors(tempErrors);
    return tempErrors;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    // Check if all errors state is empty, if true => submit form
    const formIsValid = Object.values(errors).every((x) => x === "");
    // Then convert string to number for price, quantity
    formData.price = Number(formData.price.replace(/\D/g, ""));
    formData.quantity = Number(formData.quantity);
    if (formIsValid) {
      try {
        setIsLoading(true);
        const res = await addProduct(formData);
        if (res.data) {
          alert("Thêm sản phẩm thành công");
        } else {
          alert("Thất bại");
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {inputs.map((input) => {
        // Checkbox
        if (input.type === "checkbox") {
          return (
            <label className="flex items-center w-fit" key={input.name}>
              <input
                className="mr-2"
                type={input.type}
                name={input.name}
                id={input.name}
                onChange={handleInputChange}
              />
              {input.label}
            </label>
          );
        }
        // Textarea
        if (input.type === "textarea") {
          return (
            <div key={input.name} className="flex flex-col  ">
              <textarea
                className="bg-slate-800  rounded-md px-4 py-2 focus:ring-1 focus:ring-indigo-500 ring-inset focus:outline-none"
                placeholder={input.placeholder}
                onChange={handleInputChange}
                name={input.name}
              />
              <span className="text-xs italic text-red-500">
                {errors[input.name]}
              </span>
            </div>
          );
        }
        if (input.type === "file") {
          return (
            <div key={input.name} className="flex flex-col">
              <label
                htmlFor={input.name}
                className="text-sm text-gray-500 border-dashed border-2 border-gray-400 rounded-md px-4 py-2 cursor-pointer flex items-center justify-center flex-col"
              >
                Hình ảnh
                {/* Name image user choose */}
                <span className="text-xs italic text-gray-500 mb-2">
                  {
                    // USe Object.values to get values of object, then map through it to get name of image
                    formData.imagesProduct.length > 0
                      ? Object.values(formData.imagesProduct).map(
                          (image: any) => {
                            return image.name + " ";
                          }
                        )
                      : "Chọn hình ảnh cho sản phẩm"
                  }
                </span>
              </label>
              <input
                id={input.name}
                className="hidden"
                type={input.type}
                name={input.name}
                onChange={handleInputChange}
                multiple
              />
            </div>
          );
        }
        // Default
        return (
          <div key={input.name} className="flex flex-col">
            <input
              className={`bg-slate-800 outline-none rounded-md px-4 py-2 ring-inset focus:outline-none focus:ring-indigo-500 focus:ring-1`}
              name={input.name}
              type={input.type}
              required={input.required}
              onChange={handleInputChange}
              placeholder={input.placeholder}
              value={formData[input.name]}
            />
            <span className="text-xs italic text-red-500">
              {errors[input.name]}
            </span>
          </div>
        );
      })}

      <button
        disabled={isLoading}
        type="submit"
        className="bg-indigo-500 text-white rounded-md px-4 py-2 col-span-2 justify-self-end w-full"
      >
        {isLoading ? <LoadingSpinner text="Đang xử lý..." /> : "Thêm sản phẩm"}
      </button>
    </form>
  );
}
