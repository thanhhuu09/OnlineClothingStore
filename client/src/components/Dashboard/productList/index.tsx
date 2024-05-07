"use client";
import productHelpers from "@/helpers/productHelpers";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductData } from "@/helpers/productHelpers";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";

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
  }, [accessToken, setProducts]);

  const allSizes = products.map((product: ProductData) => {
    return product.variants.map((variant) => {
      return variant.sizes.map((size) => {
        return size.size;
      });
    });
  });
  const distinctSizes = [...new Set(allSizes.flat(2))];
  // current page
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Product List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Hình</th>
            <th className="px-4 py-2">Tên</th>
            <th className="px-4 py-2">Danh mục</th>
            <th className="px-4 py-2">Màu sắc</th>
            <th className="px-4 py-2">Kích thước</th>
            <th className="px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- Product rows will be dynamically generated here --> */}
          {products.map((product: ProductData) => (
            <tr key={product._id}>
              <td className="px-4 py-2 border flex justify-center">
                <div className="w-20 h-20 relative">
                  <Image
                    src={product.productImages[0] + ""}
                    alt={product.name}
                    fill
                    objectFit="cover"
                  />
                </div>
              </td>
              <td className="px-4 py-2 border">{product.name}</td>
              <td className="px-4 py-2 text-center border">
                {product.category}
              </td>
              <td className="px-4 py-2 text-center border">
                {product.variants.map((variant) => (
                  <div key={variant.color}>{variant.color}</div>
                ))}
              </td>
              <td className="px-4 py-2 text-center border">
                {distinctSizes.map((size) => (
                  <div key={size}>{size}</div>
                ))}
              </td>

              <td className="px-4 py-2 text-center border">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          className="opacity-50 hover:opacity-75"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ArrowCircleLeft size={46} weight="thin" />
        </button>
        {[1, 2, 3, 4, 5].map((page) => (
          <span
            key={page}
            className={`px-4 py-2 rounded-full border cursor-pointer ${
              currentPage === page
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "text-black hover:bg-gray-200"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </span>
        ))}
        {/* <span className="bg-blue-500 text-white px-4 py-2 rounded-full border cursor-pointer hover:bg-blue-600">
          1
        </span>
        <span className="text-black px-4 py-2 rounded-full border border-gray-300 cursor-pointer hover:bg-gray-200">
          2
        </span> */}
        <button
          className="opacity-50 hover:opacity-75"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ArrowCircleRight size={46} weight="thin" />
        </button>
      </div>
    </div>
  );
}
