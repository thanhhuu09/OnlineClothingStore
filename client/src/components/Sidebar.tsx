// Sidebar component
"use client";
import PriceRange from "@/components/PriceRange";
import CheckboxWithLabel from "./CheckboxWithLabel";
interface SidebarProps {
  onCategorySelect: (e: any) => void;
}

const categories = [
  { id: "male", value: "men's clothing", label: "Nam" },
  { id: "female", value: "jewelery", label: "Nữ" },
  { id: "children", value: "children", label: "Trẻ em" },
];

const brands = [
  { id: "adidas", value: "adidas", label: "Adidas" },
  { id: "nike", value: "nike", label: "Nike" },
  { id: "converse", value: "converse", label: "Converse" },
];

export default function Sidebar({ onCategorySelect }: SidebarProps) {
  return (
    <aside>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-primary-800">Danh Mục</h2>
        <ul className="my-2">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center">
              <CheckboxWithLabel
                id={category.id}
                name="category"
                value={category.value}
                label={category.label}
                onCategorySelect={onCategorySelect}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-primary-800">Thương Hiệu</h2>
        <ul className="my-2">
          {brands.map((brand) => (
            <li key={brand.id} className="flex items-center">
              <CheckboxWithLabel
                id={brand.id}
                name="category"
                value={brand.value}
                label={brand.label}
                onCategorySelect={onCategorySelect}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-primary-800">Giá</h2>
        <ul className="my-2">
          <PriceRange />
          <li className="flex items-center">
            <p className="font-medium text-lg">
              0 - 100 <span className="text-primary-700">đ</span>
            </p>
          </li>
        </ul>
      </div>
    </aside>
  );
}
