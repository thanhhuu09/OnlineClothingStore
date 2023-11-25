// Product page
"use client";
import { Product } from "@/interfaces/productInterface";
import { getProducts } from "@/api/products";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
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
    <div className="grid grid-cols-4 gap-4 p-12">
      <div className="col-span-1 bg-white shadow-lg border p-9 h-fit">
        <Sidebar onCategorySelect={handleCategorySelect} />
      </div>
      <div className="col-span-3">
        <div className="flex flex-wrap gap-9">
          {products
            .filter((product: Product) => {
              // If no category is selected, return all products
              if (selectedCategory.length === 0) {
                return true;
              } else {
                // If there are selected categories, return products that match the selected categories
                return selectedCategory.includes(product.category);
              }
            })
            .map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
