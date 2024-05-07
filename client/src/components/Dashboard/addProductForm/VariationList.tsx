import { Field, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
interface VariationListProps {
  colors: string[];
  sizes: string[];
}
const VariationList: React.FC<VariationListProps> = ({ colors, sizes }) => {
  const { values, handleChange } = useFormikContext<any>();
  const [showVariationList, setShowVariationList] = useState<boolean>(false);

  // useEffect to update variations when colors or sizes change
  useEffect(() => {
    // If both colors and sizes are not empty, show the variation list
    if (values.colors.length > 0 && values.sizes.length > 0) {
      setShowVariationList(true);
    } else {
      setShowVariationList(false);
    }
    // Split colors and sizes string into arrays
    const colors = values.colors.split(",");
    const sizes = values.sizes.split(",");
    // Create new variations array based on colors and sizes. This will be the initial value of variations
    // EX: colors = ["Trắng", "Đen"], sizes = ["Small", "Big"] will result in:
    // [ { color: "Trắng", sizes: [ { size: "Small", price: "", stock: "", SKU: "" }, { size: "Big", price: "", stock: "", SKU: "" } ] },
    const newVariations = colors.map((color: string) => ({
      color,
      sizes: sizes.map((size: string) => ({
        size,
        price: values.price,
        stock: values.stock,
        SKU: "",
      })),
    }));

    // Update variations in formik values
    handleChange({ target: { name: "variations", value: newVariations } });
  }, [values.colors, values.sizes, values.price, values.stock, handleChange]);

  // Function to handle change in price, stock, and SKU fields
  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    subIndex: number,
    fieldName: string
  ) => {
    const { value } = event.target;

    // Create a deep copy of current variations
    const newVariations = [...values.variations];

    // Update the corresponding field in the variations state
    newVariations[index].sizes[subIndex][fieldName] = value;

    // Update variations in formik values
    handleChange({ target: { name: "variations", value: newVariations } });
  };
  return (
    showVariationList && (
      <table className="bg-white shadow-sm rounded-lg w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 border font-normal">Màu sắc</th>
            <th className="p-4 border font-normal">Kích cỡ</th>
            <th className="p-4 border font-normal">Giá</th>
            <th className="p-4 border font-normal">Hàng trong kho</th>
            <th className="p-4 border font-normal">SKU</th>
          </tr>
        </thead>
        <tbody>
          {/*
        Use nested map because variations is an array of objects, 
        and each object (variation) has a property sizes which is also an array
         */}
          {values.variations.map((variation: any, index: number) =>
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
                  <Field
                    type="number"
                    name={`variations[${index}].sizes[${subIndex}].price`}
                    className="bg-gray-100 px-2 py-1 rounded focus:outline-none focus:ring-2 w-full"
                    placeholder="Nhập vào"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleFieldChange(event, index, subIndex, "price")
                    }
                  />
                </td>
                <td className="px-4 py-2 border">
                  <Field
                    type="number"
                    name={`variations[${index}].sizes[${subIndex}].stock`}
                    className="bg-gray-100 px-2 py-1 rounded focus:outline-none focus:ring-2 w-full"
                    placeholder="0"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleFieldChange(event, index, subIndex, "stock")
                    }
                  />
                </td>
                <td className="px-4 py-2 border">
                  <Field
                    type="text"
                    name={`variations[${index}].sizes[${subIndex}].SKU`}
                    className="bg-gray-100 px-2 py-1 rounded focus:outline-none focus:ring-2 w-full"
                    placeholder="Nhập vào"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleFieldChange(event, index, subIndex, "SKU")
                    }
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    )
  );
};
export default VariationList;
