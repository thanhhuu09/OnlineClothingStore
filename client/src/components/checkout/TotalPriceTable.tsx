import { useAppSelector } from "@/redux/store";

export default function TotalPriceTable() {
  const { totalPrice } = useAppSelector((state) => state.cart);
  const shipFee = 30000;

  return (
    <div>
      {/* Total price section*/}
      <table className="border w-96 bg-white shadow-md">
        <thead>
          <tr className="bg-primary-100">
            <th colSpan={2} className="py-2 px-4 text-center uppercase">
              Thông tin chung
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4">Tổng giỏ hàng</td>
            <td className="py-2 px-4 text-right">
              {Math.round(totalPrice)} VNĐ
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4">Giảm giá</td>
            <td className="py-2 px-4 text-right">-0 VNĐ</td>
          </tr>
          <tr>
            <td className="py-2 px-4">Phí vận chuyển</td>
            <td className="py-2 px-4 text-right">
              {shipFee.toLocaleString("vi-VN")} VNĐ
            </td>
          </tr>
        </tbody>
        <tfoot className="border-t">
          <tr>
            <td className="py-2 px-4 font-semibold">Tổng thanh toán</td>
            <td className="py-2 px-4 font-semibold text-right">
              {Math.round(totalPrice + shipFee).toLocaleString("vi-VN")} VNĐ
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
