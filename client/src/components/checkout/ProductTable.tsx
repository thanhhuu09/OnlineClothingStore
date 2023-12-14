import { CaretDown, CaretUp, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useStateContext } from "@/contexts/cartContext";

export default function ProductTable() {
  const { quantity, decrementQuantity, incrementQuantity } = useStateContext();
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
          {/* Product details */}
          <tr>
            <td className="flex items-center gap-3 py-2 px-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/one.jpg"
                  fill
                  alt="product"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div>
                <p className="text-base font-medium mb-1">Quần jean nam</p>
                <p className="text-sm text-primary-600 mb-1">Màu: Đen</p>
                <p className="text-sm text-primary-600">Size: M</p>
              </div>
            </td>
            <td className="text-left py-2 px-4">100.000 VNĐ</td>
            <td className="text-left py-2 px-4">
              {/* Quantity section */}
              <div className="flex items-center border rounded w-fit">
                <input
                  className="text-center w-14 focus:outline-none"
                  type="number"
                  min={1}
                  defaultValue={quantity}
                />
                <div className="flex flex-col">
                  <button
                    className="hover:bg-primary-200 active:bg-primary-300"
                    onClick={incrementQuantity}
                  >
                    <CaretUp size={12} />
                  </button>
                  <button
                    className="hover:bg-primary-200 active:bg-primary-300"
                    onClick={decrementQuantity}
                  >
                    <CaretDown size={12} />
                  </button>
                </div>
              </div>
            </td>
            <td className="text-left py-2 px-4">100.000 VNĐ</td>
            <td className="text-left py-2 px-4">
              {/* Remove product button */}
              <button className="hover:bg-primary-200 active:bg-primary-300 rounded">
                <X size={24} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
