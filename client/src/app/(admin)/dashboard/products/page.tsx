// Products Page
// - Limit the number of products to 10 per page.
// - Each product has a button to edit (View) or delete the product.
// - Search for products by name.
"use client";
import Search from "@/components/Dashboard/Navbar/Search/Search";
import ProductDetailsModal from "@/components/Dashboard/Products/ProductDetailsModal";
import {
  deleteProduct,
  fetchProducts,
} from "@/services/dashboard/productService";
import Link from "next/link";
import { useEffect, useState } from "react";

// table includes the following columns: Tên, Giá, Số lượng, Trạng thái: Còn hàng, Hết hàng, Chi tiết: Xem, Xóa
export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [products, setProducts] = useState([]); // Create this to store products data per page
  const [isModalOpen, setIsModelOpen] = useState<boolean>(false);
  const handleViewProduct = () => {
    setIsModelOpen(true);
  };
  useEffect(() => {
    const fetchProductsData = async () => {
      const products = await fetchProducts(currentPage, limit);
      setProducts(products);
    };
    fetchProductsData();
  }, [currentPage, limit]);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  // Delete product
  const handleDeleteProduct = async (id: string) => {
    try {
      setIsLoading(true);
      const deleteResult = await deleteProduct(id);
      if (deleteResult) {
        const products = await fetchProducts(currentPage, limit);
        setProducts(products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-slate-800 p-4 rounded-md">
      <div className="flex justify-between mb-4">
        <Search placeholder="Tìm kiếm sản phẩm" />
        <Link
          href="products/add-product"
          className="bg-indigo-500 text-white rounded-md px-4 py-2"
        >
          Thêm sản phẩm
        </Link>
      </div>

      {/* Table section */}
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Hàng tồn</th>
            <th>Danh mục</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product.id}>
              <td className="p-4">{product.name}</td>
              <td>
                {
                  // Format number to currency VND
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)
                }
              </td>
              <td>{product.inventory}</td>
              <td>{product.category}</td>
              <td>
                <button
                  onClick={handleViewProduct}
                  className="bg-teal-700 text-teal-50 rounded-md px-4 py-2"
                >
                  Xem
                </button>
                <button
                  disabled={isLoading}
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500 text-white rounded-md px-4 py-2 ml-2"
                >
                  Xóa
                </button>
                {isModalOpen && (
                  <ProductDetailsModal
                    closeModel={setIsModelOpen}
                    productId={product._id}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-4">
        <button
          onClick={handlePrevPage}
          className="bg-teal-700 text-teal-50 rounded-md px-4 py-2"
        >
          Trang trước
        </button>
        <button
          onClick={handleNextPage}
          className="bg-teal-700 text-teal-50 rounded-md px-4 py-2"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}
