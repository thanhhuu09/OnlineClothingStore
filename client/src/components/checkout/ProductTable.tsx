import cartSlice, {
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from "@/redux/features/cartSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { CaretDown, CaretUp, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ProductTable() {
  const { cartItems, quantity } = useAppSelector((state) => state.cart);

  const dispatch = useDispatch<AppDispatch>();
  const handleDecreaseQuantity = (itemId: number) => {
    dispatch(decreaseQuantity(itemId));
  };
  const handleIncreaseQuantity = (itemId: number) => {
    dispatch(increaseQuantity(itemId));
  };
  const handleRemoveItem = (itemId: number) => {
    dispatch(deleteFromCart(itemId));
  };
  return (
    <div className="col-span-2">
      <table className="table-auto border min-w-full bg-white shadow-md">
        <thead>
          <tr className="bg-primary-100 ">
            <th className="text-left py-2 px-4 uppercase">Sản phẩm</th>
            <th className="text-left py-2 px-4 uppercase">Đơn giá</th>
            <th className="text-left py-2 px-4 uppercase">Số lượng</th>
            <th className="text-left py-2 px-4 uppercase">Thành tiền</th>
            <th className="text-left py-2 px-4 uppercase">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td className="flex items-center gap-3 py-2 px-4">
                <div className="relative w-10 h-10">
                  <Image
                    src={item.image}
                    fill
                    alt="product"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div>
                  <p className="text-base font-medium mb-1">{item.title}</p>
                  <p className="text-sm text-primary-600 mb-1">
                    Màu: {item.color}
                  </p>
                  <p className="text-sm text-primary-600">Size: {item.size}</p>
                </div>
              </td>
              <td className="text-left py-2 px-4">{item.price} VNĐ</td>
              <td className="text-left py-2 px-4">
                {/* Quantity section */}
                <div className="flex items-center border rounded w-fit">
                  <input
                    className="text-center w-14 focus:outline-none"
                    type="number"
                    readOnly
                    min={1}
                    max={10}
                    value={item.quantity}
                  />
                  <div className="flex flex-col">
                    <button
                      className="hover:bg-primary-200 active:bg-primary-300"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      <CaretUp size={12} />
                    </button>
                    <button
                      className="hover:bg-primary-200 active:bg-primary-300"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <CaretDown size={12} />
                    </button>
                  </div>
                </div>
              </td>
              <td className="text-left py-2 px-4">
                {Math.round(item.price * item.quantity)} VNĐ
              </td>
              <td className="text-left py-2 px-4">
                {/* Remove product button */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="hover:bg-primary-200 active:bg-primary-300 rounded"
                >
                  <X size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
