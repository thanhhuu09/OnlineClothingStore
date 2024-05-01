// Product page
"use client";
import { IProduct } from "@/interfaces/productInterface";
import { getProducts } from "@/api/products";
import ProductCard from "@/components/productCard";
import Sidebar from "@/components/productFilter/Sidebar";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProduct();
  }, []);

  const handleCategorySelect = (e: any) => {
    const { value } = e.target;
    // Check if the value is already in the array, remove it
    if (selectedCategory.includes(value)) {
      setSelectedCategory(selectedCategory.filter((item) => item !== value));
    } else {
      // If the value is not in the array, add it
      setSelectedCategory([...selectedCategory, value]);
    }
    console.log(selectedCategory);
  };
  return (
    <div className="grid grid-cols-4 gap-4 p-12 bg-slate-100">
      <div className="col-span-1 bg-white shadow-lg border p-9 h-fit">
        <Sidebar onCategorySelect={handleCategorySelect} />
      </div>
      <div className="col-span-3">
        <div className="grid grid-cols-3">
          {products
            .filter((product: IProduct) => {
              // If no category is selected, return all products
              if (selectedCategory.length === 0) {
                return true;
              } else {
                // If there are selected categories, return products that match the selected categories
                return selectedCategory.includes(product.category);
              }
            })
            .map((product: IProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
