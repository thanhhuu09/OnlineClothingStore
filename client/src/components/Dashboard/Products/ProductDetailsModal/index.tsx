import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductDetailsModalProps {
  productId: string;
  closeModel: (isOpen: boolean) => void;
}
export default function ProductDetailsModal({
  productId,
  closeModel,
}: ProductDetailsModalProps) {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    quantity: 0,
    category: "",
    colors: [""],
    sizes: [
      {
        size: "",
        quantity: 0,
        color: "",
      },
    ],
    isFeatured: false,
    images: [
      {
        color: "",
        urls: [""],
      },
    ],
  });
  console.log(product);

  // Fetch product by id
  useEffect(() => {
    const fetchProductById = async () => {
      const res = await fetch(`/api/v1/products/${productId}`);
      const product = await res.json();
      setProduct(product.data);
    };
    fetchProductById();
  }, [productId]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="dark:bg-slate-700 p-4 rounded-md w-2/4">
        <h2 className="text-2xl font-semibold mb-4">Chi tiết sản phẩm</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Tên</label>
            <input
              id="name"
              type="text"
              className=" bg-slate-800 rounded-md px-4 py-2 focus:ring-1 focus:ring-indigo-500 ring-inset focus:outline-none"
              value={product.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="price">Giá</label>
            <input
              id="price"
              type="number"
              className="bg-slate-800 rounded-md px-4 py-2 focus:ring-1 focus:ring-indigo-500 ring-inset focus:outline-none"
              value={product.price}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="quantity">Số lượng</label>
            <input
              id="quantity"
              type="number"
              className="bg-slate-800 rounded-md px-4 py-2 focus:ring-1 focus:ring-indigo-500 ring-inset focus:outline-none"
              value={product.quantity}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category">Danh mục</label>
            <input
              id="category"
              type="text"
              className="bg-slate-800  rounded-md px-4 py-2 focus:ring-1 focus:ring-indigo-500 ring-inset focus:outline-none"
              value={product.category}
            />
          </div>
          {/* Color */}
          <div className="flex flex-col gap-2">
            {/* Option */}
            <label htmlFor="color">Màu sắc</label>
            <select
              id="color"
              onChange={handleColorChange}
              className="bg-slate-800 rounded-md px-4 py-2 focus:ring-1 focus:ring-indigo-500 ring-inset focus:outline-none"
            >
              {product.colors.map((color) => (
                <option key={color} className="bg-slate-800">
                  {color}
                </option>
              ))}
            </select>
          </div>
          {/* Sizes */}
          <div className="flex flex-col gap-2">
            {/* Badge: Size (quantity) */}
            <label htmlFor="size">Kích cỡ</label>
            <div className="flex gap-2">
              {product.sizes.map((item) => (
                <span
                  key={item.size}
                  className="bg-indigo-500 px-2 py-1 rounded-md text-white text-sm font-semibold"
                >
                  {item.size} ({item.quantity})
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              className="bg-slate-800  rounded-md px-4 py-2 focus:ring-1 focus:ring-indigo-500 ring-inset focus:outline-none"
              value={product.description}
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <label htmlFor="images">Hình ảnh</label>
            <div className="flex gap-2">
              {product.images.map((image: any) => (
                <Image
                  width={200}
                  height={200}
                  key={image}
                  src={image.urls[0]}
                  alt="product"
                  className="w-20 h-20 object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// {"_id":{"$oid":"65a5ebed528e3995baf766ed"},"name":"Em","description":"ok","price":{"$numberInt":"10"},"colors":["Đen"],"images":[{"color":"Đen","urls":[],"_id":{"$oid":"65a5ebed528e3995baf766ee"}}],"rating":{"rate":{"$numberInt":"0"},"count":{"$numberInt":"0"}},"inventory":{"$numberInt":"2"},"sizes":[{"size":"M","quantity":{"$numberInt":"2"},"_id":{"$oid":"65a5ebed528e3995baf766ef"}}],"isFeatured":false,"category":"Male","__v":{"$numberInt":"0"}}
