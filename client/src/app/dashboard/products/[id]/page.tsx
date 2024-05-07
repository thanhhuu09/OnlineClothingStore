"use client";

import ProductDetails from "@/components/dashboard/productDetails";
import productHelpers from "@/helpers/productHelpers";
import { useAppSelector } from "@/redux/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Product details
export default function Page() {
  const { id } = useParams<any>();
  const accessToken = useAppSelector<any>(
    (state) => state.auth.login.currentUser?.accessToken
  );
  // Fetch product details
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await productHelpers.getProductById(id, accessToken);
      setProduct(productData);
      setLoading(false);
    };
    fetchProduct();
  }, []);
  console.log(product);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold">Product Details</h1>
      <ProductDetails product={product} />
    </div>
  );
}
