// Sidebar component
"use client";
import PriceRange from "@/components/product-filter/PriceRange";
import { useState } from "react";

interface SidebarProps {
  onCategorySelect: (e: any) => void;
}

export default function Sidebar({ onCategorySelect }: SidebarProps) {
  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  const brands = ["Adidas", "Nike", "Converse"];

  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const handlePriceRange = (e: number[]) => {
    setPriceRange(e);
  };

  return (
    <aside>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-primary-800">Danh Mục</h2>
        <ul className="my-2">
          {categories.map((category) => (
            <li key={category} className="flex items-center">
              <input
                className="mr-3 w-4 h-4 accent-primary-600"
                type="checkbox"
                name={category}
                id={category}
                value={category}
                onChange={(e) => onCategorySelect(e)}
              />
              <label htmlFor={category}>{category}</label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-primary-800">Thương Hiệu</h2>
        <ul className="my-2">
          {brands.map((brand) => (
            <li key={brand} className="flex items-center">
              <input
                className="mr-3 w-4 h-4 accent-primary-600"
                type="checkbox"
                name={brand}
                id={brand}
                value={brand}
                onChange={(e) => onCategorySelect(e)}
              />
              <label htmlFor={brand}>{brand}</label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-primary-800">Giá</h2>
        <ul className="my-2">
          <PriceRange priceRange={handlePriceRange} />
          <li className="flex items-center">
            <p className="font-medium text-lg">
              {priceRange[0]} - {priceRange[1]}{" "}
              <span className="text-primary-700">đ</span>
            </p>
          </li>
        </ul>
      </div>
    </aside>
  );
}
