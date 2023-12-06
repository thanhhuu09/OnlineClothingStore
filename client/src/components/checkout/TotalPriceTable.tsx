import VoucherSection from "./VoucherSection";

export default function TotalPriceTable() {
  return (
    <div className="col-span-1 mx-auto ">
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
            <td className="py-2 px-4 text-right">100.000 VNĐ</td>
          </tr>
          <tr>
            <td className="py-2 px-4">Giảm giá</td>
            <td className="py-2 px-4 text-right">-0 VNĐ</td>
          </tr>
          <tr>
            <td className="py-2 px-4">Phí vận chuyển</td>
            <td className="py-2 px-4 text-right">30.000 VNĐ</td>
          </tr>
        </tbody>
        <tfoot className="border-t">
          <tr>
            <td className="py-2 px-4 font-semibold">Tổng thanh toán</td>
            <td className="py-2 px-4 font-semibold text-right">130.000 VNĐ</td>
          </tr>
        </tfoot>
      </table>
      {/* Voucher section */}
      <VoucherSection />
    </div>
  );
}
