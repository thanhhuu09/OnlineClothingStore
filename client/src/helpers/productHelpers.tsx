import { toast } from "react-toastify";

export interface ProductData {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  productImages: File[];
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

const uploadImages = async (productImages: File[], accessToken: string) => {
  const formData = new FormData();
  productImages.forEach((image) => {
    formData.append("productImages", image);
  });
  const response = await fetch("/api/v1/upload-image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Failed to upload images: ${response.status}`);
  }
  const imageUrls = await response.json();
  return imageUrls.images;
};

const productHelpers = {
  addProduct: async (productData: ProductData, accessToken: string) => {
    const { productImages } = productData;
    try {
      const imageUrls = await uploadImages(productImages, accessToken);
      // add imageUrls to productData
      const productDataWithImageUrls = {
        ...productData,
        productImages: imageUrls,
      };
      console.log(productDataWithImageUrls);

      // call api to add product /api/v1/products
      const responseAddProduct = await fetch("/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(productDataWithImageUrls),
      });
      if (!responseAddProduct.ok) {
        throw new Error(`Failed to add product: ${responseAddProduct.status}`);
      }

      const addedProductData = await responseAddProduct.json();
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
  getProductById: async (productId: string, accessToken: string) => {
    try {
      const response = await fetch(`/api/v1/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to get product: ${response.status}`);
      }
      const productData = await response.json();

      return productData.data;
    } catch (error) {
      console.error("Failed to get product", error);
    }
  },
};

export default productHelpers;
