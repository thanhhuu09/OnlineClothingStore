import { toast } from "react-toastify";

interface ProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  variants: [
    {
      color: string;
      sizes: [
        {
          size: string;
          price: number;
          stock: number;
          sku: string;
        }
      ];
    }
  ];
}

const productHelpers = {
  addProduct: async (productData: ProductData, accessToken: string) => {
    try {
      const response = await fetch("/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error(`Failed to add product: ${response.status}`);
      }
      const addedProductData = await response.json();
      toast.success("Thêm sản phẩm thành công!", {
        position: "bottom-right",
      });
      return addedProductData;
    } catch (error) {
      console.error("Failed to add product", error);
      toast.error("Thêm sản phẩm thất bại!", {
        position: "bottom-right",
      });
    }
  },
  getProducts: async (accessToken: string) => {
    try {
      const response = await fetch("/api/v1/products", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to get products: ${response.status}`);
      }
      const productsData = await response.json();
      return productsData;
    } catch (error) {
      console.error("Failed to get products", error);
    }
  },
};

export default productHelpers;
