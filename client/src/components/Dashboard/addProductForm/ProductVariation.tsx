import { Field, ErrorMessage } from "formik";

const ProductVariationInput: React.FC = () => {
  return (
    <div>
      <label htmlFor="colors">Màu sắc</label>
      <Field
        id="colors"
        type="text"
        name="colors"
        placeholder="Xanh, Đỏ, Vàng"
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <ErrorMessage
        name="color"
        component="span"
        className="text-red-500 text-xs italic"
      />
    </div>
  );
};

export default ProductVariationInput;
