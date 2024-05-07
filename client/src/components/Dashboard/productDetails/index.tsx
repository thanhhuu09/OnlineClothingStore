// Product Details Page
import { UpdateProductRequest } from "@/interfaces/requests/ApiRequest";
import { Form, Formik } from "formik";
import FormInput from "../addProductForm/FormInput";
import VariationList from "../addProductForm/VariationList";

// Product Details Component
const ProductDetails = ({ product }: { product: UpdateProductRequest }) => {
  const allColors = product.variants.map((variant) => variant.color);
  const allSizes = product.variants.map((variant) =>
    variant.sizes.map((size) => size.size)
  );
  const colors = [...new Set(allColors)];
  const sizes = [...new Set(allSizes.flat())];
  const initialValues = {
    name: product.name,
    description: product.description,
    category: product.category,
    sizes: sizes,
    variations: product.variants,
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={
          // Update product
          async (values, { setSubmitting }) => {
            setSubmitting(true);
            // Call API to update product
            // const productData: any = {
            //   name: values.name,
            //   description: values.description,
            //   category: values.category,
            //   productImages: values.productImages,
            //   variants: values.variations,
            // };
            // await productHelpers.updateProduct(productData, accessToken as string);
            setSubmitting(false);
          }
        }
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-2 gap-4">
            <FormInput type="text" name="name" label="Tên sản phẩm" />
            <FormInput type="text" name="description" label="Mô tả" />
            <FormInput type="text" name="category" label="Ngành hàng" />
            <FormInput type="text" name="sizes" label="Kích thước" />
            <VariationList colors={colors} sizes={sizes} />
            {/* Product variations */}
            <div className="col-span-2">
              <table className="bg-white shadow-sm rounded-lg w-full table-auto">
                <thead>
                  <tr>
                    <th className="p-4 border font-normal">Màu sắc</th>
                    <th className="p-4 border font-normal">Kích cỡ</th>
                    <th className="p-4 border font-normal">Giá</th>
                    <th className="p-4 border font-normal">Số lượng</th>
                    <th className="p-4 border font-normal">SKU</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {/* Show product data */}
                  {
                    // Use nested map because variations is an array of objects,
                    // and each object (variation) has a property sizes which is also an array
                    product.variants.map((variation: any, index: number) =>
                      variation.sizes.map((size: any, subIndex: number) => (
                        <tr key={`${index}-${subIndex}`}>
                          {subIndex === 0 && (
                            <td
                              className="px-4 py-2 border"
                              rowSpan={variation.sizes.length}
                            >
                              {variation.color}
                            </td>
                          )}
                          <td className="px-4 py-2 border">{size.size}</td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              type="number"
                              name={`variations[${index}].sizes[${subIndex}].price`}
                              placeholder="Nhập vào"
                              label={""}
                            />
                          </td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              type="number"
                              name={`variations[${index}].sizes[${subIndex}].stock`}
                              placeholder="0"
                              label={""}
                            />
                          </td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              type="text"
                              name={`variations[${index}].sizes[${subIndex}].SKU`}
                              label={""}
                            />
                          </td>
                        </tr>
                      ))
                    )
                  }
                </tbody>
              </table>
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
};

export default ProductDetails;
