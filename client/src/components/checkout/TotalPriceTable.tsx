import { useAppSelector } from "@/redux/store";

const TableRow = ({ label, value }: any) => (
  <tr>
    <td className="py-2 px-4">{label}</td>
    <td className="py-2 px-4 text-right">{value} VNĐ</td>
  </tr>
);

export default function TotalPriceTable({ shipFee }: { shipFee: number }) {
  const { totalPrice } = useAppSelector((state) => state.cart);
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
          <TableRow
            label="Tổng giỏ hàng"
            value={Math.round(totalPrice).toLocaleString("vi-VN")}
          />
          <TableRow label="Giảm giá" value="-0" />
          <TableRow
            label="Phí vận chuyển"
            value={shipFee.toLocaleString("vi-VN")}
          />
        </tbody>
        <tfoot className="border-t">
          <TableRow
            label="Tổng thanh toán"
            value={Math.round(totalPrice + shipFee).toLocaleString("vi-VN")}
            isBold
          />
        </tfoot>
      </table>
    </div>
  );
}
