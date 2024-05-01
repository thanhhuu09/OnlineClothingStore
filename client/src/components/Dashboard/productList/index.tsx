"use client";
import productHelpers from "@/helpers/productHelpers";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductList() {
  const accessToken = useAppSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await productHelpers.getProducts(
        accessToken as string
      );
      setProducts(fetchedProducts.data);
    };
    getProducts();
  }, []);

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Product List</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Color</th>
              <th className="px-4 py-2">Size</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- Product rows will be dynamically generated here --> */}
            {products.map((product: any) => (
              <tr key={product._id}>
                <td className="border px-4 py-2 text-center">{product.name}</td>
                <td className="border px-4 py-2 text-center">
                  {product.category}
                </td>
                <td className="border px-4 py-2 text-center">
                  {product.color}
                </td>
                <td>
                  {product.sizes.map((size: any) => (
                    <span key={size.size}>{size.size}, </span>
                  ))}
                </td>
              </tr>
            ))}
            <tr>
              <td className="border px-4 py-2 flex justify-center items-center">
                <Image
                  width={60}
                  height={60}
                  src="/images/product.svg"
                  alt="Product"
                  className="object-cover"
                />
              </td>
              <td className="border px-4 py-2 text-center">Product 1</td>
              <td className="border px-4 py-2 text-center">$19.99</td>
              <td className="border px-4 py-2 text-center">Electronics</td>
              <td className="border px-4 py-2 text-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
